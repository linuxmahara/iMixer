var gameOpen = localStorage.getItem('OPEN');

function rowPreviewDown(evt) {
	var row = evt.currentTarget.name;
	if(!playMixEnabled){
		createjs.Sound.stop();
	}
	if (rowArray[row] != undefined) {
		createjs.Sound.play(rowArray[row].path, {
			volume: rowArray[row].volume / 100
		});
	}
}

window.onstorage = function(e) {
	if(e.key == 'OPEN'){
		gameOpen = e.newValue;
	}
};

function storedTrackBtnDown(evt) {
	var row = evt.currentTarget.name;
	themePageOffset = 0;
	G["instrumentThemeBtn" + currentTheme]["bg"].visible = false;
	currentTheme = row;
	G["instrumentThemeBtn" + currentTheme]["bg"].visible = true;

	//G["start"]["themeBtn" + row].alpha = 1;
	if(myTrackArray[row].trackString == ""){
		closeStartPage();
	}else{
		loadMix(myTrackArray[row].trackString);
	}
}
function storedTrackBtnOver(evt) {
	var row = evt.currentTarget.name;
	G["start"]["storedTrackBtn" + row].alpha = 0.5;
}
function storedTrackBtnOut(evt) {
	var row = evt.currentTarget.name;
	G["start"]["storedTrackBtn" + row].alpha = 1;
}


function saveMix(trackName) {
	G["popupMC"]["leftPBtn"].visible = false;
	G["popupMC"]["rightPBtn"].visible = false;
	G["popupMC"]["rightPTxt"].text = "";
	G["popupMC"]["leftPTxt"].text = "";
	G["popupMC"]["saveBG"]["txt"].text = "Saving...";

	localStorage.setItem(myAccount + "trackName" + savingTrackNumber, trackName);
	localStorage.setItem(myAccount + "trackString" + savingTrackNumber, generateMusicString());

    myTrackArray[savingTrackNumber] = {
		trackName: trackName,
		trackString: generateMusicString(),
		trackDate: 0
	};

	G["popupMC"]["saveBG"]["txt"].text = 'Saved "' + trackName + '"!';
	G["start"]["storedTrackBtn" + savingTrackNumber]["txt"].text = trackName;
	G["popupMC"]["saveBG"]["trackBtn" + savingTrackNumber]["txt"].text = trackName;
	G["popupMC"]["leftPBtn"].visible = true;
	G["popupMC"]["rightPBtn"].visible = false;
	G["popupMC"]["rightPTxt"].text = "";
	G["popupMC"]["leftPTxt"].text = "OK";
}

function loadMix(mix) {
	try {

		//console.log("decodedArray1", mix)
		var decodedArray = Uint8Array.from(atob(mix), c => c.charCodeAt(0));
		//console.log(decodedArray);

	} catch (e) {
		//console.log(e);
		// something failed

		// if you want to be specific and only catch the error which means
		// the base 64 was invalid, then check for 'e.code === 5'.
		// (because 'DOMException.INVALID_CHARACTER_ERR === 5')
	}

	//console.log("decodedArray", decodedArray);

	var decodedArray = Object.values(decodedArray);

	var firstElements = decodedArray.splice(0, 36);

	//console.log("firstElements", firstElements);
	//console.log("decodedArray2", decodedArray);


	for (var i = 0; i < 6; i++) {
		var in1 = firstElements[i*6+0].toString();
		var in2 = firstElements[i*6+1].toString();
		var in3 = firstElements[i*6+2].toString();
		var in4 = firstElements[i*6+3].toString();
		var in5 = firstElements[i*6+4].toString();
		var in6 = firstElements[i*6+5].toString();

		//console.log(in1);
		//console.log(in2);
		//console.log(in3);
		//console.log(in4);
		//console.log(in5);
		//console.log(in6);

		if(in1.length==1){in1 = "0" + in1};
		if(in2.length==1){in2 = "0" + in2};
		if(in3.length==1){in3 = "0" + in3};
		if(in4.length==1){in4 = "0" + in4};
		if(in5.length==1){in5 = "0" + in5};
		if(in6.length==1){in6 = "0" + in6};

		var customInstrumentString = in1 + in2 + in3 + in4 + in5 + in6;
		createjs.Sound.alternateExtensions = ["mp3"];
    	createjs.Sound.registerSound({id:customInstrumentString, src:"loops/" + customInstrumentString + ".mp3"});
		//console.log(0, i, customInstrumentString);
		soundData[0][i].path = customInstrumentString;
	}
	playbackStop();
	closeStartPage()

	parseRow(decodedArray.length - 1, decodedArray);
}

function parseRow(endOfRow, decodedArray) {
	//console.log("decodedArray3", decodedArray)

	var numberOfTabs = decodedArray[endOfRow];
	var startOfTabs = endOfRow - numberOfTabs;

	var row = decodedArray[endOfRow - numberOfTabs - 6];//6
	if (row != undefined) {
		//console.log("row", row);
		//console.log("category", decodedArray[endOfRow - numberOfTabs - 11]);
		//console.log("instrument", decodedArray[endOfRow - numberOfTabs - 10]);
		//console.log("type", decodedArray[endOfRow - numberOfTabs - 9]);
		//console.log("volume", decodedArray[endOfRow - numberOfTabs - 8]);
		//console.log("muted", decodedArray[endOfRow - numberOfTabs - 7]);
    	//instrumentButtonArray[row].path = customInstrumentString;


		//console.log("customInstrumentString", customInstrumentString)

		populateRow(row,
			decodedArray[endOfRow - numberOfTabs - 5],
			decodedArray[endOfRow - numberOfTabs - 4],
			decodedArray[endOfRow - numberOfTabs - 3],
			decodedArray[endOfRow - numberOfTabs - 2],
			decodedArray[endOfRow - numberOfTabs - 1]);


		for (var i = startOfTabs; i < endOfRow; i++) {
			//console.log("column", decodedArray[i]);

			var tempGraphic = "";
			var bitmapWidth = 35.5;
			var multiplier = 1;

			if (rowArray[row].type == 1) {
				tempGraphic = new lib["halfTabG"]();
				tempGraphic.filters = doColorFilter(rowArray[row].category*15 + rowArray[row].instrument);
				tempGraphic.cache(0, 0, 35, 70);
				bitmapWidth = 35.5;
				multiplier = 1;
			} else {
				tempGraphic = new lib["fullTabG"]();
				tempGraphic.filters = doColorFilter(rowArray[row].category*15 + rowArray[row].instrument);
				tempGraphic.cache(0, 0, 70, 70);
				bitmapWidth = 71;
				multiplier = 2;
			}

			var column = decodedArray[i];

			noteArray[row][column].active = true;
			G["main"].addChild(tempGraphic);
			tempGraphic.x = ((column / multiplier) * bitmapWidth) + 290;
			tempGraphic.y = row * 77 + 190;
			noteArray[row][column].graphic = tempGraphic;


		}

		if (endOfRow - numberOfTabs - 7 > 0) {//7
			parseRow(endOfRow - numberOfTabs - 7, decodedArray);//7
		}
	}
}

function changeThemeDown(row, evt) {
	createjs.Sound.stop();
	G["instrumentBtn0"]["instrumentOutline"].visible = false;
	G["instrumentBtn1"]["instrumentOutline"].visible = false;
	G["instrumentBtn2"]["instrumentOutline"].visible = false;
	G["instrumentBtn3"]["instrumentOutline"].visible = false;
	G["instrumentBtn4"]["instrumentOutline"].visible = false;
	G["instrumentBtn5"]["instrumentOutline"].visible = false;

	themePageOffset = 0;
	G["instrumentThemeBtn" + currentTheme]["bg"].visible = false;
	currentTheme = row;
	G["instrumentThemeBtn" + currentTheme]["bg"].visible = true;
	updateTheme();

	if(row == 0){
		startListening();
	}else{
		G["main"]["recWindow"].visible = false;
	}

	createjs.Sound.play("click");
}
function themeBtnDown(evt) {
	var row = evt.currentTarget.name;
	themePageOffset = 0;
	G["instrumentThemeBtn" + currentTheme]["bg"].visible = false;
	currentTheme = row;
	G["instrumentThemeBtn" + currentTheme]["bg"].visible = true;

	//G["start"]["themeBtn" + row].alpha = 1;
	loadMix("AAAAAWQAAAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8gAQAIAjkAAgQGCAoMDhASFBYYGhwOAgAEAhoABggKDBIUFhgIAwYCAVwABgoOEhYaBgQEAwFgAA4PEBEaGxwdHh8KBQEEAQUADxEbHQQ=");
}
function themeBtnOver(evt) {
	var row = evt.currentTarget.name;
	G["start"]["themeBtn" + row].alpha = 0.5;
}
function themeBtnOut(evt) {
	var row = evt.currentTarget.name;
	G["start"]["themeBtn" + row].alpha = 1;
}


function rowMouseDownClick(row, evt) {
	if (noteArray[row].length > 0) {
		var tempX = (evt.stageX / stage.scaleX) - 290;
		if (tempX >= 0 && tempX <= 1134) {
			var tempGraphic = "";
			var bitmapWidth = 35.5;
			var multiplier = 1;

			if (rowArray[row].type == 1) {
				tempGraphic = new lib["halfTabG"]();
				tempGraphic.filters = doColorFilter(rowArray[row].category*15 + rowArray[row].instrument);
				tempGraphic.cache(0, 0, 35, 70);
				bitmapWidth = 35.5;
				multiplier = 1;
			} else {
				tempGraphic = new lib["fullTabG"]();
				tempGraphic.filters = doColorFilter(rowArray[row].category*15 + rowArray[row].instrument);
				tempGraphic.cache(0, 0, 70, 70);
				bitmapWidth = 71;
				multiplier = 2;
			}


			var column = Math.floor(tempX / bitmapWidth);
			var dataColumn = column * multiplier;

			if (noteArray[row][dataColumn].active) {
				noteArray[row][dataColumn].active = false;
				tabAction = "deactivating";
				G["main"].removeChild(noteArray[row][dataColumn].graphic);
			} else {
				noteArray[row][dataColumn].active = true;
				tabAction = "activating";
				G["main"].addChild(tempGraphic);
				tempGraphic.x = (column * bitmapWidth) + 290;
				tempGraphic.y = row * 77 + 190;
				noteArray[row][dataColumn].graphic = tempGraphic;
			}
		}
	}
}

function rowMouseDown(row, evt) {
	if (noteArray[row].length > 0) {
		var tempX = (evt.stageX / stage.scaleX) - 290;
		if (tempX >= 0 && tempX <= 1134) {

			var tempGraphic = "";
			var bitmapWidth = 35.5;
			var multiplier = 1;

			if (rowArray[row].type == 1) {
				tempGraphic = new lib["halfTabG"]();
				tempGraphic.filters = doColorFilter(rowArray[row].category*15 + rowArray[row].instrument);
				tempGraphic.cache(0, 0, 35, 70);
				bitmapWidth = 35.5;
				multiplier = 1;
			} else {
				tempGraphic = new lib["fullTabG"]();
				//console.log(rowArray[row].category, rowArray[row].instrument, rowArray[row].category*15 + rowArray[row].instrument);
				tempGraphic.filters = doColorFilter(rowArray[row].category*15 + rowArray[row].instrument);
				tempGraphic.cache(0, 0, 70, 70);
				bitmapWidth = 71;
				multiplier = 2;
			}

			var column = Math.floor(tempX / bitmapWidth);
			var dataColumn = column * multiplier;

			if (tabAction == "deactivating" && noteArray[row][dataColumn].active) {
				noteArray[row][dataColumn].active = false;
				G["main"].removeChild(noteArray[row][dataColumn].graphic);
			} else if (tabAction != "deactivating" && !noteArray[row][dataColumn].active) {
				noteArray[row][dataColumn].active = true;
				G["main"].addChild(tempGraphic);
				tempGraphic.x = (column * bitmapWidth) + 290;
				tempGraphic.y = row * 77 + 190;
				noteArray[row][dataColumn].graphic = tempGraphic;
			}
		}
	}
}