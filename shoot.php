<?php
    require "./includes/db.php";

    $point = $_GET['point'];
    $client_id = $_GET['client_id'];
    $opponent_id = $_GET['opponent_id'];

    // $sql = "SELECT player_id FROM hits WHERE player_id = ? OR player_id = ? ORDER BY id DESC LIMIT 1";

    // $row = executeQuery($db, $sql, [$client_id, $opponent_id])->fetch(PDO::FETCH_ASSOC);

    // if ($row["player_id"] == $client_id)
    // {
    //     echo json_encode(array("success" => "Not your attempt!"));
    //     die();
    // }
    
    $sql = "INSERT INTO hits (point, player_id) VALUES (?, ?)";

    $row = executeQuery($db, $sql, [$point, $client_id]);

    $sql = "UPDATE ships SET hit = true WHERE player_id = ? AND point = ?";

    $row = executeQuery($db, $sql, [$opponent_id, $point]);    

    if ($row->rowCount() != 0)
    {
        echo json_encode(array("success" => "true"));
    }
    else
    {
        $sql = "UPDATE duel SET active = ?";
        $row = executeQuery($db, $sql, [$opponent_id])->fetch(PDO::FETCH_ASSOC);

        echo json_encode(array("success" => "false"));
    }
?>