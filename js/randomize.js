
//elements, width, height, matrix, ships, ship, ships_array, currentShipIndex, canPlace, currentElements FROM "ship_config.js"

function randomize()
{
    //horizontal; false - vertical
    let dir;
    
    matrix = new Array(width * height);
    matrix.fill(false);

    canPlace = false;
    configDone = false;
    ship_array = {
        ships: []
    };

    elements.forEach(e => 
    {
        e.classList.remove("back_blue");
    });

    currentShipIndex = 0;

    let place;

    for (let i = 0; i < ships.length; i++)
    {
        dir = !!getRandomInt(0, 2);
        ship = ships[i];
        currentElements = [];

        place = checkPlace(ship, dir);

        if (place == null)
        {
            console.log("no place(null)"); 
        }
        else
        {
            if (dir)
            {
                for (let j = place; j < place + ship; j++)
                {
                    currentElements.push(j);
                }       
            }
            else
            {
                for (let j = place; j < place + (ship * height); j += height)
                {
                    currentElements.push(j);
                }
            }
            
        }

        currentElements.forEach(e => 
        {
            if (e != -1)
            {
                matrix[e] = true;
            }
        });

        ships_array.ships[i] = currentElements;

    }

    elements.forEach(e => 
    {
        let id = e.id.split("_")[2];
        if (matrix[id])
        {
            e.classList.add("back_blue");
        }
    });

    currentShipIndex = ships.length - 1;
    ship_place = [];
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;  
  
}


function checkPlace(len, dir)
{
    let places = [];

    for (let i = 0; i < height; i++)
    {
        for (let j = 0; j < width; j++)
        {
            if ((dir && ((j + len) > width)) || (!dir && ((i + len) > height)))
            {
                continue;
            }
            else
            {
                let placable = true;
                if (dir)
                {
                    for (let k = j; k < j + len; k++)
                    {
                        let index = i * height + k;
                        if (matrix[index])
                        {
                            placable = false;
                            break;
                        }
                    }

                }
                else
                {
                    for (let k = i; k < i + len; k++)
                    {
                        let index = k * height + j;
                        if (matrix[index])
                        {
                            placable = false;
                            break;
                        }
                    }
                }
                if (placable)
                {
                    places.push(i * height + j);
                }
            }
        }
    }

    if (places.length == 0)
    {
        return null;
    }

    let toDelete = [];
    places.forEach(p =>
    {
        let norm = checkCollisions(dir, p, len);
        if (!norm)
        {
            toDelete.push(p);
        }
    });

    toDelete.forEach(p => 
    {
        places.splice(places.indexOf(p), 1);
    });

    if (places.length == 0)
    {
        return null;
    }

    return places[getRandomInt(0, places.length)];
}
