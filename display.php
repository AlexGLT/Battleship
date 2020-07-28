<?php

    require "./includes/db.php";

    //selecting only ships 'coordinates' of particular player
    $sql = "SELECT point FROM ships
        WHERE player_id = ?";

    

    $output = array();
    $output['points'] = array();

    while($rows = $stmt->fetch(PDO::FETCH_ASSOC))
    {
        array_push($output['points'], (int)$rows['point']);
    }

    echo json_encode($output);

?>