    //obtaining array from HTMLCollection
    // let elements = [...document.getElementsByClassName("element")];
    let request = new XMLHttpRequest();
    
    
    //change it to the url of php script you want to use
<<<<<<< HEAD
    let url = "ship_config.php";
    let id = 0;
    
    let player_id;
    let opponent_id;
    
    let player_id_input = document.getElementById("player_id");
    let opponent_id_input = document.getElementById("opponent_id");
    
=======
    let shoot_url = "shoot.php";
    let ship_config_url = "ship_config.php";
    
    let id = 0;

    let client_id;
    let opponent_id;

    let client_id_input = document.getElementById("client_id");
    let opponent_id_input = document.getElementById("opponent_id");

>>>>>>> 248ea8d5a0605805262517c8c51c5a31e0d54c55
    let form_submit_btn = document.getElementById("form_submit");


    

    form_submit_btn.addEventListener("click", function() 
    {
        //allow click only if both ids are set
<<<<<<< HEAD
        if (player_id_input.value && opponent_id_input.value && configDone)
        {
            player_id = player_id_input.value;
=======
        // configDone

        if (client_id_input.value && opponent_id_input.value && true)
        {
            client_id = client_id_input.value;
>>>>>>> 248ea8d5a0605805262517c8c51c5a31e0d54c55
            opponent_id = opponent_id_input.value;

            ship_place.forEach(e => 
            {
                e.classList.remove("back_blue");
            });

            
            
            
            elements.forEach(e => e.classList.remove("back_blue"));

            opponent_elements = [...document.getElementsByClassName("opponent_element")];

            // let matr_index = 0;
            opponent_elements.forEach(e => 
            {
                if (matrix[parseInt(e.id.split("_")[2])])
                {
                    e.classList.add("back_blue");
                }
            });

            //hide the form. We don't need it anymore.
            document.getElementById("form_info_container").style.display = 'none';
<<<<<<< HEAD
            // console.log(JSON.stringify(ships_array));
            shoot(url, 2, "ships=" + JSON.stringify(ships_array) + "&id=" + player_id, "POST");
=======

            // temp = JSON.stringify(ships_array);

            

            send_request(ship_config_url, "ships=" + JSON.stringify(ships_array) + "&id=" + client_id, "POST");
>>>>>>> 248ea8d5a0605805262517c8c51c5a31e0d54c55
        }
    });

    //configuring callback for ajax request
    request.onreadystatechange = function() 
    {
        if (this.readyState == 4 && this.status == 200)
        {
<<<<<<< HEAD
            console.log(this.responseText);
            // document.getElementById("el_" + id).classList.add("back_blue");//style.background = this.responseText;
        }
    }

    
=======
            // console.log(this.responseText);
            // let response = JSON.parse(this.responseText);
        }
    }

    // send_request(1);
>>>>>>> 248ea8d5a0605805262517c8c51c5a31e0d54c55

    //hanging eventListeners for every element on click event
    elements.forEach(e => e.addEventListener("click", function () 
    {
        //we can make a move only if both ids are set
<<<<<<< HEAD
        if (player_id && opponent_id && configDone)
=======
        if (client_id && opponent_id && configDone)
>>>>>>> 248ea8d5a0605805262517c8c51c5a31e0d54c55
        {
            let local_id = this.id.split("_")[2];
            id = local_id;
            send_request(shoot_url, "point=" + local_id + "&player_id=" + client_id, "GET");
            // shoot(id);
        }
    }));

<<<<<<< HEAD
    

    function shoot(url, opponent_id, args, method)
    {
        //async ajax GET request
        request.open(method, url, true);
=======
    function send_request(url, args, method)
    {
        //async ajax GET request
        request.open(method, url, true);

>>>>>>> 248ea8d5a0605805262517c8c51c5a31e0d54c55
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        //send request
        request.send(args);
    }