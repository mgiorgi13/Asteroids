<?php
session_start();

//controllo se l'utente si è loggato o registrato se si lo rimando alla pagina di gioco
if (isset($_SESSION['Connection'])) {
    header("location: ./php/asteroids.php");
}

/*se la variabile di sessione Attempt_LogIn_SignUp non è settata allora non ho provato ancora
a loggarmi o registrami quindi resetto tutte le variabili di sessioni relative al form*/
if (!isset($_SESSION['LogIn_SignUp_Attempt'])) {

    /* settaggi per il Login */
    $_SESSION['SessionUsernameLogIn'] = "";

    $_SESSION['SessionLogInError'] = "";

    /*settaggi per la Registrazione*/
    $_SESSION['SessionUsernameSignUp'] = "";

    $_SESSION['SessionUsernameSignUpError'] = "";
    $_SESSION['SessionPasswordSignUpError'] = "";
}

//in qualunque caso resetto sempre le password
$_SESSION['SessionPasswordLogIn'] = "";
$_SESSION['SessionPasswordSignUp'] = "";

?>



<!DOCTYPE html>
<html lang="it">

<head>
    <meta charset="utf-8">
    <meta name="author" content="Matteo Giorgi">
    <meta name="keywords" content="Asteroids, space shooter, arcade">
    <meta name="description" content="Pagina di LogIn e di SignUp">

    <title>Pagina di LogIn e di SignUp</title>

    <link rel="icon" type="image/png" href="./css/img/asteroid.png">
    <link rel="stylesheet" href="./css/logIn&signUp.css">

</head>

<body onload='begin()'>

    <div id="logInSignUpContainer">
        <video autoplay muted loop id="space">
            <source src="./css/video/asteroid_rain.mp4" type="video/mp4">
            Il Browser non supporta gli elementi video.
        </video>

        <div id="formContainer">

            <form id="formLogIn" method="post" action="./php/logIn.php">

                <h1 id="logInHeader" class="form">Log In</h1>

                <span id="usernameLogInHeader" class="form">Username</span>
                <input id="usernameLogIn" type="text" name="usernameLogIn" value="<?php echo $_SESSION['SessionUsernameLogIn']; ?>" class="form">

                <span id="passwordLogInHeader" class="form">Password</span>
                <input id="passwordLogIn" type="password" name="passwordLogIn" value="<?php echo $_SESSION['SessionPasswordLogIn']; ?>" class="form">

                <p id="logInError" class="form"><?php echo $_SESSION['SessionLogInError']; ?></p>

                <button id="submitLogIn" type="submit" class="form">LogIn</button>

            </form>

            <form id="formSignUp" method="post" action="./php/signUp.php">

                <h1 id="signUpHeader" class="form">Sign Up</h1>

                <span id="usernameSignUpHeader" class="form">Username</span>
                <input id="usernameSignUp" type="text" name="usernameSignUp" value="<?php echo $_SESSION['SessionUsernameSignUp']; ?>" class="form">

                <p id="usernameSignUpError" class="form"><?php echo $_SESSION['SessionUsernameSignUpError']; ?></p>

                <span id="passwordSignUpHeader" class="form">Password</span>
                <input id="passwordSignUp" type="password" name="passwordSignUp" value="<?php echo $_SESSION['SessionPasswordSignUp']; ?>" class="form">
                <img id="showPassword" alt='Show Password' src="./css/img/closedeye.png">

                <p id="passwordSignUpError" class="form"><?php echo $_SESSION['SessionPasswordSignUpError']; ?></p>

                <button id="submitSignUp" type="submit" class="form">SignUp</button>

            </form>

            <footer id="infoContainer">
                <button id="changeToSignUp" onclick="changeForm('SignUp',1)">SignUp</button>
                <button id="changeToLogIn" onclick="changeForm('LogIn',1)">LogIn</button>
                <div id="instructionsContainer"><a id='instructions' href='./others/instructions.html'>Instructions</a></div>
                <!-- paragrafo invisibile che utilizzo per recuperare tramite js il valore della variabile di sessione-->
                <p id='ctx'>
                    <?php
                    if (!isset($_SESSION['LogIn_SignUp_Attempt']) || $_SESSION['LogIn_SignUp_Attempt'] === "LogIn")
                        echo "LogIn";
                    else
                        echo "SignUp";
                    ?>
                </p>
            </footer>

        </div>

    </div>

    <script src="./js/logIn&SignUp.js"></script>

</body>

</html>