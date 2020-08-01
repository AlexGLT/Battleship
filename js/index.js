    //obtaining array from HTMLCollection
    //let elements = [...document.getElementsByClassName("element")];
    let request = new XMLHttpRequest();

    let can_fire = true;

    //change it to the url of php script you want to use
    let shoot_url = "shoot.php";
    let ship_config_url = "ship_config.php";
    let check_activity_url = "check_activity.php";
    let clear_db_url = "clear_db.php";
    let check_duel_url = "check_duel.php";

    let id = 0;
    let interval;

    let client_id;
    let opponent_id;

    let client_id_input = document.getElementById("client_id");
    let opponent_id_input = document.getElementById("opponent_id");

    let turn_msg = document.getElementById("turn");

    let form_submit_btn = document.getElementById("form_submit");

    let shoot_request = new XMLHttpRequest();
    let update_request = new XMLHttpRequest();
    let delete_request = new XMLHttpRequest();
    let check_duel_request = new XMLHttpRequest();

    //already shot elements
    dead_elements = new Array(height * width);
    dead_elements.fill(false);

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

            clear_db(clear_db_url, "client_id=" + client_id, "POST");

            document.getElementById("randomBtn").removeEventListener("click", randomBtnlistener);
            container.removeEventListener('mouseleave', containerLeaveListener);
            
            setTimeout(function() {check_duel(check_duel_url, "client_id=" + client_id + "&opponent_id=" + opponent_id, "POST");}, 1000);
            
            elements.forEach(e => e.classList.remove("back_blue"));

            opponent_elements = [...document.getElementsByClassName("opponent_element")];

            opponent_elements.forEach(e => 
            {
                if (matrix[parseInt(e.id.split("_")[2])])
                {
                    e.classList.add("back_blue");
                }
            });
            
            // check_duel(check_duel_url, "client_id=" + client_id + "&opponent_id=" + opponent_id, "POST");

            //hide the form. We don't need it anymore.
            document.getElementById("form_info_container").style.display = 'none';
            
            send_request(ship_config_url, "ships=" + JSON.stringify(ships_array) + "&id=" + client_id, "POST");
        }
    });

    container.addEventListener('mouseleave', containerLeaveListener);

    function containerLeaveListener()
    {
        container.classList.remove("back_red");
        ship_place.forEach(p => 
        {
            p.classList.remove("back_red");
            p.classList.remove("back_blue");
        });
    }

    //eventListener for 'Randomize' button
    document.getElementById("randomBtn").addEventListener("click", randomBtnlistener);

    function randomBtnlistener()
    {
        randomize();
        configDone = true;
        document.getElementById("msg").innerHTML = "You're done!";
    } 

    //configuring callback for ajax request
    request.onreadystatechange = function() 
    {
        if (this.readyState == 4 && this.status == 200)
        {
            console.log("submit request: " + this.responseText);
        }
    }

    shoot_request.onreadystatechange = function()
    {
        if (this.readyState == 4 && this.status == 200)
        {
            console.log("shoot request: " + this.responseText);
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

    update_request.onreadystatechange = function()
    {
        if (this.readyState == 4 && this.status == 200)
        {
            console.log("update request: " + this.responseText);
            if (JSON.parse(this.responseText).can_fire === "true")
            {
                clearInterval(interval);
                can_fire = true;
                let point = JSON.parse(this.responseText).point;
                if (point)
                {
                    if (matrix[point])
                    {
                        
                        console.log(point);
                        document.getElementById("opponent_el_" + point).classList.add("back_red");
                    }
                    else
                    {
                        document.getElementById("opponent_el_" + point).classList.add("back_miss");
                    }
                }
                else
                {
                    can_fire = true;
                }
            }
            else if (JSON.parse(this.responseText).can_fire === "false")
            {
                can_fire = false;
                if (matrix[point])
                    {
                        
                        console.log(point);
                        document.getElementById("opponent_el_" + point).classList.add("back_red");
                    }
            }
        }
    }

    check_duel_request.onreadystatechange = function()
    {
        if (this.readyState == 4 && this.status == 200)
        {
            console.log(this.responseText);
            if (JSON.parse(this.responseText).can_fire === "true")
            {
                can_fire = true;
            }
            else if (JSON.parse(this.responseText).can_fire === "false")
            {
                can_fire = false;

                interval = setInterval(function() {check_activity(check_activity_url + "?client_id=" + client_id + "&opponent_id=" + opponent_id,
                null, "GET");}, 1000);
            }
        }
        else
        {
            if (this.readyState == 4)
            {
                console.log("duel request status: " + this.status);
            }
        }
    }

    delete_request.onreadystatechange = function()
    {
        if (this.readyState == 4 && this.status == 200)
        {
            console.log(this.responseText);
        }
        else
        {
            if (this.readyState == 4)
            {
                console.log("delete request status: " + this.status);
            }
        }
    }

    //hanging eventListeners for every element on click event
    elements.forEach(e => e.addEventListener("click", function () 
    {
        //we can make a move only if both ids are set
        if (client_id && opponent_id && configDone && can_fire)
        {
            let local_id = this.id.split("_")[2];
            if (!dead_elements[local_id])
            {
                id = local_id;
                clearInterval(interval);
                shoot(shoot_url + "?point=" + local_id + "&opponent_id=" + opponent_id + "&client_id=" + client_id, null, "GET");
                dead_elements[local_id] = true;
                interval = setInterval(function() {check_activity(check_activity_url + "?client_id=" + client_id + "&opponent_id=" + opponent_id,
                null, "GET");}, 1000);
                can_fire = false;
            }
        }
    }));

    function check_activity(url, args, method)
    {
        update_request.open(method, url, true);
        if(method == "POST")
            update_request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        
        update_request.send(args);
    }

    function shoot(url, args, method)
    {
        shoot_request.open(method, url, true);
        if(method == "POST")
            shoot_request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        
        shoot_request.send(args);
    }

    function send_request(url, args, method)
    {
        //async ajax GET request
        request.open(method, url, true);
        if(method == "POST")
            request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        
        //send request
        request.send(args);
    }

    function check_duel(url, args, method)
    {
        //async ajax GET request
        check_duel_request.open(method, url, true);
        if(method == "POST")
            check_duel_request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        
        //send request
        check_duel_request.send(args);
    }

    function clear_db(url, args, method)
    {
        //async ajax GET request
        delete_request.open(method, url, true);
        if(method == "POST")
            delete_request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        
        //send request
        delete_request.send(args);
    }

    function set_attempt(state)
    {
        can_fire = state;
        if (can_fire)
        {
            turn_msg.innerHTML("Your attempt");
        }
        else
        {
            turn_msg.innerHTML("Your opponent's attempt");
        }
    }
