// state 
var state = {
	questions: [
		{
			text: "Which US president is depicted on the Purple Heart medal?",
			answers: ['Abraham Lincoln', 'Theodore Roosevelt', 'George Washington', 'Benjamin Franklin'],
			correctIndex: 2
		}, 
		{
			text: "Myosis affects which part of the human body?",
			answers: ['Neck', 'Stomach', 'Mouth', 'Eye'],
			correctIndex: 3
		},
		{
			text: "The drink Tequila is made from...",
			answers: ['Sugar Cane', 'Blue Agave', 'Aloe Vera', 'Cactus'],
			correctIndex: 1
		},
		{
			text: "Who was the #1 overall draft pick in the 2016 NBA Draft?",
			answers: ['Ben Simmons', 'Brandon Ingram', 'Jaylen Brown', 'Kris Dunn'],
			correctIndex: 0
		},
		{
			text: "Wikipedia's spherical logo features what Greek symbol?",
			answers: ["Omega", "Theta", "Sigma", "Gamma"],
			correctIndex: 0
		}
	],
	score: 0,
	currentQuestion: 0,
	correctText: "Correct! +1 for you!",
	incorrectText: "Incorrect...",
	whichPage: 'start',
	answerFlag: true
}

// modify
function setPage(state, page) {
	state.whichPage = page;
}

// Random Int number from http://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array-in-javascript
function shuffle(array) {
	var randIndex, swapHolder;
	for (var i = array.length; i; i--) {
		randIndex = Math.floor(Math.random() * i);
		swapHolder = array[i - 1];
		array[i - 1] = array[randIndex];
		array[randIndex] = swapHolder;
	}
}

// render
var renderQuiz = function(state, pages) {
	//hide all pages and show current page

	for (let page of Object.keys(pages)) {
		pages[page].hide();
	}
	pages[state.whichPage].show();

	if (state.whichPage === 'start') {
		//route to render start page
	} else if (state.whichPage === 'question') {
		//route to render question page
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
var renderQuestion = function(state, element) {
	renderQText(state, element.find('.text-field'));
	renderQButtons(state, element.find('.answer'));
}

var renderResults = function(state, element) {
	renderRText(state, element.find('.text-field'));
}

var renderEnd = function (state, element) {
	renderEText(state, element.find('.text-field'));
}

	//-----render content in pages
var renderQText = function (state, element) {
	var current = state.questions[state.currentQuestion].text;
	element.text(current);
}

var renderQButtons = function (state, element) {
	var answerOne = state.questions[state.currentQuestion].answers[0];
	var answerTwo = state.questions[state.currentQuestion].answers[1];
	var answerThree = state.questions[state.currentQuestion].answers[2];
	var answerFour = state.questions[state.currentQuestion].answers[3];

	$('button.answer-one').text(answerOne);
	$('button.answer-two').text(answerTwo);
	$('button.answer-three').text(answerThree);
	$('button.answer-four').text(answerFour);
}

var renderQuizStatus = function (state, element) {
	var status = state.currentQuestion + 1;
	element.text(status);
}

var renderAnswer = function(state, answer) {
	var current = state.questions[state.currentQuestion];
	state.answerFlag = current.answers[current.correctIndex] === answer;
	return state.answerFlag
}

var renderRText = function (state, element) {
	var current = state.questions[state.currentQuestion];
	if (state.answerFlag) {
		state.score++;
		$('.score').text(state.score);
		element.text(state.correctText + " " + current.answers[current.correctIndex] + " was the correct answer!");
	} else {
		$('.score').text(state.score);
		element.text(state.incorrectText + " " + current.answers[current.correctIndex] + " was the correct answer!");
	}
}

var renderEText = function(state, element) {
	if (state.score < 3) {
		element.text('Your score is ' + state.score + ' out of ' + state.questions.length + '. You didn\'t do well. There is room for improvement.');
	} else if (state.score > 2 && state.score < 5) {
		element.text('Your score is ' + state.score + " out of " + state.questions.length + ". You did great but can improve!");
	} else if (state.score === 5) {
		element.text('Your score is ' + state.score + " out of " + state.questions.length +". You got all of them right!");
	}
}


// event listener
var quizPages = {
	// set to jQuery variables for .hide() and .show()
	'start': $('.main-page'),
	'question': $('.question-page'),
	'result': $('.result-page'),
	'end': $('.end-page')
}


$('.start').click(function(event) {
	event.preventDefault();
	setPage(state, 'question');
	renderQuiz(state, quizPages);
});

$('.answer').click(function(event) {
	event.preventDefault();
	setPage(state, 'result');
	var answer = $(this).text();
	renderAnswer(state, answer);
	renderQuiz(state, quizPages);
});

$('.next-question').click(function(event) {
	event.preventDefault();
	state.currentQuestion++;
	if (state.currentQuestion <= 4) {
		setPage(state, 'question');
		renderQuizStatus(state, $('.q-num'));
		renderQuiz(state, quizPages);
	} else {
		setPage(state, 'end');
		renderQuiz(state, quizPages);
	}
});

$('.restart').click(function(event) {
	event.preventDefault();
	state.score = 0;
	$('.score').text(state.score);
	state.currentQuestion = 0;
	$('.q-num').text(state.currentQuestion+1);
	shuffle(state.questions);
	setPage(state,'start');
	renderQuiz(state, quizPages);
});