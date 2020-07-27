<?php

    require "./includes/db.php";

    //selecting only ships 'coordinates' of particular player
    $sql = "SELECT point FROM ships
        WHERE player_id = ?";

    $stmt = $db->prepare($sql);

    if (!$stmt)
    {
        echo "Bad prepare";
    }

    if (!$stmt->execute([1]))
    {
        echo "Bad execute";
    }

    $output = array();
    $output['points'] = array();

    while($rows = $stmt->fetch(PDO::FETCH_ASSOC))
    {
        array_push($output['points'], (int)$rows['point']);
    }

    echo json_encode($output);

?>