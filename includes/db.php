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

    function executeQuery($sql, $args)
    {
        try 
        {
            $stmt = $db->prepare($sql);

            if (!$stmt)
            {
                echo "Bad prepare";
            }

            if (!$stmt->execute(args))
            {
                echo "Bad execute";
            }
        }
        catch(PDOException $ex)
        {
            echo "Error: <br>";
            echo $ex->getMessage();
            return null;
        }

        return $stmt;
    }

?>