const objectTape = document.getElementById("js_audio_player");

function addClickHandlers() {
  const svgTape = objectTape.contentDocument;

  const buttonBack = svgTape.getElementById("button_back");
  const buttonPlay = svgTape.getElementById("button_play");
  const buttonNext = svgTape.getElementById("button_next");
  const buttonStop = svgTape.getElementById("button_stop");

  buttonBack.addEventListener("click", function () {
    console.log("Back geklickt");
  });

  buttonPlay.addEventListener("click", function () {
    console.log("Play geklickt");
  });

  buttonNext.addEventListener("click", function () {
    console.log("Next geklickt");
  });

  buttonStop.addEventListener("click", function () {
    console.log("Stop geklickt");
  });
}

objectTape.addEventListener("load", addClickHandlers);