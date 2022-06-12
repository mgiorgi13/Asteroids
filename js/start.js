document.addEventListener('DOMContentLoaded', function () {
    playgroundW = document.getElementById("playground");
    //crea un nuovo oggetto game
    game = new Game(playgroundW);
    //carica la classifica
    loadRaking();

    document.body.addEventListener("keydown", function (e) {
        game.drawer.keyLayout(e.key,"press");
        if (e.key === "p") // il tasto p rimane premuto finche non si ripreme
            game.keys[e.key.charCodeAt(0)] = !(game.keys[e.key.charCodeAt(0)]);
        else
            game.keys[e.key.charCodeAt(0)] = true;
    });

    document.body.addEventListener("keyup", function (e) {
        game.drawer.keyLayout(e.key, "released");
        if (e.key !== "p")
            game.keys[e.key.charCodeAt(0)] = false;

    });

    //funzione che mi disabilita l'audio o me lo riabilita
    document.getElementById("mute").addEventListener("click", function () {
        var audio = document.getElementById("music");
        var muteImg = document.getElementById("mute");

        if (muteImg.alt === "musicOn") {//disattivo l'audio
            audio.muted = true;
            muteImg.src = '../css/img/audioOff.png';
            muteImg.alt = "musicOff";
            game.audio = false;
        } else {//riattivo l'audio
            audio.muted = false;
            muteImg.src = '../css/img/audioOn.png';
            muteImg.alt = "musicOn";
            game.audio = true;
        }
    });

    game.inizialize();
    
});