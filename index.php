<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sea Battle</title>
    <link rel="stylesheet" href="./css/index.css">
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

    <script>
        var elements = [...document.getElementsByClassName("element")];
        let request = new XMLHttpRequest();
        let url = "shoot.php";
        let id = 0;

        //configuring callback for ajax request
        request.onreadystatechange = function() 
        {
            if (this.readyState == 4 && this.status == 200)
            {
                document.getElementById("el_" + id).style.background = this.responseText;
            }
        }

        //hanging eventListeners for every element on click event
        elements.forEach(e => e.addEventListener("click", function () 
        {
            let local_id = this.id.split("_")[1];
            console.log(local_id);
            id = local_id
            shoot(id);
        }));

        function shoot(id)
        {
            //async ajax GET request
            request.open("GET", url, true);
            //send request
            request.send();
        }


    </script>

</body>
</html>