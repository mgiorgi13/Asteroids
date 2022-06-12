/*******Costanti******/

var CLOCK_INTERVAL = 10;
var PLAYER_RADIUS = 22.5;
var BULLET_RADIUS = 7.5;
var ASTEROID_ID = 'enemy';
var PLAYER_ID = 'player';
var BULLET_ID = 'fire';
var SHIP_ROTATION = 2;
var ASTEROID0 = 30;
var ASTEROID1 = 80;
var ASTEROID2 = 150;
var BULLET = 7.5;
var FIREREADY = 60;
var ASTEROID0PEARK = 1.5;
var ASTEROID1PEARK = 1.2;
var ASTEROID2PEARK = 0.9;
var BULLETSPEED = 5;
var SHIPSPEED = 0.99;
var SPAWNTIMER = CLOCK_INTERVAL * 200;
var NLIFES = 3;
var SCORE = 100;
var TRANSPARENCY_TIME = 200;

/*******Funzioni di utilità********/

function Point(x, y) {
    this.x = x;
    this.y = y;
}

function toRadians(angle) {
    return angle * (Math.PI / 180);
}

function toDegrees(angle) {
    return angle * (180 / Math.PI);
}

//spawnPosition generano due cordinate che non interferiscono con l'area riservata alla ship (posizione centrale dello schermo)

function spawnPositionX(width, top) {
    if (Math.floor(Math.random() * 2) === 0) { // sinistra
        return Math.floor(Math.random() * (width / 2 - ASTEROID2 * 3 / 2) + ASTEROID2 / 2 + top);
    } else { // destra
        return Math.floor(Math.random() * (width / 2 - ASTEROID2 * 3 / 2) + ASTEROID2 + top + width / 2);
    }
}

function spawnPositionY(height, left) {
    if (Math.floor(Math.random() * 2) === 0) { // alto
        return Math.floor(Math.random() * (height / 2 - ASTEROID2 * 3 / 2) + ASTEROID2 / 2 + left);
    } else { // basso
        return Math.floor(Math.random() * (height / 2 - ASTEROID2 * 3 / 2) + ASTEROID2 + left + height / 2);
    }
}

//rimuove tutti gli elementi che hanno proprietà remove a true
function removeDied(array){
    var appoggio = [];
    array.forEach(a => {
        if(!a.remove)
            appoggio.push(a);
    });
    return appoggio;
}

function MathUtil() { }

MathUtil.distance =
    function (point1, point2) {
        return Math.sqrt(MathUtil.squareDistance(point1, point2))
    }

MathUtil.squareDistance =
    function (point1, point2) {
        return ((point1.x - point2.x) * (point1.x - point2.x)
            + (point1.y - point2.y) * (point1.y - point2.y));
    }