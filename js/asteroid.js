function Asteroid(number, x, y, stepX, stepY, type ) {
    this.number = number;
    this.point = new Point(x, y);
    this.type = type; //0 : piccolo, 1 : medio, 2 : grande;
    if (type === 2) { //asteroidi piu grandi si spostano piu lentamente
        this.stepX = stepX * ASTEROID2PEARK;
        this.stepY = stepY * ASTEROID2PEARK;
        this.radius = ASTEROID2 / 2;
    } else if (type === 1) {
        this.stepX = stepX * ASTEROID1PEARK;
        this.stepY = stepY * ASTEROID1PEARK;
        this.radius = ASTEROID1 / 2;
    } else {
        this.stepX = stepX * ASTEROID0PEARK;
        this.stepY = stepY * ASTEROID0PEARK;
        this.radius = ASTEROID0 / 2;
    }
    //proprietà che setto se va rimosso l'asteroide
    this.remove = false;
}

Asteroid.prototype.move =
    function (playground) {
        this.point.x += this.stepX;
        this.point.y += this.stepY;

        //se esce a destra
        if (this.point.x > (playground.offsetWidth + playground.offsetLeft)) {
            this.point.x = playground.offsetLeft;
        } else if (this.point.x < playground.offsetLeft) { //se esce a sinistra
            this.point.x = playground.offsetWidth + playground.offsetLeft;
        }
        //se esce in basso
        if (this.point.y > (playground.offsetHeight + playground.offsetTop)) {
            this.point.y = playground.offsetTop;
        } else if (this.point.y < playground.offsetTop) { //se esce in alto
            this.point.y = playground.offsetHeight + playground.offsetTop;
        }
    }


Asteroid.prototype.fragment = 
    function (nAsteroid,asteroidArray){

        if(this.type === 0)
            return 0;

        //rimuovo l'asteroide e creo due framenti a distanza raggio/2 e con velocita dell'asteroide padre
        var fragment0 = 
            new Asteroid(nAsteroid, this.point.x - this.radius / 2, this.point.y - this.radius / 2,
                -this.stepX, -this.stepY, this.type - 1);
        var fragment1 =
            new Asteroid(nAsteroid+1, this.point.x + this.radius / 2, this.point.y + this.radius / 2,
                this.stepX, this.stepY, this.type - 1);
        
        //inserisco gli asteroidi all'interno dell'array
        asteroidArray.push(fragment0);
        asteroidArray.push(fragment1);
        
        return 2;
        
    }

Asteroid.prototype.isHit =
    function (bullet) {
        var res = MathUtil.squareDistance(bullet.point, this.point)
            <= (this.radius + bullet.radius) * (this.radius + bullet.radius);
        return res;
    }
