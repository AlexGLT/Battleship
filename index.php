<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sea Battle</title>
    <link rel="stylesheet" href="./css/index.css">
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC&display=swap" rel="stylesheet">
    <link rel="shortcut icon" href="./img/favicon.png" type="image/x-icon">
</head>
<body >
    <div class = "main_coontainer">
        <div class = "container" id = "client">
            <?php

                $width = 10;
                $height = 10;

                for ($i = 0; $i < $width; $i++)
                {
                    echo "<div class = 'line' id = 'line_" . ($i) . "'>";
                    for ($j = 0; $j < $height; $j++)
                    {
                        echo "<div class = 'element client_element' id = 'client_el_" . ($i * $width + $j) . "'></div>";
                    }
                    echo "</div>";
                }
            ?>
        </div>

        <div class = "container" id = "opponent">
            <?php

                $width = 10;
                $height = 10;

                for ($i = 0; $i < $width; $i++)
                {
                    echo "<div class = 'line' id = 'opponent_line_" . ($i) . "'>";
                    for ($j = 0; $j < $height; $j++)
                    {
                        echo "<div class = 'element opponent_element' id = 'opponent_el_" . ($i * $width + $j) . "'></div>";
                    }
                    echo "</div>";
                }
            ?>
        </div>
        
        <div id = "form_info_container">
            <label class = "form_info_label" for = "client_id">Enter your ID:</label>
            <input class = "id_input" id = "client_id" type = "number" min = "1" max = "10" step = "1" value = "1">
        
            <label class = "form_info_label" for = "opponent_id">Enter your opponent's ID:</label>
            <input class = "id_input" id = "opponent_id" type = "number" min = "1" max = "10" step = "1" value = "2">
            <button id = "form_submit" type = "button">Submit</button> 
            <button type = "button" id = "change_dir_btn">Change direction</button>
            <div id = "msg"></div>
        </div>
    </div>

    <script src = "./js/ship_config.js"></script>
    <script src = "./js/index.js"></script>
</body>
</html>