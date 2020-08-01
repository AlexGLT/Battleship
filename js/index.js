    //obtaining array from HTMLCollection
    //let elements = [...document.getElementsByClassName("element")];

    let can_fire = true;

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

    //already shot elements
    dead_elements = new Array(height * width);
    dead_elements.fill(false);

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
