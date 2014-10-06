var lastBestTime = [59, 59, 59];
var h=0, m=0, s=0;
var intervalId;
var calcTime = function(){
	intervalId = setInterval(function(){
		if(s == 59){
			s = -1;
			m++;
		}
		if(m == 59){
			m = -1;
			h++;
		}
		if(h == 1){
			BootstrapDialog.alert('Hiho are you steel alive??!');
		}
		s++;
		(function($){
			$('.label-primary').text(formating(h) + ":" + formating(m) + ":" + formating(s));
		})(jQuery);
	}, 1000);
};

var clearTime = function(win){
	if(win){
		if(h < lastBestTime[0] || (h === lastBestTime[0] && m < lastBestTime[1]) ||  (m === lastBestTime[1] && s < lastBestTime[2])){
			lastBestTime =[h, m, s];
			$.cookie('h', h);
			$.cookie('m', m);
			$.cookie('s', s);
		}
		$('.label-success').text(formating(lastBestTime[0]) + ":" + formating(lastBestTime[1]) + ":" + formating(lastBestTime[2]));
	}
	s = 0;
	m = 0;
	h = 0;
	$('.label-primary').text(formating(h) + ":" + formating(m) + ":" + formating(s));
	clearInterval(intervalId);
};

function formating(n){
	if(n < 10){
		return "0" + n;
	}
	return n;
};

(function($){
	if(typeof $.cookie('h') === 'undefined'){
		$.cookie('h', h, { expires: 30 });
	}
	if(typeof $.cookie('m') === 'undefined'){
		$.cookie('m', m, { expires: 30 });
	}
	if(typeof $.cookie('s') === 'undefined'){
		$.cookie('s', s, { expires: 30 });
	}
	$('.label-success').text(formating(Number($.cookie('h'))) + ":" + formating(Number($.cookie('m'))) + ":" + formating(Number($.cookie('s'))));
})(jQuery);