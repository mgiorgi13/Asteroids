//si occupa di gestire l'aspetto grafico del gioco
function Drawer(playground){
    this.playground = playground;
}

Drawer.prototype.drawShip = function(ship){
    //recupero l'elemento ship
    var shipNode = document.getElementById("ship");
    if (shipNode === null) { // se non c'è lo creo
        shipNode = document.createElement('img');
        shipNode.setAttribute('id', "ship");
        shipNode.setAttribute('class', PLAYER_ID);
        shipNode.setAttribute('alt', "ship");
        shipNode.setAttribute('src', "../css/img/ship.png");
        this.playground.appendChild(shipNode);
    }
    //se la navicella è stata colpita allora modifico l'opacità di essa
    if (ship.transparent) 
        shipNode.style.opacity = "0.5";
    else
        shipNode.style.opacity = "1";

    shipNode.style.left = (ship.point.x - ship.radius) + 'px';
    shipNode.style.top = (ship.point.y - ship.radius) + 'px';
    //applico una rotazione dell'immagine in base alla proprità rotation della navicella
    shipNode.style.transform = 'rotate('+ship.rotation+'deg)';
}

Drawer.prototype.drawAsteroid = function (asteroid) {
    if (!asteroid.remove) {// se l'asteroide non è stato colpito
        //recupero l'elemento asteroid
        var AsteroidNode = document.getElementById("asteroid" + asteroid.number);
        if (AsteroidNode === null) { // se non c'è lo creo
            AsteroidNode = document.createElement('img');
            AsteroidNode.setAttribute('id', "asteroid" + asteroid.number);
            AsteroidNode.setAttribute('class', ASTEROID_ID);
            AsteroidNode.setAttribute('alt', "asteroid" + asteroid.number);
            AsteroidNode.setAttribute('src', "../css/img/asteroidWhite.png");
            AsteroidNode.style.width = asteroid.radius * 2 + "px";
            AsteroidNode.style.height = asteroid.radius * 2 + "px";
            this.playground.appendChild(AsteroidNode);
        }
        AsteroidNode.style.left = (asteroid.point.x - asteroid.radius) + 'px';
        AsteroidNode.style.top = (asteroid.point.y - asteroid.radius) + 'px';
    }else{ // se è stato colpito lo rimouvo dallo schermo
        if (asteroid !== null)//controllo prima che non abbia rimosso l'oggetto prima che venga disegnato
            document.getElementById("asteroid" + asteroid.number).remove();
    }
}

Drawer.prototype.drawBullet = function (bullet) {
    if (!bullet.remove) {// se il proiettile non è stato colpito
        //recupero l'elemento bullet
        var BulletNode = document.getElementById("bullet" + bullet.number);
        if (BulletNode === null) { // se non c'è lo creo
            BulletNode = document.createElement('img');
            BulletNode.setAttribute('id', "bullet" + bullet.number);
            BulletNode.setAttribute('class', BULLET_ID);
            BulletNode.setAttribute('alt', "bullet" + bullet.number);
            BulletNode.setAttribute('src', "../css/img/bullet.png");
            BulletNode.style.width = bullet.radius * 2 + "px";
            BulletNode.style.height = bullet.radius * 2 + "px";
            this.playground.appendChild(BulletNode);
        }
        BulletNode.style.left = (bullet.point.x - bullet.radius) + 'px';
        BulletNode.style.top = (bullet.point.y - bullet.radius) + 'px';
    } else{ // se ha colpito un asteroide o è uscito dallo schermo lo rimouvo 
        if(bullet !== null)//controllo prima che non abbia rimosso l'oggetto prima che venga disegnato
            document.getElementById("bullet" + bullet.number).remove();
    }
}

Drawer.prototype.updateLifes = function (nLifes) {
    //chiamata ogni volta che la ship viene colpita rimuove dallo schermo le vite perse
    for (var i = NLIFES - 1; i > nLifes - 1; i--){
        var LifeNode = document.getElementById("life"+i);
        LifeNode.style.display = "none";
    }
}

Drawer.prototype.updateScore = function (score){
    /*aggiorna lo score con il punteggio attuale, 
    chiamata ogni volta che un bullet colpisce un asteroide*/
    var ScoreNode = document.getElementById("score");
    ScoreNode.setAttribute('value',""+score+"");
}

Drawer.prototype.keyLayout = function(key,state){
    //aggiorna l'opacità di tasti premuti 
    switch (key) {
        case "a":
            if (state === "press")
                document.getElementById("aKey").style.opacity = 0.4;
            else
                document.getElementById("aKey").style.opacity = 1;
            break;
        case "w":
            if (state === "press")
                document.getElementById("wKey").style.opacity = 0.4;
            else
                document.getElementById("wKey").style.opacity = 1;
            break;
        case "d":
            if (state === "press")
                document.getElementById("dKey").style.opacity = 0.4;
            else
                document.getElementById("dKey").style.opacity = 1;
            break;
        case " ":
            if (state === "press")
                document.getElementById("spaceKey").style.opacity = 0.4;
            else
                document.getElementById("spaceKey").style.opacity = 1;
            break;
        case "p":
            if (state === "press")
                document.getElementById("pKey").style.opacity = 0.4;
            else
                document.getElementById("pKey").style.opacity = 1;
            break;
        case "r":
            if (state === "press")
                document.getElementById("rKey").style.opacity = 0.4;
            else
                document.getElementById("rKey").style.opacity = 1;
            break;
    }

}
Drawer.prototype.gameOver = function(playground){
    // rimuove dal playground in contenuto , aggiorna lo score a 0 e rimostra tutte le vite della navicella 
    playground.innerHTML = "";
    document.getElementById("score").setAttribute('value', "0");
    var lifesNodes = document.getElementById("lifeContainer").childNodes;
    lifesNodes.forEach(l => {
        if(l.className === "lifes")
            l.style.display = "inline-block";
    });
}