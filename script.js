document.addEventListener('DOMContentLoaded', function() {

    let feuxAnimationComplete = false; // Variable pour suivre l'état de l'animation des feux

    const maTimeline = gsap.timeline({
        defaults: {
            opacity: 0,
            duration: 1
        },
        onComplete: function() {
            feuxAnimationComplete = true; // Marquer l'animation des feux comme terminée
            // Animation complète, déclencher le scroll et la lecture du son
            playF1Sound();
            setTimeout(function() {
                const targetElement = document.querySelector('.present');
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }, 1500);
        }
    })
    .to('.f11',{})
    .to('.f22',{})
    .to('.f33',{})
    .to('.f44',{})
    .to('.f55',{}); // Fin de l'animation des feux

    // Ajoutez un gestionnaire de clic au bouton
    const startButton = document.getElementById('startAnimation');
    if (startButton) {
        startButton.addEventListener('click', function() {
            maTimeline.restart(); // Redémarre l'animation des feux
            feuxAnimationComplete = false; // Réinitialiser l'état de l'animation des feux
        });
    }

    // Fonction pour la lecture du son
    function playF1Sound() {
        const f1Sound = document.getElementById("f1Sound");
        if (f1Sound) {
            f1Sound.play();
        }
    }

    // Fonction pour la lecture ou la pause du son
    function toggleSound() {
        const f1Sound = document.getElementById("f1Sound");
        const sonButton = document.querySelector('.son');
        if (f1Sound) {
            if (f1Sound.paused) {
                // Si le son est en pause, le démarrer et changer l'image
                if (feuxAnimationComplete){
                    f1Sound.play();
                }
                sonButton.src = "images/son.png"; // Mettez ici le chemin correct de votre image
            } else {
                // Si le son est en cours de lecture, le mettre en pause et changer l'image
                f1Sound.pause();
                sonButton.src = "images/sonOff.png"; // Mettez ici le chemin correct de votre image
            }
        }
    }

    d3.select(".son")
        .on("click", toggleSound);
});

