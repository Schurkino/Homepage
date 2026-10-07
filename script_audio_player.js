/* Das hier muss im SVG vor dem schließenden </g> des Elements mit der ID cicle_left bzw. circle_right */
/* <animateTransform id="rotation_left" attributeName="transform" type="rotate" from="0 114 217" to="360 114 217" dur="2s" repeatCount="indefinite" additive="sum" begin="indefinite"/> */
/* <animateTransform id="rotation_right" attributeName="transform" type="rotate" from="0 114 217" to="360 114 217" dur="2s" repeatCount="indefinite" additive="sum" begin="indefinite"/> */

document.addEventListener("DOMContentLoaded", function () {
  let objectTape = document.getElementById("js_audio_player");
  let audioTag = document.getElementById("audio_tag");

  let trackPaths = [
    "audio/to the choir (the short start).mp3",
    "audio/forest.mp3",
    "audio/repetition.mp3"
  ];
  
  let currentTrackIndex = 0;

  audioTag.src = trackPaths[currentTrackIndex];

  function initAudioPlayer() {
    let svgTape = objectTape.contentDocument;

    let buttonBack = svgTape.getElementById("button_back");
    let buttonPlay = svgTape.getElementById("button_play");
    let buttonNext = svgTape.getElementById("button_next");
    let buttonStop = svgTape.getElementById("button_stop");

    let rotationLeft = svgTape.getElementById("rotation_left");
    let rotationRight = svgTape.getElementById("rotation_right");

    function changeTrack(step) {
      let wasPlaying = audioTag.paused === false;

      currentTrackIndex = currentTrackIndex + step;

      if (currentTrackIndex >= trackPaths.length) {
        currentTrackIndex = 0;
      }

      if (currentTrackIndex < 0) {
        currentTrackIndex = trackPaths.length - 1;
      }

      audioTag.src = trackPaths[currentTrackIndex];

      if (wasPlaying === true) {
        audioTag.play();
      }
    }

    buttonBack.addEventListener("click", function () {
      console.log("Back geklickt");
      changeTrack(-1);
    });

    buttonPlay.addEventListener("click", function () {
      console.log("Play geklickt");
      audioTag.play();
      rotationLeft.beginElement();
      rotationRight.beginElement();
    });

    buttonNext.addEventListener("click", function () {
      console.log("Next geklickt");
      changeTrack(1);
    });

    buttonStop.addEventListener("click", function () {
      console.log("Stop geklickt");
      audioTag.pause();
      audioTag.currentTime = 0;
      rotationLeft.endElement();
      rotationRight.endElement();
    });
  }

  function isSvgLoaded() {
    let svgTape = objectTape.contentDocument;

    if (svgTape === null) {
      return false;
    }

    return svgTape.getElementById("button_play") !== null;
  }

  if (isSvgLoaded() === true) {
    initAudioPlayer();
  } else {
    objectTape.addEventListener("load", initAudioPlayer);
  }
});
