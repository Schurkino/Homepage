document.addEventListener("DOMContentLoaded", function () {
    const allTiles = document.querySelectorAll(".image_box");
    let fakeCounter = 0;
    let fakeText = document.querySelector("#js_fake_text");

    function swapTiles(clickedTile) {
        const currentPosition = clickedTile.querySelector(".js_fake_tile")?.closest(".image_box"); 
            
        if (currentPosition) { 
            /* Erstelle ein Array aus allen Kacheln, und filtere dadei die aktuelle geklicke Kachel raus (return)  */
            const otherTiles = Array.from(allTiles).filter(function (tile) {
                return tile !== currentPosition;
            });
            
            /* Wähle eine zufällige Kachel aus den verbleibenden Kacheln */
            const randomIndex = Math.floor(Math.random() * otherTiles.length);
            const newPosition = otherTiles[randomIndex];
            const parent = currentPosition.parentNode;
            
            if (parent) {
                /* Bevor wir Elemente verschieben, müssen wir uns merken, was direkt hinter der Zielkachel (newPosition) lag. Das speichern wir in afterB. Wenn die Zielkachel das letzte Element ist, ist afterB einfach null. */
                const afterB = newPosition.nextSibling;
                /* Verschiebt die Zielkachel (newPosition) direkt vor die aktuelle Kachel (currentPosition) */
                parent.insertBefore(newPosition, currentPosition);
                /* Verschiebt die aktuelle Kachel an den Platz, den wir uns vorhin gemerkt haben (vor afterB). Wenn afterB den Wert null hatte, wird die Kachel automatisch ganz am Ende eingefügt. Der Tausch ist vollzogen. */
                parent.insertBefore(currentPosition, afterB);
                
                fakeCounter++ 

                if (fakeCounter == 1) {
                    fakeText.innerHTML = "Clique" + "<br>" + "ici!";
                }
                else if (fakeCounter == 2) {
                    fakeText.innerHTML = "Clicca" + "<br>" + "qui!";
                }
                else if (fakeCounter == 3) {
                    fakeText.innerHTML = "Нажми" + "<br>" + "сюда!";
                }
                else {
                    fakeText.innerHTML = "Click" + "<br>" + "me!";
                    fakeCounter = 0;
                }

                /* Behalte den Fokus auf dem verschobenen Element */
                clickedTile.focus();
            }
        }
    }

    allTiles.forEach(function (tile) {
        tile.addEventListener("click", function () {
            swapTiles(this);
        });

        tile.addEventListener("keydown", function (event) {
            if (event.key === "Enter" || event.key === " ") {
                /* Verhindert das Scrollen der Seite bei der Leertaste */
                event.preventDefault(); 
                swapTiles(this);
            }
        });
    });
});
