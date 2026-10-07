/* Das hier muss im SVG vor dem schließenden </g> des Elements mit der ID cicle_left bzw. circle_right */
/* <animateTransform id="rotation_left" attributeName="transform" type="rotate" from="0 114 217" to="360 114 217" dur="2s" repeatCount="indefinite" additive="sum" begin="indefinite"/> */
/* <animateTransform id="rotation_right" attributeName="transform" type="rotate" from="0 114 217" to="360 114 217" dur="2s" repeatCount="indefinite" additive="sum" begin="indefinite"/> */

/* Wartet, bis das HTML-Dokument vollständig geladen ist, bevor der Code ausgeführt wird */
document.addEventListener("DOMContentLoaded", function () {
  /* object-Tag */
  let objectTag = document.getElementById("js_audio_player");
  /* audio-Tag */
  let audioTag = document.getElementById("audio_tag");

  /* Alle Mp3's als Array */
  let trackPaths = [
    "audio/to the choir (the short start).mp3",
    "audio/forest.mp3",
    "audio/repetition.mp3"
  ];

  /* Aktueller Track Index */
  let currentTrackIndex = 0;
  /* Setzt den ersten Track als Quelle des Audio-Tags */
  audioTag.src = trackPaths[currentTrackIndex];

  /* Initialisiert den Player: holt die Elemente aus dem SVG und verknüpft sie mit den Funktionen */
  function initAudioPlayer() {
    /* Zugriff auf das SVG-Dokument innerhalb des object-Tags */
    let svgTape = objectTag.contentDocument;

    /* Die vier Buttons im SVG */
    let buttonBack = svgTape.getElementById("button_back");
    let buttonPlay = svgTape.getElementById("button_play");
    let buttonNext = svgTape.getElementById("button_next");
    let buttonStop = svgTape.getElementById("button_stop");

    /* Die Rotations-Animationen der beiden Spulen */
    let rotationLeft = svgTape.getElementById("rotation_left");
    let rotationRight = svgTape.getElementById("rotation_right");

    /* Wechselt den Track: step = 1 für den nächsten, step = -1 für den vorherigen Track */
    function changeTrack(step) {
      /* Merkt sich, ob gerade Musik läuft, um nach dem Wechsel direkt weiterzuspielen */
      let wasPlaying = audioTag.paused === false;

      /* Index um den Schritt verändern */
      currentTrackIndex = currentTrackIndex + step;

      /* Nach dem letzten Track wieder zum ersten springen */
      if (currentTrackIndex >= trackPaths.length) {
        currentTrackIndex = 0;
      }

      /* Vor dem ersten Track zum letzten springen */
      if (currentTrackIndex < 0) {
        currentTrackIndex = trackPaths.length - 1;
      }

      /* Neuen Track als Quelle setzen */
      audioTag.src = trackPaths[currentTrackIndex];

      /* Wenn vorher Musik lief, den neuen Track automatisch abspielen */
      if (wasPlaying === true) {
        audioTag.play();
      }
    }

    /* Fügt einem Button einen Klick-Effekt hinzu (Button wird beim Drücken nach unten verschoben) */
    function addPressEffect(buttonElement) {
      /* Button nach unten verschieben */
      function pressButton() {
        buttonElement.style.translate = "0px 4px";
      }

      /* Button zurück an die Ausgangsposition setzen */
      function releaseButton() {
        buttonElement.style.translate = "0px 0px";
      }

      /* Drücken */
      buttonElement.addEventListener("pointerdown", pressButton);
      /* Loslassen, Verlassen des Buttons oder Abbruch der Eingabe */
      buttonElement.addEventListener("pointerup", releaseButton);
      buttonElement.addEventListener("pointerleave", releaseButton);
      buttonElement.addEventListener("pointercancel", releaseButton);
    }

    /* Klick-Effekt für alle vier Buttons aktivieren */
    addPressEffect(buttonBack);
    addPressEffect(buttonPlay);
    addPressEffect(buttonNext);
    addPressEffect(buttonStop);

    /* Back: zum vorherigen Track wechseln */
    buttonBack.addEventListener("click", function () {
      console.log("Back geklickt");
      changeTrack(-1);
    });

    /* Play: Audio abspielen und beide Spulen drehen lassen */
    buttonPlay.addEventListener("click", function () {
      console.log("Play geklickt");
      audioTag.play();
      rotationLeft.beginElement();
      rotationRight.beginElement();
    });

    /* Next: zum nächsten Track wechseln */
    buttonNext.addEventListener("click", function () {
      console.log("Next geklickt");
      changeTrack(1);
    });

    /* Stop: Audio pausieren, an den Anfang zurücksetzen und die Spulen anhalten */
    buttonStop.addEventListener("click", function () {
      console.log("Stop geklickt");
      audioTag.pause();
      audioTag.currentTime = 0;
      rotationLeft.endElement();
      rotationRight.endElement();
    });
  }
});
