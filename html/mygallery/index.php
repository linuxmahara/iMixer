<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="Mark Otto, Jacob Thornton, and Bootstrap contributors">
    <meta name="generator" content="Hugo 0.88.1">
    <title>iMixer Album</title>

    <link rel="canonical" href="https://getbootstrap.com/docs/5.1/examples/album/">

    

    <!-- Bootstrap core CSS -->
<link href="assets/dist/css/bootstrap.min.css" rel="stylesheet">

    <style>
		body {
			background-color: #2c2e37;
		}

      .bd-placeholder-img {
        font-size: 1.125rem;
        text-anchor: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
      }

      @media (min-width: 768px) {
        .bd-placeholder-img-lg {
          font-size: 3.5rem;
        }
      }
	  #elem0 { 
		  display: none; /* make it reappear */ 
		} 
    </style>

    
  </head>
  <body>
    
<header>


  <script src="https://cdn.jsdelivr.net/npm/near-api-js@0.41.0/dist/near-api-js.min.js"></script>
  
  
  
  
  <div class="collapse bg-dark" id="navbarHeader">
    <div class="container">
      <div class="row">
        <div class="col-sm-8 col-md-7 py-4">
          <h4 class="text-white">About</h4>
          <p class="text-muted">ISOSTUDIOS INC</p>
        </div>
        <div class="col-sm-4 offset-md-1 py-4">
          <h4 class="text-white">Contact</h4>
          <ul class="list-unstyled">
            <li><a href="https://discord.gg/d6zKxSZqjD" class="text-white">Join our Discord!</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div class="navbar navbar-dark bg-dark shadow-sm">
    <div class="container">
      <h6 class="text-white" id="top-text1">Welcome</h4><a href="#" class="btn btn-primary my-2" id="top-text2" onclick="doLogOut()">Sign In with Near</a>
    </div>
  </div>
</header>

<main>

  <section class="py-4 text-center container">
    <div class="row py-lg-1">
      <div class="col-lg-6 col-md-8 mx-auto">
        <a href="https://yogos.com/imixer">
		<img border="0" alt="iMixer" src="ilogo.png" width="390">
		</a>
        <p class="lead text-muted">GALLERY</p>
        <p>
          <a href="https://yogos.com/imixer" class="btn btn-primary my-2">Mint a new mix!</a>
          <a href="https://yogos.com/imixer/gallery" id="login-text" class="btn btn-secondary my-2">Test</a>
        </p>
      </div>
    </div>
  </section>

  <div class="album py-5 bg-dark">
    <div class="container">

      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        <div class="col" id = "elem0">
          <div class="card shadow-sm" style="background-color: #2c2e37">
			<a href="https://www.w3schools.com" id = "linkThumb" >
		    <img src="../captures/default.png" id = "mixThumb" width="100%" height="225" alt="Default">
			</a>
            <div class="card-body">
              <p class="card-text" id = "cardText" style="color:white"></p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <button type="button" class="btn btn-sm btn-outline-secondary" id = "galBtn1" >👍</button>
                  <button type="button" class="btn btn-sm btn-outline-primary" id = "galBtn2" >👎</button>
                </div>
                <small class="text-muted">02-21-22</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</main>

<footer class="text-muted py-5">
  <div class="container">
    <p class="float-end mb-1">
      <a href="#">Back to top</a>
    </p>
    <p class="mb-0">ISOSTUDIOS INC</p>
  </div>
</footer>


    <script src="assets/dist/js/bootstrap.bundle.min.js"></script>

      
  </body>
  
    <script>
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
    const contract = new nearApi.Contract(wallet.account(), 'front3.testnet', {
      viewMethods: ['nft_tokens_for_owner'],
      changeMethods: ['nft_mint']
    });

    const button = document.getElementById('login-text');
    if (!wallet.isSignedIn()) {
		
      button.textContent = 'Sign In with NEAR'
		document.getElementById("top-text1").innerHTML = "Welcome, Guest!";
    }else{
      button.textContent = 'Public Gallery'
	  
		var myAccount = wallet.getAccountId();
		document.getElementById("top-text1").innerHTML = "Welcome, " + myAccount + "!";
		document.getElementById("top-text2").innerHTML = "Logout";
		//document.getElementById("p1").innerHTML = myAccount;
		//document.getElementById("b1").style.display = "block";
	}

    // call the nft_tokens_for_owner view method
	var colCounter = 1;
	
    contract.nft_tokens_for_owner({"account_id": myAccount, "limit": 100})
      .then(messages => {
        const ul = document.getElementById('messages');
        messages.forEach(message => {
			//document.getElementById('cardText').textContent = message.metadata.title;
			//message.metadata.title
			if(colCounter == 1){
				document.getElementById('elem0').style.display = "block";
			}
			document.getElementById('cardText').textContent = message.metadata.title;
			document.getElementById('mixThumb').src = message.metadata.media;
			document.getElementById('linkThumb').href = "https://yogos.com/imixer?track=" + message.metadata.description;
			document.getElementById('galBtn1').textContent = "Transfer";
			document.getElementById('galBtn2').textContent = "Sell";
			
			if(colCounter < messages.length){
				var elem = document.querySelector('#elem0');
				var clone = elem.cloneNode(true);
				clone.id = 'elem' + colCounter;
				elem.after(clone);
				colCounter++;
			}
        })
      });

    // Either sign in or call the nft_mint change method on button click
    document.getElementById('top-text2').addEventListener('click', () => {
      if (wallet.isSignedIn()) {
        contract.nft_mint({
          args: {name: document.getElementById('text').value, quote: "", color: "black", background_color: "white"},
          amount: nearApi.utils.format.parseNearAmount('0.1')
        })
      } else {
        wallet.requestSignIn({
          contractId: 'front3.testnet',
          methodNames: ['nft_tokens_for_owner', 'nft_mint']
        });
      }
    });
	
function doLogOut() {	
if (wallet.isSignedIn()) {
	  wallet.signOut();
		location.reload();
  } else {
	wallet.requestSignIn({
	  contractId: 'front3.testnet',
	  methodNames: ['nft_tokens_for_owner', 'nft_mint']
	});
  }
}
</script>
  
</html>
