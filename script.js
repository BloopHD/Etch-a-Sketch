let gridContainer = document.getElementById("gridContainer");
let sizeButton = document.getElementById("buttonSize");
let refreshButton = document.getElementById("buttonRefresh");

let gridSize = 16;

// sets up buttons
sizeButton.addEventListener('click', getSize);
refreshButton.addEventListener('click', createGrid);

createGrid();

// Gets size of grid from user.
function getSize() {
    do {

        gridSize = prompt("Enter grid size:");

    } while (gridSize < 0 || gridSize > 100);
        
    createGrid();
}

// Draws on the square.
function drawOn(e) {
    e.target.classList.add("hovered");
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

            col.addEventListener('mouseover', drawOn);

            // Use this to have it down on mousedown while moving mouseover?
            // doesn't work...
            // col.addEventListener('mouseover', () => {
            //     col.addEventListener('mouseover', drawOn)
            // });

            row.appendChild(col);
        }   
    }
}

// Destroys grid to make room for new grid.
function destroyGrid() {
    gridContainer.innerHTML = '';
}
