
// Styling is applied with Javascript. Practice doing it all in Javascript but normally would use a CSS file

/*
	Step 1: Create a table
*/

// Create styles
var selectedCellCSS = "4px solid black";
var borderCSS = "1px solid black"

// Create skeleton for table and headers
var myTable = document.createElement("table");
myTable.style.border = borderCSS;

myTable.appendChild(document.createElement("thead"));
myTable.getElementsByTagName("thead")[0].appendChild(document.createElement("tr"));


// Create the header cells
for (var i = 0; i < 4; i++)
{
	var headerCell = document.createElement("th");
	headerCell.textContent = "Header " + (i+1);
	headerCell.style.border = borderCSS;
	myTable.getElementsByTagName("tr")[0].appendChild(headerCell);
}

myTable.appendChild(document.createElement("tbody"));

// Create a new row for each data row
for (var i = 0; i < 4; i++)
{
	var tableRow = document.createElement("tr");
	myTable.getElementsByTagName("tbody")[0].appendChild(document.createElement("tr"));
	
	// Create the data cells
	for (var j = 0; j < 4; j++)
	{
		var dataCell = document.createElement("td");
		dataCell.textContent = (j+1) + ", " + (i+1);
		
		// 1,1 should have a thick border
		if (i == 0 && j == 0)
			dataCell.style.border = selectedCellCSS;
		else
			dataCell.style.border = borderCSS;
		myTable.getElementsByTagName("tbody")[0].children[i].appendChild(dataCell);
	}
}

document.body.appendChild(myTable);


/*
	Step 2: 4 direction buttons
*/
var row = 0;
var col = 0;

var b1 = document.createElement("button");
var b2 = document.createElement("button");
var b3 = document.createElement("button");
var b4 = document.createElement("button");

b1.textContent = "Up";
b2.textContent = "Down";
b3.textContent = "Left";
b4.textContent = "Right";

// Attach events
function SwapCell(origCell, newCell)
{
	origCell.style.border = borderCSS;
	newCell.style.border = selectedCellCSS;
}

function MoveUp(e)
{
	if (row != 0)
	{
		var origCell = document.getElementsByTagName("tbody")[0].children[row--].children[col];
		var newCell = document.getElementsByTagName("tbody")[0].children[row].children[col];
		SwapCell(origCell, newCell);
	}
}

function MoveDown(e)
{
	if (row != document.getElementsByTagName("tbody")[0].children.length - 1)
	{
		var origCell = document.getElementsByTagName("tbody")[0].children[row++].children[col];
		var newCell = document.getElementsByTagName("tbody")[0].children[row].children[col];
		SwapCell(origCell, newCell);
	}
}

function MoveLeft(e)
{
	if (col != 0)
	{
		var origCell = document.getElementsByTagName("tbody")[0].children[row].children[col--];
		var newCell = document.getElementsByTagName("tbody")[0].children[row].children[col];
		SwapCell(origCell, newCell);
	}
}

function MoveRight(e)
{
	if (col != document.getElementsByTagName("tbody")[0].children[row].children.length - 1)
	{
		var origCell = document.getElementsByTagName("tbody")[0].children[row].children[col++];
		var newCell = document.getElementsByTagName("tbody")[0].children[row].children[col];
		SwapCell(origCell, newCell);
	}
}

b1.addEventListener("click", MoveUp);
b2.addEventListener("click", MoveDown);
b3.addEventListener("click", MoveLeft);
b4.addEventListener("click", MoveRight);

document.body.appendChild(b1);
document.body.appendChild(b2);
document.body.appendChild(b3);
document.body.appendChild(b4);


/*
	Step 3: A button labeled "Mark Cell"
*/

function Mark(e)
{
	document.getElementsByTagName("tbody")[0].children[row].children[col].style.background = "yellow";
}

var markCell = document.createElement("button")
markCell.textContent = "Mark Cell";
markCell.addEventListener("click", Mark);

document.body.appendChild(markCell);