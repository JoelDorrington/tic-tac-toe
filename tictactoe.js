var player = 1;
var firstPlayer = 1;
var t = [0, 0, 0];
var m = [0, 0, 0];
var b = [0, 0, 0];
var tds = document.querySelectorAll("#game td");
var arrs = [t, m, b];
var L = 0;
var R = 0;
var winDisplay = document.querySelector("#win");
var z = false;
var scoreDisplay1 = document.querySelector("#score1");
var scoreDisplay2 = document.querySelector("#score2");
var reset = document.getElementById("reset");
var resetScore = document.getElementById("resetScore");
var score1 = 0;
var score2 = 0;
var end = false;
var firstMove = document.getElementById("moveCount");
var swap = document.getElementById("switch");
var p1sample = document.getElementById("p1sample");
var p2sample = document.getElementById("p2sample");
var p1select = document.getElementById("select1");
var p2select = document.getElementById("select2");
var p1class = p1select.value.replace(".png", "");
var p2class = p2select.value.replace(".png", "");
var p1sprite = 0;
var p2sprite = 1;

var ticTacToe = {
	click: function() {
		ticTacToe.mark(this);
		ticTacToe.recordScore(this.num);
		ticTacToe.checkWin(this.num);
		player = player * -1;
		this.removeEventListener("click", ticTacToe.click);
		swap.removeEventListener("click", change);
		p1select.setAttribute("disabled", "disabled");
		p2select.setAttribute("disabled", "disabled");
		swap.style.display = "none";
		},
	mark: function(x) {
		if (player > 0) {
		x.classList.add(p1class);
		}
		else {
		x.classList.add(p2class);
		}
	},
	recordScore: function(x) {
		arrs[Math.floor(x/3)][x%3] = player;
		},
	checkWin: function(x){
		if(ticTacToe.checkWin1(x)){
			ticTacToe.end();
		}
		else if(ticTacToe.checkWin2(x)){
			ticTacToe.end();
		}
		else if(ticTacToe.checkWin3(x)){
			ticTacToe.end();
		}
	},
	checkWin1: function(x){
		var arr = Math.floor(x/3);
			for(i = 0; i < arrs[arr].length; i++){
				if(arrs[arr][i] !== arrs[arr][x%3]){
					return false;
				}
			}
		return true;
	},
	checkWin2: function(x){
		var index = x%3;
		var arr = Math.floor(x/3);
		for (i = 0; i < arrs.length; i++){
			if(arrs[i][index] !== arrs[arr][index]){
				return false;
			}
		}
		return true;
	},
	checkWin3: function(x){
		if(x % 2 === 0){
			if(x % 4 === 0){
				L += player;
			}
			if(x > 0 && 12 % x === 0){
				R += player;
			}
		}
		if(String(R).indexOf("3")>=0){
			return true;
		}; 
		if(String(L).indexOf("3")>=0){
			return true;
		};
		return false;
	},
	end: function(){
		var p = 1;
		if(player === -1){
				p = 2;
			}
		winDisplay.textContent = "Player " + p + " wins!";
		if(p === 1){
			score1++;
			scoreDisplay1.textContent = score1;
		}
		else if(p === 2){
			score2++;
			scoreDisplay2.textContent = score2;
		}

		for(i = 0; i < tds.length; i++){
		tds[i].removeEventListener("click", ticTacToe.click);
		tds[i].classList.add("end");
		}
		end = true;
	},
	init: function(){
		for(var i = 0; i < tds.length; i++){
		tds[i].num = i;
		tds[i].removeEventListener("click", ticTacToe.click);
		tds[i].addEventListener("click", ticTacToe.click);
		tds[i].classList.remove("Xs");
		tds[i].classList.remove("Os");
		tds[i].classList.remove("Puppy");
		tds[i].classList.remove("Kitty");
		tds[i].classList.remove("end");
		}
	}
}
function restart(){
	player = firstPlayer;
	t = [0, 0, 0];
	m = [0, 0, 0];
	b = [0, 0, 0];
	arrs = [t, m, b];
	z = false;
	end = false;
	L = 0;
	R = 0;
	winDisplay.textContent = ("");
	swap.addEventListener("click", change);
	swap.style.display = "inline";
	p1select.removeAttribute("disabled");
	p2select.removeAttribute("disabled");
} 
ticTacToe.init();
reset.addEventListener("click", function(){
	ticTacToe.init();
	restart();
});
resetScore.addEventListener("click", function(){
	score1 = 0;
	score2 = 0;
	scoreDisplay1.textContent = score1;
	scoreDisplay2.textContent = score2;
})
var change = function(){
	firstPlayer = firstPlayer * -1;
	player = firstPlayer;
	var x = player;
	if(x === -1){
		x = 2;
	}
	firstMove.textContent = x;
}
swap.addEventListener("click", change);
function select() {
	p1sample.setAttribute("src", p1select.value); 
	p2sample.setAttribute("src", p2select.value);
	p1class = p1select.value.replace(".png", "");
	p2class = p2select.value.replace(".png", "");
};
select();
p1select.addEventListener("change", select)
p2select.addEventListener("change", select)
p1class = p1select.value.replace(".png", "");
p2class = p2select.value.replace(".png", "");