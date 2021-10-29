const form = document.querySelector('.Form');
const timeInput = document.querySelector('#time-input');
const format = document.querySelector("select[name='format']");
const startBtn = document.querySelector('#start-btn');
const countDown = document.querySelector('#countdown');
const stopBtn = document.querySelector('#stop-btn');
const resetBtn = document.querySelector('#reset-btn');



let countDownInterval;
let secondsLeftms;
let endTime;
let stopBtnClicked = false;


stopBtn.addEventListener('click', () => {
  stopBtnClicked = !stopBtnClicked;

  if (stopBtnClicked === true) {
    stopBtn.innerHTML = 'RESUME';
    resetBtn.style.display = "inline";
    resetBtn.disabled = false;
    clearInterval(countDownInterval);
  } else if (stopBtnClicked === false) {
    stopBtn.innerHTML = 'PAUSE';
    resetBtn.style.display = "none";
    resetBtn.disabled = true;
    endTime = secondsLeftms + Date.now();
    countDownInterval = setInterval(() => {
      setCountDown(endTime);
    }, 1000);
  }
});


resetBtn.addEventListener('click', () => {
  resetCountDown();
});


form.addEventListener('submit', (event) => {
  event.preventDefault();

  stopBtn.innerHTML ='PAUSE';
  
  let countDownTime = timeInput.value;

  if (countDownTime > 0) {
      stopBtn.style.display = "inline";
        if (format.value === 'hours') {
        countDownTime = countDownTime * 3600000;
        } else if (format.value === 'minutes') {
        countDownTime = countDownTime * 60000;
        } else if (format.value === 'seconds') {
        countDownTime = countDownTime * 1000;
        }

    const now = Date.now();
    endTime = now + countDownTime;

    setCountDown(endTime);

    countDownInterval = setInterval(() => {
      setCountDown(endTime);
    }, 1000);

    startBtn.disabled = true;
    stopBtn.disabled = false;
  }

});

const setCountDown = (endTime) => {
  secondsLeftms = endTime - Date.now();
  const secondsLeft = Math.round(secondsLeftms / 1000);

  let hours = Math.floor(secondsLeft / 3600);
  let minutes = Math.floor(secondsLeft / 60) - (hours * 60);
  let seconds = secondsLeft % 60;

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  if (secondsLeft < 0) {
      document.getElementById('notificationsound').play();
      alert("Time's Up!");
    resetCountDown();
    return;
  }

  countDown.innerHTML = `${hours}:${minutes}:${seconds}`;

};


const resetCountDown = () => {
  clearInterval(countDownInterval);
  countDown.innerHTML = '00:00:00';
  stopBtnClicked = false;
  stopBtn.innerHTML = 'STOP';
  startBtn.disabled = false;
  stopBtn.style.display = "none";
  stopBtn.disabled = true;
  resetBtn.style.display = "none";
  resetBtn.disabled = true;
};





const container = document.querySelector('.container');
var inputValue = document.querySelector('.input');
const add = document.querySelector('.add');

if(window.localStorage.getItem("todos") == undefined){
     var todos = [];
     window.localStorage.setItem("todos", JSON.stringify(todos));
}

var todosEX = window.localStorage.getItem("todos");
var todos = JSON.parse(todosEX);


class item{
	constructor(name){
		this.createItem(name);
	}
    createItem(name){
    	var itemBox = document.createElement('div');
        itemBox.classList.add('item');

    	var input = document.createElement('input');
    	input.type = "text";
    	input.disabled = true;
    	input.value = name;
    	input.classList.add('item_input');

    	var edit = document.createElement('button');
    	edit.classList.add('edit');
    	edit.innerHTML = "EDIT";
    	edit.addEventListener('click', () => this.edit(input, name));

    	var remove = document.createElement('button');
    	remove.classList.add('remove');
    	remove.innerHTML = "REMOVE";
    	remove.addEventListener('click', () => this.remove(itemBox, name));

    	container.appendChild(itemBox);

        itemBox.appendChild(input);
        itemBox.appendChild(edit);
        itemBox.appendChild(remove);

    }

    edit(input, name){
        if(input.disabled == true){
           input.disabled = !input.disabled;
        }
    	else{
            input.disabled = !input.disabled;
            let indexof = todos.indexOf(name);
            todos[indexof] = input.value;
            window.localStorage.setItem("todos", JSON.stringify(todos));
        }
    }

    remove(itemBox, name){
        itemBox.parentNode.removeChild(itemBox);
        let index = todos.indexOf(name);
        todos.splice(index, 1);
        window.localStorage.setItem("todos", JSON.stringify(todos));
    }
}

add.addEventListener('click', check);
window.addEventListener('keydown', (e) => {
	if(e.which == 13){
		check();
	}
})

function check(){
	if(inputValue.value != ""){
		new item(inputValue.value);
        todos.push(inputValue.value);
        window.localStorage.setItem("todos", JSON.stringify(todos));
		inputValue.value = "";
	}
}


for (var v = 0 ; v < todos.length ; v++){
    new item(todos[v]);
}
