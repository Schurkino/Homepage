/*
document.addEventListener("DOMContentLoaded", function() {
    // Öffnen und Schließen eine Dialog-Elements und deaktivieren/aktivieren der Scroll-Funktion
    let allImageContainer = document.querySelectorAll(".image_box");
   
    allImageContainer.forEach(function(container) {
        container.addEventListener("click", function(event) {

            // Neues Dialog-Element erstellen
            let newDialogElement = document.createElement("dialog");
            
            // Neues Button-Element erstellen, Klasse geben und auch ein HTML-Entity für "X"
            let newCloseButtonmElement = document.createElement("button");
            newCloseButtonmElement.classList.add("close_button");
            newCloseButtonmElement.innerHTML = "&#10005;";

            // Innerhalb des Containers gibt es ein img-Tag. Das kann man klonen. 
            let copiedChildElement = this.firstElementChild.cloneNode(true);

            // Am Ende alles zusammenführen. Dialog in den Container. Geklontes Img-Element und Button in das Dialog-Element.
            this.appendChild(newDialogElement);
            newDialogElement.appendChild(copiedChildElement);
            newDialogElement.appendChild(newCloseButtonmElement);
       
            // Event-Handler auf alle Close-Buttons. Das Element wird aber nicht einfach geschlossen sondern aus dem DOM entfernt.
            let allCloseModalButtons = document.querySelectorAll(".close_button");
            allCloseModalButtons.forEach(function(closeButton) {
                closeButton.addEventListener("click", function(event) {
                    event.stopPropagation();
                    // this.closest("dialog[open]").close();
                    this.closest("dialog[open]").remove();
                    enableScroll();
                });
            });

            // Prüfen ob ein Dialog-Element schon offen ist. Wenn noch keins offen ist, dann Dialog-Element öffnen.
            let dialogOpen = document.querySelector("dialog[open]");
            if (dialogOpen) {
                return
            } 
            else {
                newDialogElement.showModal();
                disableScroll();
                
                // Listener für das Close-Event, der nach dem Auslösen entfernt wird und wenn das Bild erneut angezeigt wird, dann Aneu hinzugefügt
                newDialogElement.addEventListener("close", function() {
                    enableScroll();
                }, { once: true }); 
            }
        });
    });

    // Funktionen zum Scrollen (blockieren/erlauben)
    function disableScroll() {
        document.body.classList.remove("overflow_auto");
        document.body.classList.add("overflow_hidden");
    }
    function enableScroll() {
        document.body.classList.remove("overflow_hidden");
        document.body.classList.add("overflow_auto");
    }
});
*/

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
