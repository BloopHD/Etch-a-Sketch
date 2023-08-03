let gridContainer = document.getElementById("gridContainer");
let sizeButton = document.getElementById("buttonSize");
let refreshButton = document.getElementById("buttonRefresh");
let rainbowButton = document.getElementById("buttonRainbow");
let coloringButton = document.getElementById("buttonColoring");
let eraserButton = document.getElementById("buttonEraser");

let gridSize = 25;
let rainbowMode = false;
let eraserMode = false;
let color = "rgb(64,64,64)";

setUpButtons();
preventDrag();
createGrid();

// Gets size of grid from user.
function getSize() {
    do {

        gridSize = prompt("Enter grid size (1-100):");

    } while (gridSize < 0 || gridSize > 100 || isNaN(parseInt(gridSize)));
        
    createGrid();
}

// Draws on the square.
function drawOn(e) {

    if (eraserMode) {
        color = "rgb(255,255,255)"
    } else if (rainbowMode) {
        color = randomColor();
    } else {
        color = "rgb(64,64,64)"
    }

    e.target.style.backgroundColor = color;

}

// Creates grid to size - gridSize.
function createGrid() {
    destroyGrid();

    for (i = 0; i < gridSize; i++) {

        const row = document.createElement('div');
        row.className = "row"
        gridContainer.appendChild(row);
    
        for (j = 0; j < gridSize; j++) {
            
            const col = document.createElement('div');
            col.className = "col"

            //col.addEventListener('mouseover', drawOn);

            // Use this to have it down on mousedown while moving mouseover?
            // doesn't work...
            gridContainer.addEventListener('mousedown', () => {
                col.addEventListener('mouseover', drawOn)
            });

            window.addEventListener('mouseup', ()=> {
                col.removeEventListener('mouseover', drawOn)
            })

            row.appendChild(col);
        }   
    }
}

// Destroys grid to make room for new grid.
function destroyGrid() {
    gridContainer.innerHTML = '';
}

function randomColor() {

    let r = randomColorNumber();
    let g = randomColorNumber();
    let b = randomColorNumber();

    return "rgb("+[r,g,b]+")";
}

function randomColorNumber() {

    return Math.floor(Math.random() * 255) + 1  // between 0 - 256
}

function setUpButtons() {

    sizeButton.addEventListener('click', getSize);
    refreshButton.addEventListener('click', createGrid);
    rainbowButton.addEventListener('click', () => { 
        rainbowMode = true; 
        eraserMode = false 
    });
    coloringButton.addEventListener('click', () => { 
        rainbowMode = false; 
        eraserMode = false;
    });
    eraserButton.addEventListener('click', () => { 
        rainbowMode = false; 
        eraserMode = true; 
    });
}

function setColor() {
    color = "rgb(64,64,64)";
}

function preventDrag() {

    document.body.addEventListener('dragstart', (e) => {
        e.preventDefault();
    })
    
    document.body.addEventListener('drop', (e) => {
        e.preventDefault();
    })
}
