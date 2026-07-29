function createParticle() {
    const particleContainer = document.getElementById("js_particle");
    const particleContainerClone = document.getElementById("js_particle_clone");

    /* Flocke für den originalen Container */
    if (particleContainer) {
        const particle = document.createElement("div");
        particle.classList.add("particle");

        particle.style.left = (Math.random() * 125 - 25) + "%";
        particle.style.top = (Math.random() * -100) + "%";
        particle.style.zIndex = Math.floor(Math.random() * 8);

        /* Math.random() erzeugt eine Kommazahl zwischen 0 und 1.
        Multipliziert mit 4 ergibt das einen Wert zwischen 0 und 4.
        Durch das Addieren von 6 liegt das Endergebnis der Flugdauer
        am Ende variabel zwischen minimal 6 und maximal 10 Sekunden. */
        const duration = Math.random() * 4 + 6; 

        /* Die berechnete Zahl wird mit der CSS-Zeiteinheit 's' (Sekunden)
        verknüpft und direkt als Inline-Style für die CSS-Animation
        auf der Schneeflocke hinterlegt. */
        particle.style.animationDuration = duration + "s";

        /* Das fertig konfigurierte Flocken-Element wird nun als echtes
        Kindelement in den Schnee-Container eingehängt,
        wodurch die CSS-Animation im Browser sofort startet. */
        particleContainer.appendChild(particle);

        /* Um den Arbeitsspeicher zu schonen und das DOM nicht mit alten,
        unsichtbaren Elementen zu überlasten, wird ein Timer gestartet.
        Da setTimeout Millisekunden erwartet, multiplizieren wir die
        Flugdauer in Sekunden mit 1000. Sobald diese Zeit abgelaufen ist,
        wird die Flocke restlos aus dem DOM gelöscht. */
        setTimeout(function() {
            particle.remove();
        }, duration * 1000);
    }

    /* Flocke für den geklonten Container */
    if (particleContainerClone) {
        const particleClone = document.createElement("div");
        particleClone.classList.add("snowflake");

        particleClone.style.left = (Math.random() * 125 - 25) + "%";
        particleClone.style.top = (Math.random() * -100) + "%";
        particleClone.style.zIndex = Math.floor(Math.random() * 8);
      
        /* Math.random() erzeugt eine Kommazahl zwischen 0 und 1.
        Multipliziert mit 4 ergibt das einen Wert zwischen 0 und 4.
        Durch das Addieren von 6 liegt das Endergebnis der Flugdauer
        am Ende variabel zwischen minimal 6 und maximal 10 Sekunden. */
        const durationClone = Math.random() * 4 + 6;
        
        /* Die berechnete Zahl wird mit der CSS-Zeiteinheit 's' (Sekunden)
        verknüpft und direkt als Inline-Style für die CSS-Animation
        auf der geklonten Schneeflocke hinterlegt. */
        particleClone.style.animationDuration = durationClone + "s";

        /* Das fertig konfigurierte Flocken-Element wird nun als echtes
        Kindelement in den geklonten Schnee-Container eingehängt,
        wodurch die CSS-Animation im Browser sofort startet. */
        particleContainerClone.appendChild(particleClone);

        /* Um den Arbeitsspeicher zu schonen und das DOM nicht mit alten,
        unsichtbaren Elementen zu überlasten, wird ein Timer gestartet.
        Da setTimeout Millisekunden erwartet, multiplizieren wir die
        Flugdauer in Sekunden mit 1000. Sobald diese Zeit abgelaufen ist,
        wird die Flocke restlos aus dem DOM gelöscht. */
        setTimeout(function() {
            particleClone.remove();
        }, durationClone * 1000);
    }
}

/* Intervall vergrößert, damit die Flocken nacheinander starten */
setInterval(createParticle, 50);
