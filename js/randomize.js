
//elements, width, height, matrix, ships, ship, ships_array, currentShipIndex, canPlace, currentElements FROM "ship_config.js"

ships = [4, 3];

function randomize()
{
    //horizontal; false - vertical
    let dir;
    
    // matrix = new Array(width * height);
    matrix.fill(false);

    canPlace = false;

    currentShipIndex = 0;

    let place;

    for (let i = 0; i < ships.length; i++)
    {
        dir = !!getRandomInt(0, 2);
        ship = ships[currentShipIndex++];
        currentElements = [];

        place = checkPlace(ship, dir);

        if (place == null)
        {
            console.log("no place(null)"); 
        }
        else
        {
            for (let j = 0; j < ship; j++)
            {
                currentElements.push(place + j);
            }
        }
        

        // console.log("point = " + place + " dir = " + dir);

        


        // elements.filter(e => 
        // {
        //     let id = e.id.split("_")[2];
            
        //     placable = false;
        //     for (let i = 0; i < currentElements.length; i++)
        //     {
        //         if (id == currentElements[i])
        //         {
        //             placable = true;
        //             break;
        //         }
        //     }

        //     // e.classList.add("back_blue");
        //     return placable;

        // });

        currentElements.forEach(e => 
        {
            if (e != -1)
                matrix[e] = true;
        });

        // let points = elements.filter(e => 
        // {
        //     let id = parseInt(e.id.split("_")[2]);

        //     if (dir)
        //     {
        //         return id >= place && id < place + ship;
        //     }
        //     else
        //     {
        //         let place_j = place % width;
        //         let el_j = id % width;

        //         return el_j == place_j && (id >= place && id < place + (ship * width));
        //     }
        // });

    }

    elements.forEach(e => 
    {
        let id = e.id.split("_")[2];
        if (matrix[id])
        {
            e.classList.add("back_blue");
        }
    });

}

randomize();

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;  
  
}


function checkPlace(len, dir)
{
    let places = [];

    for (let i = 0; i < width; i++)
    {
        for (let j = 0; j < height; j++)
        {
            if ((dir && j >= width - len) || (!dir && i >= height - len))
            {
                break;
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

    // places.forEach(p =>
    // {
    //     let norm = checkCollisions(dir, p, len);
    //     if (!norm)
    //     {
    //         places.splice(places.indexOf(p), 1);
    //     }
    // });

    // if (places.length == 0)
    // {
    //     return null;
    // }

    return places[getRandomInt(0, places.length)];

}



// if ((dir && i >= width - len) || (!dir && j >= height - len))
//             {
//                 break;
//             }
//             else
//             {
//                 let start_i, end_i, start_j, end_j;
//                 if (dir)
//                 {
//                     start_i = (i - 1) < 0 ? 0 : (i - 1);
//                     end_i = (i + 1) >= width ? (width - 1) : i + 1;
//                     start_j = (j - 1) < 0 ? 0 : (j - 1);
//                     end_j = (j + len) >= height ? (height - 1) : j + 1;
//                 }
//                 else
//                 {
//                     start_i = (i - 1) < 0 ? 0 : (i - 1);
//                     end_i = (i + len) >= height ? (height - 1) : (i + len);
//                     start_j = (j)
//                 }

//                 if (i < 0)
//                 {
                    
//                 }
//             }