<?php
    if ($_SERVER['REQUEST_METHOD'] != 'GET')
    {
        header("location: index.php");
        die();
    }

    require "./includes/db.php";
    session_start();

    $duel_id = $_SESSION['duel_id'];
    $client_id = $_SESSION['client_id'];
    $opponent_id = $_SESSION['opponent_id'];

    $sql = "SELECT COUNT(*) as score FROM deck WHERE ship_id IN(SELECT id FROM ship WHERE duel_id = ? AND player_id = ?) AND hit = ?";

    $result = executeQuery($db, $sql, [$duel_id, $client_id, true])->fetch(PDO::FETCH_ASSOC);

    $score = $result['score'];
    // echo $result['score'];

    if ($score != 20)
    {
        echo json_encode(array("err" => "not 20 decks dead"));
        die();
    }

    $sql = "SELECT point from deck WHERE ship_id IN(SELECT id FROM ship WHERE duel_id = ? AND player_id = ?) AND hit = ?";

    $result = executeQuery($db, $sql, [$duel_id, $opponent_id, false]);

    $points = array();

    while ($row = $result->fetch(PDO::FETCH_ASSOC))
    {
        array_push($points, $row['point']);
    }

    echo json_encode(array("opponent_ships" => $points));

?>