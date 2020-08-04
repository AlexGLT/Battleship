<?php
    require "./includes/db.php";

    session_start();

    $point = $_GET['point'];
    
    $duel_id = $_SESSION['duel_id'];
    $client_id = $_SESSION['client_id'];
    $opponent_id = $_SESSION['opponent_id'];

    $sql = "SELECT active FROM duel WHERE id = ?";

    $result = executeQuery($db, $sql, [$duel_id])->fetch(PDO::FETCH_ASSOC);

    if ($result["active"] == $opponent_id)
    {
        echo json_encode(array("success" => "Not your attempt!"));
        die();
    }
    
    $sql = "INSERT INTO hit (duel_id, player_id, point) VALUES (?, ?, ?)";

    $result = executeQuery($db, $sql, [$duel_id, $client_id, $point]);

    $sql = "UPDATE deck SET hit = true WHERE ship_id in(SELECT id FROM ship WHERE duel_id = ? AND player_id = ?) AND point = ?";

    $result = executeQuery($db, $sql, [$duel_id, $opponent_id, $point]);    

    $points = [];

    if ($result->rowCount() != 0)
    {
        $sql = "SELECT * FROM deck WHERE ship_id = (SELECT id FROM ship WHERE id IN(SELECT ship_id FROM deck WHERE point = ?) AND duel_id = ? AND player_id = ?)";
        $result = executeQuery($db, $sql, [$point, $duel_id, $opponent_id]);
        
        while($row = $result->fetch(PDO::FETCH_ASSOC))
        {
            if($row["hit"])
            {
                array_push($points, $row["point"]);
            }
            else
            {
                echo json_encode(array("success" => "true"));
                die();
            }

        }

        echo json_encode(array("success" => "true", "points" => $points));
    }
    else
    {
        $sql = "UPDATE duel SET active = ? WHERE id = ?";
        $result = executeQuery($db, $sql, [$opponent_id, $duel_id]);

        echo json_encode(array("success" => "false"));
    }
?>