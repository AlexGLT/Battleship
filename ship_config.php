<?php
    // var_dump($_POST);
    $data = json_decode($_POST['ships']);
    $client_id = $_POST['id'];
    print_r($data->ships);
    echo $id;
?>  