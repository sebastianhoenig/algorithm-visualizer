const CONTAINER = document.getElementsByClassName("grid")[0];
let rows = document.getElementsByClassName("row");
let cells = document.getElementsByClassName("cell");

const NO_COLS = 50;
const NO_ROWS = 20;
let start_node_exists = false;
let end_node_exists = false;

function setNode(div) {
  if (start_node_exists) {
    setEndNode(div);
    end_node_exists = true;
  } else {
    setStartNode(div);
    start_node_exists = true;
  }
}

function setStartNode(div) {
  div.classList.add("start");
}

function setEndNode(div) {
  div.classList.add("end");
}

function setWall(div) {
  if (!div.getAttribute("start") && !div.getAttribute("end")) {
    div.setAttribute("wall", "true");
    div.classList.add("wall");
  }
}

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
      cell_div.setAttribute("wall", "false");
      row_div.append(cell_div);
    }
    CONTAINER.append(row_div);
  }
}

async function doBfs(start_node, end_node) {
  if (start_node === end_node) {
    return;
  }
  let queque = [];
  queque.push(start_node);
  start_node.setAttribute("visited", "true");
  start_node.classList.add("visited");
  while (queque) {
    let current_node = queque.shift();
    let neighbours = findNeighbours(current_node);
    if (neighbours.length !== 0) {
      for (let neighbour of neighbours) {
        neighbour.setAttribute("visited", "true");
        neighbour.classList.add("current");
        await sleep(5);
        neighbour.classList.remove("current");
        neighbour.classList.add("visited");
        if (neighbour === end_node) {
          visualizePath(end_node, start_node);
          return neighbour;
        } else {
          queque.push(neighbour);
        }
      }
    }
  }
}

async function doDfs(start_node, end_node) {
  if (start_node === end_node) {
    return;
  }
  let stack = [];
  stack.push(start_node);
  while (stack) {
    let current_node = stack.pop();
    current_node.setAttribute("visited", "true");
    current_node.classList.add("visited");
    if (current_node === end_node) {
      visualizePath(end_node, start_node);
      return end_node;
    }
    let neighbours = findNeighbours(current_node);
    if (neighbours.length !== 0) {
      for (let neighbour of neighbours) {
        stack.push(neighbour);
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
    if (left_neighbour.getAttribute("visited") == "false") {
      if (left_neighbour.getAttribute("wall") == "false") {
        left_neighbour.setAttribute("previous_x", x);
        left_neighbour.setAttribute("previous_y", y);
        neighbour_array.push(left_neighbour);
      }
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
    if (right_neighbour.getAttribute("visited") == "false") {
      if (right_neighbour.getAttribute("wall") == "false") {
        right_neighbour.setAttribute("previous_x", x);
        right_neighbour.setAttribute("previous_y", y);
        neighbour_array.push(right_neighbour);
      }
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
    if (top_neighbour.getAttribute("visited") == "false") {
      if (top_neighbour.getAttribute("wall") == "false") {
        top_neighbour.setAttribute("previous_x", x);
        top_neighbour.setAttribute("previous_y", y);
        neighbour_array.push(top_neighbour);
      }
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
    if (bottom_neighbour.getAttribute("visited") == "false") {
      if (bottom_neighbour.getAttribute("wall") == "false") {
        bottom_neighbour.setAttribute("previous_x", x);
        bottom_neighbour.setAttribute("previous_y", y);
        neighbour_array.push(bottom_neighbour);
      }
    }
  }
  return neighbour_array;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function visualizePath(end_node, start_node) {
  let path = [];
  path.push(end_node);
  let curr_node = end_node;
  while (curr_node != start_node) {
    let previous_node = document.querySelector(
      "[x=" +
        CSS.escape(curr_node.getAttribute("previous_x")) +
        "][y=" +
        CSS.escape(curr_node.getAttribute("previous_y")) +
        "]"
    );
    path.push(previous_node);
    curr_node = previous_node;
  }
  path.reverse();
  for (let node of path) {
    await sleep(30);
    node.classList.add("path");
    node.classList.remove("visited");
  }
}

createGrid(NO_ROWS, NO_COLS);

function startBfs() {
  if (start_node_exists && end_node_exists) {
    let start_node = document.getElementsByClassName("start")[0];
    let end_node = document.getElementsByClassName("end")[0];
    doBfs(start_node, end_node);
  }
}

function startDfs() {
  if (start_node_exists && end_node_exists) {
    let start_node = document.getElementsByClassName("start")[0];
    let end_node = document.getElementsByClassName("end")[0];
    doDfs(start_node, end_node);
  }
}

function clearGrid() {
  for (let cell of cells) {
    cell.classList.remove("path");
    cell.classList.remove("visited");
    cell.setAttribute("visited", "false");
    cell.removeAttribute("previous_x");
    cell.removeAttribute("previous_y");
    cell.setAttribute("wall", "false");
    cell.classList.remove("wall");
    cell.classList.remove("start");
    cell.classList.remove("end");
    start_node_exists = false;
    end_node_exists = false;
  }
}

for (j = 0; j < cells.length; j++) {
  cells[j].addEventListener("click", function () {
    if (start_node_exists) {
      if (end_node_exists) {
        return;
      } else {
        setEndNode(this);
        end_node_exists = true;
      }
    } else {
      setStartNode(this);
      start_node_exists = true;
    }
  });
  cells[j].addEventListener("mousemove", function (e) {
    if (e.buttons == 1) {
      if (start_node_exists && end_node_exists) {
        setWall(this);
      }
    }
  });
}
