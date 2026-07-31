document.addEventListener("DOMContentLoaded", function() {
    let dialogElement = document.querySelector("#dialogElement");
    let dialogImage = document.querySelector("#imgPlaceholder");
    let dialogFigcaption = document.querySelector("#figcaptionPlaceholder");
    let dialogCloseButton = dialogElement?.querySelector(".close_button");
    let allImageBoxes = document.querySelectorAll(".image_box");

   /* Registrierung der Klick-Events fuer jede einzelne Bild-Box */
    allImageBoxes?.forEach(function(imageBox) {
        imageBox.addEventListener("click", function(event) {
            openDialog(event.currentTarget);
        });

        imageBox.addEventListener("keydown", function(event) {
            if (event.key === "Enter" || event.key === " ") {
                /* Verhindert das Standard-Scrollen bei der Leertaste */
                event.preventDefault(); 
                openDialog(event.currentTarget);
            }
        });
    });

    function openDialog(currentBox) {
        const img = currentBox.querySelector("figure img");
        const figcaption = currentBox.querySelector("figure figcaption");
        const cubeContainer = currentBox.querySelector(".cube_container");
        const jsParticle = currentBox.querySelector(".js_particle");

        /* Falls weder ein Bild noch ein Wuerfel existiert (z.B. Fake-Tile), brechen wir ab */
        if (!img && !cubeContainer && !jsParticle) {
            return;
        }

        /* Fall: Die Box enthaelt einen 3D-Wuerfel */
        if (cubeContainer) {
            let copiedCubeContainer = cubeContainer.cloneNode(true);
            copiedCubeContainer.id = "cubeContainerClone";
            dialogElement.appendChild(copiedCubeContainer);
        }
     
        /* Fall: Die Box enthaelt Partikel Animation */
        if (jsParticle) {
            let copiedJsParticle = jsParticle.cloneNode(true);
            copiedJsParticle.id = "js_snow_clone";
            dialogElement.appendChild(copiedJsParticle);
        }

        /* Fall: Die Box enthaelt ein normales Bild */
        if (img) {
            dialogImage.src = img.src;
            dialogImage.alt = img.alt;
            dialogFigcaption.textContent = figcaption.textContent;
        }

        dialogElement.showModal();
        disableScroll();
    }

    /* Wenn das Dialog-Element offen ist, dann löst der Klick auf den Blackdrop-Schatten das Schließen aus. Backdrop = dialogElement */
    document.addEventListener("click", function(event) {
        if (event.target === dialogElement && dialogElement.hasAttribute("open")) {
            dialogElement.close();
        }
    });

    /* Der Button loest nur noch das Schliessen aus */
    dialogCloseButton?.addEventListener("click", function() {
        dialogElement.close();
    });

    /* Dieses Event feuert IMMER, wenn der Dialog zugeht (Button oder Escape) */
    dialogElement?.addEventListener("close", function() {
        /* Bild-Attribute leeren */
        dialogImage.src = "";
        dialogImage.alt = "";
        enableScroll();

        /* Geklontes Wuerfel-Div suchen und restlos entfernen, falls vorhanden */
        if (dialogElement.querySelector("#cubeContainerClone")) {
            dialogElement.querySelector("#cubeContainerClone").remove();
        }
        /* Geklontens Schnee-Div suchen und restlos entfernen, falls vorhanden */
        if (dialogElement.querySelector("#js_snow_clone")) {
            dialogElement.querySelector("#js_snow_clone").remove();
        }
    });

    function disableScroll() {
        document.body.classList.remove("overflow_auto");
        document.body.classList.add("overflow_hidden");
    }
    function enableScroll() {
        document.body.classList.remove("overflow_hidden");
        document.body.classList.add("overflow_auto");
    }
});
