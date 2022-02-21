
var mintTrackTitle = "";

G["main"]["mintBtn"].on("mousedown", function (evt) {
	if (wallet.isSignedIn()) {

		contract.check_token({"id": generatePartialString()})
		.then(messages => {
			if(messages == true || messages == "true"){
				G["popupMC"]["shareBG"].visible = true;
				G["popupMC"]["saveBG"].visible = false;
				G["popupMC"]["leftPBtn"].visible = true;
				G["popupMC"]["rightPBtn"].visible = true;
				G["popupMC"]["saveBG"]["trackBtn0"].visible = false;
				G["popupMC"]["saveBG"]["trackBtn1"].visible = false;
				G["popupMC"]["saveBG"]["trackBtn2"].visible = false;
				G["popupMC"]["saveBG"]["trackBtn3"].visible = false;
				G["popupMC"]["saveBG"]["trackBtn4"].visible = false;

				G["popupMC"]["shareBG"]["txt"].text = "The NFT for this exact composition already exists! Please change up the mix.";

				G["popupMC"]["rightPTxt"].text = "Cancel";
				G["popupMC"]["leftPTxt"].text = "Ok";
				G["popupMC"].visible = true;
				document.getElementById("inutText").style.visibility = "hidden";
			}else{
				//saving
				saveScreenshot();
			}
		});
	} else {
		G["popupMC"]["shareBG"].visible = true;
		G["popupMC"]["saveBG"].visible = false;
		G["popupMC"]["leftPBtn"].visible = true;
		G["popupMC"]["rightPBtn"].visible = true;
		G["popupMC"]["saveBG"]["trackBtn0"].visible = false;
		G["popupMC"]["saveBG"]["trackBtn1"].visible = false;
		G["popupMC"]["saveBG"]["trackBtn2"].visible = false;
		G["popupMC"]["saveBG"]["trackBtn3"].visible = false;
		G["popupMC"]["saveBG"]["trackBtn4"].visible = false;

		G["popupMC"]["shareBG"]["txt"].text = "You need to login with Near before you can mint!\n";

		G["popupMC"]["rightPTxt"].text = "Cancel";
		G["popupMC"]["leftPTxt"].text = "Login";
		G["popupMC"].visible = true;
		document.getElementById("inutText").style.visibility = "hidden";

	}

	createjs.Sound.play("click");
});
	

var nearContract = "front3.testnet";



G["main"]["loginBtn"].on("mousedown", function (evt) {
	if (wallet.isSignedIn()) {
		wallet.signOut();
		G["main"]["nearTxt"].text = "";
		G["main"]["loginBtn"]["txt"].text = "Welcome, Guest! Sign in with Near";
		myAccount = "Guest";
		refreshMyMixes();
	}else{
		window.history.replaceState("Restored Mix", "Restored Mix", "?track=" + generateMusicString());
		wallet.requestSignIn({
			contractId: nearContract,
			methodNames: ['check_token', 'nft_mint']
		});
	}
});



// connect to NEAR
const near = new nearApi.Near({
	keyStore: new nearApi.keyStores.BrowserLocalStorageKeyStore(),
	networkId: 'testnet',
	nodeUrl: 'https://rpc.testnet.near.org',
	walletUrl: 'https://wallet.testnet.near.org'
});
  
// connect to the NEAR Wallet
const wallet = new nearApi.WalletConnection(near, 'my-app');

// connect to a NEAR smart contract
const contract = new nearApi.Contract(wallet.account(), nearContract, {
	viewMethods: ['check_token'],
	changeMethods: ['nft_mint']
});

const button = document.getElementById('add-text');

var myAccount = "Guest";

if (!wallet.isSignedIn()) {
	G["main"]["nearTxt"].text = "";
	G["main"]["loginBtn"]["txt"].text = "Welcome, Guest! Sign in with Near";
}else{
	myAccount = wallet.getAccountId();
	G["main"]["nearTxt"].text = "Welcome, " + myAccount + "!";
	G["main"]["loginBtn"]["txt"].text = "Sign out";
}

//load mixes
function refreshMyMixes(){
	for (i = 0; i < 5; i++) {
		if(localStorage.getItem(myAccount + "trackName" + i) != null){
			myTrackArray[i] = {
				trackName: localStorage.getItem(myAccount + "trackName" + i),
				trackString: localStorage.getItem(myAccount + "trackString" + i),
				trackDate: 0
			};
			//if user is logged in, but song was never created
			if(myTrackArray[i].trackName == ""){
				myTrackArray[i].trackName = "Empty";
			}
			//display my stored tracks
			G["start"]["storedTrackBtn" + i]["txt"].text = myTrackArray[i].trackName;
			G["popupMC"]["saveBG"]["trackBtn" + i]["txt"].text = myTrackArray[i].trackName;
		}
	}
}
refreshMyMixes();
// call the check_token view method
if(localStorage.getItem("MINTING") != null){
	contract.check_token({"id": localStorage.getItem("MINTING")})
	.then(messages => {
		if(messages == true || messages == "true"){
			G["popupMC"]["shareBG"].visible = true;
			G["popupMC"]["saveBG"].visible = false;
			G["popupMC"]["leftPBtn"].visible = true;
			G["popupMC"]["rightPBtn"].visible = true;
			G["popupMC"]["saveBG"]["trackBtn0"].visible = false;
			G["popupMC"]["saveBG"]["trackBtn1"].visible = false;
			G["popupMC"]["saveBG"]["trackBtn2"].visible = false;
			G["popupMC"]["saveBG"]["trackBtn3"].visible = false;
			G["popupMC"]["saveBG"]["trackBtn4"].visible = false;

			G["popupMC"]["shareBG"]["txt"].text = "Successfully minted:\n"+ localStorage.getItem("MINTNAME") + "\n\nYou should now see it in your Gallery!";

			G["popupMC"]["rightPTxt"].text = "Cancel";
			G["popupMC"]["leftPTxt"].text = "Gallery";
			G["popupMC"].visible = true;
			document.getElementById("inutText").style.visibility = "hidden";
			//
			//
			localStorage.removeItem("MINTNAME");
		}
	});
	localStorage.removeItem('MINTING');
}


function saveScreenshot(){
	html2canvas(canvas).then(function(canvas) {
		var extra_canvas = document.createElement("canvas");
        extra_canvas.setAttribute('width',1450);
        extra_canvas.setAttribute('height',800);
        var ctx = extra_canvas.getContext('2d');
        ctx.drawImage(canvas,0,0,canvas.width, canvas.height,0,0,1450,800);

	    var screenIMG = extra_canvas.toDataURL("image/png");
	    //var screenIMG = canvas.toDataURL("image/png");
        var output = encodeURIComponent(screenIMG);

		screenSave.open("POST", "php/mint.php", true);
		screenSave.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		screenSave.send("image=" + output);

		G["popupMC"]["shareBG"].visible = true;
		G["popupMC"]["saveBG"].visible = false;
		G["popupMC"]["leftPBtn"].visible = true;
		G["popupMC"]["rightPBtn"].visible = true;
		G["popupMC"]["saveBG"]["trackBtn0"].visible = false;
		G["popupMC"]["saveBG"]["trackBtn1"].visible = false;
		G["popupMC"]["saveBG"]["trackBtn2"].visible = false;
		G["popupMC"]["saveBG"]["trackBtn3"].visible = false;
		G["popupMC"]["saveBG"]["trackBtn4"].visible = false;

		G["popupMC"]["shareBG"]["txt"].text = "Please type a new title for your mix."

		window["$"]("#inutText").val("");
		G["popupMC"]["rightPTxt"].text = "Cancel";
		G["popupMC"]["leftPTxt"].text = "Mint";
		G["popupMC"].visible = true;
		document.getElementById("inutText").style.visibility = "visible";
		document.getElementById("inutText").style.wordWrap = "break-word";
	});
}

var mintingTime = 0;

screenSave.onreadystatechange = function () {
	if (this.readyState == 4 && this.status == 200) {
		mintingTime = this.responseText;
		console.log("mintingTime", mintingTime);
	}
}
