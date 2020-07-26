    
    let elements = [...document.getElementsByClassName("element")];
    let request = new XMLHttpRequest();
    let url = "shoot.php";
    let id = 0;

    let player_id;
    let oponent_id;

    let player_id_input = document.getElementById("player_id");
    let oponent_id_input = document.getElementById("oponent_id");

    let form_submit_btn = document.getElementById("form_submit");

    form_submit_btn.addEventListener("click", function() 
    {
        // console.log(player_id_input.value);
        if (player_id_input.value && oponent_id_input.value)
        {
            player_id = player_id_input.value;
            oponent_id = oponent_id_input.value;
            document.getElementById("form_info_container").style.visibility = 'hidden';
        }
    });

    //configuring callback for ajax request
    request.onreadystatechange = function() 
    {
        if (this.readyState == 4 && this.status == 200)
        {
            document.getElementById("el_" + id).classList.add("back_blue");//style.background = this.responseText;
        }
    }

    //hanging eventListeners for every element on click event
    elements.forEach(e => e.addEventListener("click", function () 
    {
        if (player_id && oponent_id)
        {
            let local_id = this.id.split("_")[1];
            console.log(local_id);
            id = local_id
            shoot(id);
        }
    }));

    

    function shoot(id)
    {
        //async ajax GET request
        request.open("GET", url, true);
        //send request
        request.send();
    }