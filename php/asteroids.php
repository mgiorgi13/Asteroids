<?php
session_start();


//impedisco accesso alla pagina di gioco se non si è fatto prima il login o signup
if (!isset($_SESSION['Connection']))
    header("location: ../index.php");

?>

<!DOCTYPE html>
<html lang="it">

<head>
    <meta charset="utf-8">
    <meta name="author" content="Matteo Giorgi">
    <meta name="description" content="Asteroids">
    <meta name="keywords" content="Asteroids, space shooter, arcade">

    <title>Asteroids</title>

    <link rel="icon" type="image/png" href="../css/img/asteroid.png">
    <link rel="stylesheet" type="text/css" href="../css/gameStyle.css">

    <script src="../js/util.js"></script>
    <script src="../js/bullet.js"></script>
    <script src="../js/asteroid.js"></script>
    <script src="../js/drawer.js"></script>
    <script src="../js/ship.js"></script>
    <script src="../js/ranking.js"></script>
    <script src="../js/game.js"></script>
    <script src="../js/start.js"></script>

</head>

<body>
    <header>
        <audio id="music" controls autoplay loop>
            <source src="../css/audio/space_noise.mp3" type="audio/mp3">
            Il Browser non supporta gli elementi audio.
        </audio>
    </header>

    <div id="container">
        <div id="gameStat">
            <p id="statHeader" class="stat">Score : </p>
            <input id="score" class="stat" type="text" value=0 readonly></input>
            <div id="lifeContainer">
                <img id="life0" class="lifes" src="../css/img/ship.png" alt="life0"></img>
                <img id="life1" class="lifes" src="../css/img/ship.png" alt="life1"></img>
                <img id="life2" class="lifes" src="../css/img/ship.png" alt="life2"></img>
            </div>
            <form id="logoutForm" action="./logOut.php">
                <button id="logOut" class="stat" type="submit">LogOut</button>
            </form>
            <img id="mute" alt="musicOn" src='../css/img/audioOn.png'></img>
        </div>
        <div id="playground"></div>
        <div id="ranking"></div>
        <div id="instructions">
            <img id="aKey" class="keys" src="../css/img/a.png" alt="aKey"></img>
            <img id="wKey" class="keys" src="../css/img/w.png" alt="wKey"></img>
            <img id="dKey" class="keys" src="../css/img/d.png" alt="dKey"></img>
            <img id="spaceKey" src="../css/img/space.png" alt="spaceKey"></img>
            <img id="pKey" class="keys" src="../css/img/p.png" alt="pKey"></img>
            <img id="rKey" class="keys" src="../css/img/r.png" alt="rKey"></img>

        </div>
    </div>
</body>

</html>