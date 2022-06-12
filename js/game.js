function Game(playgroundWrapper) {
    //variabili del campo di gioco
    this.playground = playgroundWrapper;
    this.playgroundX = playground.offsetLeft;
    this.playgroundY = playground.offsetTop;
    this.playgroundWidth = playground.offsetWidth;
    this.playgroundHeight = playground.offsetHeight;
    //audio
    this.audio = true;

    //varibili della partita
    this.gameOverStatus;
    this.score;
    this.lifes;

    //variabili degli oggetti spaziali
    this.asteroids;
    this.bullets;
    this.nbullets;
    this.nAsteroids;
    this.ship;
    this.transparencyTime;

    //drawer
    this.drawer;

    //input
    this.keys = [];

    //timers
    this.interval;
    this.fireReady;
    this.asteroidTimer;

}

Game.prototype.inizialize
    = function () {
        //varibili della partita
        this.gameOverStatus = false;
        this.score = 0;
        this.lifes = NLIFES;

        //variabili degli oggetti spaziali
        this.asteroids = [];
        this.bullets = [];
        this.nbullets = 0;
        this.nAsteroids = 0;
        this.ship = new Ship(this.playgroundX + this.playgroundWidth / 2, this.playgroundY + this.playgroundHeight / 2, PLAYER_RADIUS, SHIPSPEED);
        this.transparencyTime = TRANSPARENCY_TIME;

        //drawer
        this.drawer = new Drawer(playground);

        //input
        this.keys = [];

        //timers
        this.interval = 1;
        this.fireReady = 0;
        this.asteroidTimer = 0;
        this.keys["p".charCodeAt(0)] = true;
        this.keys["r".charCodeAt(0)] = false;
        
        this.drawer.drawShip(this.ship);

        //creo asteroidi

        for (var i = 0; i < 5; i++) {
            this.createAsteroid();
        }
        //faccio partire il clock del gioco
        this.interval = setInterval(game.clock.bind(game), CLOCK_INTERVAL);
    }


Game.prototype.createAsteroid =
    function () {
        /* crea randomicamente su schemo un asteroide di dimensione 3 o 2
        il punto di nascita dell'asteroide non collide con la parte centrale dello schermo in 
        maniera tale che a inizio partita gli asteroidi non si generino sopra la navicella */
        var x = spawnPositionX(this.playgroundWidth, this.playgroundX);
        var y = spawnPositionY(this.playgroundHeight, this.playgroundY);
        var dim = Math.floor(Math.random() * 2) + 1;
        var speedX = Math.floor(Math.random() * 2 + 1) * (Math.random() > 0.5) ? 1 : -1;
        var speedY = Math.floor(Math.random() * 2 + 1) * (Math.random() > 0.5) ? 1 : -1;
        var asteroid = new Asteroid(this.nAsteroids++, x, y, speedX, speedY, dim);
        this.asteroids.push(asteroid);
        this.drawer.drawAsteroid(asteroid);
    }

// gestisce il funziomaneto del gioco
Game.prototype.clock =
    function () {
        if (!this.keys["r".charCodeAt(0)]) { // se non è stato premuto il tasto di riavvio
            if (this.lifes > 0 || this.gameOverStatus) { //se ho ancora vite o se è terminata la partita
                if (this.keys["p".charCodeAt(0)] || this.gameOverStatus) { // se ho premuto il tasto pausa o ho perso
                    //attendo che l'utente riprema il tasto pausa oppure il tasto riavvio
                } else { //se sto giocando 

                    //aggiorno i contatori per lo sparo, lo swan dell'asteroide e la trasparenza della navicella
                    this.fireReady += 1;
                    this.asteroidTimer += 1;
                    this.transparencyTime -= 1;

                    //se sto fluttuando
                    if (this.ship.inertia > 0 && !this.keys["w".charCodeAt(0)]) 
                        this.ship.inertia -= 0.005;

                    //se la trasparenza è finita allora aggiorno la proprieta omonima della navicella 
                    if (this.transparencyTime <= 0)
                        this.ship.transparent = false;

                    //se sto premendo il tasto rotazione o sto fluttuando
                    if (this.keys["a".charCodeAt(0)] || this.ship.inertia > 0.1) {
                        //se sto premendo il tasto di rotazione allora aggiono la rotazione della navicella 
                        if (this.keys["a".charCodeAt(0)])
                            this.ship.rotation -= SHIP_ROTATION;
                        
                        /*se non sto fluttuando o sto premendo il tasto w ma non sto premendo il tasto di rotazione
                        allora aggiorno l'angolo i movimento della navicella con quello della rotazione della navicella*/
                        if ((this.ship.inertia <= 0.1 || this.keys["w".charCodeAt(0)]) && !this.keys["a".charCodeAt(0)])
                            this.ship.moveAngle = this.ship.rotation;
                        
                        this.drawer.drawShip(this.ship);

                    }
                    // se mi sto muovendo in avanti o sto fluttuando
                    if (this.keys["w".charCodeAt(0)] || this.ship.inertia > 0.1) {
                        //se mi sto muovendo in avanti incremento l'inerzia al massimo fino a 2
                        if (this.keys["w".charCodeAt(0)] && this.ship.inertia < 2)
                            this.ship.inertia += 0.1;
                        this.ship.move(this.playground);
                        this.drawer.drawShip(this.ship);
                    }

                    //se sto premendo il tasto rotazione o sto fluttuando
                    if (this.keys["d".charCodeAt(0)] || this.ship.inertia > 0.1) {
                        //se sto premendo il tasto di rotazione allora aggiono la rotazione della navicella 
                        if (this.keys["d".charCodeAt(0)])
                            this.ship.rotation += SHIP_ROTATION;

                        /*se non sto fluttuando o sto premendo il tasto w ma non sto premendo il tasto di rotazione
                        allora aggiorno l'angolo i movimento della navicella con quello della rotazione della navicella*/
                        if ((this.ship.inertia <= 0.1 || this.keys["w".charCodeAt(0)]) && !this.keys["d".charCodeAt(0)])
                            this.ship.moveAngle = this.ship.rotation;

                        this.drawer.drawShip(this.ship);
                    }

                    if (this.keys[" ".charCodeAt(0)]) {
                        // se ho premuto il tasto space e ho il proiettile pronto
                        if (this.fireReady >= FIREREADY) {
                            //controllo che non stia sparando all'interno di un asteroide (quando sono traparente)
                            var inside = false;
                            this.asteroids.forEach(a => {
                                if (this.ship.isAsteroidHit(a))
                                    inside = true;
                            });
                            if (!inside) { // se non sono dentro ad un asteroide allora posso sparare
                                var bullet = new Bullet(this.nbullets, this.ship.point.x, this.ship.point.y, BULLETSPEED, BULLET, this.ship.rotation);
                                this.bullets.push(bullet);
                                this.nbullets++;
                                //aggiorno la proprietà del proiettile pronto
                                this.fireReady = 0;
                                if(this.audio)
                                    this.ship.audio.play();
                            }
                        }
                    }
                    // controllo se asteroidi e proiettili e navicelle hanno colliso
                    this.checkForHits();
                    // aggiono la posizione degli asteoridi e dei proiettili
                    this.update();
                }
            } else { // se ho temrinato le vite salvo il punteggio e setto lo stato di gameover
                saveScore(this.score);
                this.gameOverStatus = true;
            }
        } else { //se è stato premuto il tasto di riavvio
            //rilascio il tasto
            this.keys["r".charCodeAt(0)] = false;
            this.drawer.keyLayout("r", "released");
            if (this.lifes > 0) {
                if (confirm("Sei sicuro di voler riniziare la partita?")) {
                    //giocatore riavvia la partita prima di terminarla
                    clearInterval(this.interval);
                    this.gameOver();
                } else {
                    //pressione inavvertita del tasto r
                }
            } else {
                //riavvio partita a causa del game over
                clearInterval(this.interval);
                this.gameOver();
            }
        }
    }

Game.prototype.checkForHits =
    function () {
        var fragments = [];
        this.asteroids.forEach(a => {
            //controllo se un asteroide ha colpito la ship
            if (this.ship.isAsteroidHit(a) && !this.ship.transparent) {
                //decremento le vite della navicella e setto il timer di trasparenza
                this.lifes--;
                this.transparencyTime = TRANSPARENCY_TIME;
                this.ship.transparent = true;
                this.drawer.updateLifes(this.lifes)
            }
            // per ogni asteroide controllo se è stato colpito da un proiettile
            this.bullets.forEach(b => {
                if (a.isHit(b)) {
                    // se si frammento l'asteroide
                    this.nAsteroids += a.fragment(this.nAsteroids, fragments);
                    // setto la rimozione dell'asteroide e del proiettile
                    a.remove = true;
                    b.remove = true;
                    // incremento il punteggio e lo aggiorno
                    this.score += SCORE;
                    this.drawer.updateScore(this.score);
                }
            });
        });

        //non si puo colpire un frammento finche non è comparso sullo schermo
        fragments.forEach(f => {
            f.remove = false;
        });
        //inserisco nell' array degli asteroidi i frammenti 
        this.asteroids = this.asteroids.concat(fragments);
    }

Game.prototype.update =
    function () {
        //aggiorno la posizione degli asteroidi e dei missili
        this.asteroids.forEach(a => {
            a.move(this.playground);
            this.drawer.drawAsteroid(a);
        });

        this.bullets.forEach(b => {
            b.move(this.playground);
            this.drawer.drawBullet(b);
        });

        //rimuovo dagli array tutti gli elementi con proprietà remove a true
        this.asteroids = removeDied(this.asteroids);
        this.bullets = removeDied(this.bullets);

        if (this.asteroidTimer >= SPAWNTIMER || this.asteroids.length <= 2) { // crea un nuovo asteroide
            this.createAsteroid();
            this.asteroidTimer = 0;
        }

    }

Game.prototype.gameOver =
    function () {
        //aggiorno l'interfaccia grafica e poi inizializzo lo stato della partita 
        this.drawer.gameOver(this.playground);
        this.inizialize();
    }
