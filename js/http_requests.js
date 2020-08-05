let request = new XMLHttpRequest();
let shoot_request = new XMLHttpRequest();
let update_request = new XMLHttpRequest();
let delete_request = new XMLHttpRequest();
let check_duel_request = new XMLHttpRequest();
let opponent_connection_check_request = new XMLHttpRequest();

request.onreadystatechange = function() 
{
    if (this.readyState == 4 && this.status == 200)
    {
        console.log("submit request: " + this.responseText);
        
        if (this.responseText == "")
        {
            game_start();
            return;
        }

        let response = JSON.parse(this.responseText);

        if (response)
        {
            if (response.opponent_ships)
            {
                response.opponent_ships.forEach(deck => 
                {
                    elements[deck].classList.add("back_blue");
                });
                return;
            }

            if (response.err)
            {
                console.log("Error");
                return;
            }
        
            duel_id = response.duel_id;

        }
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
            let points = JSON.parse(this.responseText).points;
            if (points)
            {
                checkWin(true, false);
            }
            remove_dead(points, elements, dead_elements);
            can_fire = true;
        }
        else if (JSON.parse(this.responseText).success === "false")
        {
            document.getElementById("client_el_" + id).classList.add("back_miss");
            
            interval = setInterval(function() {check_activity(check_activity_url + "?client_id=" + client_id + "&opponent_id=" + opponent_id, null, "GET");}, 1000);
        }
        
        set_attempt(true);
    }
}

update_request.onreadystatechange = function()
{
    if (this.readyState == 4 && this.status == 200)
    {
        console.log("update request: " + this.responseText);
        
        let points = JSON.parse(this.responseText).points;
        let killed_ships = JSON.parse(this.responseText).killed_ships;
        
        if (JSON.parse(this.responseText).can_fire === "true")
        {
            clearInterval(interval);

            can_fire = true;
        }
        else if (JSON.parse(this.responseText).can_fire === "false")
        {
            can_fire = false;
        }

        set_attempt(true);

        if (points)
        {
            points.forEach(e => {
                if (matrix[e])
                {
                    document.getElementById("opponent_el_" + e).classList.add("back_red");
                }
                else
                {
                    document.getElementById("opponent_el_" + e).classList.add("back_miss");
                }
            });
        }

        if (killed_ships)
        {
            console.log("killed_ships: ");
            console.log(killed_ships);
            checkWin(false, true);
        }

        remove_dead(killed_ships, opponent_elements, matrix);
    }
}

opponent_connection_check_request.onreadystatechange = function()
{
    if (this.readyState == 4 && this.status == 200)
    {
        if (JSON.parse(this.responseText).opponent_connected === "true")
        {
            clearInterval(interval);
            
            game_start();
        }
        else if (JSON.parse(this.responseText).opponent_connected === "false")
        {
            set_attempt(false);
        }
    }
}

delete_request.onreadystatechange = function ()
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

function clear_db(url, args, method)
{
    //async ajax GET request
    delete_request.open(method, url, true);
    if(method == "POST")
        delete_request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    
    //send request
    delete_request.send(args);
}

function opponent_connection_check(url, args, method)
{
    //async ajax GET request
    opponent_connection_check_request.open(method, url, true);
    if(method == "POST")
        opponent_connection_check_request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    
    //send request
    opponent_connection_check_request.send(args);
}

function remove_dead(points, player_elements, field)
{
    if (points)
    {
        points.forEach(p => 
        {
            let p_i = Math.floor(p / height);
            let p_j = p % width;

            //p_i = 5
            //p_j = 0
            for (let i = p_i - 1; i <= p_i + 1; i++)
            {
                for (let j = p_j - 1; j <= p_j + 1; j++)
                {
                    if (i < 0 || j < 0 || i > height - 1 || j > width - 1)
                    {
                        continue;
                    }
                    let index = i * height + j;
                    
                    if (!field[index])
                    {
                        player_elements[index].removeEventListener("click", elementClick);
                        field[index] = true;
                        player_elements[index].classList.add("back_miss");
                    }
                }
            }
        });
    }
}

function checkWin(client, opponent)
{
    if (client)
    {
        if (++clientScore == 10)
        {
            end_game("Game Over. You Won!");
        }
        console.log("Your score: " + clientScore);
    }
    else if (opponent)
    {
        if (++opponentScore == 10)
        {
            end_game("Game Over. You Lost!");
            send_request(display_opponent_url, null, "GET");
            clearInterval(interval);
        }
        console.log("Opponent's score: " + opponentScore);
    }
}

function end_game(title)
{
    set_attempt(null, title);
    elements.forEach(e => e.removeEventListener("click", elementClick));
}