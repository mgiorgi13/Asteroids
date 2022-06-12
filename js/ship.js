function Ship(x, y, radius, speed) {
    this.point = new Point(x, y);
    this.speed = speed;
    this.radius = radius;
    this.rotation = 90;
    this.remove = false;
    this.transparent = false;
    this.audio = new Audio('../css/audio/ship_shoot.mp3');
    this.inertia = 0;
    this.moveAngle = this.rotation;
}

Ship.prototype.rotate = 
    function (deg) {
        this.rotation += deg * this.inertia;
    }

Ship.prototype.move =
    function (playground) {
        //il movimento dela navicella è influenzato dall'angolo di rotazione di essa
        this.point.x += Math.cos(toRadians(this.moveAngle - 90)) * this.speed * this.inertia;
        this.point.y += Math.sin(toRadians(this.moveAngle - 90)) * this.speed * this.inertia;

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

Ship.prototype.isAsteroidHit =
    function (asteroid) {
        return MathUtil.squareDistance(asteroid.point, this.point)
            <= (this.radius + asteroid.radius) * (this.radius + asteroid.radius);
    }

