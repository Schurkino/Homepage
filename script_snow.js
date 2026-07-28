function createSnowflake() {
    const snowContainer = document.getElementById("js_snow");
    const snowContainerClone = document.getElementById("js_snow_clone");

    /* Flocke für den originalen Container */
    if (snowContainer) {
        const flake = document.createElement("div");
        flake.classList.add("snowflake");

        flake.style.left = Math.random() * 100 + "%";
        flake.style.width = "24px";
        flake.style.height = "24px";
        
        /* Math.random() erzeugt eine Kommazahl zwischen 0 und 1.
        Multipliziert mit 4 ergibt das einen Wert zwischen 0 und 4.
        Durch das Addieren von 8 liegt das Endergebnis der Flugdauer
        am Ende variabel zwischen minimal 8 und maximal 12 Sekunden. */
        const duration = Math.random() * 4 + 8; 

        /* Die berechnete Zahl wird mit der CSS-Zeiteinheit 's' (Sekunden)
        verknüpft und direkt als Inline-Style für die CSS-Animation
        auf der geklonten Schneeflocke hinterlegt. */
        flake.style.animationDuration = duration + "s";

        /* Das fertig konfigurierte Flocken-Element wird nun als echtes
        Kindelement in den geklonten Schnee-Container eingehängt,
        wodurch die CSS-Animation im Browser sofort startet. */
        snowContainer.appendChild(flake);

        /* Um den Arbeitsspeicher zu schonen und das DOM nicht mit alten,
        unsichtbaren Elementen zu überlasten, wird ein Timer gestartet.
        Da setTimeout Millisekunden erwartet, multiplizieren wir die
        Flugdauer in Sekunden mit 1000. Sobald diese Zeit abgelaufen ist,
        wird die Flocke restlos aus dem DOM gelöscht. */
        setTimeout(function() {
            flake.remove();
        }, duration * 1000);
    }

    /* Flocke für den geklonten Container */
    if (snowContainerClone) {
        const cloneFlake = document.createElement("div");
        cloneFlake.classList.add("snowflake");

        cloneFlake.style.left = Math.random() * 100 + "%";
        cloneFlake.style.width = "24px";
        cloneFlake.style.height = "24px";
        
        /* Math.random() erzeugt eine Kommazahl zwischen 0 und 1.
        Multipliziert mit 4 ergibt das einen Wert zwischen 0 und 4.
        Durch das Addieren von 8 liegt das Endergebnis der Flugdauer
        am Ende variabel zwischen minimal 8 und maximal 12 Sekunden. */
        const durationClone = Math.random() * 4 + 8;
        
        /* Die berechnete Zahl wird mit der CSS-Zeiteinheit 's' (Sekunden)
        verknüpft und direkt als Inline-Style für die CSS-Animation
        auf der geklonten Schneeflocke hinterlegt. */
        cloneFlake.style.animationDuration = durationClone + "s";

        /* Das fertig konfigurierte Flocken-Element wird nun als echtes
        Kindelement in den geklonten Schnee-Container eingehängt,
        wodurch die CSS-Animation im Browser sofort startet. */
        snowContainerClone.appendChild(cloneFlake);

        /* Um den Arbeitsspeicher zu schonen und das DOM nicht mit alten,
        unsichtbaren Elementen zu überlasten, wird ein Timer gestartet.
        Da setTimeout Millisekunden erwartet, multiplizieren wir die
        Flugdauer in Sekunden mit 1000. Sobald diese Zeit abgelaufen ist,
        wird die Flocke restlos aus dem DOM gelöscht. */
        setTimeout(function() {
            cloneFlake.remove();
        }, durationClone * 1000);
    }
}

/* Intervall vergrößert, damit die Flocken nacheinander starten */
setInterval(createSnowflake, 400);
