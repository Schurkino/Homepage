document.addEventListener("DOMContentLoaded", function() {
  const objectTape = document.getElementById("js_audio_player");
  const svgTape = objectTape.contentDocument;

  const buttonBack = svgTape.getElementById("button_back");
  const buttonPlay = svgTape.getElementById("button_play");
  const buttonNext = svgTape.getElementById("button_next");
  const buttonStop = svgTape.getElementById("button_stop");

  const circleLeft = svgTape.getElementById("rotation_left");
  const circleRight = svgTape.getElementById("rotation_right");

  buttonBack.addEventListener("click", function () {
    console.log("Back geklickt");
  });

  buttonPlay.addEventListener("click", function () {
      console.log("Play geklickt");
      rotationLeft.beginElement();
      rotationRight.beginElement();
  });

  buttonNext.addEventListener("click", function () {
    console.log("Next geklickt");
  });

  buttonStop.addEventListener("click", function () {
    console.log("Stop geklickt");
  });
});
