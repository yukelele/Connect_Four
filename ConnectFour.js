var player1 = prompt("Player One: Enter Your Name, you will be Blue")
var player1Color = 'rgb(0, 0, 255)'
var player2 = prompt("Player Two: Enter YOur Name, you will be Red")
var player2Color = 'rgb(255, 0, 0)'

var game_on = true;
var table = $('table tr');

function reportWin(rowNum, colNum){
  console.log("You won starting at this "+rowNum+', '+colNum)
}

function changeColor(row, col, color){
    return table.eq(row).find('td').eq(col).find('button').css('background-color',color)
}

function returnColor(row, col){
    return table.eq(row).find('td').eq(col).find('button').css('background-color')
}

function checkBottom(col){
  var colorReport = returnColor(5,col);
  for (var row=5; row > -1; row--){
    colorReport = returnColor(row,col);
    if (colorReport === 'rgb(128, 128, 128)'){
      return row
    }
  }
}

function colorMatchCheck(one, two, three, four){
  return (one === two && one===three && one===four && one!=='rgb(128, 128, 128)' && one!==undefined)
}

function horizontalWinCheck(){
  for(var row=0; row<6; row++){
    for(var col = 0; col<4; col++){
      if(colorMatchCheck(returnColor(row,col), returnColor(row,col+1), returnColor(row,col+2), returnColor(row, col+3))){
        console.log("horizontoal win")
        reportWin(row,col);
        return true
      }
      else{
        continue;
      }
    }
  }
}




function verticalWinCheck(){
  for(var col=0; col<7; col++){
    for(var row=0; row<3; row++){
      if(colorMatchCheck(returnColor(row,col), returnColor(row+1,col), returnColor(row+2,col), returnColor(row+3, col))){
        console.log("Vertical win")
        reportWin(row,col)
        return true;
      }
      else{
        continue;
      }
    }
  }
}

function diagonalWinCheck(){
  for(var col =0; col<5; col++){
    for(var row=0; row<7; row++){
      if(colorMatchCheck(returnColor(row,col), returnColor(row+1,col+1), returnColor(row+2,col+2), returnColor(row+3,col+3))){
        console.log("diagonal1 win")
        reportWin(row,col)
        return true;
      }
      else if(colorMatchCheck(returnColor(row,col), returnColor(row-1,col+1), returnColor(row-2,col+2), returnColor(row-3,col+3))){
        console.log("diagonal2 win")
        reportWin(row,col)
        return true
      }
      else{
        continue;
      }
    }
  }
}

var currentPlayer = 1;
var currentName = player1;
var currentColor = player1Color;
$('h3').text(player1+": it is your turn pick a column to drop in!")

$('button').on('click',function(){
  var col = $(this).closest('td').index();
  var bottomAvail = checkBottom(col);
  changeColor(bottomAvail, col, currentColor)
  if(horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()){
    $('h1').text(currentName+", You have won!")
    $('h3').fadeOut('fast')
    $('h2').fadeOut('fast')
  }

  currentPlayer = currentPlayer * -1;
  if(currentPlayer === 1){
    currentName = player1;
    $('h3').text(currentName+": it is your turn")
    currentColor = player1Color;
  }
  else{
    currentName = player2;
    $('h3').text(currentName+": it is your turn")
    currentColor = player2Color
  }
})

//
// var turn = player1;
// var color = color1;
// $('h6').text(turn+": it is your turn, please pick a column to drop your "+color+" chip.")
//
// function mark(){
//   if(turn === player1){
//     $(this).css('background', 'blue')
//     turn = player2
//     color = 'red'
//     $('h6').text(turn+": it is your turn, please pick a column to drop your Blue chip.")
//   }
//   else{
//     $(this).css('background','red')
//     turn = player1
//     $('h6').text(turn+": it is your turn, please pick a column to drop your Red chip.")
//   }
// }
//
// for (button of $('.col1')){
//   $(button).click(mark)
// }
