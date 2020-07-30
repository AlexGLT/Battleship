<?php

    require "./includes/db.php";

    if ($_SERVER['REQUEST_METHOD'] != 'POST')
    {
        header("location: index.php");
        die();
    }

    $client_id = $_POST['client_id'];

    $sql = "DELETE FROM ships WHERE player_id = ?";

    executeQuery($db, $sql, [$client_id]);

    $sql = "DELETE FROM hits WHERE player_id = ?";

    executeQuery($db, $sql, [$client_id]);

    $sql = "DELETE FROM duel WHERE player_1 = ? OR player_2 = ?";

    executeQuery($db, $sql, [$client_id, $client_id]);

?>