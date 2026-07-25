document.addEventListener("DOMContentLoaded", function () {
    const allTiles = document.querySelectorAll(".image_box");
    
    function swapTiles(clickedTile) {
        const currentPosition = clickedTile.querySelector(".js_fake_tile")?.closest(".image_box"); 
        
        if (currentPosition) { 
            /* Erstelle ein Array aus allen Kacheln, außer der aktuell angeklickten */
            const otherTiles = Array.from(allTiles).filter(function (tile) {
                return tile !== currentPosition;
            });
            
            /* Wähle eine zufällige Kachel aus den verbleibenden Kacheln */
            const randomIndex = Math.floor(Math.random() * otherTiles.length);
            const newPosition = otherTiles[randomIndex];
            
            const parent = currentPosition.parentNode;
            
            if (parent) {
                const afterB = newPosition.nextSibling;
                parent.insertBefore(newPosition, currentPosition);
                parent.insertBefore(currentPosition, afterB);
                
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
