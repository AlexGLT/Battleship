<?php
    require "./includes/db.php";

    $client_id = $_GET['client_id'];
    $opponent_id = $_GET['opponent_id'];

    $sql = "SELECT active FROM duel WHERE (player_1 = ? AND player_2 = ?) OR (player_1 = ? AND player_2 = ?)";
    $row = executeQuery($db, $sql, [$client_id, $opponent_id, $opponent_id, $client_id])->fetch(PDO::FETCH_ASSOC);

    if ($row["active"] == $opponent_id)
    {
        echo json_encode(array("can_fire" => "false"));
    }
    else
    {
        $sql = "SELECT point FROM hits WHERE player_id = ? ORDER BY id DESC LIMIT 1";
        $row = executeQuery($db, $sql, [$opponent_id])->fetch(PDO::FETCH_ASSOC);
        echo json_encode(array("can_fire" => "true", "point" => $row["point"]));
    }
?>
