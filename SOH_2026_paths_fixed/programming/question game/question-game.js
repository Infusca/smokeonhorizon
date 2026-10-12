
	function startGame(){


// 7. Privacy

(function(){


  // 1. Create function Constructor
  var Question = function(question, choices, answer){
    this.question = question;
    this.choices = choices;
    this.answer = answer;
    };

  Question.prototype.printQuestion = function(){
      console.log(this.question);
      for (i=0; i < this.choices.length; i++){
      console.log(i + ' : ' + this.choices[i]);
      }
    };

  // 2. Create questions using Constructor
  var question1 = new Question('How cool is it to learn code?',
    ['Really cool', 'Kinda neat', 'Lame'], 0);

  var question2 = new Question('What is Nic\'s favorite animal?',
    ['Cat', 'Spider', 'Wolf', 'Kangeroo'], 2);

  var question3 = new Question('What is the most recent concert I went to?',
    ['Local band', 'The Cult', 'Led Zeppelin', '3 Doors Down'], 1);

	var question4 = new Question('What is another one of my favorite hobbies?',
    ['Jet skiiing', 'Metal detecting', 'Rock climbing', 'Running'], 1);

	var question5 = new Question('What company do I work for?',
    ['Rite Aid', 'Stop N Shop', 'Hartford hospital', 'Walgreens'], 3);

	var question6 = new Question('How many pets do I have?',
    ['5', '4', '2', '7'], 0);

	var question7 = new Question('How much do I like cheese?',
    ['A lot', 'A little', 'What is cheese?',], 0);

	var question8 = new Question('What town do I live in?',
    ['Hebron', 'Manchester', 'Coventry', 'Amston'], 3);

	var question9 = new Question('How fun is this game?',
    ['It really sucks', 'Boring', 'Super cool', 'I haven\'t figured out how to play yet'], 2);

	var question10 = new Question('What college did I go to?',
    ['Yale', 'Umass', 'Uconn', 'didn\'t go to college'], 2);

  // 3. Store questions in array
  var questions = [question1, question2, question3,question4,question5,question6,question7,question8,question9,question10];

  // 4. Select random question & log in console
  var x = Math.floor(Math.random() * questions.length);
  questions[x].printQuestion();

  // 5. Use 'Prompt' to ask user for answer
var ans = prompt('Please select answer.');

function runProgram(){
  var x = Math.floor(Math.random() * questions.length);
  questions[x].printQuestion();
  var ans = prompt('Please select answer. Type \'exit\' to end game.');
  questions[x].checkAnswer(ans);
}
  var score = 0;
  // 6. Check if answer is correct
  Question.prototype.checkAnswer = function(ans){
  if (this.answer == ans){
    score += 1;
	console.log(' ');
	console.log('CORRECT ANSWER!   Current score: ' + score);
    console.log('________________')
  } else {
	console.log(' ');
    console.log('WRONG ANSWER!');
    console.log('Current score: ' + score);
    console.log('________________')
  };
  if (ans == 'exit'){
    console.log('Thanks for playing!');
  } else {
    runProgram();
  };
  }

 questions[x].checkAnswer(ans);



})();

		}; //end of startGame function
