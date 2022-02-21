var recorder = "";
var recording = "";

async function startListening(){
  if ('MediaRecorder' in window) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false
        });
        const mimeType = 'audio/mpeg';
        let chunks = [];
        recorder = new MediaRecorder(stream, { type: mimeType });
        recorder.addEventListener('dataavailable', event => {
          if (typeof event.data === 'undefined') return;
          if (event.data.size === 0) return;
          chunks.push(event.data);
        });
        recorder.addEventListener('stop', () => {
          recording = new Blob(chunks, {
            type: mimeType
          });
          //renderRecording();
          chunks = [];
        });

      } catch {
        console.log('You denied access to the microphone so this demo will not work.');
      }
  } else {
    console.log("Sorry, your browser doesn't support the MediaRecorder API, so this demo will not work.");
  }
}

var startCountdown = -1;

G["main"]["recWindow"]["recBtn"].on("mousedown", function (evt) {
  G["main"]["recWindow"]["recBtn"].visible = false;
  G["main"]["recWindow"]["playRecBtn"].visible = false;
  G["main"]["recWindow"]["stopPlayBtn"].visible = false;
  G["main"]["recWindow"]["recStopBtn"].visible = true;
  createjs.Sound.stop();
  G["main"]["recWindow"]["txt"].text = "Get Ready! 4";
  startCountdown = 3;
})

G["main"]["recWindow"]["recStopBtn"].on("mousedown", function (evt) {
  G["main"]["recWindow"]["recBtn"].visible = true;
  G["main"]["recWindow"]["playRecBtn"].visible = true;
  G["main"]["recWindow"]["recStopBtn"].visible = false;
  G["main"]["recWindow"]["txt"].text = "Stopped Recording " + (customInstrumentSelected+1);
  startCountdown = -1;
  createjs.Sound.stop();
  recorder.stop();
  currentlyRecording = false;
})


var testAudio = new Audio();

testAudio.addEventListener("ended", function(){
    testAudio.currentTime = 0;
    G["main"]["recWindow"]["playRecBtn"].visible = true;
    G["main"]["recWindow"]["stopPlayBtn"].visible = false;
});

G["main"]["recWindow"]["playRecBtn"].on("mousedown", function (evt) {
  G["main"]["recWindow"]["playRecBtn"].visible = false;
  G["main"]["recWindow"]["stopPlayBtn"].visible = true;

  G["main"]["recWindow"]["txt"].text = "Recording " + (customInstrumentSelected+1);

  createjs.Sound.stop();
  //if recording button visible
    if(recorder.state != "inactive"){
      console.log("recorder", recorder);
      recorder.stop();
    }

    var soundURL = URL.createObjectURL(recording);

    testAudio.src = soundURL;

    //createjs.Sound.registerSound({src:testAudio, id:"newSound"});
    //createjs.Sound.play("newSound");
    testAudio.play();

    //createjs.Sound.play(window.audio.src);
    //createjs.Sound.play(window.audio);
})

G["main"]["recWindow"]["stopPlayBtn"].on("mousedown", function (evt) {
  G["main"]["recWindow"]["playRecBtn"].visible = true;
  G["main"]["recWindow"]["stopPlayBtn"].visible = false;
  createjs.Sound.stop();
  testAudio.pause();
  testAudio.currentTime = 0;
})

G["main"]["recWindow"]["saveLoopBtn"].on("mousedown", function (evt) {
  G["main"]["recWindow"]["playRecBtn"].visible = true;
  G["main"]["recWindow"]["stopPlayBtn"].visible = false;
  createjs.Sound.stop();
  testAudio.pause();
  testAudio.currentTime = 0;
    //console.log();
  var fd = new FormData();
  fd.append("audio",recording);
  saveMP3.open("POST", "php/saveLoop.php", true);
  saveMP3.send(fd);
})

var saveMP3 = new XMLHttpRequest();


var newLoopName = 0;

saveMP3.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    newLoopName = this.responseText;
    console.log(newLoopName);
    createjs.Sound.alternateExtensions = ["mp3"];
    createjs.Sound.registerSound({id:newLoopName, src:"loops/" + newLoopName + ".mp3"});

    soundData[0][customInstrumentSelected].path = newLoopName;
    instrumentButtonArray[customInstrumentSelected].path = newLoopName;

    for (var i = 0; i < 6; i++) {
        if(rowArray[i] != undefined && rowArray[i].category == 0 && rowArray[i].instrument == customInstrumentSelected){
          rowArray[i].path = newLoopName;
        }
    }
  }
}

createjs.Sound.on("fileload", handleFileLoad);
function handleFileLoad(event) {
    G["main"]["recWindow"]["txt"].text = "Recording " + (customInstrumentSelected+1) + " saved!"
    // A sound has been preloaded.
    console.log("Preloaded:", event.id, event.src, customInstrumentSelected);
    //createjs.Sound.play(event.id);
}


setInterval(oneSecondTimer, 1000);
function oneSecondTimer() {
  if(startCountdown >= 0){
    G["main"]["recWindow"]["txt"].text = "Get Ready! " + startCountdown;
    if(startCountdown == 0){
      console.log("recording now");
      recorder.start();
      firstPlay2 = true;
      currentlyRecording = true;
    }
    startCountdown--;
  }
}

