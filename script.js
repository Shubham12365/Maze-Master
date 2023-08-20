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
let level3 = [
	[1, 0, 1, 1, 1],
	[1, 1, 1, 0, 1],
	[1, 0, 1, 0, 1],
	[1, 1, 1, 0, 1],
	[0, 1, 1, 1, 1],
];
let level4 = [
	[1, 1, 0, 1, 1],
	[1, 1, 1, 1, 0],
	[0, 1, 0, 1, 1],
	[1, 1, 0, 1, 1],
	[1, 0, 1, 1, 1],
];
let level5 = [
	[1, 0, 1, 1, 1, 1],
	[1, 1, 0, 0, 0, 1],
	[1, 0, 1, 1, 0, 1],
	[1, 1, 1, 0, 1, 1],
	[0, 0, 1, 1, 1, 1],
	[1, 1, 1, 0, 1, 1],
];
let level6 = [
	[1, 0, 1, 1, 1, 1],
	[1, 1, 0, 0, 0, 1],
	[1, 0, 1, 1, 1, 1],
	[1, 1, 1, 0, 0, 0],
	[0, 1, 1, 1, 1, 1],
	[1, 1, 1, 0, 1, 1],
];
let level7 = [
	[1, 0, 1, 1, 1, 1, 1, 1],
	[1, 1, 0, 0, 0, 0, 0, 1],
	[1, 0, 1, 1, 0, 1, 1, 1],
	[1, 1, 1, 0, 0, 0, 0, 1],
	[0, 0, 1, 1, 1, 1, 1, 1],
	[1, 1, 1, 0, 1, 0, 0, 0],
	[1, 0, 0, 0, 1, 1, 1, 1],
	[1, 1, 1, 1, 1, 0, 1, 1],
];
let level8 = [
	[1, 0, 1, 1, 1, 1, 1, 1],
	[1, 1, 0, 0, 0, 0, 0, 1],
	[1, 0, 1, 1, 1, 1, 0, 1],
	[1, 1, 1, 0, 0, 0, 0, 1],
	[0, 0, 1, 1, 1, 1, 1, 1],
	[1, 1, 1, 0, 1, 0, 0, 0],
	[1, 0, 0, 0, 1, 1, 1, 1],
	[1, 1, 1, 1, 1, 0, 1, 1],
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
	} else if (level == 4) {
		mazeArray = level4;
	} else if (level == 5) {
		mazeArray = level5;
	} else if (level == 6) {
		mazeArray = level6;
	} else if (level == 7) {
		mazeArray = level7;
	} else if (level == 8) {
		mazeArray = level8;
	}

	// To make mousei and cheese stay in maze
	maze.innerHTML = `<img src="cheese.png" id="cheese" alt="cheese" width="50px" height="50px" />
			<img src="mouse.png" id="mouse" alt="mousei" width="50px" height="50px" />`;

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
let rat = document.querySelector("#mouse");
let cheese = document.querySelector("#cheese");

function setRatPos(x, y) {
	mouse.style.top = x + "px";
	mouse.style.left = y + "px";
}

function setCheesePos(x, y) {
	cheese.style.bottom = x + "px";
	cheese.style.right = y + "px";
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

document.addEventListener("keydown", EventHandle);

let right = document.querySelector(".right");
let left = document.querySelector(".left");
let up = document.querySelector(".up");
let down = document.querySelector(".down");

right.addEventListener("click", function (e) {
	let rat = document.getElementById("mouse");
	let cheese = document.getElementById("cheese");
	let ratleft = rat.offsetLeft; //gives the distance from the left of parent
	let ratTop = rat.offsetTop; //gives the distance from the top of parent
	let foodleft = cheese.offsetLeft;
	let foodTop = cheese.offsetTop;
	let ratPos = getRatPosition();

	if (
		ratleft < (mazeArray[0].length - 1) * 50 &&
		mazeArray[ratPos[0]][ratPos[1] + 1] == 1
	) {
		ratleft += 50;
		rat.style.left = ratleft + "px";
		mazeArray[ratPos[0]][ratPos[1]] = 1;
		mazeArray[ratPos[0]][ratPos[1] + 1] = 2;
	}
	if (ratleft == foodleft && ratTop == foodTop) {
		alert("Exercise kr mousei");
		// mazeArray[3][3] = 1;
		setRatPos(0, 0);
		setCheesePos(0, 0);
		mazeArray[0][0] = 2;
		mazeArray[mazeArray.length - 1][mazeArray[0].length - 1] = 1;
	}
});

left.addEventListener("click", function (e) {
	let rat = document.getElementById("mouse");
	let cheese = document.getElementById("cheese");
	let ratleft = rat.offsetLeft; //gives the distance from the left of parent
	let ratTop = rat.offsetTop; //gives the distance from the top of parent
	let foodleft = cheese.offsetLeft;
	let foodTop = cheese.offsetTop;
	let ratPos = getRatPosition();

	if (ratleft > 0 && mazeArray[ratPos[0]][ratPos[1] - 1] == 1) {
		console.log(ratleft);
		ratleft -= 50;
		rat.style.left = ratleft + "px";
		mazeArray[ratPos[0]][ratPos[1]] = 1;
		mazeArray[ratPos[0]][ratPos[1] - 1] = 2;
	}
	if (ratleft == foodleft && ratTop == foodTop) {
		alert("Exercise kr mousei");
		// mazeArray[3][3] = 1;
		setRatPos(0, 0);
		setCheesePos(0, 0);
		mazeArray[0][0] = 2;
		mazeArray[mazeArray.length - 1][mazeArray[0].length - 1] = 1;
	}
});

up.addEventListener("click", function (e) {
	let rat = document.getElementById("mouse");
	let cheese = document.getElementById("cheese");
	let ratleft = rat.offsetLeft; //gives the distance from the left of parent
	let ratTop = rat.offsetTop; //gives the distance from the top of parent
	let foodleft = cheese.offsetLeft;
	let foodTop = cheese.offsetTop;
	let ratPos = getRatPosition();

	if (ratTop > 0 && mazeArray[ratPos[0] - 1][ratPos[1]] == 1) {
		console.log(ratTop);
		ratTop -= 50;
		rat.style.top = ratTop + "px";
		mazeArray[ratPos[0]][ratPos[1]] = 1;
		mazeArray[ratPos[0] - 1][ratPos[1]] = 2;
	}
	if (ratleft == foodleft && ratTop == foodTop) {
		alert("Exercise kr mousei");
		// mazeArray[3][3] = 1;
		setRatPos(0, 0);
		setCheesePos(0, 0);
		mazeArray[0][0] = 2;
		mazeArray[mazeArray.length - 1][mazeArray[0].length - 1] = 1;
	}
});

down.addEventListener("click", function (e) {
	let rat = document.getElementById("mouse");
	let cheese = document.getElementById("cheese");
	let ratleft = rat.offsetLeft; //gives the distance from the left of parent
	let ratTop = rat.offsetTop; //gives the distance from the top of parent
	let foodleft = cheese.offsetLeft;
	let foodTop = cheese.offsetTop;
	let ratPos = getRatPosition();

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
	if (ratleft == foodleft && ratTop == foodTop) {
		alert("Exercise kr mousei");
		// mazeArray[3][3] = 1;
		setRatPos(0, 0);
		setCheesePos(0, 0);
		mazeArray[0][0] = 2;
		mazeArray[mazeArray.length - 1][mazeArray[0].length - 1] = 1;
	}
});

left.addEventListener("click", EventHandle);
up.addEventListener("click", EventHandle);
down.addEventListener("click", EventHandle);

function EventHandle(e) {
	let rat = document.getElementById("mouse");
	let cheese = document.getElementById("cheese");
	let ratleft = rat.offsetLeft; //gives the distance from the left of parent
	let ratTop = rat.offsetTop; //gives the distance from the top of parent
	let foodleft = cheese.offsetLeft;
	let foodTop = cheese.offsetTop;
	let ratPos = getRatPosition();

	function right() {
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
	// console.log(mazeArray.length);
	if (e.key == "ArrowRight" || e == right.click) {
		right();
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
		alert("Exercise kr mousei");
		// mazeArray[3][3] = 1;
		setRatPos(0, 0);
		setCheesePos(0, 0);
		mazeArray[0][0] = 2;
		mazeArray[mazeArray.length - 1][mazeArray[0].length - 1] = 1;
	}
}
