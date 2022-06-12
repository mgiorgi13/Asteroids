<?php 
    //prendo le variabili di sessione e le distruggo e poi torno alla pagina di login
    session_start();
    session_destroy();
    header("location: ../index.php");
?>