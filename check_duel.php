<?php

    require "./includes/db.php";

    $client_id = $_POST['client_id'];
    $opponent_id = $_POST['opponent_id'];

    $sql = "SELECT * FROM duel WHERE player_1 = ?";
    $row = executeQuery($db, $sql, [$client_id])->fetch(PDO::FETCH_ASSOC);

    if ($row["player_1"] == $client_id)
    {
        $sql = "DELETE FROM duel WHERE player_1 = ?";
        executeQuery($db, $sql, [$client_id]);
    }

    $sql = "SELECT * FROM duel WHERE (player_1 = ? AND player_2 = ?) OR (player_1 = ? AND player_2 = ?)";

    $row = executeQuery($db, $sql, [$client_id, $opponent_id, $opponent_id, $client_id]);

    if ($row->rowCount() == 0)
    {
        $sql = "INSERT INTO duel(player_1, player_2, active)
        VALUES(?, ?, ?)";

        executeQuery($db, $sql, [$client_id, $opponent_id, $client_id]);

        echo json_encode(array("can_fire" => "true"));
    }
    else
    {
        echo json_encode(array("can_fire" => "false"));
    }

?>