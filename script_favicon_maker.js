document.addEventListener("DOMContentLoaded", function () {
    /* 1. Sucht das bereits im HTML definierte Favicon-Element */
    let faviconElement = document.querySelector("link[rel='icon']");

    /* 2. Erstellt das unsichtbare Canvas-Element zum Zeichnen */
    const canvasElement = document.createElement("canvas");
    const canvasContext = canvasElement.getContext("2d");
    canvasElement.width = 32;
    canvasElement.height = 32;

    /* 3. Definiert die Farbpalette */
    const colorPalette = ["#29ADFF", "#FFEC27", "#00E436", "#FF004D"];
    let currentColorIndex = 0;

    /* 4. Funktion zur Aktualisierung der Favicon-Farbe */
    function changeFaviconColor() {
        canvasContext.fillStyle = colorPalette[currentColorIndex];
        canvasContext.fillRect(0, 0, 32, 32);

        faviconElement.href = canvasElement.toDataURL("image/png");

        currentColorIndex = currentColorIndex + 1;
        if (currentColorIndex >= colorPalette.length) {
            currentColorIndex = 0;
        }
    }

    /* 5. Startet den Intervall-Wechsel alle 500 Millisekunden */
    setInterval(changeFaviconColor, 500);
});
