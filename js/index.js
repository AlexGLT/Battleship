    //obtaining array from HTMLCollection
    //let elements = [...document.getElementsByClassName("element")];

    let can_fire;

    let shoot_url = "shoot.php";
    let ship_config_url = "ship_config.php";
    let check_activity_url = "check_activity.php";
    let clear_db_url = "clear_db.php";
    let check_duel_url = "check_duel.php";
    let opponent_connection_check_url = "opponent_connection_check.php";

    let duel_id;

    let to_duel_id;

    let id = 0;
    let interval;

    let client_id;
    let opponent_id;

    let client_id_input = document.getElementById("client_id");
    let opponent_id_input = document.getElementById("opponent_id");

    let turn_msg = document.getElementById("attempt");

    let form_create = document.getElementById("form_create");

    let form_join = document.getElementById("form_join");

    let clientScore = 0;
    let opponentScore = 0;

    //already shot elements
    dead_elements = new Array(height * width);
    dead_elements.fill(false);

    function set_attempt(opponent_connected, game_over = "")
    {   
        if (game_over)
        {
            console.log(game_over);
            turn_msg.innerHTML = game_over;
            return;
        }
        if (!opponent_connected)
        {
            turn_msg.innerHTML = "Duel ID: " + duel_id;
        }
        else
        {
            if (can_fire)
            {
                turn_msg.innerHTML = "Your attempt";
            }
            else
            {
                turn_msg.innerHTML = "Your opponent's attempt";
            }
        }
    }
