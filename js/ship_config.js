//array of 'ships'
let ships = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];

let currentShipIndex = 0;

//number of decks current ship has
let ship = ships[currentShipIndex];

//array of ship elements IDs
//a bit the same as ship_place but here are stored just numbers
//while ship_place stores elements 
let currentElements = [4];
currentElements.fill(-1);

let ships_array = {
    ships: []
};

//array of elements of current not placed ship
//used to highlight potential position
let ship_place = [];

let width = 10;
let height = 10;

//battlefield booleans (from 0 to 99)
let matrix = new Array(width * height);
matrix.fill(false);

//boolean which indicates whether the user can place a ship on particular position
let canPlace = false;

//direction of the ship. true - horizontal, false - vertical.
let dir = true;

//indicates whether user placed all ships or not
let configDone = false;

let container = document.getElementById("client");

//getting all elements as array (initialy HTMLCollection)
let elements = [...document.getElementsByClassName("client_element")];

//hanging eventListeners on 'mouseover' event to handle position issues
elements.forEach(e => 
{
   e.addEventListener("mouseover", element_mouseover_listener);
});

function element_mouseover_listener()
{
    el_id = parseInt(this.id.split("_")[2]);
    checkBricks(el_id);
}


function checkBricks(id)
{
    elements.forEach(e => 
    {
        e.classList.remove("back_red");
    });

    let i = Math.floor(id / height);
    let j = id % width;
    
    //if the ship isn't within field bounds - don't let user to place it
    if ((dir && (j + ship > width)) || (!dir && (i + ship > height)))
    {
        canPlace = false;
        currentElements = [];
        ship_place.forEach(e =>
        {
            e.classList.remove("back_blue");
        });
        container.classList.add("back_red");
    }
    else
    {
        canPlace = true;
        ship_place = elements.filter(e => 
        {
            let el_id = parseInt(e.id.split("_")[2]);
            if (dir)
            {
                return el_id >= id && el_id < (id + ship);
            }
            else
            {
                let id_j = id % width;
                let el_j = el_id % width;

                return el_j == id_j && (el_id >= id && el_id < id + (ship * width));
            }
        });

        //every time you move to next element background is being cleared
        //but already placed ships remain
        elements.forEach(e =>
        {
            el_id = parseInt(e.id.split("_")[2]);
            if (!matrix[el_id])
                e.classList.remove("back_blue");
        });

        //every time you move to next element current elements change to another set
        currentElements = [];

        //here we check what elements to highlight and populate currentElements with current ship spots
        ship_place.forEach(p => 
        {
            el_id = parseInt(p.id.split("_")[2]);
            currentElements.push(el_id);
            p.classList.add("back_blue");
        });

        //mechanism to avoid collisions
        if (!checkCollisions(dir, currentElements[0], ship))
        {
            // console.log("collision");
            canPlace = false;
        }
        else
        {
            // console.log("ok");
        }

        //if there are collisions or another troubles - indicate
        if (!canPlace)
        {
            ship_place.forEach(p => 
            {
                p.classList.add("back_red");
            });
        }

        container.classList.remove(["back_red"]);

        for (let i = 0; i < height * width; i++)
        {
            if (matrix[i])
            {
                document.getElementById("client_el_" + i).classList.add("back_blue");
            }
        }

    }
}

elements.forEach(e => 
{
    e.addEventListener("click", ship_place_click_listener);
});


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
                // console.log(e);
                matrix[e] = true;
                document.getElementById("client_el_" + e).classList.add("back_blue");
            }
        });
        if (currentShipIndex + 1 == ships.length)
        {
            configDone = true;
            document.getElementById("msg").innerHTML = "You're done!";
            
            // console.log(ships_array);
        }
        else
        {
            ship = ships[++currentShipIndex];
        }
    }
} 

function deleteListeners()
{
    elements.forEach(e => 
    {
        //OK
        e.removeEventListener("mouseover", element_mouseover_listener);

        e.removeEventListener("click", ship_place_click_listener);
    });
    document.getElementById("change_dir_btn").removeEventListener("click", change_dir_click_listener);
}

//toggle direction (horizontal / vertical)

document.getElementById("change_dir_btn").addEventListener("click", change_dir_click_listener);

function change_dir_click_listener()
{
    dir = !dir;
    // console.log(dir);
}

//function to check collisions between current waiting to be placed ship
//and all the others
//May not be BUG FREE!
function checkCollisions(dir, point, len)
{
    let ship_i = Math.floor(point / height);
    let ship_j = point % width;

    let start_i, start_j, end_i, end_j;

    //getting 4 coordinates for the whole rectangle around the ship
    if (dir)
    {
        start_i = ship_i - 1;
        end_i = ship_i + 1;
        start_j = ship_j - 1;
        end_j = ship_j + len;
    }
    else
    {
        start_i = ship_i - 1;
        end_i = ship_i + len;
        start_j = ship_j - 1;
        end_j = ship_j + 1;
    }

    for (let i = start_i; i <= end_i; i++)
    {
        for (let j = start_j; j <= end_j; j++)
        {
            //check whether i or j go out of bounds
            if (i < 0 || i > height - 1 || j < 0 || j > width - 1)
            {
                continue;
            }

            //casting to vector index
            let index = i * height + j;

            //if exists at least one point in matrix of already placed ships
            // - we can't place new here
            if (matrix[index])
            {
                // console.log("collided on i = " + i + " j = " + j);
                return false;
            }
        }
    }
    return true;
}