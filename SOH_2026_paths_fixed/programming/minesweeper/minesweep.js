
// GAME controller
var onLoad = function(){
    var mines, cells, newClassNames, newIDs, rightClick;
    var clickEvents = new Object();
    console.log(clickEvents);
    mines = loadMines();
    info = collectInfo();
    //target = setUpEventListener();

    var test = newFxn();
    target = clickEvents.target;
    console.log(target);
//    newClassNames = assignClassName(data.cellArr);
//    newIDs = assignIDs();
    //showNums();
    assignMines(mines);
    setUpEventListener();
    assignNums();
    newFxn();
    setMine();
    finishGame(mines);
    console.log(mines);
  //  openSpace(target);
// DO WE NEED .CELL AND .CELLARR? BOTH SAME ARRAY!!!
    var data = new Object();
    data.mines = mines;
    data.cells = info.cells;
    data.cellArr = info.cellArr;
    data.newClassNames = info.newClassNames; // DO WE NEED THIS?
    data.newIDs = info.newIDs;
    data.target = target;
    console.log(data);
return data;

}; // End of onLoad function.

// Play button - reload page
var reload = document.querySelector('#play');
reload.addEventListener('click', function(){
    location.reload();
});



// create mines
var loadMines = function(){
    var mines = [];
    for (var i=0; i<5; i++){
        mines[i] = Math.round(Math.random(i)*25);
    };
    return mines;
};

// collect data
var collectInfo = function(){
//    var cells = document.querySelectorAll('.cell');
//    var cellArr = Array.from(cells);
    var info = new Object();
    var newClassNames = assignClassName();
    var newIDs = assignIDs();
    // store new data
    info.cells = cells;
    info.cellArr = cellArr;
    info.newClassNames = newClassNames;
    info.newIDs = newIDs;

    return info;
};


// DO WE NEED NEW CLASS AND NEW ID!?!?!
var assignClassName = function(){
  var newClass = [];
    for (var i=0; i<cellArr.length; i++){
        var getCell = cellArr[i] + i;
        var newclass = getCell.className = '.cell ' + i;
        newClass.push(newclass);
    }
    return newClass;
};


var assignIDs = function(){
    var newIDs = [];
    for (var i=0; i<cellArr.length; i++){
        var newid = cellArr[i].id = (i);
        newIDs.push(newid);
    };
    return newIDs;
};


var assignMines = function(mines){
// assign mines to cells
    for (var i=0; i<mines.length; i++){
        for (var j=0; j<cellArr.length; j++){
            if (mines[i] == cellArr[j].id){
                cellArr[j].innerHTML = '<p>M</p>';
            }
        }
    };

};

var youLose = function(showCount){
    alert('You lose! Play again!');
};

// Declare variables
  // Put all cells into array
var cells = document.querySelectorAll('.cell');
var cellArr = Array.from(cells);

var l1, l2, l3, up, down, r1, r2, r3;
var Positions = function(l1, l2, l3, up, down, r1, r2, r3){
    this.l1 = l1,
    this.l2 = l2,
    this.l3 = l3,
    this.up = up,
    this.down = down,
    this.r1 = r1,
    this.r2 = r2,
    this.r3 = r3
}

// ADD EVENT LISTENER FOR CLICK
var setUpEventListener = function(){

    for (var i=0; i<cellArr.length; i++){
        var target, showCount, para;
        cellArr[i].addEventListener('click', function(el){
      //  var targetCell = el.target.parentNode;
        target = el.target;
        para = target.childNodes;
        showCount = para[0];
        if (showCount) showCount.style.visibility = 'visible';
        if (showCount.textContent == 'M'){
            youLose();
        };
        return target;
        });
      };

  /*      var openSpace = function(allCells){
            var targetText = target.textContent;


            console.log(allCells);

            if (targetText == '0'){
                // function: check surrounding cells for zeros and display all connected zeros
                for(i=0; i<checkPositions.length; i++){
                    var temp = checkPositions[i];
                    if (temp) {
                      show.push(temp);
                    };
                };

            };

            for (i=0; i<show.length; i++){
                var x = show[i].id;
                arrIDs.push(x);
            }
        // show other zero divs
            allSquares = document.getElementsByClassName('.cell');
            for (i=0; i<arrIDs.length; i++){
                k = arrIDs[i];
                for (j=0; j<arrIDs.length; j++){
                    cellArr[k].textContent = '0';
                }
            }

        };
*/

  /*      var rightClick = function(){
            var rightCl;
            cellArr[i].addEventListener('dblclick', function(e){
                if (e.which) rightCl = (e.which == 1);
                console.log(rightCl);
            });
            return rightCl;
        };

        rightClick();     */

}; // End of setUpEventListener

var assignNums = function(){
    var num;
    for (var i=0; i<cellArr.length; i++){
        if (cellArr[i].textContent !== 'M'){
            cellArr[i].textContent = '';
        };
    };
};

var newFxn = function(){

    var getSurroundingCells = function(){

        var curID, parentID, count;
        var pos = [];
        var allPositions = [];
        var mineCounts = [];
        for (var i=0; i<cellArr.length; i++){
            curID = cellArr[i].id;

            count = 0;
            if (cellArr[i].textContent !== 'M'){

                if (curID == 0 || curID == 5 || curID == 10 || curID == 15 || curID == 20){
                    l1 = undefined;
                    l2 = undefined;
                    l3 = undefined;
                } else {
                    l1 = curID - 6;
                    l2 = curID - 1;
                    l3 = Number(curID) + 4;
                    if (l1 < 0){ l1 = undefined};
                    if (l2 < 0){ l2 = undefined};
                    if (l3 < 0){ l3 = undefined};
                };

                if (curID == 0 || curID == 1 || curID == 2 || curID == 3 || curID == 4){
                    up = undefined;
                    l1 = undefined;
                    r1 = undefined;

                } else {
                    up = curID - 5;
                };

                if (curID == 20 || curID == 21 || curID == 22 || curID == 23 || curID == 24){
                    down = undefined;
                    l3 = undefined;
                    r3 = undefined;
                } else {
                    down = Number(curID) + 5;
                };

                if (curID == 4 || curID == 9 || curID == 14 || curID == 19 || curID == 24){
                    r1 = undefined;
                    r2 = undefined;
                    r3 = undefined;
                } else {
                    r1 = curID - 4;
                    r2 = Number(curID) + 1;
                    r3 = Number(curID) + 6;
                    if (r3 < 0){ r1 = undefined};
                    if (r2 < 0){ r2 = undefined};
                    if (r3 < 0){ r3 = undefined};

                };

                pos[i] = new Positions(l1, l2, l3, up, down, r1, r2, r3);
                allPositions.push(pos[i]);

            } else {
                pos[i] = null;
                allPositions.push(pos[i]);
            };

          };
          allPosits = allPositions;
       return allPositions;

     }; // End of get getSurroundingCells

    var positions = getSurroundingCells();

    var checkPos = function(positions){
        var numMines = [];
        var posit = positions;

        for (var i = 0; i<posit.length; i++){
            var count = 0;
            newVar = posit[i];
            for (let key in newVar){
                if (newVar[key] !== undefined && newVar[key] >= 0 && newVar[key] <= 24){
                    cur = newVar[key];
                    var isItMine = document.getElementById(cur).textContent;
                } else {
                  isItMine = null;
                  };
                if (isItMine == 'M'){
                    count++;

                };
            };

            var updateNum = document.getElementById(i);

            if (updateNum.textContent !== 'M'){
              updateNum.textContent = count;
              updateNum.innerHTML = '<p>'+count+'</p>';
            };
        };

        var numMines = count;
        return numMines;

    }; // End of checkPos

    var checking = checkPos(positions);

}; // end of newFxn


var showMines = function(numOfMines){
    var show = target.textContent;
    if (show == 'M'){
    } else {
      target.textContent = numOfMines;
    }
};


var setMine = function(e){
  for (var i=0; i<cellArr.length; i++){
      var target;
      cellArr[i].addEventListener('oncontextmenu', function(el){
        target = el.target;
        console.log('this target is ' + target);
      })
};
};


var finish = document.querySelector('#finish');
// Finish button
finishGame = function(mines){finish.addEventListener('click', function(){
  var cont, check;
  var vis = [];
  var notvis = [];
  var nonMines = [];
  var noMinesShowing = [];
  var allNumsShowing = [];
  numsHiding = [];
  var cells = []; // if all true, no mines are visible

  // Determine if all mines are still hidden
  for (i=0;i<mines.length;i++){
    var m = mines[i];
    cells.push(cellArr[m].childNodes[0].style.visibility == '');
  };

  for (i=0; i<cells.length;i++){
      if (cells[i] === true){
          cont = true;
      } else {
          cont = false;
      };
  };


  for (i = 0; i<cellArr.length; i++){
      if (cellArr[i].childNodes[0].style.visibility == 'visible'){
          vis.push(cellArr[i]);
      };

      if (cellArr[i].childNodes[0].style.visibility == '') {
          notvis.push(cellArr[i]);
      };


  };

  for (j=0;j<vis.length;j++){
    if (vis[j].textContent !== 'M'){
        noMinesShowing.push(true);
    } else if (vis[j].textContent == 'M'){
        noMinesShowing.push(false);
    }
  }

  for (j=0;j<notvis.length;j++){
    if (notvis[j].textContent == 'M'){
        allNumsShowing.push(true);
    }
    if (notvis[j].textContent !== 'M'){
        numsHiding.push(true);
    }
  }

check = noMinesShowing.indexOf(false);
console.log(check);

  if (numsHiding.length > 0 || check !== -1){
      alert("You lose!");
  } else if (numsHiding.length == 0 && cont == true){
      alert('You win!');
  }




});
};



onLoad();

  /*  var openSpace = function(target, positions){
      console.log(positions);
        var targetText = target.textContent;

        // THIS IS REPEAT CODE: FIX
        var xoL1, xoL2, xoL3, xoUp, xoDown, xoR1, xoR2, xoR3, checkPositions = [];
        var show = [];
        var arrIDs = [];
        findZeros = [];

        xoL1 = document.getElementById(this.l1);
        xoL2 = document.getElementById(this.l2);
        xoL3 = document.getElementById(this.l3);
        xoUp = document.getElementById(this.up);
        xoDown = document.getElementById(this.down);
        xoR1 = document.getElementById(this.r1);
        xoR2 = document.getElementById(this.r2);
        xoR3 = document.getElementById(this.r3);

        checkPositions = [xoL1, xoL2, xoL3, xoUp, xoDown, xoR1, xoR2, xoR3];

        // END OF REPEAT CODE

        if (targetText == '0'){
            // function: check surrounding cells for zeros and display all connected zeros
            for(i=0; i<checkPositions.length; i++){
                var temp = checkPositions[i];
                if (temp) {
                  show.push(temp);
                };
            };

        };

        for (i=0; i<show.length; i++){
            var x = show[i].id;
            arrIDs.push(x);
        }

    // show other zero divs
        allSquares = document.getElementsByClassName('.cell');
        for (i=0; i<arrIDs.length; i++){
            k = arrIDs[i];
            for (j=0; j<arrIDs.length; j++){
                cellArr[k].textContent = '0';
            }
        }


    };    */
//};



/*
// CREATE GAME/DIFFICULTY BASED ON INPUT FROM USER
    var getDifficultyLevel = function(testFxn){

      var x = testFxn;

      switch(x){
        case 'easy':
            var difficulty = new Difficulty(5,5,5);
            break;
        case 'medium':
            var difficulty = new Difficulty(10,10,10);
            break;
        case 'hard':
            var difficulty = new Difficulty(10,10,20);
            break;
        default:
            alert('Please enter easy medium or hard.')
      }
      console.log(difficulty);
      console.log(Difficulty);
    };
*/
