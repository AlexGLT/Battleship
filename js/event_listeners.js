//toggle direction (horizontal / vertical)
document.getElementById("change_dir_btn").addEventListener("click", change_dir_click_listener);

//eventListener for 'Randomize' button
document.getElementById("randomBtn").addEventListener("click", random_btn_listener);

let form_submit = [...document.getElementsByClassName("form_submit")];

form_submit.forEach(e => 
{
    e.addEventListener("click", function()
    {
        deleteListeners();
        if (client_id && opponent_id && configDone)
        {
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
        }
    });
});

//hanging eventListeners on 'mouseover' event to handle position issues
elements.forEach(e => 
{
    e.addEventListener("mouseover", element_mouseover_listener);
});

elements.forEach(e => 
{
    e.addEventListener("click", ship_place_click_listener);
});

container.addEventListener('mouseleave', container_leave_listener);

form_submit_btn.addEventListener("click", function() 
{
    //allow click only if both ids are set and all ships placed
    if (client_id_input.value && opponent_id_input.value && configDone)
    {
        client_id = client_id_input.value;
        opponent_id = opponent_id_input.value;

        clear_db(clear_db_url, "client_id=" + client_id, "POST");

        interval = setInterval(function() {check_activity(check_activity_url + "?client_id=" + client_id + "&opponent_id=" + opponent_id,
        null, "GET");}, 1000);
        
        //==========================transfer client's ships on the right side
        elements.forEach(e => e.classList.remove("back_blue"));

        opponent_elements = [...document.getElementsByClassName("opponent_element")];

        opponent_elements.forEach(e => 
        {
            if (matrix[parseInt(e.id.split("_")[2])])
            {
                e.classList.add("back_blue");
            }
        });
        //==========================

        check_duel(check_duel_url, "client_id=" + client_id + "&opponent_id=" + opponent_id, "POST");

        //hide the form. We don't need it anymore.
        document.getElementById("form_info_container").style.display = 'none';
        
        send_request(ship_config_url, "ships=" + JSON.stringify(ships_array) + "&id=" + client_id, "POST");
    }
});


function element_mouseover_listener()
{
    el_id = parseInt(this.id.split("_")[2]);
    checkBricks(el_id);
}

function ship_place_click_listener()
{
    //if user can't place next ship OR all ships are already places
    //do nothing
    if (canPlace && !configDone)
    {
        ships_array.ships[currentShipIndex] = currentElements;
        currentElements.forEach(e => 
        {
            if (e != -1)
            {
                matrix[e] = true;
                document.getElementById("client_el_" + e).classList.add("back_blue");
            }
        });
        if (currentShipIndex + 1 == ships.length)
        {
            configDone = true;
            document.getElementById("msg").innerHTML = "You're done!";
        }
        else
        {
            ship = ships[++currentShipIndex];
        }
    }
} 

function change_dir_click_listener()
{
    dir = !dir;
}

function random_btn_listener()
{
    randomize();
    configDone = true;
    document.getElementById("msg").innerHTML = "You're done!";
} 

function container_leave_listener()
{
    container.classList.remove("back_red");
    ship_place.forEach(p => 
    {
        p.classList.remove("back_red");
        p.classList.remove("back_blue");
    });
}

function container_leave_listener()
{
    container.classList.remove("back_red");
    ship_place.forEach(p => 
    {
        p.classList.remove("back_red");
        p.classList.remove("back_blue");
    });
}

function deleteListeners()
{
    elements.forEach(e => 
    {
        //delete current ship elements highlighter
        e.removeEventListener("mouseover", element_mouseover_listener);

        //delete ship elements place functionality
        e.removeEventListener("click", ship_place_click_listener);
    });

    //delete change direction button click handler as it disappears
    document.getElementById("change_dir_btn").removeEventListener("click", change_dir_click_listener);

    //delete random button click handler as it disappears
    document.getElementById("randomBtn").removeEventListener("click", random_btn_listener);

    //delete client container highlight
    document.getElementById("client").removeEventListener('mouseleave', container_leave_listener);
}
