/* Das hier muss im SVG vor dem schließenden </g> des Elements mit der ID cicle_left bzw. circle_right */
/* <animateTransform id="rotation_left" attributeName="transform" type="rotate" from="0 114 217" to="360 114 217" dur="2s" repeatCount="indefinite" additive="sum" begin="indefinite"/> */
/* <animateTransform id="rotation_right" attributeName="transform" type="rotate" from="0 114 217" to="360 114 217" dur="2s" repeatCount="indefinite" additive="sum" begin="indefinite"/> */

document.addEventListener("DOMContentLoaded", function() {
  let objectTape = document.getElementById("js_audio_player");
  let svgTape = objectTape.contentDocument;

  let buttonBack = svgTape.getElementById("button_back");
  let buttonPlay = svgTape.getElementById("button_play");
  let buttonNext = svgTape.getElementById("button_next");
  let buttonStop = svgTape.getElementById("button_stop");

  let rotationLeft = svgTape.getElementById("rotation_left");
  let rotationRight = svgTape.getElementById("rotation_right");

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
    rotationLeft.endElement();
    rotationRight.endElement();
  });
});
