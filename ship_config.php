<?php
<<<<<<< HEAD
    // var_dump($_POST);
    $data = json_decode($_POST['ships']);
    $client_id = $_POST['id'];
    print_r($data->ships);
    echo $id;
?>  
=======
    // if($_SERVER['REQUEST_METHOD'] != "POST")
    // {
    //     header("location: index.php");
    //     die("Error");
    // }

    require "./includes/db.php";

    $data = json_decode($_POST['ships']);
    $client_id = $_POST['id'];

    $data = $data->ships;

    $sql = "INSERT INTO ships (ship_id, point, player_id) VALUES ";
    $values = array();

    for ($i = 0; $i < count($data); $i++)
    {
        for($j = 0; $j < count($data[$i]); $j++)
        {
            $sql .= "(?, ?, ?), ";
            array_push($values, $i);
            array_push($values, $data[$i][$j]);
            array_push($values, $client_id);
        }
    }

    $sql = substr($sql, 0, -2);

    $rows = executeQuery($db, $sql, $values);

    echo $rows->rowCount();

    ?>
>>>>>>> 248ea8d5a0605805262517c8c51c5a31e0d54c55
