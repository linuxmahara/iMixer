var helpPopupWidth = 366 / 2;
var helpPopupHeight = 323 / 2;
var popupWidth = 100 / 2;
var popupHeight = 26 / 2;
var buttonWidth = 100 / 2;
var buttonHeight = 26 / 2;
var buttonXOffset = 0;
var buttonYOffset = 0;

function playHeadPressmove(evt) {
	var tempX = evt.stageX / stage.scaleX;

	if (tempX > playheadStartX && tempX < 1423) {
		G["playHead"].x = tempX;
	} else if (tempX < 1423) {
		G["playHead"].x = playheadStartX;
	} else {
		G["playHead"].x = 1423;
	}
	//rowArray[n].volume = G["volumeBtn" + n].x - 70;
};

function playHeadMousedown(evt) {
	movingPlayhead = true;
	buttonXOffset = (evt.stageX / stage.scaleX) - (G["playHead"].x - buttonWidth);
}

function playHeadPressup(evt) {
	//movingPlayhead = false;
	var tempX = (evt.stageX / stage.scaleX) - playheadStartX;

	if (tempX < 0){
		tempX = 0;
	}else if(tempX > 1065){
		tempX = 1065;
	}

	var column = Math.floor(tempX / 71);

	playMixEnabled = false;

	G["playHead"].x = (column * 71) + playheadStartX;
	//playheadStartX = G["playHead"].x;
	movingPlayhead = false;

	G["main"]["playBtn"].visible = false;
	G["main"]["stopBtn"].visible = true;
	createjs.Sound.stop();
	playColumn = column * 2;
	startColumn = playColumn;
	firstPlay = true;
	playMixEnabled = true;
}

G["start"].on("mousedown", function (evt) {
	G["start"].visible = false;
});

G["playHead"].on("pressmove", playHeadPressmove);

G["playHead"].on("mousedown", playHeadMousedown);

G["playHead"].on("pressup", playHeadPressup);

G["instrumentThemeBtn0"]["txt"].text = "Custom";
G["instrumentThemeBtn1"]["txt"].text = "Bass";
G["instrumentThemeBtn2"]["txt"].text = "Drums";
G["instrumentThemeBtn3"]["txt"].text = "Keyboards";
G["instrumentThemeBtn4"]["txt"].text = "Strings";
G["instrumentThemeBtn5"]["txt"].text = "Synth";
G["instrumentThemeBtn6"]["txt"].text = "Winds";
G["instrumentThemeBtn7"]["txt"].text = "Vocal";

G["rowPreview0"].name = 0;
G["rowPreview1"].name = 1;
G["rowPreview2"].name = 2;
G["rowPreview3"].name = 3;
G["rowPreview4"].name = 4;
G["rowPreview5"].name = 5;

G["rowPreview0"].on("mousedown", rowPreviewDown);
G["rowPreview1"].on("mousedown", rowPreviewDown);
G["rowPreview2"].on("mousedown", rowPreviewDown);
G["rowPreview3"].on("mousedown", rowPreviewDown);
G["rowPreview4"].on("mousedown", rowPreviewDown);
G["rowPreview5"].on("mousedown", rowPreviewDown);


G["start"]["storedTrackBtn0"].name = 0;
G["start"]["storedTrackBtn1"].name = 1;
G["start"]["storedTrackBtn2"].name = 2;
G["start"]["storedTrackBtn3"].name = 3;
G["start"]["storedTrackBtn4"].name = 4;

G["start"]["storedTrackBtn0"].on("mousedown", storedTrackBtnDown);
G["start"]["storedTrackBtn1"].on("mousedown", storedTrackBtnDown);
G["start"]["storedTrackBtn2"].on("mousedown", storedTrackBtnDown);
G["start"]["storedTrackBtn3"].on("mousedown", storedTrackBtnDown);
G["start"]["storedTrackBtn4"].on("mousedown", storedTrackBtnDown);

G["start"]["storedTrackBtn0"].on("mouseover", storedTrackBtnOver);
G["start"]["storedTrackBtn1"].on("mouseover", storedTrackBtnOver);
G["start"]["storedTrackBtn2"].on("mouseover", storedTrackBtnOver);
G["start"]["storedTrackBtn3"].on("mouseover", storedTrackBtnOver);
G["start"]["storedTrackBtn4"].on("mouseover", storedTrackBtnOver);

G["start"]["storedTrackBtn0"].on("mouseout", storedTrackBtnOut);
G["start"]["storedTrackBtn1"].on("mouseout", storedTrackBtnOut);
G["start"]["storedTrackBtn2"].on("mouseout", storedTrackBtnOut);
G["start"]["storedTrackBtn3"].on("mouseout", storedTrackBtnOut);
G["start"]["storedTrackBtn4"].on("mouseout", storedTrackBtnOut);

G["helpPopup"]["helpPopupBG"].on("pressmove", function (evt) {
	G["helpPopup"].x = (helpPopupWidth - buttonXOffset) + (evt.stageX / stage.scaleX);
	G["helpPopup"].y = (helpPopupHeight - buttonYOffset) + (evt.stageY / stage.scaleX);
});

G["helpPopup"]["helpPopupBG"].on("mousedown", function (evt) {
	buttonXOffset = (evt.stageX / stage.scaleX) - (G["helpPopup"].x - helpPopupWidth);
	buttonYOffset = (evt.stageY / stage.scaleX) - (G["helpPopup"].y - helpPopupHeight);
	G.setChildIndex(G["helpPopup"], G.getNumChildren() - 1);
});

G["helpPopup"]["closeBtn"].on("mousedown", function (evt) {
	G["helpPopup"].visible = false;
});

G["main"]["helpBtn"].on("mousedown", function (evt) {
	if(G["helpPopup"].visible){
		G["helpPopup"].visible = false;
	}else{
		G["helpPopup"].visible = true;
	}
});


G["main"]["leftArrowBtn"].on("mousedown", function (evt) {
	createjs.Sound.stop();
	G["main"]["recWindow"].visible = false;
	G["instrumentBtn0"]["instrumentOutline"].visible = false;
	G["instrumentBtn1"]["instrumentOutline"].visible = false;
	G["instrumentBtn2"]["instrumentOutline"].visible = false;
	G["instrumentBtn3"]["instrumentOutline"].visible = false;
	G["instrumentBtn4"]["instrumentOutline"].visible = false;
	G["instrumentBtn5"]["instrumentOutline"].visible = false;

	if(themePageOffset == 0){
		G["instrumentThemeBtn" + currentTheme]["bg"].visible = false;
		if(currentTheme > 0){
			currentTheme --;
		}else{
			currentTheme = 7;
		}
		G["instrumentThemeBtn" + currentTheme]["bg"].visible = true;
		themePageOffset = 6*Math.floor((soundData[currentTheme].length-1)/6);
	}else{
		themePageOffset -= 6;
	}
	createjs.Sound.play("click");

	updateTheme();
});

G["main"]["rightArrowBtn"].on("mousedown", function (evt) {
	createjs.Sound.stop();
	G["main"]["recWindow"].visible = false;
	G["instrumentBtn0"]["instrumentOutline"].visible = false;
	G["instrumentBtn1"]["instrumentOutline"].visible = false;
	G["instrumentBtn2"]["instrumentOutline"].visible = false;
	G["instrumentBtn3"]["instrumentOutline"].visible = false;
	G["instrumentBtn4"]["instrumentOutline"].visible = false;
	G["instrumentBtn5"]["instrumentOutline"].visible = false;

	if(soundData[currentTheme].length < themePageOffset + 7){
		G["instrumentThemeBtn" + currentTheme]["bg"].visible = false;
		if(currentTheme < 7){
			currentTheme ++;
		}else{
			currentTheme = 0;
		}
		G["instrumentThemeBtn" + currentTheme]["bg"].visible = true;
		themePageOffset = 0;
	}else{
		themePageOffset += 6;
	}
	createjs.Sound.play("click");

	updateTheme();
});

function volBtnOnPress(evt) {
	var n = evt.currentTarget.name;

	if(rowArray[n] != undefined){
		rowArray[n].muted = 0;

		G["volBtnOn" + n].visible = false;
		G["volBtnOff" + n].visible = true;
	}

	createjs.Sound.play("click");
}

function volBtnOffPress(evt) {
	var n = evt.currentTarget.name;

	if(rowArray[n] != undefined){
		rowArray[n].muted = 1;

		G["volBtnOff" + n].visible = false;
		G["volBtnOn" + n].visible = true;
	}
	
	createjs.Sound.play("click");
}

G["volBtnOn0"].name = 0;
G["volBtnOn1"].name = 1;
G["volBtnOn2"].name = 2;
G["volBtnOn3"].name = 3;
G["volBtnOn4"].name = 4;
G["volBtnOn5"].name = 5;

G["volBtnOn0"].on("mousedown", volBtnOnPress);
G["volBtnOn1"].on("mousedown", volBtnOnPress);
G["volBtnOn2"].on("mousedown", volBtnOnPress);
G["volBtnOn3"].on("mousedown", volBtnOnPress);
G["volBtnOn4"].on("mousedown", volBtnOnPress);
G["volBtnOn5"].on("mousedown", volBtnOnPress);

G["volBtnOff0"].name = 0;
G["volBtnOff1"].name = 1;
G["volBtnOff2"].name = 2;
G["volBtnOff3"].name = 3;
G["volBtnOff4"].name = 4;
G["volBtnOff5"].name = 5;

G["volBtnOff0"].on("mousedown", volBtnOffPress);
G["volBtnOff1"].on("mousedown", volBtnOffPress);
G["volBtnOff2"].on("mousedown", volBtnOffPress);
G["volBtnOff3"].on("mousedown", volBtnOffPress);
G["volBtnOff4"].on("mousedown", volBtnOffPress);
G["volBtnOff5"].on("mousedown", volBtnOffPress);



G["volumeBtn0"].name = 0;
G["volumeBtn1"].name = 1;
G["volumeBtn2"].name = 2;
G["volumeBtn3"].name = 3;
G["volumeBtn4"].name = 4;
G["volumeBtn5"].name = 5;

G["volumeBtn0"].on("pressmove", volumeBtnPressmove);
G["volumeBtn1"].on("pressmove", volumeBtnPressmove);
G["volumeBtn2"].on("pressmove", volumeBtnPressmove);
G["volumeBtn3"].on("pressmove", volumeBtnPressmove);
G["volumeBtn4"].on("pressmove", volumeBtnPressmove);
G["volumeBtn5"].on("pressmove", volumeBtnPressmove);

G["volumeBtn0"].on("mousedown", volumeBtnMousedown);
G["volumeBtn1"].on("mousedown", volumeBtnMousedown);
G["volumeBtn2"].on("mousedown", volumeBtnMousedown);
G["volumeBtn3"].on("mousedown", volumeBtnMousedown);
G["volumeBtn4"].on("mousedown", volumeBtnMousedown);
G["volumeBtn5"].on("mousedown", volumeBtnMousedown);

G["volumeBtn0"].on("pressup", volumeBtnPressup);
G["volumeBtn1"].on("pressup", volumeBtnPressup);
G["volumeBtn2"].on("pressup", volumeBtnPressup);
G["volumeBtn3"].on("pressup", volumeBtnPressup);
G["volumeBtn4"].on("pressup", volumeBtnPressup);
G["volumeBtn5"].on("pressup", volumeBtnPressup);

function volumeBtnPressmove(evt) {
	var n = evt.currentTarget.name;
	if(rowArray[n] != undefined){
		var tempX = evt.stageX / stage.scaleX;

		if (tempX > 40 && tempX < 178) {
			G["volumeBtn" + n].x = tempX;
		} else if (tempX < 178) {
			G["volumeBtn" + n].x = 40;
		} else {
			G["volumeBtn" + n].x = 178;
		}
		//console.log("volume", Math.floor((G["volumeBtn" + n].x - 40) / 1.38))
		rowArray[n].volume = Math.floor((G["volumeBtn" + n].x - 40) / 1.38);
	}
};

function volumeBtnMousedown(evt) {
	var n = evt.currentTarget.name;
	buttonXOffset = (evt.stageX / stage.scaleX) - (G["volumeBtn" + n].x - buttonWidth);
}

function volumeBtnPressup(evt) {
	var n = evt.currentTarget.name;
}


G["popupMC"]["saveBG"]["trackBtn0"].name = 0;
G["popupMC"]["saveBG"]["trackBtn1"].name = 1;
G["popupMC"]["saveBG"]["trackBtn2"].name = 2;
G["popupMC"]["saveBG"]["trackBtn3"].name = 3;
G["popupMC"]["saveBG"]["trackBtn4"].name = 4;

G["popupMC"]["saveBG"]["trackBtn0"].on("mouseover", trackBtnOver);
G["popupMC"]["saveBG"]["trackBtn1"].on("mouseover", trackBtnOver);
G["popupMC"]["saveBG"]["trackBtn2"].on("mouseover", trackBtnOver);
G["popupMC"]["saveBG"]["trackBtn3"].on("mouseover", trackBtnOver);
G["popupMC"]["saveBG"]["trackBtn4"].on("mouseover", trackBtnOver);

G["popupMC"]["saveBG"]["trackBtn0"].on("mouseout", trackBtnOut);
G["popupMC"]["saveBG"]["trackBtn1"].on("mouseout", trackBtnOut);
G["popupMC"]["saveBG"]["trackBtn2"].on("mouseout", trackBtnOut);
G["popupMC"]["saveBG"]["trackBtn3"].on("mouseout", trackBtnOut);
G["popupMC"]["saveBG"]["trackBtn4"].on("mouseout", trackBtnOut);

G["popupMC"]["saveBG"]["trackBtn0"].on("mousedown", trackBtnDown);
G["popupMC"]["saveBG"]["trackBtn1"].on("mousedown", trackBtnDown);
G["popupMC"]["saveBG"]["trackBtn2"].on("mousedown", trackBtnDown);
G["popupMC"]["saveBG"]["trackBtn3"].on("mousedown", trackBtnDown);
G["popupMC"]["saveBG"]["trackBtn4"].on("mousedown", trackBtnDown);

G["popupMC"]["leftPBtn"].on("mousedown", function (evt) {
	if (G["popupMC"]["leftPTxt"].text == "Login") {
		G["popupMC"].visible = false;
		wallet.requestSignIn({
			contractId: nearContract,
			methodNames: ['check_token', 'nft_mint']
		});
	} else if (G["popupMC"]["leftPTxt"].text == "Gallery") {
		window.open("https://" + hostname + "/imixer/mygallery/", "_blank");
		G["popupMC"].visible = false;
	} else if (G["popupMC"]["leftPTxt"].text == "Mint") {
		G["popupMC"]["leftPBtn"].visible = false;

		window.history.replaceState("Restored Mix", "Restored Mix", "?track=" + generateMusicString());

		if (wallet.isSignedIn()) {
			mintTrackTitle = window["$"]("#inutText").val();
			localStorage.setItem('MINTNAME', mintTrackTitle);
			localStorage.setItem('MINTING', generatePartialString());

			G["popupMC"]["shareBG"]["txt"].text = "Minting " + mintTrackTitle + "...";

			contract.nft_mint({
				token_id: generatePartialString(),
				metadata: {
					title: mintTrackTitle,
					description: generateMusicString(),
					media: "https://" + hostname + "/imixer/captures/" + mintingTime + ".png"
				},
				receiver_id: myAccount
			},
	    	300000000000000, // attached GAS (optional)
			nearApi.utils.format.parseNearAmount('0.1'));

		} else {
			wallet.requestSignIn({
				contractId: nearContract,
				methodNames: ['check_token', 'nft_mint']
			});
		}
	} else if (G["popupMC"]["leftPTxt"].text == "Load") {
		//open load list

	} else if (G["popupMC"]["leftPTxt"].text == "Save") {
		document.getElementById("inutText").style.visibility = "hidden";
		saveMix(window["$"]("#inutText").val());
	} else if (G["popupMC"]["leftPTxt"].text == "OK") {
		G["popupMC"].visible = false;
	} else {
		var copyText = document.querySelector("#inutText");
		copyText.select();
		document.execCommand("copy");
		document.getElementById("inutText").style.visibility = "hidden";
		G["popupMC"].visible = false;
	}

	createjs.Sound.play("click");
});

function trackBtnDown(evt) {

	var n = evt.currentTarget.name;

	if(G["popupMC"]["saveBG"]["txt"].text == "Load a saved track"){
		G["popupMC"].visible = false;

		themePageOffset = 0;
		G["instrumentThemeBtn" + currentTheme]["bg"].visible = false;
		currentTheme = 1;
		updateTheme();
		G["instrumentThemeBtn" + currentTheme]["bg"].visible = true;

		if(myTrackArray[n].trackString != ""){
			loadMix(myTrackArray[n].trackString);
		}

	}else{

		G["popupMC"]["saveBG"]["trackBtn0"].visible = false;
		G["popupMC"]["saveBG"]["trackBtn1"].visible = false;
		G["popupMC"]["saveBG"]["trackBtn2"].visible = false;
		G["popupMC"]["saveBG"]["trackBtn3"].visible = false;
		G["popupMC"]["saveBG"]["trackBtn4"].visible = false;

		savingTrackNumber = n;
				
		window["$"]("#inutText").val(myTrackArray[savingTrackNumber].trackName);
		document.getElementById("inutText").style.visibility = "visible";

		G["popupMC"]["leftPBtn"].visible = true;
		G["popupMC"]["rightPBtn"].visible = true;

		G["popupMC"]["rightPTxt"].text = "Cancel";
		G["popupMC"]["leftPTxt"].text = "Save";

		//G["instrumentBtn" + n].x = (buttonWidth - buttonXOffset) + (evt.stageX / stage.scaleX);
	}
	createjs.Sound.play("click");
};

function trackBtnOver(evt) {
	evt.currentTarget["txt"].alpha = 1;
};

function trackBtnOut(evt) {
	evt.currentTarget["txt"].alpha = 0.5;
};


G["main"]["saveBtn"].on("mousedown", function (evt) {
	document.getElementById("inutText").style.visibility = "hidden";
	G["popupMC"]["saveBG"].visible = true;
	G["popupMC"]["shareBG"].visible = false;
	G["popupMC"]["leftPBtn"].visible = false;
	G["popupMC"]["rightPBtn"].visible = false;
	G["popupMC"]["saveBG"]["trackBtn0"].visible = true;
	G["popupMC"]["saveBG"]["trackBtn1"].visible = true;
	G["popupMC"]["saveBG"]["trackBtn2"].visible = true;
	G["popupMC"]["saveBG"]["trackBtn3"].visible = true;
	G["popupMC"]["saveBG"]["trackBtn4"].visible = true;

	G["popupMC"]["saveBG"]["txt"].text = "Select the track you want to replace and then type a new track title.";
	G["popupMC"]["rightPTxt"].text = "";
	G["popupMC"]["leftPTxt"].text = "";
	G["popupMC"].visible = true;

	createjs.Sound.play("click");
});

function generateMusicString (){
	var exportArray = [];
	var opposite = 0;

	exportArray.push(parseInt(soundData[0][0].path.slice(0, 2)));
	exportArray.push(parseInt(soundData[0][0].path.slice(2, 4)));
	exportArray.push(parseInt(soundData[0][0].path.slice(4, 6)));
	exportArray.push(parseInt(soundData[0][0].path.slice(6, 8)));
	exportArray.push(parseInt(soundData[0][0].path.slice(8, 10)));
	exportArray.push(parseInt(soundData[0][0].path.slice(10, 12)));

	exportArray.push(parseInt(soundData[0][1].path.slice(0, 2)));
	exportArray.push(parseInt(soundData[0][1].path.slice(2, 4)));
	exportArray.push(parseInt(soundData[0][1].path.slice(4, 6)));
	exportArray.push(parseInt(soundData[0][1].path.slice(6, 8)));
	exportArray.push(parseInt(soundData[0][1].path.slice(8, 10)));
	exportArray.push(parseInt(soundData[0][1].path.slice(10, 12)));

	exportArray.push(parseInt(soundData[0][2].path.slice(0, 2)));
	exportArray.push(parseInt(soundData[0][2].path.slice(2, 4)));
	exportArray.push(parseInt(soundData[0][2].path.slice(4, 6)));
	exportArray.push(parseInt(soundData[0][2].path.slice(6, 8)));
	exportArray.push(parseInt(soundData[0][2].path.slice(8, 10)));
	exportArray.push(parseInt(soundData[0][2].path.slice(10, 12)));

	exportArray.push(parseInt(soundData[0][3].path.slice(0, 2)));
	exportArray.push(parseInt(soundData[0][3].path.slice(2, 4)));
	exportArray.push(parseInt(soundData[0][3].path.slice(4, 6)));
	exportArray.push(parseInt(soundData[0][3].path.slice(6, 8)));
	exportArray.push(parseInt(soundData[0][3].path.slice(8, 10)));
	exportArray.push(parseInt(soundData[0][3].path.slice(10, 12)));

	exportArray.push(parseInt(soundData[0][4].path.slice(0, 2)));
	exportArray.push(parseInt(soundData[0][4].path.slice(2, 4)));
	exportArray.push(parseInt(soundData[0][4].path.slice(4, 6)));
	exportArray.push(parseInt(soundData[0][4].path.slice(6, 8)));
	exportArray.push(parseInt(soundData[0][4].path.slice(8, 10)));
	exportArray.push(parseInt(soundData[0][4].path.slice(10, 12)));

	exportArray.push(parseInt(soundData[0][5].path.slice(0, 2)));
	exportArray.push(parseInt(soundData[0][5].path.slice(2, 4)));
	exportArray.push(parseInt(soundData[0][5].path.slice(4, 6)));
	exportArray.push(parseInt(soundData[0][5].path.slice(6, 8)));
	exportArray.push(parseInt(soundData[0][5].path.slice(8, 10)));
	exportArray.push(parseInt(soundData[0][5].path.slice(10, 12)));

	for (var x = 0; x < 6; x++) {
		//for each row
		if (rowArray[x] != undefined) {

			exportArray.push(x);
			exportArray.push(rowArray[x].category);
			exportArray.push(rowArray[x].instrument);
			exportArray.push(rowArray[x].type);
			exportArray.push(rowArray[x].volume);
			exportArray.push(rowArray[x].muted);

			var numberOfActive = 0;
			for (var y = 0; y < noteArray[x].length; y++) {
				if (noteArray[x][y].active) {
					exportArray.push(y);
					numberOfActive++;
				}
			}

			exportArray.push(numberOfActive);
		}
	}
	console.log("exportArray", exportArray);

	return btoa(String.fromCharCode.apply(null, new Uint8Array(exportArray)));
}

function generatePartialString (){
	var exportArray = [];

	for (var x = 0; x < 6; x++) {
		//for each row
		if (rowArray[x] != undefined) {

			exportArray.push(x);
			exportArray.push(rowArray[x].category);
			exportArray.push(rowArray[x].instrument);
			exportArray.push(rowArray[x].type);

			var numberOfActive = 0;
			for (var y = 0; y < noteArray[x].length; y++) {
				if (noteArray[x][y].active) {
					exportArray.push(y);
					numberOfActive++;
				}
			}

			exportArray.push(numberOfActive);
		}
	}

	return btoa(String.fromCharCode.apply(null, new Uint8Array(exportArray)));
}

function generateVolumeString (){
	var exportArray = [];

	for (var x = 0; x < 6; x++) {
		//for each row
		if (rowArray[x] != undefined) {

			exportArray.push(x);
			exportArray.push(rowArray[x].volume);
			exportArray.push(rowArray[x].muted);
		}
	}

	return btoa(String.fromCharCode.apply(null, new Uint8Array(exportArray)));
}

G["main"]["shareBtn"].on("mousedown", function (evt) {
	G["popupMC"]["shareBG"].visible = true;
	G["popupMC"]["saveBG"].visible = false;
	G["popupMC"]["leftPBtn"].visible = true;
	G["popupMC"]["rightPBtn"].visible = true;
	G["popupMC"]["saveBG"]["trackBtn0"].visible = false;
	G["popupMC"]["saveBG"]["trackBtn1"].visible = false;
	G["popupMC"]["saveBG"]["trackBtn2"].visible = false;
	G["popupMC"]["saveBG"]["trackBtn3"].visible = false;
	G["popupMC"]["saveBG"]["trackBtn4"].visible = false;

	G["popupMC"]["shareBG"]["txt"].text = "Anyone can play your mix using this link! Your copy will not be affected if they edit your mix."

	window["$"]("#inutText").val("https://" + hostname + "/imixer/?track=" + generateMusicString());
	G["popupMC"]["rightPTxt"].text = "Cancel";
	G["popupMC"]["leftPTxt"].text = "Copy";
	G["popupMC"].visible = true;
	document.getElementById("inutText").style.visibility = "visible";
	document.getElementById("inutText").style.wordWrap = "break-word";
	//var decodedRawArray = Uint8Array.from(atob(b64encoded), c => c.charCodeAt(0));

	createjs.Sound.play("click");
});

G["main"]["loadBtn"].on("mousedown", function (evt) {
	document.getElementById("inutText").style.visibility = "hidden";
	G["popupMC"]["saveBG"].visible = true;
	G["popupMC"]["shareBG"].visible = false;
	G["popupMC"]["leftPBtn"].visible = false;
	G["popupMC"]["rightPBtn"].visible = false;
	G["popupMC"]["saveBG"]["trackBtn0"].visible = true;
	G["popupMC"]["saveBG"]["trackBtn1"].visible = true;
	G["popupMC"]["saveBG"]["trackBtn2"].visible = true;
	G["popupMC"]["saveBG"]["trackBtn3"].visible = true;
	G["popupMC"]["saveBG"]["trackBtn4"].visible = true;

	G["popupMC"]["saveBG"]["txt"].text = "Load a saved track";
	G["popupMC"]["rightPTxt"].text = "";
	G["popupMC"]["leftPTxt"].text = "";
	G["popupMC"].visible = true;

	createjs.Sound.play("click");
});

G["popupMC"]["shareBG"].on("pressmove", function (evt) {
	G["popupMC"].x = (popupWidth - buttonXOffset) + (evt.stageX / stage.scaleX);
	G["popupMC"].y = (popupHeight - buttonYOffset) + (evt.stageY / stage.scaleX);
});

G["popupMC"]["shareBG"].on("mousedown", function (evt) {
	buttonXOffset = (evt.stageX / stage.scaleX) - (G["popupMC"].x - popupWidth);
	buttonYOffset = (evt.stageY / stage.scaleX) - (G["popupMC"].y - popupHeight);
	G.setChildIndex(G["popupMC"], G.getNumChildren() - 1);
})

G["popupMC"]["saveBG"]["saveDrag"].on("pressmove", function (evt) {
	G["popupMC"].x = (popupWidth - buttonXOffset) + (evt.stageX / stage.scaleX);
	G["popupMC"].y = (popupHeight - buttonYOffset) + (evt.stageY / stage.scaleX);
});

G["popupMC"]["saveBG"]["saveDrag"].on("mousedown", function (evt) {
	buttonXOffset = (evt.stageX / stage.scaleX) - (G["popupMC"].x - popupWidth);
	buttonYOffset = (evt.stageY / stage.scaleX) - (G["popupMC"].y - popupHeight);
	G.setChildIndex(G["popupMC"], G.getNumChildren() - 1);
})


G["popupMC"]["closeBtn"].on("mousedown", function (evt) {
	document.getElementById("inutText").style.visibility = "hidden";
	G["popupMC"].visible = false;

	createjs.Sound.play("click");
});
G["popupMC"]["rightPBtn"].on("mousedown", function (evt) {
	document.getElementById("inutText").style.visibility = "hidden";
	G["popupMC"].visible = false;

	createjs.Sound.play("click");
});

G["instrumentThemeBtn0"].on("mousedown", function (evt) {
	changeThemeDown(0, evt);
});
G["instrumentThemeBtn1"].on("mousedown", function (evt) {
	changeThemeDown(1, evt);
});
G["instrumentThemeBtn2"].on("mousedown", function (evt) {
	changeThemeDown(2, evt);
});
G["instrumentThemeBtn3"].on("mousedown", function (evt) {
	changeThemeDown(3, evt);
});
G["instrumentThemeBtn4"].on("mousedown", function (evt) {
	changeThemeDown(4, evt);
});
G["instrumentThemeBtn5"].on("mousedown", function (evt) {
	changeThemeDown(5, evt);
});
G["instrumentThemeBtn6"].on("mousedown", function (evt) {
	changeThemeDown(6, evt);
});
G["instrumentThemeBtn7"].on("mousedown", function (evt) {
	changeThemeDown(7, evt);
});


G["main"]["clearBtn"].on("mousedown", function (evt) {
	playbackStop();
	clearAll();
	createjs.Sound.play("click");
});
G["main"]["backBtn"].on("mousedown", function (evt) {
	openStartPage();
});



G["row0"].name = "row0";
G["row1"].name = "row1";
G["row2"].name = "row2";
G["row3"].name = "row3";
G["row4"].name = "row4";
G["row5"].name = "row5";


G["row0"].on("pressmove", function (evt) {
	rowMouseDown(0, evt);
});
G["row1"].on("pressmove", function (evt) {
	rowMouseDown(1, evt);
});
G["row2"].on("pressmove", function (evt) {
	rowMouseDown(2, evt);
});
G["row3"].on("pressmove", function (evt) {
	rowMouseDown(3, evt);
});
G["row4"].on("pressmove", function (evt) {
	rowMouseDown(4, evt);
});
G["row5"].on("pressmove", function (evt) {
	rowMouseDown(5, evt);
});

G["row0"].on("mousedown", function (evt) {
	rowMouseDownClick(0, evt);
});
G["row1"].on("mousedown", function (evt) {
	rowMouseDownClick(1, evt);
});
G["row2"].on("mousedown", function (evt) {
	rowMouseDownClick(2, evt);
});
G["row3"].on("mousedown", function (evt) {
	rowMouseDownClick(3, evt);
});
G["row4"].on("mousedown", function (evt) {
	rowMouseDownClick(4, evt);
});
G["row5"].on("mousedown", function (evt) {
	rowMouseDownClick(5, evt);
});

G["row0"].on("mouseover", function (evt) {
	//mouseOverRow(0);
});
G["row1"].on("mouseover", function (evt) {
	//mouseOverRow(1);
});
G["row2"].on("mouseover", function (evt) {
	//mouseOverRow(2);
});
G["row3"].on("mouseover", function (evt) {
	//mouseOverRow(3);
});
G["row4"].on("mouseover", function (evt) {
	//mouseOverRow(4);
});
G["row5"].on("mouseover", function (evt) {
	//mouseOverRow(5);
});




G["instrumentBtn0"].tx = G["instrumentBtn0"].x;
G["instrumentBtn0"].ty = G["instrumentBtn0"].y;

G["instrumentBtn1"].tx = G["instrumentBtn1"].x;
G["instrumentBtn1"].ty = G["instrumentBtn1"].y;

G["instrumentBtn2"].tx = G["instrumentBtn2"].x;
G["instrumentBtn2"].ty = G["instrumentBtn2"].y;

G["instrumentBtn3"].tx = G["instrumentBtn3"].x;
G["instrumentBtn3"].ty = G["instrumentBtn3"].y;

G["instrumentBtn4"].tx = G["instrumentBtn4"].x;
G["instrumentBtn4"].ty = G["instrumentBtn4"].y;

G["instrumentBtn5"].tx = G["instrumentBtn5"].x;
G["instrumentBtn5"].ty = G["instrumentBtn5"].y;


G["instrumentBtn0"].name = 0;
G["instrumentBtn1"].name = 1;
G["instrumentBtn2"].name = 2;
G["instrumentBtn3"].name = 3;
G["instrumentBtn4"].name = 4;
G["instrumentBtn5"].name = 5;

G["instrumentBtn0"].on("mousedown", instrumentBtnMousedown);
G["instrumentBtn1"].on("mousedown", instrumentBtnMousedown);
G["instrumentBtn2"].on("mousedown", instrumentBtnMousedown);
G["instrumentBtn3"].on("mousedown", instrumentBtnMousedown);
G["instrumentBtn4"].on("mousedown", instrumentBtnMousedown);
G["instrumentBtn5"].on("mousedown", instrumentBtnMousedown);

G["instrumentBtn0"].on("pressmove", instrumentBtnPressmove);
G["instrumentBtn1"].on("pressmove", instrumentBtnPressmove);
G["instrumentBtn2"].on("pressmove", instrumentBtnPressmove);
G["instrumentBtn3"].on("pressmove", instrumentBtnPressmove);
G["instrumentBtn4"].on("pressmove", instrumentBtnPressmove);
G["instrumentBtn5"].on("pressmove", instrumentBtnPressmove);

G["instrumentBtn0"].on("pressup", instrumentBtnPressup);
G["instrumentBtn1"].on("pressup", instrumentBtnPressup);
G["instrumentBtn2"].on("pressup", instrumentBtnPressup);
G["instrumentBtn3"].on("pressup", instrumentBtnPressup);
G["instrumentBtn4"].on("pressup", instrumentBtnPressup);
G["instrumentBtn5"].on("pressup", instrumentBtnPressup);

var tabRow = 0;
var oldRow = 0;
var customInstrumentSelected = 0;

function instrumentBtnMousedown(evt) {
	tabRow = 0;
	oldRow = -1;

	var n = evt.currentTarget.name;

	//remember which new instrument we selected
	activeInstrumentBtn = n;

	//stop sounds
	if(!playMixEnabled){
		createjs.Sound.stop();
	}
	//play preview 
	var instance = createjs.Sound.play(instrumentButtonArray[activeInstrumentBtn].path);
	G["instrumentBtn0"]["instrumentOutline"].visible = false;
	G["instrumentBtn1"]["instrumentOutline"].visible = false;
	G["instrumentBtn2"]["instrumentOutline"].visible = false;
	G["instrumentBtn3"]["instrumentOutline"].visible = false;
	G["instrumentBtn4"]["instrumentOutline"].visible = false;
	G["instrumentBtn5"]["instrumentOutline"].visible = false;
	G["instrumentBtn" + n]["instrumentOutline"].visible = true;

	//get duration
	if (instance.getDuration() < 3000) {
		//save for populateRow
		activeInsturmentType = 1;
	} else {
		activeInsturmentType = 2;
	}

	buttonXOffset = (evt.stageX / stage.scaleX) - (G["instrumentBtn" + n].x - buttonWidth);
	buttonYOffset = (evt.stageY / stage.scaleX) - (G["instrumentBtn" + n].y - buttonHeight);
	G.setChildIndex(G["instrumentBtn" + n], G.getNumChildren() - 1);

	if(currentTheme == 0){
		customInstrumentSelected = n;
		G["main"]["recWindow"].visible = true;
		G["main"]["recWindow"]["txt"].text = "Editing Recording " + (n+1);
	}
}

function instrumentBtnPressmove(evt) {
	var n = evt.currentTarget.name;

	G["instrumentBtn" + n].x = (buttonWidth - buttonXOffset) + (evt.stageX / stage.scaleX);
	G["instrumentBtn" + n].y = (buttonHeight - buttonYOffset) + (evt.stageY / stage.scaleX);

	var found = stage.getObjectUnderPoint((evt.stageX / stage.scaleX), (evt.stageY / stage.scaleY), 0);

	if(found.parent.name != null && found.parent.name.length > 1 && activeInstrumentBtn != null){
		tabRow = found.parent.name.charAt(3);
	}else{
		tabRow = -1;
	}

	//update texts
	for (i = 0; i <= 5; i++) {
		if(i != tabRow){
			if (rowArray[i] != null) {
				G["main"]["rowTxt" + i].text = rowArray[i].text;
			} else {
				G["main"]["rowTxt" + i].text = "Empty";
			}
			//G["tabEffect" + i].gotoAndStop(0);
		}
	}
	//if on row
	if(tabRow != -1){
		if(tabRow != oldRow){
			//animate row
			G["tabEffect" + tabRow].alpha = 0.3;
			//update row text temporarily
			G["main"]["rowTxt" + tabRow].text = instrumentButtonArray[activeInstrumentBtn].text;
			//remember which row we are on
			activeInsturmentRow = tabRow;
		}
	}else{
		activeInsturmentRow = null;
		//G["tabEffect" + i].gotoAndStop(0);
	}
	oldRow = tabRow;
};

function instrumentBtnPressup(evt) {
	var n = evt.currentTarget.name;


	G["instrumentBtn" + n].x = G["instrumentBtn" + n].tx;
	G["instrumentBtn" + n].y = G["instrumentBtn" + n].ty;
	tabRow = -1;

	//if mouse never left the row on release
	if (activeInsturmentRow != null) {
		//G["tabEffect" + activeInsturmentRow].gotoAndPlay(15);
		createjs.Sound.stop();
		//populate row
		populateRow(activeInsturmentRow,
			instrumentButtonArray[activeInstrumentBtn].category,
			instrumentButtonArray[activeInstrumentBtn].instrument,
			activeInsturmentType,
			100,
			false);
		activeInsturmentRow = null;
	}

	activeInstrumentBtn = null;
}

function alphaRows() {
	for (i = 0; i <= 5; i++) {
		if(i != tabRow){
			if(G["tabEffect" + i].alpha > 0){
				G["tabEffect" + i].alpha -= 0.02;
			}
		}
	}
}