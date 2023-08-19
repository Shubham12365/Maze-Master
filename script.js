let level1 = [
	[1, 0, 1, 0],
	[1, 1, 1, 1],
	[1, 0, 1, 0],
	[1, 0, 1, 1],
];
let level2 = [
	[1, 1, 1, 0, 1, 0],
	[1, 0, 1, 1, 1, 1],
	[0, 0, 1, 0, 0, 0],
	[1, 0, 1, 1, 1, 1],
	[1, 1, 1, 0, 1, 1],
];

let mazeArray = level1;
let isLevelChangeListenerAdded = false;
// console.log(mazeArray.length);
let Level = document.querySelector("#levelselect");

function handlelevel() {
	let level = Level.value;
	// console.log(level);
	if (level == 1) {
		mazeArray = level1;
	} else if (level == 2) {
		mazeArray = level2;
	} else if (level == 3) {
		mazeArray = level3;
	}

	// To make motii and momo stay in maze
	maze.innerHTML = `<img src="momo.jpg" id="momo" alt="momo" width="50px" height="50px" />
			<img src="moti.jpg" id="moti" alt="motii" width="50px" height="50px" />`;

	createMaze();
}

function addLevelChangeListener() {
	if (!isLevelChangeListenerAdded) {
		Level.addEventListener("change", handlelevel);
		isLevelChangeListenerAdded = true;
	}
}

function removeLevelChangeListener() {
	Level.removeEventListener("change", handlelevel);
	isLevelChangeListenerAdded = false;
}

// Initially add the event listener
addLevelChangeListener();

// Level.addEventListener("change", handlelevel);
let maze = document.querySelector(".maze_container");
let rat = document.querySelector("#moti");
let cheese = document.querySelector("#momo");

function setRatPos(x, y) {
	moti.style.top = x + "px";
	moti.style.left = y + "px";
}

function setCheesePos(x, y) {
	momo.style.bottom = x + "px";
	momo.style.right = y + "px";
}

function createMaze() {
	mazeArray[0][0] = 2;
	mazeArray[mazeArray.length - 1][mazeArray[0].length - 1] = 1;
	for (let i = 0; i < mazeArray.length; i++) {
		let row = document.createElement("div");
		row.classList.add("row");

		for (let j = 0; j < mazeArray[i].length; j++) {
			let cell = document.createElement("div");
			cell.classList.add("cell");
			if (mazeArray[i][j] == 0) {
				cell.classList.add("wall");
			}
			// if (i == 0 && j == 0) {
			// 	mazeArray[i][j] = 2;
			// }

			row.appendChild(cell);
		}

		maze.appendChild(row);
	}
	setRatPos(0, 0);
	setCheesePos(0, 0);

	console.log(getRatPosition(), mazeArray);
	getRatPosition();
}

function getRatPosition() {
	let position = [-1, -1];
	for (let i = 0; i < mazeArray.length; i++) {
		for (let j = 0; j < mazeArray[i].length; j++) {
			if (mazeArray[i][j] == 2) {
				position[0] = i;
				position[1] = j;
			}
		}
	}
	return position;
}

document.addEventListener("keydown", function (e) {
	let rat = document.getElementById("moti");
	let cheese = document.getElementById("momo");
	let ratleft = rat.offsetLeft; //gives the distance from the left of parent
	let ratTop = rat.offsetTop; //gives the distance from the top of parent
	let foodleft = cheese.offsetLeft;
	let foodTop = cheese.offsetTop;
	let ratPos = getRatPosition();

	// console.log(mazeArray.length);
	if (e.key == "ArrowRight") {
		if (
			ratleft < (mazeArray[0].length - 1) * 50 &&
			mazeArray[ratPos[0]][ratPos[1] + 1] == 1
		) {
			ratleft += 50;
			rat.style.left = ratleft + "px";
			mazeArray[ratPos[0]][ratPos[1]] = 1;
			mazeArray[ratPos[0]][ratPos[1] + 1] = 2;
		}
	}
	if (e.key == "ArrowLeft") {
		if (ratleft > 0 && mazeArray[ratPos[0]][ratPos[1] - 1] == 1) {
			console.log(ratleft);
			ratleft -= 50;
			rat.style.left = ratleft + "px";
			mazeArray[ratPos[0]][ratPos[1]] = 1;
			mazeArray[ratPos[0]][ratPos[1] - 1] = 2;
		}
	}
	if (e.key == "ArrowUp") {
		if (ratTop > 0 && mazeArray[ratPos[0] - 1][ratPos[1]] == 1) {
			console.log(ratTop);
			ratTop -= 50;
			rat.style.top = ratTop + "px";
			mazeArray[ratPos[0]][ratPos[1]] = 1;
			mazeArray[ratPos[0] - 1][ratPos[1]] = 2;
		}
	}
	if (e.key == "ArrowDown") {
		if (
			mazeArray[ratPos[0] + 1][ratPos[1]] == 1 &&
			ratTop < (mazeArray.length - 1) * 50
		) {
			console.log(ratTop);
			ratTop += 50;
			rat.style.top = ratTop + "px";
			mazeArray[ratPos[0]][ratPos[1]] = 1;
			mazeArray[ratPos[0] + 1][ratPos[1]] = 2;
			console.log(mazeArray);
		}
	}

	if (ratleft == foodleft && ratTop == foodTop) {
		alert("Exercise kr motii");
		// mazeArray[3][3] = 1;
		setRatPos(0, 0);
		setCheesePos(0, 0);
		mazeArray[0][0] = 2;
		mazeArray[mazeArray.length - 1][mazeArray[0].length - 1] = 1;
	}
});
