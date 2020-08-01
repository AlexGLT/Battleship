let request = new XMLHttpRequest();
let shoot_request = new XMLHttpRequest();
let update_request = new XMLHttpRequest();
let delete_request = new XMLHttpRequest();
let check_duel_request = new XMLHttpRequest();

request.onreadystatechange = function() 
{
    if (this.readyState == 4 && this.status == 200)
    {
        console.log("submit request: " + this.responseText);

        if (this.responseText == "")
        {
            responseError = false;
            return;
        }
        let response = JSON.parse(this.responseText);

        if (response != null)
        {
            if (response.duel_id)
            {
                console.log("duel id: " + response.duel_id);
            }
            else if (response.err)
            {
                console.log("Error");
                responseError = true;
            }
        }
    }
    else
    {
        if (this.readyState == 4)
        {
            console.log("submit request status: " + this.status);
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
        }
    }
}

check_duel_request.onreadystatechange = function()
{
    if (this.readyState == 4 && this.status == 200)
    {
        console.log(this.responseText);
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

function send_request(url, args, method, type)
{
    //async ajax GET request
    request.open(method, url, type);
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