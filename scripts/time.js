'use strict';

let time = moment('00:00:00', 'HH:mm:ss');

let lastBestTime = localStorage.getItem('best_timing');
let intervalId;
const calcTime = (ele) => {
	intervalId = setInterval(($) => {
        time.add(1, 's');
        ele.text(time.format('HH:mm:ss'));
    }, 1000);
};

const gTime = () => time.format('HH:mm:ss');

const clearTime = (win, best, inited) => {
	if(win){
		if (lastBestTime === null) lastBestTime = '59:59:59';
        const diff = time.diff(moment(lastBestTime, 'HH:mm:ss'));
        if(diff < 0){
			lastBestTime = time.format('HH:mm:ss');
			localStorage.setItem('best_timing', time.format('HH:mm:ss'));
		}
		best.text(lastBestTime);
	}
    best.text(lastBestTime);
    time = moment('00:00:00', 'HH:mm:ss');
	inited.text(time.format('HH:mm:ss'));
	clearInterval(intervalId);
};
