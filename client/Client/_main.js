document.getElementById("inutText").style.visibility = "hidden";
var G = this;

createjs.Touch.enable(stage);
stage.enableMouseOver(10);
stage.mouseMoveOutside = true;
stage.preventSelection = false;
G.snapToPixel = true;

const ID = stage.id;
const Legacy = stage.legacy;
const hostname = window.location.hostname;
var currentTheme = 1;
var themePageOffset = 0;
var spriteX = 290;
var savingTrackNumber = 0;
var noteArray = [
	[],
	[],
	[],
	[],
	[],
	[]
];
var myTrackArray = [
	[],
	[],
	[],
	[],
	[]
];
var rowArray = [];
var phpSave = new XMLHttpRequest();
var screenSave = new XMLHttpRequest();

var saveURL = "php/saveTrack.php";

var instrumentButtonArray = new Array(5);
var millisecondsElapsed = 0;
var millisecondsElapsed2 = 0;
var myVar;
var playColumn = 0;
var startColumn = 0;
var playMixEnabled = false;
var tempTime = "";
var tempTime2 = "";
var tempTimeLength = 0;
var tempTimeLength2 = 0;
var perfOffset = 0;
var perfOffset2 = 0;
var superOffset = 0;
var superOffset2 = 0;
var perfDifference = 0;
var perfDifference2 = 0;
var firstPlay = true;
var firstPlay2 = true;
var time = 0;
var time2 = 0;
var tabAction = "activating";
var activeInstrumentBtn = null;
var activeInsturmentRow = null;
var activeInsturmentType = 1;
var movingPlayhead = false;
var playheadStartX = 283;

G["instrumentThemeBtn0"]["txt"].text = "Custom";
G["instrumentThemeBtn1"]["txt"].text = "Bass";
G["instrumentThemeBtn2"]["txt"].text = "Drums";
G["instrumentThemeBtn3"]["txt"].text = "Keyboards";
G["instrumentThemeBtn4"]["txt"].text = "Strings";
G["instrumentThemeBtn5"]["txt"].text = "Synth";
G["instrumentThemeBtn6"]["txt"].text = "Winds";
G["instrumentThemeBtn7"]["txt"].text = "Vocal";


const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const urlTrack = urlParams.get('track')

//G["main"].visible = true;




updateTheme();

for (var i = 0; i < 6; i++) {
	if (i < 6) {
		G["main"]["rowTxt" + i].text = "Empty";
		clearRow(i);
		G["tabEffect" + i].alpha = 0;
	}
}

rowArray.length = 0;

G["instrumentThemeBtn" + currentTheme]["bg"].visible = true;



if(urlTrack != null){


	loadMix(urlTrack);
	G["instrumentThemeBtn" + currentTheme]["bg"].visible = true;
}else{
	openStartPage();
}


function doColorFilter(color) {
	var sRgb = rgbColors[color].split(",");

	var redMultiplier = sRgb[0] / 256;
	var greenMultiplier = sRgb[1] / 256;
	var blueMultiplier = sRgb[2] / 256;
	var alphaMultiplier = 1;
	var redOffset = 0;
	var greenOffset = 0;
	var blueOffset = 0;
	var alphaOffset = 0;

	var filter = new createjs.ColorFilter(
		redMultiplier,
		greenMultiplier,
		blueMultiplier,
		alphaMultiplier,
		redOffset,
		greenOffset,
		blueOffset,
		alphaOffset);

	return [filter];
	//testColorList();
};


phpSave.onreadystatechange = function () {
	if (this.readyState == 4 && this.status == 200) {
		savedSong(this.responseText);
	}
}

function savedSong(theData) {
	if(theData == "guest"){
		G["popupMC"]["saveBG"]["txt"].text = "You must be logged in to save tracks!";
	}else if(theData == "fail"){
		G["popupMC"]["saveBG"]["txt"].text = 'Save Failed! :(';
	}else if(theData == ""){
		G["popupMC"]["saveBG"]["txt"].text = 'Save Failed. Track not acceptable.';
	}else{
		var theData = theData.split("\0");
		var savedTrackNumber = parseInt(theData[0]);
	    var savedTrackName = theData[1].replace(/\\(.)/mg, "$1");
	    var savedTrackString = theData[2];

		if(gameOpen == 1){
			localStorage.setItem('SAVE', [savedTrackNumber, Date.now()]);
		}

	    myTrackArray[savedTrackNumber] = {
			trackName: savedTrackName,
			trackString: savedTrackString,
			trackDate: 0
		};

		G["popupMC"]["saveBG"]["txt"].text = 'Saved "' + savedTrackName + '"!';
		G["start"]["storedTrackBtn" + savedTrackNumber]["txt"].text = savedTrackName;
		G["popupMC"]["saveBG"]["trackBtn" + savedTrackNumber]["txt"].text = savedTrackName;
		G["popupMC"]["leftPBtn"].visible = true;
		G["popupMC"]["rightPBtn"].visible = false;
		G["popupMC"]["rightPTxt"].text = "";
		G["popupMC"]["leftPTxt"].text = "OK";
	}
}


function clearAll() {
	for (var i = 0; i < 6; i++) {
		G["main"]["rowTxt" + i].text = "Empty";
		clearRow(i);
	}
	rowArray.length = 0;
}


function updateTheme() {
	var tempGraphic = "";
	G["main"]["recWindow"].visible = false;
	
	for (var i = 0; i < 6; i++) {
		var ti = i + themePageOffset;
		if(instrumentButtonArray[i] != undefined && instrumentButtonArray[i].graphic != ""){
			G["instrumentBtn" + i].removeChild(instrumentButtonArray[i].graphic);
		}

		if(soundData[currentTheme].length > ti){
			if (typeof lib[soundData[currentTheme][ti].icon] == 'function') {
				tempGraphic = new lib[soundData[currentTheme][ti].icon]();
				G["instrumentBtn" + i].addChildAt(tempGraphic, 0);
				tempGraphic.x = 2;
				tempGraphic.y = -2;
			}else{
				tempGraphic = "";
			}

			instrumentButtonArray[i] = {
				category: currentTheme, //soundData[currentTheme][i].text,
				instrument: ti,
				text: soundData[currentTheme][ti].text,
				path: soundData[currentTheme][ti].path,
				graphic: tempGraphic
			};

			G["instrumentBtn" + i]["txt"].text = instrumentButtonArray[i].text;
			G["instrumentBtn" + i].visible = true;
		}else{
			G["instrumentBtn" + i].visible = false;
		}
	}
}

function openStartPage() {
	playbackStop();
	//G["main"].visible = false;
	//G["playHead"].visible = false;
	//G["instrumentThemeBtn0"].visible = false;
	G["start"].visible = true;
}

function closeStartPage() {
	G["start"].visible = false;
}

var currentlyRecording = false;

function recordTick() {
	//console.log("tick");
	//every 2 seconds
	if(currentlyRecording){
		//console.log("currentlyRecording");
		if(firstPlay2 == true){
			superOffset2 = performance.now();
			firstPlay2 = false;
		}

		time2 = (performance.now() - superOffset2);
		//console.log("time2", time2);
		
		millisecondsElapsed2 = Math.floor(time2 / 10);
		tempTime2 = millisecondsElapsed2.toString();
		tempTimeLength2 = tempTime2.length;

		if(tempTimeLength2 < 2){
		  tempTime2 = "000" + tempTime2;
		}else if(tempTimeLength2 < 3){
		  tempTime2 = "00" + tempTime2;
		}else if(tempTimeLength2 < 4){
		  tempTime2 = "0" + tempTime2;
		}

		G["main"]["recWindow"]["txt"].text = tempTime2.slice(0, 2) + ":" + tempTime2.slice(2);
	}
}


function playMix() {
	//every 2 seconds
	alphaRows();

	if(playMixEnabled){
		if(firstPlay == true){
			superOffset = performance.now();
			perfOffset = superOffset;
		}

		time = (performance.now() - superOffset) + (startColumn * 2000);
		perfDifference = performance.now() - perfOffset;

		//if(perfDifference >= 1000){

		//}
		if (firstPlay == true || perfDifference >= 2000) {
			firstPlay = false;

			perfOffset += perfDifference;

			for (var i = 0; i < 6; i++) {
				if (noteArray[i].length > 0 && noteArray[i][playColumn] != undefined) {
					//if every other playColumn, or a 2 second note
					if (rowArray[i].muted == 0 && noteArray[i][playColumn].active) {
						console.log("playing", rowArray[i].path, rowArray[i].volume)
						createjs.Sound.play(rowArray[i].path, {
							volume: rowArray[i].volume / 100
						});
					}
				}
			}
			//playLocation

			if (playColumn < 32) {
				playColumn++;
			}
		}
		if (time < 64500) {
			millisecondsElapsed = Math.floor(time / 10);
			if(!movingPlayhead){
				G["playHead"].x = playheadStartX + (millisecondsElapsed * 0.1777); //0.165;
			}
			tempTime = millisecondsElapsed.toString();
			tempTimeLength = tempTime.length;

			if(tempTimeLength < 2){
			  tempTime = "000" + tempTime;
			}else if(tempTimeLength < 3){
			  tempTime = "00" + tempTime;
			}else if(tempTimeLength < 4){
			  tempTime = "0" + tempTime;
			}

			G["main"]["timeTxt"].text = "Elapsed time: " + tempTime.slice(0, 2) + ":" + tempTime.slice(2);
		}else {
			playbackStop();
		}

	}
}


function doTimers() {
	playMix();
	recordTick();
}
createjs.Ticker.addEventListener("tick", doTimers);

function playbackStop() {
	playMixEnabled = false;
	G["main"]["stopBtn"].visible = false;
	G["main"]["playBtn"].visible = true;
	createjs.Sound.stop();
	playColumn = 0;
	startColumn = 0;
	firstPlay = true;
	G["playHead"].x = playheadStartX;
	//millisecondsElapsed = 0;
	G["main"]["timeTxt"].text = "Elapsed time: 00:00";
}

G["main"]["playBtn"].on("click", function (evt) {
	G["main"]["playBtn"].visible = false;
	G["main"]["stopBtn"].visible = true;
	createjs.Sound.stop();
	createjs.Sound.play("click");
	playMixEnabled = true;
})
G["main"]["stopBtn"].on("click", function (evt) {
	playbackStop();
	createjs.Sound.play("click");
})


//1 = 2 second track
//2 = 4 second track

function populateRow(temprow, category, instrument, type, volume, muted) {

	clearRow(temprow);

	var bitmapWidth = 35.5;
	var maxTabs = 32;

	if (type == 1) {
		bitmapWidth = 35.5;
		maxTabs = 32;
	} else {
		bitmapWidth = 71;
		maxTabs = 16;
	}

	for (var i = 0; i < 32; i++) {
		if (i < maxTabs) {
			var tabBitmap = new lib["emptyTab" + type]();
			G["main"].addChild(tabBitmap);
			tabBitmap.x = spriteX;
			tabBitmap.y = temprow * 77 + 190;
		}

		noteArray[temprow][i] = {
			active: false,
			graphic: "",
			emptyGraphic: tabBitmap
		};

		spriteX += bitmapWidth;
	}

	var tempGraphic = "";

	if (typeof lib[soundData[category][instrument].icon] == 'function') {
		tempGraphic = new lib[soundData[category][instrument].icon]();
		G["main"].addChild(tempGraphic);//G["main"].addChildAt(tempGraphic, 0);
		tempGraphic.x = 197;//218;
		tempGraphic.y = temprow * 77 + 206;//204;
		tempGraphic.scaleX = tempGraphic.scaleY = 0.6;
	}else{
		tempGraphic = "";
	}


	rowArray[temprow] = {
		category: category,
		instrument: instrument,
		text: soundData[category][instrument].text,
		path: soundData[category][instrument].path,
		type: type,
		volume: volume,
		muted: muted,
		graphic: tempGraphic
	};
	

	if(muted == 1){
		G["volBtnOff" + temprow].visible = false;
		G["volBtnOn" + temprow].visible = true;
	}else{
		G["volBtnOn" + temprow].visible = false;
		G["volBtnOff" + temprow].visible = true;
	}

	G["volumeBtn" + temprow].x = (volume*1.38) + 40;

	G["main"]["rowTxt" + temprow].text = soundData[category][instrument].text;

	spriteX = 290;
}

function clearRow(row) {
	for (var i = 0; i < 32; i++) {
		if (noteArray[row][i] != undefined) {
			G["main"].removeChild(noteArray[row][i].emptyGraphic);
			if (noteArray[row][i].graphic != "") {
				G["main"].removeChild(noteArray[row][i].graphic);
			}
		}
	}
	G["volBtnOn" + row].visible = false;
	G["volBtnOff" + row].visible = true;
	G["volumeBtn" + row].x = 178;
	if(rowArray[row] != undefined && rowArray[row].graphic != ""){
		G["main"].removeChild(rowArray[row].graphic);
	}
	noteArray[row].length = 0;
	//rowArray[row] = 0;
}