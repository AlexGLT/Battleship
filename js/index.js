    //obtaining array from HTMLCollection
    //let elements = [...document.getElementsByClassName("element")];
    let request = new XMLHttpRequest();

    //change it to the url of php script you want to use
    let shoot_url = "shoot.php";
    let ship_config_url = "ship_config.php";
    
    let id = 0;

    let client_id;
    let opponent_id;

    let client_id_input = document.getElementById("client_id");
    let opponent_id_input = document.getElementById("opponent_id");

    let form_submit_btn = document.getElementById("form_submit");

    form_submit_btn.addEventListener("click", function() 
    {
        //allow click only if both ids are set

        if (client_id_input.value && opponent_id_input.value && configDone)
        {
            client_id = client_id_input.value;
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
            
            send_request(ship_config_url, "ships=" + JSON.stringify(ships_array) + "&id=" + client_id, "POST");
        }
    });

    //configuring callback for ajax request
    request.onreadystatechange = function() 
    {
        if (this.readyState == 4 && this.status == 200)
        {
            console.log(this.responseText);

            console.log(id);

            if (JSON.parse(this.responseText).success === "true")
            {
                
                document.getElementById("client_el_" + id).classList.add("back_red");
            }
            else if (JSON.parse(this.responseText).success === "false")
            {
                document.getElementById("client_el_" + id).classList.add("back_blue");
            }
        }
    }

    // send_request(1);

    //hanging eventListeners for every element on click event
    elements.forEach(e => e.addEventListener("click", function () 
    {
        //we can make a move only if both ids are set
        if (client_id && opponent_id && configDone)
        {
            let local_id = this.id.split("_")[2];
            id = local_id;
            // id = "point=" + local_id + "&opponent_id=" + opponent_id + "&client_id=" + client_id
            send_request(shoot_url + "?point=" + local_id + "&opponent_id=" + opponent_id + "&client_id=" + client_id, null, "GET");
        }
    }));

    function send_request(url, args, method)
    {
        //async ajax GET request
        request.open(method, url, true);
        if(method == "POST")
            request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        
        //send request
        request.send(args);
    }