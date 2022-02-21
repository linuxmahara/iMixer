
var soundData = [];

var themeID = 0;
var soundTheme = "Custom";
soundData[themeID] = [];
for (i = 1; i < 7; i++) {
	soundData[themeID].push({
		text: "Recording " + i,
		beats: "4",
		icon: "vocal",
		path: "164537975654"
	});
}

themeID = 1;
soundTheme = "Bass";
soundData[themeID] = [];
for (i = 1; i < 13; i++) {
	soundData[themeID].push({
		text: "Bass " + i,
		beats: "4",
		icon: "bass",
		path: "bass2_" + i + "mp3"
	});
}

themeID = 2;
soundTheme = "Drums";
soundData[themeID] = [];
for (i = 1; i < 13; i++) {
	soundData[themeID].push({
		text: "Drum " + i,
		beats: "4",
		icon: "drums",
		path: "drums2_" + i + "mp3"
	});
}

themeID = 3;
soundTheme = "Keyboards";
soundData[themeID] = [];
for (i = 1; i < 9; i++) {
	soundData[themeID].push({
		text: "Keyboard " + i,
		beats: "4",
		icon: "keyboard",
		path: "keys2_" + i + "mp3"
	});
}

themeID = 4;
soundTheme = "Strings";
soundData[themeID] = [];
for (i = 1; i < 13; i++) {
	soundData[themeID].push({
		text: "Strings " + i,
		beats: "4",
		icon: "strings",
		path: "string2_" + i + "mp3"
	});
}

themeID = 5;
soundTheme = "Synth";
soundData[themeID] = [];
for (i = 1; i < 13; i++) {
	soundData[themeID].push({
		text: "Synth " + i,
		beats: "4",
		icon: "turntable",
		path: "synth2_" + i + "mp3"
	});
}

themeID = 6;
soundTheme = "Wind";
soundData[themeID] = [];
for (i = 1; i < 13; i++) {
	soundData[themeID].push({
		text: "Wind " + i,
		beats: "4",
		icon: "wind",
		path: "wind2_" + i + "mp3"
	});
}

themeID = 7;
soundTheme = "Vocal";
soundData[themeID] = [];
for (i = 1; i < 13; i++) {
	soundData[themeID].push({
		text: "Vocal " + i,
		beats: "4",
		icon: "vocal",
		path: "vocal2_" + i + "mp3"
	});
}
