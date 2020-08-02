<?php
    require "./includes/db.php";

    session_start();

    $client_id = $_SESSION['client_id'];
    $opponent_id = $_SESSION['opponent_id'];
    $duel_id = $_SESSION["duel_id"];
    $opponent_hit_count = $_SESSION["opponent_hit_count"];

    $sql = "SELECT active FROM duel WHERE id = ?";
    $result = executeQuery($db, $sql, [$duel_id])->fetch(PDO::FETCH_ASSOC);
    $active = $result["active"];

    $sql = "SELECT COUNT(point) as point_count FROM hit WHERE player_id = ? AND duel_id = ?";

    $result = executeQuery($db, $sql, [$opponent_id, $duel_id])->fetch(PDO::FETCH_ASSOC);

    $point_count = $result["point_count"];

    $points = [];

    if ($point_count > $opponent_hit_count)
    {
        $delta = $point_count - $opponent_hit_count;
        $sql = "SELECT point FROM hit WHERE player_id = ? AND duel_id = ? ORDER BY id DESC LIMIT $delta";
        $result = executeQuery($db, $sql, [$opponent_id, $duel_id]);
        
        while($row = $result->fetch(PDO::FETCH_ASSOC))
        {
            array_push($points, $row["point"]);
        }

        $_SESSION["opponent_hit_count"] = $point_count;
    }
    else
    {
        $points = null;
    }

    switch($active)
    {
        case $client_id: echo json_encode(array("can_fire" => "true", "points" => $points)); break;
        case $opponent_id: echo json_encode(array("can_fire" => "false", "points" => $points)); break;
    }
    
?>
