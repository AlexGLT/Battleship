<?php

    //your connection credentials;
    $host = "";
    $user_name = "";
    $pwd = "";
    $dbname = "";
    $conn_string = "mysql:host=" . $host . ";dbname=" . $dbname;
    try
    {
        $db = new PDO($conn_string, $user_name, $pwd);

        //set PDO to throw exceptions
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }
    catch(PDOException $ex)
    {
        echo "Cought an error: <br>"; 
        echo $ex->getMessage();
    }
?>