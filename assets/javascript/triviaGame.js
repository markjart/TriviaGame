var panel = $("#quizArea");
var countStartNumber = 30;

//Question set --- array of object properties

var questions = [
	{
		question: "Of the twelve studio albums that the Beatles released in the United Kingdom, how many reached number one on the charts?",
		answers: [12, 9, 11, 7],
		correctAnswer: 11,
		image:"assets/images/yellowSub.gif"
	},
	{
		question: "Which Beatle's first name is really James?",
		answers: ["John", "Paul", "George", "Ringo"],
		correctAnswer: "Paul",
		image:"assets/images/paulPoof.gif"
	}, 
	{
		question: "Three of the Beatles had brown eyes. Who was the blue-eyed boy?",
		answers: ["John", "Paul", "George", "Ringo"],
		correctAnswer: "Ringo",
		image:"assets/images/blueEyedBoy.gif" 
	}, 
	{
		question: "This Beatle was born in 1940 and his mothers name was Julia.",
		answers: ["John", "Paul", "George", "Ringo"],
		correctAnswer: "John",
		image:"assets/images/JohnGoofing.gif"
	},
	{
		question: "Which Beatle wrote the songs 'Taxman' and 'Here Comes the Sun?'",
		answers: ["John", "Paul", "George", "Ringo"],
		correctAnswer: "George",
		image:"assets/images/Harrison.gif"
	},
	{
		question: "Known as the Quiet Beatle, he talked to other Beatles into exploring eastern religions.",
		answers: ["John", "Paul", "George", "Ringo"],
		correctAnswer: "George",
		image:"assets/images/ghSitar.gif"
	},
	{
		question: "Finish this line from the Beatles song, 'Come Together': 'Here come old flat top, He come grooving up ...'",
		answers: ["over me", "slowly", "with tea", "slothly"],
		correctAnswer: "slowly",
		image:"assets/images/beatlesabbeyroad_0.gif"
	},
	{
		question: "John Lennon wrote the song, 'Sexy Sadie' about his disillusionment with...?",
		answers: ["the direction the band was going", "the Guru, Maharishi Mahesh Yogi", "they're producer, George Martin", "Paul's dislike of Yoko"],
		correctAnswer: "the Guru, Maharishi Mahesh Yogi",
		image:"assets/images/guru060208dm_468x286.jpg"
	},
	{
		question: "In his biography, which Beatles song did Paul admit he wrote as an ode to marijuana?",
		answers: ["Paperback Writer", "Can't Buy Me Love", "Martha My Dear", "Got To Get You Into My Life"],
		correctAnswer: "Got To Get You Into My Life",
		image:"assets/images/beatlesmagical.gif"
	},
	{
		question: "What was the final studio album released by the Beatles in the UK in 1970?",
		answers: ["Yellow Submarine", "Abbey Road", "The Beatles (White Album)", "Let It Be"],
		correctAnswer: "Let It Be",
		image:"assets/images/letItBe.gif"
	}	
];

//Object with a whole lotta Methods using above properties

var triviaGame = {
  questions:questions,
  currentQuestion:0,
  counter:countStartNumber,
  correct:0,
  incorrect:0,
  countdown: function(){
    triviaGame.counter--;
    $("#counter-number").html(triviaGame.counter);

    if (triviaGame.counter === 0){
      console.log("TIME UP");
      triviaGame.timeUp();
    }
  },
  loadQuestion: function(){
    timer = setInterval(triviaGame.countdown, 1000);
    panel.html("<h3 id='question'>" + questions[this.currentQuestion].question + "</h3>" );
    for (var i = 0; i<questions[this.currentQuestion].answers.length; i++){
      panel.append("<button class='answer-button' id='button'" + "data-name='" + questions[this.currentQuestion].answers[i] + "'>" + questions[this.currentQuestion].answers[i]+ "</button>");
    }
  },
  nextQuestion: function(){
    triviaGame.counter = countStartNumber;
    $("#counter-number").html(triviaGame.counter);
    triviaGame.currentQuestion++;
    triviaGame.loadQuestion();
  },
  timeUp: function (){
    clearInterval(timer);
    $("#counter-number").html(triviaGame.counter);

    panel.html("<h3>Out of Time!</h3>");
    panel.append("<h3>The Correct Answer was: " + questions[this.currentQuestion].correctAnswer);
    panel.append("<img src='" + questions[this.currentQuestion].image + "' />");

    if (triviaGame.currentQuestion === questions.length - 1){
      setTimeout(triviaGame.results, 3 * 1000);
    } else {
      setTimeout(triviaGame.nextQuestion, 3 * 1000);
    }
  },
  results: function() {
    clearInterval(timer);

    panel.html("<h2>Game Over - Here's how you did!</h2>");
    $("#counter-number").html(triviaGame.counter);
    panel.append("<h3>Correct Answers: " + triviaGame.correct + '</h3>');
    panel.append("<h3>Incorrect Answers: " + triviaGame.incorrect + '</h3>');
    panel.append("<h3>Unanswered: " + (questions.length - (triviaGame.incorrect + triviaGame.correct)) + "</h3>");
    panel.append("<br><button id='start-over'>Start Over?</button>");
  },
  clicked: function(isClicked) {
    clearInterval(timer);

    if ($(isClicked.target).data("name") === questions[this.currentQuestion].correctAnswer){
      this.answeredCorrectly();
    } else {
      this.answeredIncorrectly();
    }
  },
  answeredIncorrectly: function() {
    triviaGame.incorrect++;
    clearInterval(timer);
    panel.html("<h2>So Sorry - You are Wrong!!</h2>");
    panel.append("<h3>The Correct Answer was: " + questions[triviaGame.currentQuestion].correctAnswer + "</h3>");
    panel.append("<img src='" + questions[triviaGame.currentQuestion].image + "' />");

    if (triviaGame.currentQuestion === questions.length - 1){
      setTimeout(triviaGame.results, 3 * 1000);
    } else {
      setTimeout(triviaGame.nextQuestion, 3 * 1000);
    }
  },
  answeredCorrectly: function(){
    clearInterval(timer);
    triviaGame.correct++;
    panel.html('<h2>You are Correct!</h2>');
    panel.append('<img src="' + questions[triviaGame.currentQuestion].image + '" />');

    if (triviaGame.currentQuestion === questions.length - 1){
      setTimeout(triviaGame.results, 3 * 1000);
    } else {
      setTimeout(triviaGame.nextQuestion, 3 * 1000);
    }
  },
  reset: function(){
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};

//CLICK EVENTS ------

$(document).on("click", "#start-over", function(isClicked) {
  triviaGame.reset();
});

$(document).on("click", ".answer-button", function(isClicked) {
  triviaGame.clicked(isClicked);
});

$(document).on("click", "#start", function(isClicked) {
  $("#footer").append("<h2>Time Remaining: <span id='counter-number'>30</span> Seconds</h2>");
  triviaGame.loadQuestion();
});