const CONTAINER = document.getElementsByClassName("container")[0];
let rows = document.getElementsByClassName("row");
let cells = document.getElementsByClassName("cell");

const NO_COLS = 50;
const NO_ROWS = 20;
const START_NODE = 566;
const END_NODE = 590;

function createGrid(NO_ROWS, NO_COLS) {
  for (i = 0; i < NO_ROWS; i++) {
    let row_div = document.createElement("div");
    row_div.className = "row";
    for (j = 0; j < NO_COLS; j++) {
      let cell_div = document.createElement("div");
      cell_div.className = "cell";
      cell_div.setAttribute("x", j.toString());
      cell_div.setAttribute("y", i.toString());
      cell_div.setAttribute("visited", "false");
      row_div.append(cell_div);
    }
    CONTAINER.append(row_div);
  }
}

function colourStartAndEnd(START_NODE, END_NODE) {
  cells[START_NODE].classList.add("start");
  cells[END_NODE].classList.add("end");
}

function doBfs(START_NODE, END_NODE) {
  if (!START_NODE || !END_NODE || START_NODE === END_NODE) {
    return;
  }
  let end_node = cells[END_NODE];
  let start_node = cells[START_NODE];
  let queque = [];
  queque.push(start_node);
  start_node.setAttribute("visited", "true");
  while (queque) {
    let current_node = queque.shift();
    let neighbours = findNeighbours(current_node);
    for (let neighbour of neighbours) {
      if (neighbour === end_node) {
        console.log("Shortest path found");
        return neighbour;
      } else {
        neighbour.setAttribute("visited", "true");
        queque.push(neighbour);
      }
    }
  }
}

function findNeighbours(current_node) {
  let x = current_node.getAttribute("x");
  let y = current_node.getAttribute("y");
  let neighbour_array = [];
  if (x != 0) {
    let left_neighbour = document.querySelector(
      "[x=" +
        CSS.escape((parseInt(x) - 1).toString()) +
        "][y=" +
        CSS.escape(y) +
        "]"
    );
    if (left_neighbour.getAttribute("visited") === "false") {
      neighbour_array.push(left_neighbour);
    }
  }
  if (x != 49) {
    let right_neighbour = document.querySelector(
      "[x=" +
        CSS.escape((parseInt(x) + 1).toString()) +
        "][y=" +
        CSS.escape(y) +
        "]"
    );
    if (right_neighbour.getAttribute("visited") === "false") {
      neighbour_array.push(right_neighbour);
    }
  }
  if (y != 0) {
    let top_neighbour = document.querySelector(
      "[x=" +
        CSS.escape(x) +
        "][y=" +
        CSS.escape((parseInt(y) - 1).toString()) +
        "]"
    );
    neighbour_array.push(top_neighbour);
    if (top_neighbour.getAttribute("visited") === "false") {
      neighbour_array.push(top_neighbour);
    }
  }
  if (y != 19) {
    let bottom_neighbour = document.querySelector(
      "[x=" +
        CSS.escape(x) +
        "][y=" +
        CSS.escape((parseInt(y) + 1).toString()) +
        "]"
    );
    if (bottom_neighbour.getAttribute("visited") === "false") {
      neighbour_array.push(bottom_neighbour);
    }
  }
  return neighbour_array;
}

createGrid(NO_ROWS, NO_COLS);
colourStartAndEnd(START_NODE, END_NODE);
