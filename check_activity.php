<?php
    require "./includes/db.php";
    
    session_start();

    $client_id = $_SESSION['client_id'];
    $opponent_id = $_SESSION['opponent_id'];
    $duel_id = $_SESSION["duel_id"];
    $opponent_last_hit_id = $_SESSION["opponent_last_hit_id"];
    $checked_ships_id = $_SESSION["checked_ships_id"];

    $sql = "SELECT active FROM duel WHERE id = ?";
    $result = executeQuery($db, $sql, [$duel_id])->fetch(PDO::FETCH_ASSOC);
    $active = $result["active"];

    $sql = "SELECT * FROM hit WHERE id > ? AND duel_id = ? AND player_id = ? ORDER BY id DESC";
    $result = executeQuery($db, $sql, [$opponent_last_hit_id, $duel_id, $opponent_id]);

    $points = [];
    $killed_ships = [];

    while ($row = $result->fetch(PDO::FETCH_ASSOC))
    {
        array_push($points, $row["point"]);

        if ($_SESSION["opponent_last_hit_id"] < $row["id"]) $_SESSION["opponent_last_hit_id"] = $row["id"];
    }

    if ($points[0] != null)
    {
        foreach($points as $point)
        {
            $sql = "SELECT * FROM deck WHERE ship_id IN (SELECT id FROM ship WHERE duel_id = ? AND player_id = ?) AND ship_id IN (SELECT ship_id FROM deck WHERE point = ?)";
            $result = executeQuery($db, $sql, [$duel_id, $client_id, $point]);

            $ship_id;
            $ship = [];

            while($row = $result->fetch(PDO::FETCH_ASSOC))
            {
                if (in_array($ship_id = $row["ship_id"], $checked_ships_id))
                {
                    break;
                }

                if ($row["hit"])
                {
                    array_push($ship, $row["point"]);
                }
                else
                {
                    $ship_id = null;
                    $ship = null;
                    break;
                }
            }

            // if (!$row["point"] && !$killed_ships) $killed_ships = null;
            if ($ship) $killed_ships[] = $ship;

            array_push($checked_ships_id, $ship_id);
        }
    }
    else
    {
        $points = null;
        $killed_ships = null;
    }
    
    if (!$killed_ships[0]) $killed_ships = null;

    $_SESSION["checked_ships_id"] = $checked_ships_id;

    if ($active == $client_id)
    {
        echo json_encode(array("can_fire" => "true", "points" => $points, "killed_ships" => $killed_ships));
    }
    else if ($active == $opponent_id)
    {
        echo json_encode(array("can_fire" => "false", "points" => $points, "killed_ships" => $killed_ships));
    }
?>
