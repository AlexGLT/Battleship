<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sea Battle</title>
    <link rel="stylesheet" href="./css/test.css">
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC&display=swap" rel="stylesheet">
    <link rel="shortcut icon" href="./favicon.png" type="image/x-icon">
</head>
<body >

    <div class="container">
        <?php

            $width = 10;
            $height = 10;

            for ($i = 0; $i < $width; $i++)
            {
                echo "<div class = 'line' id = 'line_" . ($i) . "'>";
                for ($j = 0; $j < $height; $j++)
                {
                        echo "<div class = 'element' id = 'el_" . ($i * $width + $j) . "'></div>";
                }
                echo "</div>";
            }
        ?>
    </div>

    <div id = "form_info_container">
        <form id = "form_info">
            <div>
                <label for = "player_id">Enter your ID:</label>
                <input class = "id_input" id = "player_id" type = "number" min = "1" max = "10" step = "1" value = "1">
            </div>
            <div>
                <label for = "oponent_id">Enter your oponent's ID:</label>
                <input class = "id_input" id = "oponent_id" type = "number" min = "1" max = "10" step = "1" value = "2">
            </div>      
            <button id = "form_submit" type = "button">Submit</button> 
            <button type = "button" id = "change_dir_btn">Change direction</button>
            <div id = "msg"></div>
        </form>
    </div>


    <script src = "./js/test.js">

    </script>

</body>
</html>