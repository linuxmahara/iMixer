use std::collections::HashMap;
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::{LazyOption, LookupMap, UnorderedMap, UnorderedSet};
use near_sdk::json_types::{Base64VecU8, U128};
use near_sdk::serde::{Deserialize, Serialize};
use near_sdk::{
    env, near_bindgen, AccountId, Balance, CryptoHash, PanicOnDefault, Promise, PromiseOrValue,
};

use crate::internal::*;
pub use crate::metadata::*;
pub use crate::mint::*;
pub use crate::nft_core::*;
pub use crate::approval::*;
pub use crate::royalty::*;
pub use crate::events::*;

mod internal;
mod approval; 
mod enumeration; 
mod metadata; 
mod mint; 
mod nft_core; 
mod royalty; 
mod events;

/// This spec can be treated like a version of the standard.
pub const NFT_METADATA_SPEC: &str = "1.0.0";
/// This is the name of the NFT standard we're using
pub const NFT_STANDARD_NAME: &str = "nep171";

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct Contract {
    //contract owner
    pub owner_id: AccountId,

    //keeps track of all the token IDs for a given account
    pub tokens_per_owner: LookupMap<AccountId, UnorderedSet<TokenId>>,

    //keeps track of the token struct for a given token ID
    pub tokens_by_id: LookupMap<TokenId, Token>,

    //keeps track of the token metadata for a given token ID
    pub token_metadata_by_id: UnorderedMap<TokenId, TokenMetadata>,

    //keeps track of the metadata for the contract
    pub metadata: LazyOption<NFTContractMetadata>,
}

/// Helper structure for keys of the persistent collections.
#[derive(BorshSerialize)]
pub enum StorageKey {
    TokensPerOwner,
    TokenPerOwnerInner { account_id_hash: CryptoHash },
    TokensById,
    TokenMetadataById,
    NFTContractMetadata,
    TokensPerType,
    TokensPerTypeInner { token_type_hash: CryptoHash },
    TokenTypesLocked,
}

const DATA_IMAGE_SVG_NEAR_ICON: &str = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120' xmlns:v='https://vecta.io/nano'><linearGradient id='A' gradientUnits='userSpaceOnUse' x1='86.456' y1='72.189' x2='98.223' y2='72.189'><stop offset='0' stop-color='#dd4f21'/><stop offset='.402' stop-color='#dd4f21'/><stop offset='1' stop-color='#ff8e72'/></linearGradient><path d='M100.7 72.19c0 6.68-4.2 12.1-9.39 12.1s-4.75-5.42-4.75-12.1-.43-12.1 4.75-12.1c5.19 0 9.39 5.42 9.39 12.1z' fill='url(#A)'/><linearGradient id='B' gradientUnits='userSpaceOnUse' x1='33.582' y1='72.189' x2='21.815' y2='72.189'><stop offset='0' stop-color='#dd4f21'/><stop offset='.402' stop-color='#dd4f21'/><stop offset='1' stop-color='#ff8e72'/></linearGradient><path d='M19.34 72.19c0 6.68 4.2 12.1 9.39 12.1s4.75-5.42 4.75-12.1.43-12.1-4.75-12.1-9.39 5.42-9.39 12.1z' fill='url(#B)'/><linearGradient id='C' gradientUnits='userSpaceOnUse' x1='90.22' y1='61.775' x2='29.818' y2='61.775'><stop offset='0' stop-color='#dd4f21'/><stop offset='.402' stop-color='#dd4f21'/><stop offset='1' stop-color='#ff8e72'/></linearGradient><path d='M60.02 20.8c16.68 0 30.2 11.93 30.2 26.66V76.1c0 14.72-13.52 26.66-30.2 26.66s-30.2-11.93-30.2-26.66V47.45c0-14.72 13.52-26.65 30.2-26.65z' fill='url(#C)'/><path d='M67.68 90.69c0-4.83-3.44-2.35-7.69-2.35s-7.69-2.49-7.69 2.35c0 4.83 3.44 6.91 7.69 6.91s7.69-2.08 7.69-6.91zM53.84 79.15a1.59 1.59 0 0 1-1.59-1.59c0-3.01-2.55-6.07-5.58-6.68-1.38-.28-2.65-.02-3.57.74-.89.73-1.37 1.85-1.37 3.17a1.59 1.59 0 0 1-3.18 0c0-2.29.9-4.29 2.54-5.64 1.68-1.37 3.89-1.87 6.22-1.39 4.56.92 8.13 5.23 8.13 9.8-.01.88-.72 1.59-1.6 1.59zm12.36 0a1.59 1.59 0 0 1-1.59-1.59c0-4.58 3.57-8.88 8.13-9.8 2.34-.47 4.54.02 6.22 1.39 1.64 1.34 2.54 3.34 2.54 5.64a1.59 1.59 0 0 1-3.18 0c0-1.32-.49-2.44-1.37-3.17-.92-.75-2.19-1.02-3.57-.74-3.02.61-5.58 3.67-5.58 6.68 0 .88-.72 1.59-1.6 1.59z' fill='#241f20'/><circle cx='59.99' cy='81.57' r='2.9' fill='#ca0015'/><linearGradient id='D' gradientUnits='userSpaceOnUse' x1='88.294' y1='74.545' x2='1.485' y2='13.778'><stop offset='0' stop-color='#dd4f21'/><stop offset='.402' stop-color='#dd4f21'/><stop offset='1' stop-color='#ff8e72'/></linearGradient><path d='M59.99 22.57c-16.68 0-30.2 10.18-30.2 24.9v20.71c0 14.72 13.52 6.81 30.2 6.81s30.2 7.91 30.2-6.81v-20.7c0-14.72-13.52-24.91-30.2-24.91z' opacity='.35' fill='url(#D)'/><linearGradient id='E' gradientUnits='userSpaceOnUse' x1='7.237' y1='19.249' x2='47.626' y2='34.265'><stop offset='0' stop-color='#00998a'/><stop offset='1' stop-color='#00798d'/></linearGradient><path d='M85.73 23.1c-4.15-1.7-15.32-4.14-21.5-5.42a20.88 20.88 0 0 0-8.48 0c-6.17 1.28-17.35 3.72-21.5 5.42-5.86 2.4-5.63 7.84-5.63 7.84v21.6h31.37 31.37v-21.6c0 0 .23-5.45-5.63-7.84z' fill='url(#E)'/><linearGradient id='F' gradientUnits='userSpaceOnUse' x1='38.799' y1='34.691' x2='62.488' y2='43.498'><stop offset='0' stop-color='#d9f1f6'/><stop offset='1' stop-color='#bdd0ed'/></linearGradient><path d='M30.76 51.3V31.17s-.21-5.07 5.25-7.3 23.98-.9 23.98-.9V51.3H30.76z' fill='url(#F)'/><linearGradient id='G' gradientUnits='userSpaceOnUse' x1='44.312' y1='27.297' x2='66.844' y2='35.674'><stop offset='0' stop-color='#d9f1f6'/><stop offset='1' stop-color='#bdd0ed'/></linearGradient><path d='M89.22 51.3V31.17s.21-5.07-5.25-7.3-23.98-.9-23.98-.9V51.3h29.23z' fill='url(#G)'/><linearGradient id='H' gradientUnits='userSpaceOnUse' x1='29.248' y1='50.07' x2='86.28' y2='64.526'><stop offset='.005' stop-color='#ff004c'/><stop offset='1' stop-color='#bf0015'/></linearGradient><path d='M59.99 43.97s-18 0-31.37 8.57v11.7s.5 2.75 3.84 1.71 14.88-7.74 27.53-7.74 24.19 6.7 27.53 7.74c3.34 1.05 3.84-1.71 3.84-1.71v-11.7c-13.37-8.57-31.37-8.57-31.37-8.57z' fill='url(#H)'/><linearGradient id='I' gradientUnits='userSpaceOnUse' x1='30.146' y1='56.543' x2='84.975' y2='70.441'><stop offset='.005' stop-color='#e00043'/><stop offset='1' stop-color='#a00012'/></linearGradient><path d='M91.36 62.56s-.5 2.75-3.84 1.71c-3.34-1.05-14.88-7.74-27.53-7.74s-24.19 6.7-27.53 7.74c-3.34 1.05-3.84-1.71-3.84-1.71v1.69s.5 2.75 3.84 1.71 14.88-7.74 27.53-7.74 24.19 6.7 27.53 7.74c3.34 1.05 3.84-1.71 3.84-1.71'/%3E%3C/g%3E%3C/svg%3E";

#[near_bindgen]
impl Contract {
    /*
        initialization function (can only be called once).
        this initializes the contract with default metadata so the
        user doesn't have to manually type metadata.
    */
    #[init]
    pub fn new_default_meta(owner_id: AccountId) -> Self {
        //calls the other function "new: with some default metadata and the owner_id passed in 
        Self::new(
            owner_id,
            NFTContractMetadata {
                spec: "nft-1.0.0".to_string(),
                name: "iMixer".to_string(),
                symbol: "IMIXER".to_string(),
                icon: Some(DATA_IMAGE_SVG_NEAR_ICON.to_string()),
                base_uri: None,
                reference: None,
                reference_hash: None,
            },
        )
    }

    /*
        initialization function (can only be called once).
        this initializes the contract with metadata that was passed in and
        the owner_id. 
    */
    #[init]
    pub fn new(owner_id: AccountId, metadata: NFTContractMetadata) -> Self {
        //create a variable of type Self with all the fields initialized. 
        let this = Self {
            //Storage keys are simply the prefixes used for the collections. This helps avoid data collision
            tokens_per_owner: LookupMap::new(StorageKey::TokensPerOwner.try_to_vec().unwrap()),
            tokens_by_id: LookupMap::new(StorageKey::TokensById.try_to_vec().unwrap()),
            token_metadata_by_id: UnorderedMap::new(
                StorageKey::TokenMetadataById.try_to_vec().unwrap(),
            ),
            //set the owner_id field equal to the passed in owner_id. 
            owner_id,
            metadata: LazyOption::new(
                StorageKey::NFTContractMetadata.try_to_vec().unwrap(),
                Some(&metadata),
            ),
        };

        //return the Contract object
        this
    }
}