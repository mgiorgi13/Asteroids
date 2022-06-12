<?php
//contiene la classe per la connessione al db
$dbHostname = "localhost";
$dbUsername = "root";
$dbPassword = "";
$dbName = "asteroids";


    $AsteroidsDB = new AsteroidsDBManager(); //Crea una nuova sitanza della classe del database

	class AsteroidsDBManager {
		private $mysqli_conn = null;

		function AsteroidsDBManager(){
			$this->openConnection();
		}
    
    	function openConnection(){
    		if (!$this->isOpened()){
    			global $dbHostname;
    			global $dbUsername;
    			global $dbPassword;
    			global $dbName;
    			
    			$this->mysqli_conn = new mysqli($dbHostname, $dbUsername, $dbPassword);
				if ($this->mysqli_conn->connect_error) 
					die('Connect Error (' . $this->mysqli_conn->connect_errno . ') ' . $this->mysqli_conn->connect_error);

				$this->mysqli_conn->select_db($dbName) or
					die ('Can\'t use pweb: ' . mysqli_error($this->mysqli_conn));
			}
    	}

		//chiusura della connessione
		function closeConnection()
		{
			if ($this->mysqli_conn !== null)
				$this->mysqli_conn->close();

			$this->mysqli_conn = null;
		}
    
    	//controllo se ho effettuato la connessione
    	function isOpened(){
       		return ($this->mysqli_conn != null);
    	}

   		//esecuzione e restituzione risultato query
		function performQuery($queryText) {
			if (!$this->isOpened())
				$this->openConnection();
			
			return $this->mysqli_conn->query($queryText);
		}
		
		//filtro per i dati passati
		function sqlInjectionFilter($parameter){
			if(!$this->isOpened())
				$this->openConnection();
				
			return $this->mysqli_conn->real_escape_string($parameter);
		}
	}
?>