/* Das hier muss im SVG vor dem schließenden </g> des Elements mit der ID circle_left bzw. circle_right */
/* <animateTransform id="rotation_left" attributeName="transform" type="rotate" from="0 114 217" to="360 114 217" dur="2s" repeatCount="indefinite" additive="sum" begin="indefinite"/> */
/* <animateTransform id="rotation_right" attributeName="transform" type="rotate" from="0 114 217" to="360 114 217" dur="2s" repeatCount="indefinite" additive="sum" begin="indefinite"/> */

/* Wartet, bis das HTML-Dokument vollständig geladen ist, bevor der Code ausgeführt wird */
document.addEventListener("DOMContentLoaded", function () {
  let objectTag = document.getElementById("js_audio_player");
  let audioTag = document.getElementById("audio_tag");
  let allMusicTracks = [
    "audio/to the choir (the short start).mp3",
    "audio/forest.mp3",
    "audio/repetition.mp3"
  ];

  /* Aktueller Track Index */
  let currentTrackIndex = 0;
  /* Setzt den ersten Track als Quelle des Audio-Tags */
  audioTag.src = allMusicTracks[currentTrackIndex];

  function initAudioPlayer() {
    let buttonBack = objectTag.contentDocument.getElementById("button_back");
    let buttonPlay = objectTag.contentDocument.getElementById("button_play");
    let buttonNext = objectTag.contentDocument.getElementById("button_next");
    let buttonStop = objectTag.contentDocument.getElementById("button_stop");

    /* Die Rotations-Animationen der beiden Spulen aus dem animateTransform-Tag welches man nachträglich mit dem Text-Editor einfügen musste. */
    let animateTransformTagLeft = objectTag.contentDocument.getElementById("rotation_left");
    let animateTransformTagRight = objectTag.contentDocument.getElementById("rotation_right");

    /* Wechselt den Track: step = 1 für den nächsten, step = -1 für den vorherigen Track */
    function changeTrack(step) {
      /* Index um den Schritt verändern */
      currentTrackIndex = currentTrackIndex + step;

      /* Nach dem letzten Track wieder zum ersten springen */
      if (currentTrackIndex >= allMusicTracks.length) {
        currentTrackIndex = 0;
      }

      /* Vor dem ersten Track zum letzten springen */
      if (currentTrackIndex < 0) {
        currentTrackIndex = allMusicTracks.length - 1;
      }

      /* Neuen Track als Quelle setzen und abspielen */
      audioTag.src = allMusicTracks[currentTrackIndex];
      audioTag.play();
    }

    /* Fügt einem Button einen Klick-Effekt hinzu (Button wird beim Drücken nach unten verschoben) */
    function addPressEffect(buttonElement) {
      /* Button nach unten verschieben */
      function pressButton() {
        buttonElement.style.translate = "0px 12px";
      }

      /* Button zurück an die Ausgangsposition setzen */
      function releaseButton() {
        buttonElement.style.translate = "0px 0px";
      }

      /* Drücken bzw. Loslassen, Verlassen des Buttons oder Abbruch der Eingabe */
      buttonElement.addEventListener("pointerdown", pressButton);
      buttonElement.addEventListener("pointerup", releaseButton);
      buttonElement.addEventListener("pointerleave", releaseButton);
      buttonElement.addEventListener("pointercancel", releaseButton);
    }

    addPressEffect(buttonBack);
    addPressEffect(buttonPlay);
    addPressEffect(buttonNext);
    addPressEffect(buttonStop);

    /* Back: zum vorherigen Track wechseln */
    buttonBack.addEventListener("click", function () {
      changeTrack(-1);
    });

    /* Play: Audio abspielen und beide Spulen drehen lassen */
    buttonPlay.addEventListener("click", function () {
      audioTag.play();
      animateTransformTagLeft.beginElement();
      animateTransformTagRight.beginElement();
    });

    /* Next: zum nächsten Track wechseln */
    buttonNext.addEventListener("click", function () {
      changeTrack(1);
    });

    /* Stop: Audio pausieren, an den Anfang zurücksetzen und die Spulen anhalten */
    buttonStop.addEventListener("click", function () {
      audioTag.pause();
      audioTag.currentTime = 0;
      animateTransformTagLeft.endElement();
      animateTransformTagRight.endElement();
    });
  }

  /* Prüft, ob das SVG im object-Tag bereits geladen ist */
  function isSvgLoaded() {
    /* Noch kein SVG-Dokument vorhanden */
    if (objectTag.contentDocument === null) {
      return false;
    }

    /* SVG ist geladen, wenn der Play-Button gefunden wird */
    return objectTag.contentDocument.getElementById("button_play") !== null;
  }

  /* Wenn das SVG schon geladen ist, Player sofort starten, sonst auf das load-Event warten */
  if (isSvgLoaded() === true) {
    initAudioPlayer();
  } else {
    objectTag.addEventListener("load", initAudioPlayer);
  }
});
