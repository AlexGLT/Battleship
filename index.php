<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="/css/index.css">
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
                    if ($j == $height - 1)
                    {
                        echo "<div class = 'element_right' id = 'el_" . ($i * $width + $j) . "'></div>";
                    }
                    else
                    {
                        echo "<div class = 'element' id = 'el_" . ($i * $width + $j) . "'></div>";
                    }
                }
                echo "</div>";
            }
        ?>
    </div>

</body>
</html>