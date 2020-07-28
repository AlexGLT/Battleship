<?php
    $config = json_decode(file_get_contents("config.json"));

    //your connection credentials;
    $host = $config->host;
    $user_name = $config->user_name;
    $pwd = $config->pwd;
    $dbname = $config->dbname;
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

    function executeQuery($db, $sql, $args)
    {
        try 
        {
            $stmt = $db->prepare($sql);

            if (!$stmt)
            {
                echo "Bad prepare";
            }

            if (!$stmt->execute($args))
            {
                echo "Bad execute";
            }

            return $stmt;
        }
        catch(PDOException $ex)
        {
            echo "Error: <br>";
            echo $ex->getMessage();
            return null;
        }
    }

?>