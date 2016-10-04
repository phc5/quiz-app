
// state 
const state = {
	questions: [
		{
			text: "Who has the most wins as a head coach in the NFL?",
			answers: ['George Halas', 'Curly Lambeau', 'Tom Landry', 'Don Shula'],
			correctAnswer: 'Don Shula',
		}, 
		{
			text: "Which NFL team features a helmet decal only on one side of the helmet?",
			answers: ['Houston Texans', 'Jacksonville Jaguars', 'Pittsburgh Steelers', 'Tennessee Titans'],
			correctAnswer: 'Pittsburgh Steelers',
		},
		{
			text: "Who is the last non-quarterback to win NFL MVP?",
			answers: ['Shaun Alexander', 'Ray Lewis', 'Adrian Peterson', 'LaDainian Tomlinson'],
			correctAnswer: 'Adrian Peterson'
		},
		{
			text: "This current NFL quarterback, a 2010 Pro Bowler, never started a game at QB in college...",
			answers: ['Matt Schaub', 'Matt Cassel', 'Matt Moore', 'Matt Flynn'],
			correctAnswer: 'Matt Cassel'
		},
		{
			text: "How many Heisman Trophy winners have gone on to be MVP of the Super Bowl?",
			answers: ["2", "3", "4", "5"],
			correctAnswer: '4'
		},
		{
			text: "4 of the first 5 picks in the 1989 draft -- Troy Aikman, Barry Sanders, Derrick Thomas and Deion Sanders -- are in the Hall of Fame. Who was the bust?",
			answers: ["Aundray Bruce", "Blair Thomas", "Keith McCants", "Tony Mandarich"],
			correctAnswer: 'Tony Mandarich'
		},
		{
			text: "Which of these teams was NOT an original NFL team that moved over to the AFC?",
			answers: ["Browns", "Colts", "Raiders", "Steelers"],
			correctAnswer: 'Raiders'
		},
		{
			text: "This state has produced more pro football Hall of Famers than any other state...",
			answers: ["California", "Ohio", "Pennsylvania", "Texas"],
			correctAnswer: 'Pennsylvania'
		},
		{
			text: "Who is the only Super Bowl MVP to have played on the losing team?",
			answers: ["Larry Fitzgerald", "Chuck Howley", "Dan Marino", "Steve McNair"],
			correctAnswer: 'Chuck Howley'
		},
		{
			text: "This is the only team not to make the NFL playoffs this millennium...",
			answers: ["Buffalo Bills", "Cleveland Browns", "Jacksonville Jaguars", "Oakland Raiders"],
			correctAnswer: 'Buffalo Bills'
		}
	],
	score: 0,
	currentQuestion: 0,
	correctText: "Correct! +1 for you!",
	incorrectText: "Incorrect...",
	whichPage: 'start',
	answerFlag: true,
}

// modify
function setPage(state, page) {
	state.whichPage = page;
}

// Random Int number from http://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array-in-javascript
function shuffle(array) {
	for (let i = array.length; i; i--) {
		let randIndex = Math.floor(Math.random() * i);
		let temp = array[i - 1];
		array[i - 1] = array[randIndex];
		array[randIndex] = temp;
	}
}

function flagAnswer(state, answer) {
	state.answerFlag = state.questions[state.currentQuestion].correctAnswer === answer;
	return state.answerFlag;
}

// function startTimer(duration, display, flag) {
// 	let timer = duration, minutes, seconds;

// 	setInterval(function() {
// 	minutes = parseInt(timer / 60, 10);
// 	seconds = parseInt(timer % 60, 10);

// 	minutes = minutes < 10 ? "0" + minutes : minutes;
// 	seconds = seconds < 10 ? "0" + seconds : seconds;

// 	display.text(minutes + ":" + seconds);
	
// 	if(--timer <= 0) {
// 		timer = duration;
// 	}
// 	}, 1000);
// }

// render
const renderQuiz = function(state, pages) {
	//hide all pages and show current page
	for (let page of Object.keys(pages)) {
		pages[page].hide();
	}
	pages[state.whichPage].show();

	if (state.whichPage === 'start') {
		//route to render start page
	} else if (state.whichPage === 'question') {
		//route to render question page
		shuffle(state.questions[state.currentQuestion].answers);
		renderQuestion(state, pages[state.whichPage]);
	} else if (state.whichPage === 'result') {
		//route to render results page
		renderResults(state, pages[state.whichPage]);
	} else if (state.whichPage === 'end') {
		//route to render end page
		renderEnd(state, pages[state.whichPage]);
	}
};

	//-----render pages
const renderQuestion = function(state, element) {
	renderQuizText(state, element.find('.text-field'));
	renderQuizButtons(state, element.find('.answer'));
}

const renderResults = function(state, element) {
	renderResultsText(state, element.find('.text-field'));
}

const renderEnd = function (state, element) {
	renderEndText(state, element.find('.text-field'));
}

	//-----render content in pages
const renderQuizText = function (state, element) {
	const current = state.questions[state.currentQuestion].text;
	element.text(current);
}

const renderQuizButtons = function (state, element) {
	$('button.answer-one').text(state.questions[state.currentQuestion].answers[0]);
	$('button.answer-two').text(state.questions[state.currentQuestion].answers[1]);
	$('button.answer-three').text(state.questions[state.currentQuestion].answers[2]);
	$('button.answer-four').text(state.questions[state.currentQuestion].answers[3]);
}

const renderQuizStatus = function (state, element, quizLengthElement) {
	element.text(state.currentQuestion + 1);
	quizLengthElement.text(state.questions.length);
}

const renderResultsText = function (state, element) {
	if (state.answerFlag) {
		state.score++;
		$('.score').text(state.score);
		element.text(state.correctText + " " + state.questions[state.currentQuestion].correctAnswer + " was the correct answer!");
	} else {
		$('.score').text(state.score);
		element.text(state.incorrectText + " " + state.questions[state.currentQuestion].correctAnswer + " was the correct answer!");
	}
}

const renderEndText = function(state, element) {
	const percentCorrect = state.score / state.questions.length;
	if (percentCorrect < .70) {
		element.text('Your score is ' + state.score + ' out of ' + state.questions.length + ", which is " + Math.floor(percentCorrect * 100) + "%. You didn\'t do too well. You can always improve!");
	} else if (percentCorrect >=.70  && percentCorrect < .85) {
		element.text('Your score is ' + state.score + " out of " + state.questions.length + ", which is " + Math.floor(percentCorrect * 100) + "%. You did great!");
	} else if (percentCorrect >= .85) {
		element.text('Your score is ' + state.score + " out of " + state.questions.length +", which is " + Math.floor(percentCorrect * 100) + "%. You did awesome!");
	}
}


// event listener
const quizPages = {
	// set to jQuery variables for .hide() and .show()
	'start': $('.main-page'),
	'question': $('.question-page'),
	'result': $('.result-page'),
	'end': $('.end-page')
}

$('.start').click(function(event) {
	event.preventDefault();
	setPage(state, 'question');
	renderQuizStatus(state, $('.q-num'), $('.q-length'));
	renderQuiz(state, quizPages);
});

$('.answer').click(function(event) {
	event.preventDefault();
	setPage(state, 'result');
	var answer = $(this).text();
	flagAnswer(state, answer);
	renderQuiz(state, quizPages);
});

$('.next-question').click(function(event) {
	event.preventDefault();
	state.currentQuestion++;
	if (state.currentQuestion < state.questions.length) {
		setPage(state, 'question');
		renderQuizStatus(state, $('.q-num'), $('.q-length'));
		renderQuiz(state, quizPages);
	} else {
		setPage(state, 'end');
		renderQuiz(state, quizPages);
	}
});

$('.restart').click(function(event) {
	event.preventDefault();
	state.score = 0;
	state.currentQuestion = 0;
	$('.score').text(state.score);
	$('.q-num').text(state.currentQuestion+1);
	shuffle(state.questions);
	setPage(state,'start');
	renderQuiz(state, quizPages);
});

$(document).ready(function() {
	$('.box').animate({top:'50px'}, "slow");
	$('.box').fadeIn("slow");
})