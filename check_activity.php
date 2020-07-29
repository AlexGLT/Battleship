<?php
    require "./includes/db.php";

    $client_id = $_GET['client_id'];
    $opponent_id = $_GET['opponent_id'];

    $sql = "SELECT player_id, point FROM hits WHERE player_id = ? OR player_id = ? ORDER BY id DESC LIMIT 1";

    $row = executeQuery($db, $sql, [$opponent_id, $client_id])->fetch(PDO::FETCH_ASSOC);

    if ($row["player_id"] == $client_id)
    {
        echo json_encode(array("can_fire" => "false"));
    }
    else
    {
        echo json_encode(array("can_fire" => "true", "point" => $row["point"]));
    }
?>