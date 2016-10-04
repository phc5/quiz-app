
// state 
const state = {
	questions: [
		{
			text: "Which US president is depicted on the Purple Heart medal?",
			answers: ['Abraham Lincoln', 'Theodore Roosevelt', 'George Washington', 'Benjamin Franklin'],
			correctAnswer: 'George Washington'
		}, 
		{
			text: "Myosis affects which part of the human body?",
			answers: ['Neck', 'Stomach', 'Mouth', 'Eye'],
			correctAnswer: 'Eye'
		},
		{
			text: "The drink Tequila is made from...",
			answers: ['Sugar Cane', 'Blue Agave', 'Aloe Vera', 'Cactus'],
			correctAnswer: 'Blue Agave'
		},
		{
			text: "Who was the #1 overall draft pick in the 2016 NBA Draft?",
			answers: ['Ben Simmons', 'Brandon Ingram', 'Jaylen Brown', 'Kris Dunn'],
			correctAnswer: 'Ben Simmons'
		},
		{
			text: "Wikipedia's spherical logo features what Greek symbol?",
			answers: ["Omega", "Theta", "Sigma", "Gamma"],
			correctAnswer: 'Omega'
		},
		{
			text: "The term 'GUI' stands for...?",
			answers: ["Graphical User Interface", "Graphics Unused Input", "Graphing Ultimate Interface", "Graphical Ultimate Interface"],
			correctAnswer: 'Graphical User Interface'
		},
		{
			text: "A deficiency in what vitamin will cause scurvy?",
			answers: ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"],
			correctAnswer: 'Vitamin C'
		},
		{
			text: "Basilosaurus a beast that lived before us but after the dinosaurs, evolved into which current day animal?",
			answers: ["Camel", "Elephant", "Whale", "Giraffe"],
			correctAnswer: 'Whale'
		},
		{
			text: "What is the name given to a substance that remains unchanged but which causes or accelerates a chemical reaction? What is the name given to a substance that remains unchanged but which causes or accelerates a chemical reaction?",
			answers: ["Homeostasis", "Homogenous", "Catalyst", "Heterogenous"],
			correctAnswer: 'Catalyst'
		},
		{
			text: "Which planet has the largest volcano and largest valley in the solar system?",
			answers: ["Mars", "Earth", "Venus", "Jupiter"],
			correctAnswer: 'Mars'
		}
	],
	score: 0,
	currentQuestion: 0,
	correctText: "Correct! +1 for you!",
	incorrectText: "Incorrect...",
	whichPage: 'start',
	answerFlag: true,
	time: 0
}

// modify
function setPage(state, page) {
	state.whichPage = page;
}

// Random Int number from http://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array-in-javascript
function shuffle(array) {
	for (let i = array.length; i; i--) {
		let randIndex = Math.floor(Math.random() * i);
		let swapHolder = array[i - 1];
		array[i - 1] = array[randIndex];
		array[randIndex] = swapHolder;
	}
}

function flagAnswer(state, answer) {
	state.answerFlag = state.questions[state.currentQuestion].correctAnswer === answer;
	return state.answerFlag;
}

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