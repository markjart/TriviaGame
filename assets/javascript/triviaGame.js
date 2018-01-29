var panel = $("#quizArea");
var countStartNumber = 30;

//Question set --- array of object properties

var questions = [
	{
		question: "Of the 12 studio albums that the Beatles released, how many reached number one on the charts?",
		answers: [12, 9, 11, 7],
		correctAnswer: 11,
		image: "assets/images/yellowSub.gif",
		factoid: "Yellow Submarine didn't reach number 1."
	},
	{
		question: "Which Beatle's first name is really James?",
		answers: ["John", "Paul", "George", "Ringo"],
		correctAnswer: "Paul",
		image: "assets/images/paulPoof.gif",
		factoid: "James Paul McCartney's middle name is <em>Paul</em>."
	}, 
	{
		question: "Three of the Beatles had brown eyes. Who was the blue-eyed boy?",
		answers: ["John", "Paul", "George", "Ringo"],
		correctAnswer: "Ringo",
		image: "assets/images/blueEyedBoy.gif",
		factoid: "Ringo's real name if Richard Starkey."
	}, 
	{
		question: "This Beatle was born in 1940 and his mothers name was Julia.",
		answers: ["John", "Paul", "George", "Ringo"],
		correctAnswer: "John",
		image: "assets/images/JohnGoofing.gif",
		factoid: "The song, 'Julia' on 'The Beatles (White Album)' was about John's mother."
	},
	{
		question: "Which Beatle wrote the songs 'Taxman' and 'Here Comes the Sun?'",
		answers: ["John", "Paul", "George", "Ringo"],
		correctAnswer: "George",
		image: "assets/images/Harrison.gif",
		factoid: "George's first song was, 'Don't Bother Me' - which was his attitude towards the record execs."
	},
	{
		question: "Known as the Quiet Beatle, he talked to other Beatles into exploring eastern religions.",
		answers: ["John", "Paul", "George", "Ringo"],
		correctAnswer: "George",
		image: "assets/images/ghSitar.gif",
		factoid: "George gave up the Sitar after he realized he would only ever be just a good Sitar player, of which the world already had plenty."
	},
	{
		question: "Finish this line from the Beatles song, 'Come Together': 'Here come old flat top, He come grooving up ...'",
		answers: ["over me", "slowly", "with tea", "slothly"],
		correctAnswer: "slowly",
		image: "assets/images/beatlesabbeyroad_0.gif",
		factoid: "In the late Sixties, John would often write nonsensical song lyrics because he learned a college was teaching a course analyzing Beatles Lyrics."
	},
	{
		question: "John Lennon wrote the song, 'Sexy Sadie' about his disillusionment with...?",
		answers: ["the direction the band was going", "the Guru, Maharishi Mahesh Yogi", "they're producer, George Martin", "Paul's dislike of Yoko"],
		correctAnswer: "the Guru, Maharishi Mahesh Yogi",
		image: "assets/images/guru060208dm_468x286.jpg",
		factoid: "John became upset with the yogi because he hit on Mia Farrow."
	},
	{
		question: "In his biography, which Beatles song did Paul admit he wrote as an ode to marijuana?",
		answers: ["Paperback Writer", "Can't Buy Me Love", "Martha My Dear", "Got To Get You Into My Life"],
		correctAnswer: "Got To Get You Into My Life",
		image: "assets/images/beatlesmagical.gif",
		factoid: "Paul wrote, 'Martha My Dear' about his beloved sheep dog, Martha."
	},
	{
		question: "What was the final studio album released by the Beatles in the UK in 1970?",
		answers: ["Yellow Submarine", "The Beatles (White Album)", "Let It Be", "Abbey Road"],
		correctAnswer: "Let It Be",
		image: "assets/images/letItBe.gif",
		factoid: "The Beatles <em>officially</em> ended when Paul announced on 10 April 1970 that he was leaving the band."
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
    $("#counterNumber").html(triviaGame.counter);

    if (triviaGame.counter === 0){
      console.log("TIME UP");
      triviaGame.timeUp();
    }
  },
  loadQuestion: function(){
    timer = setInterval(triviaGame.countdown, 1000);
    panel.html("<h3 id='question'>" + questions[this.currentQuestion].question + "</h3>" );
    for (var i = 0; i < questions[this.currentQuestion].answers.length; i++){
      panel.append("<button class='answerButton' id='button'" + "data-name='" + questions[this.currentQuestion].answers[i] + "'>" + questions[this.currentQuestion].answers[i]+ "</button>");
    }
  },
  nextQuestion: function(){
    triviaGame.counter = countStartNumber;
    $("#counterNumber").html(triviaGame.counter);
    triviaGame.currentQuestion++;
    triviaGame.loadQuestion();
  },
  timeUp: function (){
    clearInterval(timer);
    $("#counterNumber").html(triviaGame.counter);

    panel.html("<h3>Out of Time!</h3>");
    panel.append("<h3>The Correct Answer was: " + questions[this.currentQuestion].correctAnswer);
    panel.append("<img src='" + questions[this.currentQuestion].image + "' />");

    if (triviaGame.currentQuestion === questions.length - 1){
      setTimeout(triviaGame.results, 5 * 1000);
    } else {
      setTimeout(triviaGame.nextQuestion, 5 * 1000);
    }
  },
  results: function() {
    clearInterval(timer);

    panel.html("<h2>Game Over - Here's how you did!</h2>");
    $("#counterNumber").html(triviaGame.counter);
    panel.append("<h3>Correct Answers: " + triviaGame.correct + '</h3>');
    panel.append("<h3>Incorrect Answers: " + triviaGame.incorrect + '</h3>');
    panel.append("<h3>Unanswered: " + (questions.length - (triviaGame.incorrect + triviaGame.correct)) + "</h3>");
    panel.append("<br><button id='startOver'>Start Over?</button>");
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
//--------------------------NEW
    panel.append("<h4 id='factish'>" + questions[triviaGame.currentQuestion].factoid + "</h4>");	

    if (triviaGame.currentQuestion === questions.length - 1){
      setTimeout(triviaGame.results, 5 * 1000);
    } else {
      setTimeout(triviaGame.nextQuestion, 5 * 1000);
    }
  },
  answeredCorrectly: function(){
    triviaGame.correct++;	  
    clearInterval(timer);
    panel.html("<h2>You are Correct!</h2>");
    panel.append("<img src='" + questions[triviaGame.currentQuestion].image + "' />");
//--------------------------NEW
    panel.append("<h4 id='factish'>" + questions[triviaGame.currentQuestion].factoid + "</h4>");	

    if (triviaGame.currentQuestion === questions.length - 1){
      setTimeout(triviaGame.results, 5 * 1000);
    } else {
      setTimeout(triviaGame.nextQuestion, 5 * 1000);
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

$(document).on("click", "#startOver", function(isClicked) {
  triviaGame.reset();
});

$(document).on("click", ".answerButton", function(isClicked) {
  triviaGame.clicked(isClicked);
});

$(document).on("click", "#start", function(isClicked) {
  $("#footer").append("<h2>Time Remaining: <span id='counterNumber'>30</span> Seconds</h2>");
  triviaGame.loadQuestion();
});