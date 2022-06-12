function Bullet(number, x, y, speed, radius, rotation) {
    this.number = number;
    this.point = new Point(x, y);
    this.speed = speed;
    this.radius = radius;
    this.rotation = rotation;
    this.remove = false;
}

Bullet.prototype.move =
    function (playground) {
        this.point.x += Math.cos(toRadians(this.rotation - 90)) * this.speed;
        this.point.y += Math.sin(toRadians(this.rotation - 90)) * this.speed;
        
        //se esce a destra
        if (this.point.x > (playground.offsetWidth + playground.offsetLeft)) {
            this.remove = true;
        } else if (this.point.x < playground.offsetLeft) { //se esce a sinistra
            this.remove = true;
        }
        //se esce in basso
        if (this.point.y > (playground.offsetHeight + playground.offsetTop)) {
            this.remove = true;
        } else if (this.point.y < playground.offsetTop) { //se esce in alto
            this.remove = true;
        }
    }


Bullet.prototype.isAsteroidHit =
    function (asteroid) {
        var res = MathUtil.squareDistance(asteroid.point, this.point)
            <= (this.radius + asteroid.radius) * (this.radius + asteroid.radius);
        if (res) // asteroide colpito
            this.remove = true;
    }
