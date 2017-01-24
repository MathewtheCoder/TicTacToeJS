
//basic JS
//This is used to know who is playing Comp or Human
var player = "Human"; //Comp/Human
var playerToken = {"Comp":"X","Human":"O"}; //Player tokens
var tokenFont = {
  "X":'<i class="fa fa-times fa-2x" aria-hidden="true"></i>',
  "O":'<span class="fa-stack fa-2x"><i class="fa fa-circle-o fa-stack-1x"></i></span>'
};
var id = ""; //used to knw the id of the selected box
//Object which is used know the contents of the box
var gameBoard = {
	"tl":{"content":"",set:0},
	"tm":{"content":"",set:0},
	"tr":{"content":"",set:0},
	"cl":{"content":"",set:0},
	"cm":{"content":"",set:0},
	"cr":{"content":"",set:0},
	"bl":{"content":"",set:0},
	"bm":{"content":"",set:0},
	"br":{"content":"",set:0},
};

//Function to check whether the box contains players token
function hasToken(token){
	return token === playerToken[player];  
}

//Function to check victory condition and if draw
function checkStatus(player){
 	var flag = 0;
	//Get the keys of the gameBoard object
	var keys = Object.keys(gameBoard);
  //console.info("Keys:", keys);
	
	//Horizontal 
  
	for(i=0;i<9;i+=3){
		for( var j=i;j<i+3;j++){
      		console.warn(j, gameBoard[keys[j]]["content"]);
			var horz = (gameBoard[keys[j]]["content"]==playerToken[player])
        	console.info(horz);
			if(!horz){break;}
        	flag+=1;
        	if(flag==3){return true;}
		}
    //Reset flag
    flag = 0;
	}
  
  	//return true;
	//Vertical
  
  	for(var i=0;i<3;i++){
		for( var j=i;j<=i+6;j+=3){
      		console.warn(j, gameBoard[keys[j]]["content"]);
			var horz = (gameBoard[keys[j]]["content"]==playerToken[player])
        	console.info(horz);
			if(!horz){break;}
        	flag+=1;
        	if(flag==3){return true;}
		}
    //Reset flag
    flag = 0;
	}
  
  
	//Diagional
  	//First Diag
    
	for( var j=0;j<=8;j+=4){
    	console.warn(j, gameBoard[keys[j]]["content"]);
		var horz = (gameBoard[keys[j]]["content"]==playerToken[player])
      console.info(horz);
		if(!horz){break;}
       	flag+=1;
       	if(flag==3){return true;}
	}
    //Reset flag
    flag = 0;
    //Second Diag
    
    for( var j=2;j<=6;j+=2){
      	console.warn(j, gameBoard[keys[j]]["content"]);
		var horz = (gameBoard[keys[j]]["content"]==playerToken[player])
        console.info(horz);
		if(!horz){break;}
        flag+=1;
        if(flag==3){return true;}
		}
    //Reset flag
    flag = 0;
    //check if all boxes are marked
    for(var i=0;i<9;i++){
      if(gameBoard[keys[i]]["set"]==0){
        break;
      }
      if(i==8){return "full";}
    }
    
  //No match
  return false;    
}

//Function to check where to place the token
function compAI(){
 	var status = 0;
  var j = 0;
	//Get the keys of the gameBoard object
	var keys = Object.keys(gameBoard);
  //console.info("Keys:", keys);
	//find empty slots
	var emptySlots = [];
    for(var i =0;i<9;i++){
      if(gameBoard[keys[i]]["set"]==0){
        emptySlots.push(i);
      }//fi
    } //end of for
  console.log(emptySlots);
  //Place tokens in empty slots and determine if comp wins
  
    for(i=0;i<emptySlots.length;i++){
      j=emptySlots[i];
      //Set data
      //gameBoard[keys[j]]["set"]=1;
      gameBoard[keys[j]]["content"]=playerToken["Comp"];
      //Check if victory
      status = checkStatus("Comp");
      //Check if victory
      if(status){
      //Comp Wins!
        if(gameBoard[keys[j]]["set"]==0){
        var id = "#"+keys[j];
        $(id).prepend(tokenFont[playerToken["Comp"]]);
        }
        gameBoard[keys[j]]["set"]=1;
        console.info("Computer Wins");
        $(".result").text("Computer Wins");
        setTimeout(function(){
        $(".result").text("");
        gameBoard = restartGame();

      },3000);
        //gameBoard = restartGame();
        return gameBoard;
      }
      else{
      //placeing there doesnt gurantee victory
        gameBoard[keys[j]]["set"]=0;
        gameBoard[keys[j]]["content"]="";
      }
    }
    
  //Check if human is close to victory and block him
  //it has 40% chance of occuring
  var min = 1;
  var max = 10;
  var probability = Math.floor(Math.random()*(max-min+1))+min;
  //console.warn(probability);
    if(probability>3){
      player = "Human";
      for(i=0;i<emptySlots.length;i++){
        //console.info("PLayer Defeat");
        j=emptySlots[i];
        //Set data
        //gameBoard[keys[j]]["set"]=1;
        gameBoard[keys[j]]["content"]=playerToken["Human"];
        //Check if victory
        status = checkStatus("Comp");
        //Check if victory
        if(status){
        //PLayer Wins!
          //console.info("Player Wins");
          gameBoard[keys[j]]["content"] = playerToken["Comp"];
          //console.log(gameBoard);
          //Place token
          if(gameBoard[keys[j]]["set"]==0){
          var id = "#"+keys[j];
          $(id).prepend(tokenFont[playerToken["Comp"]]);
          }
          gameBoard[keys[j]]["set"]=1;
          //Stop
          return gameBoard;
        }
        else{
        //placeing there doesnt gurantee victory
        // gameBoard[keys[j]]["set"]=0;
          gameBoard[keys[j]]["content"]="";
        }
      }
    }
  
  //Set player back to Comp
  player = "Comp";
  //console.info(emptySlots);
  //Otherwise put the token in a random position
  //Math.floor(Math.random()*(max-min+1))+min
  min = 0;
  max = emptySlots.length-1;
  
  var probability = Math.floor(Math.random()*(max-min+1))+min;
  console.warn("P:",probability);
  j=emptySlots[probability];
  console.warn(j);
  gameBoard[keys[j]]["content"] = playerToken["Comp"];
  console.warn(keys[j]);
  //console.log(gameBoard);
  //Place token
    if(gameBoard[keys[j]]["set"] == 0){
      console.info(keys[j]);
      var id = "#"+keys[j];
      $(id).prepend(tokenFont[playerToken["Comp"]]);
    }

  gameBoard[keys[j]]["set"] = 1;
  }
//Function to restart the game
function restartGame(){
  //Clear all data of gameBoard
  //get keys of gameBoard
  var keys = Object.keys(gameBoard);
  //Clear
  for(var i=0;i<keys.length;i++){
    //console.warn("Restartcontent:", keys);
    gameBoard[keys[i]]["content"] = "";
    gameBoard[keys[i]]["set"] = 0;  
  }
  //console.warn("Restart:", gameBoard);
  //ReRender playbox with no values
  $(".square").find('.fa-stack').detach();
  $(".square").find('.fa-times').detach();
  return gameBoard;
}

//Start of the game
$(document).ready(function(){
	//Hide PlayBox
	$(".play").hide();
	//Status var to know status of game
	var status = null;
  
	//If Player chooses X
	$('.xtoken').click(function(){
		playerToken["Human"]="X";
		playerToken["Comp"]="O";
		$(".startbtn").hide();
		$(".play").show();
	});
	//If Player chooses O
	$('.otoken').click(function(){
		playerToken["Human"]="O";
		playerToken["Comp"]="X";
		$(".startbtn").hide();
		$(".play").show();
  });

  //Select inner box
	var box = $('.play').children();
	box = $(box).children();
	//Click event handler  
	$(box).on("click",function(){
    //console.log(gameBoard);
    //Assign id to var
		id = $(this).attr("id")
    console.info(id);
   
		//set game board
		gameBoard[id]["content"] = playerToken["Human"]
    console.info(gameBoard[id]["content"]);
		//Assign the player token
    if(gameBoard[id]["set"] == 0){
		$(this).prepend(tokenFont[playerToken["Human"]]);
    }
    gameBoard[id]["set"] = 1;
    status = checkStatus("Human");
    console.warn(gameBoard);
    console.info(status);
    
		//Player WIns
    if(status==true){
      console.info("Player Wins");
      $(".result").text("Player Wins");
      setTimeout(function(){
        $(".result").text("");
        gameBoard = restartGame();
          
      },3000);
      //console.warn("Restore:", gameBoard);
    }
    
    //Draw 
    else if(status == "full"){
      console.info("Draw");
      //Set text to Draw!
      $(".result").text("Draw!!!!!");
      setTimeout(function(){
        $(".result").text("");
        gameBoard = restartGame();

      },3000);
      //gameBoard = restartGame();
      
    }
    //Comp plays
    else if(status == false){
      $(".turn").text("HAL'S")
      setTimeout(function(){
        console.info("Comp");
        console.info(gameBoard);
        compAI();
        $(".turn").text("your")  
      },1000);
        
    }
    
	});
  //console.info(gameBoard);
  
});