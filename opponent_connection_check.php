<?php
    require "./includes/db.php";
    session_start();

    $client_id = $_SESSION['client_id'];
    $duel_id = $_SESSION['duel_id'];
    
    $sql = "SELECT opponent_id FROM duel WHERE creator_id = ? AND id = ?";

    
    $row = executeQuery($db, $sql, [$client_id, $duel_id])->fetch(PDO::FETCH_ASSOC);
    

    if (!$row["opponent_id"])
    {
        echo json_encode(array("opponent_connected" => "false"));
    }
    else
    {
        $_SESSION["opponent_id"] = $row["opponent_id"];
        
        echo json_encode(array("opponent_connected" => "true"));
    }
?>