/* Variables */
var table = [
	[0,0,0,0,0],
	[0,0,0,0,0],
	[0,0,0,0,0],
	[0,0,0,0,0],
	[0,0,0,0,0],
];
var last = [0,0];
var i = 0;

var check = function(a, b){
	if(table[a][b] != 0){
		//Vertical check
		if(a <=2 && b <= 2 && (typeof table[a+2][b+2] !== 'undefined') && (table[a+2][b+2] === 0)){
			return true;
		}
		else if(a >=2 && b >= 2 && (typeof table[a-2][b-2] !== 'undefined') && (table[a-2][b-2] === 0)){
			return true;
		}
		else if(a <=2 && b >= 2 && (typeof table[a+2][b-2] !== 'undefined') && (table[a+2][b-2] === 0)){
			return true;
		}
		else if(a >=2 && b <= 2 && (typeof table[a-2][b+2] !== 'undefined') && (table[a-2][b+2] === 0)){
			return true;
		}
		else if(b <=1 && (typeof table[a][b+3] !== 'undefined') && (table[a][b+3] === 0)){
			return true;
		}
		else if(b >= 3 && (typeof table[a][b-3] !== 'undefined') && (table[a][b-3] === 0)){
			return true;
		}
		//Horizontal check
		else if(a <= 1 && (typeof table[a+3][b] !== 'undefined') && (table[a+3][b] === 0)){
			return true;
		}
		else if(a >= 3 && (typeof table[a-3][b] !== 'undefined') && (table[a-3][b] === 0)){
			return true;
		}
	}
	return false;
}
var test = function(){
	var x = $(this).attr('data-x');
	var y = $(this).attr('data-y');
	if(i == 0){
		calcTime();
	}
	if(table[x][y] === 0){
		i++;
		table[x][y] = i;
	}
	if(i == 1 || ((Number(last[0])+3 == x || Number(last[0])-3 == x) && Number(last[1]) == y)|| (Number(last[0]) == x && (Number(last[1])+3 == y || Number(last[1])-3 == y)) || ((Number(last[0])+2 == x || Number(last[0])-2 == x) && (Number(last[1])+2 == y || Number(last[1])-2 == y))){
		if(table[x][y] != 0){
			$('.lastSelected').removeClass('lastSelected');
			$(this).children().html("<b>"+table[x][y]+"</b>");
			$(this).children().fadeIn(1000);
			$(this).addClass('lastSelected selected');
			last = [x, y];
		}
		if(!check(Number(x), Number(y))){
			if(i != 25){
				clearTime(false);
				BootstrapDialog.alert({
					title: 'Badly',
					message: '<img src="img/fail.svg" width="200" height="200"> <h1>You Lose!!<h1/>'
				});
			}
		}
	}
	else{
		i--;
		table[x][y] = 0;
	}
	if(i == 25){
		clearTime(true);
		BootstrapDialog.alert({
			title: 'Congratilation',
			message: '<img src="img/win.svg" width="200" height="200"> <h1>You Win!!</h1>'
		});
	}
};

var reinit = function(){
	for(var z = 0; z < table.length; z++){
		clearTime(false);
		for (var j = 0; j < table.length; j++) {
			table[z][j] = 0;
			$('span').children().fadeOut(500);
			$('.lastSelected').removeClass('lastSelected');
			$('.selected').removeClass('selected');
		}
	}
	i = 0;
};


(function($){
	// Dom Manipulation
	$('.cell').bind('click', test);
	$('.tuto').bind('click', function(){
		BootstrapDialog.alert({
			title: $(this).attr('alt'),
			message: '<img src="' + $(this).attr('src') + '" width="100%">'
		});
	});
	$('.about').bind('click', function(){
		BootstrapDialog.alert({
			title: 'About',
			message: $('<div class="about1"></div>').load('include/about.html')
		});
	});
	$('.tuto').tooltip();
	$('.about').tooltip();
	$('.screenshot').tooltip({
		html: true,
		template: '<img class="pop" src="img/target.png" width="128">',
		placement: 'right'
	});
})(jQuery);
