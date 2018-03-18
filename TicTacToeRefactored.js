function Square(element, position) {
	this.element = element; // attach td tag from document
	this.element.addEventListener('click', click) //ad event listener to td tag
	this.position = position; // Square's unique number
	this.clicked = function(){  // called when td click listener fired
		// add player's image to td and remove click listener
		this.element.classList.add(Controller.player.image);
		this.element.removeEventListener('click', click)
		// Store this squares location in the player's array
		Controller.player.add(this.position)
		// Check if won.
		if(!Grid.checkwin(Controller.player.squares)){
			Controller.changePlayer() // Change player if game not won.
		}
	}
}

Grid = {
	// winning combinations
	winarrays: [[0, 1, 2], [0, 3, 6], [0, 4, 8], [1, 4, 7], [2, 4, 6], [2, 5, 8], [3, 4, 5], [6, 7, 8]],
	
	// check to see if the player's squares array contains a winning combo one by one.
	checkwin: function(playarray){
		win = false;
		this.winarrays.forEach(function(array){
			//check if the current winning combo is in the player's squares array.
			if(Grid.inArray(array, playarray)){
				win = true
				Controller.win()  // if it is, call the controller's win routine.
			}
		})
		return win  // True or False
	},

	inArray: function(winarray, playarray){
		for(var i = 0; i < winarray.length; i++){
			if(playarray.indexOf(winarray[i]) === -1){
				return false;
			}
		}
		return true;
	}
}

// function assigned to td tags in document.
click = function(){this.parent.clicked()}

function Player(order, image, name){  // Object to store player information.
	this.image = image
	this.name = name
	this.squares = []
	this.score = 0
	this.add = function(square){
		this.squares.push(square)
	}

	this.win = function(){
		this.score++
	}

	this.reset = function(){
		this.squares = []
	}
	this.changeName = function(name){
		this.name = name;
	}
}

player1 = new Player(1, 'Xs', 'Player 1');
player2 = new Player(2, 'Os', 'Player 2');

Controller = {
	player: player1,
	changePlayer: function(){
		if(this.player == player1){
			this.player = player2
		} else {
			this.player = player1
		}
	},
	win: function(){
		this.player.win()
		GUI.end(this.player)
		this.player = player1
		player1.reset()
		player2.reset()
	},
	resetScores: function(){
		player1.score = 0
		player2.score = 0
		GUI.updateScores()
	}
}

GUI = {
	winDisplay: document.querySelector("#win"),
	scoreDisplay1: document.querySelector("#score1"),
	scoreDisplay2: document.querySelector("#score2"),
	reset: document.getElementById("reset"),
	resetScore: document.getElementById("resetScore"),
	p1: document.getElementById('p1namedisplay'),
	p2: document.getElementById('p2namedisplay'),
	p1name: document.getElementById("p1name"),
	p2name: document.getElementById("p2name"),
	p1namebutton: document.getElementById("p1namebutton"),
	p2namebutton: document.getElementById("p2namebutton"),
	p1sample: document.getElementById("p1sample"),
	p2sample: document.getElementById("p2sample"),
	p1select: document.getElementById("select1"),
	p2select: document.getElementById("select2"),
	tds: document.querySelectorAll('#game td'),
	swap: document.getElementById("switch"),
	firstMove: document.getElementById("moveCount"),
	init: function(){
		this.swap.style.display = 'none';
		this.firstMove.textContent = Controller.player.name;
		this.swap.removeEventListener('click', GUI.change)
		this.p1select.setAttribute('disabled', 'disabled');
		this.p2select.setAttribute('disabled', 'disabled');
		this.winDisplay.textContent = ('')
		squares = []
		count = 0
		this.tds.forEach(function(td){
			td.parent = new Square(td, count)
			td.classList.remove("Xs");
			td.classList.remove("Os");
			td.classList.remove("Puppy");
			td.classList.remove("Kitty");
			td.classList.remove("end");
			count++
		})
	},
	end: function(player){
		this.p1select.removeAttribute('disabled');
		this.p2select.removeAttribute('disabled');
		this.swap.style.display = 'inline';
		this.swap.addEventListener('click', GUI.change)
		this.winDisplay.textContent = (player.name + ' wins!')
		this.reset.addEventListener('click', function(){GUI.init.call(GUI)})
		this.resetScore.addEventListener('click', Controller.resetScores)
		this.tds.forEach(function(td){
			td.removeEventListener('click', click)
			td.classList.add("end");
			td.parent = null
		})
		this.updateScores()
		this.p1select.addEventListener("change", function(){GUI.select.call(GUI)})
		this.p2select.addEventListener("change", function(){GUI.select.call(GUI)})
	},
	change: function(){
		Controller.changePlayer.call(Controller)
		GUI.firstMove.textContent = Controller.player.name;
	},
	updateScores: function(){
		this.scoreDisplay1.textContent = player1.score;
		this.scoreDisplay2.textContent = player2.score;
	},
	select: function(){
		player1.image = this.p1select.value.replace(".png", "");
		player2.image = this.p2select.value.replace(".png", "");
		this.p1sample.setAttribute("src", this.p1select.value); 
		this.p2sample.setAttribute("src", this.p2select.value);
	},
	newName: function(player, input, display){
		player.changeName(input.value)
		display.textContent = input.value;
		input.value = '';
	}
}

GUI.p1namebutton.addEventListener('click', function(){GUI.newName(player1, GUI.p1name, GUI.p1)})
GUI.p2namebutton.addEventListener('click', function(){GUI.newName(player2, GUI.p2name, GUI.p2)})

GUI.select()
GUI.end(Controller.player)
GUI.winDisplay.textContent = 'Choose your pictures.';