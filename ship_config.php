<?php
    if($_SERVER['REQUEST_METHOD'] != "POST")
    {
        header("location: index.php");
        die("Error");
    }

    require "./includes/db.php";

    session_start();

    $data = json_decode($_POST['ships'], true);
    $data = $data['ships'];
    $client_id = $_POST['client_id'];
    $duel_id = $_POST['duel_id'];
    $join = $_POST['join'];

    $_SESSION['client_id'] = $client_id;
    
    if ($join)
    {
        $sql = "UPDATE duel SET opponent_id = ? WHERE id = ?";
        $result = executeQuery($db, $sql, [$client_id, $duel_id]);
        
        if ($result->rowCount() == 0)
        {
            echo json_encode(array("err" => "No such duel!"));
            die();
        }
        
        $_SESSION['duel_id'] = $duel_id;

        $sql = "SELECT creator_id FROM duel WHERE opponent_id = ? AND id = ?";
        $result = executeQuery($db, $sql, [$client_id, $duel_id])->fetch(PDO::FETCH_ASSOC);
        
        $_SESSION["opponent_id"] = $result["creator_id"];
    }
    else
    {
        $sql = "INSERT INTO duel(creator_id, active) VALUES(?, ?)";

        $result = executeQuery($db, $sql, [$client_id, $client_id]);

        $duel_id = $db->lastInsertId();

        // echo $duel_id;

        $_SESSION['duel_id'] = $duel_id;

        echo json_encode(array("duel_id" => $duel_id));
    }

    for ($i = 0; $i < count($data); $i++)
    {   
        $sql = "INSERT INTO ship(duel_id, player_id, deck_count) VALUES(?, ?, ?)";

        executeQuery($db, $sql, [$duel_id, $client_id, count($data[$i])]);

        $ship_id = $db->lastInsertId();

        for ($j = 0; $j < count($data[$i]); $j++)
        {
            $sql = "INSERT INTO deck(ship_id, point) VALUES(?, ?)";

            executeQuery($db, $sql, [$ship_id, $data[$i][$j]]);
        }
    }  

    $_SESSION["opponent_hit_count"] = 0;
?>
