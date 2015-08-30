(function($){

	var table = [
	[0,0,0,0,0],
	[0,0,0,0,0],
	[0,0,0,0,0],
	[0,0,0,0,0],
	[0,0,0,0,0],
	];
	var last = false;
	var i = 0;

	/**
	* Function to test if clicked cell are empty or not, and if this is a legal move or not.
	* @method test
	* @params {} x
	* @params {} y
	* @return Boolean
	*/
	var test = function(x, y){
		//test if cell is already full
		if(table[x][y] == 1){
			console.log('checked');
			return false;
		}

		//check if is first use
		if(typeof last == 'boolean'){
			console.log('boolean');
			return true;
		}

		if((Number(last[0])+3 == x && Number(last[1]) == y) || (Number(last[0])-3 == x && Number(last[1]) == y)){
			console.log('first');
			return true;
		}		
		if((Number(last[1])+3 == y && Number(last[0]) == x) || (Number(last[1])-3 == y && Number(last[0]) == x)){
			console.log('second');
			return true;
		}
		if((Number(last[1])-2 == y && Number(last[0])-2 == x) || (Number(last[1])+2 == y && Number(last[0])+2 == x) || (Number(last[1])-2 == y && Number(last[0])+2 == x) || (Number(last[1])+2 == y && Number(last[0])-2 == x)){
			console.log('third');
			return true;
		}


		return false;
	};

	/**
	* Function to reinit the game
	* @method reInit
	* @return null
	*/
	var reInit = function(){
		clearTime(false, '.score', '.time');
		$('td').css({
			'box-shadow': '0 0 0 #fff',
			'background-color': '#BBDEFB',
		});
		for(var z = 0; z < table.length; z++){
			for (var j = 0; j < table.length; j++) {
				table[z][j] = 0;
			}
		}
		$('.cell').text('');
		i = 0;
		last = false;
	};

	/**
	* Function to test if the game is over
	* @method isOver
	* @params {} x
	* @params {} y
	* @return Boolean
	*/
	var isOver = function(a, b){
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
	};


	// Events
	$('.newGame').bind('click', reInit);

	$('.about').bind('click', function(){
		$('#a_modal').openModal();
	});

	$('.tutorial').bind('click', function(){
		$('#t_modal').openModal();
	});

	$('.bug').bind('click', function(){
		$('#b_modal').openModal();
	});

	$('.download').bind('click', function(){
		$('#d_modal').openModal();
	});

	$('.cell').bind('click', function(){
		var y = $(this).attr('data-y');
		var x = $(this).parent().attr('data-x');
		
		if(i == 0){
			calcTime('.time');
		}

		if(test(Number(x), Number(y))){
			i++;
			last = [x, y];
			$('td').css({
				'box-shadow': '0 0 0 #fff',
			});
			$(this).css({
				'box-shadow': '0 0 15px 5px #fff inset',
				'background-color': '#2196f3',
			});
			table[x][y] = 1;
			$(this).text(i);
			if(!isOver(Number(x), Number(y)) && i != 25){
				$('.score1').text(i + ' in ' + gTime());
				clearTime(false, '.score', '.time');
				$('#modal1').openModal();
			}
			if(i == 25){
				$('.score2').text(gTime());
				clearTime(true, '.score', '.time');
				$('#modal2').openModal();
			}
		}
	});

	//init sidemenu
    $(".button-collapse").sideNav();




	//css adjusting
	var getwidth = function(){
			var width = $('td').width();
			$('td').css({
				'height': width+'px',
			});
	};

	$(window).bind('load', getwidth());
	$(window).bind('resize', getwidth());
}(jQuery));