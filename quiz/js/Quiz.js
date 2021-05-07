
export default class Quiz {
  constructor(questions) {
    this.questions = questions;
	this.score = 0;
	this.currentIndex = 0; 
  }
  
  //gets the current index of question
  getCurrentQuestion () {
	  return this.questions[this.currentIndex];
  }
  //method to go next question
  nextIndex () {
	  this.currentIndex++;
  }
  
  //checks if questions are done 
  hasEnded () {
	  return this.currentIndex === this.questions.length;
  }
  
  guess (userGuess) {
	  //getting the current question
	  const currentQuestion = this.questions[this.currentIndex];
	  //checking if the guess is right and we add to the score
	  if(currentQuestion.isCorrect(userGuess)) {
		  this.score++;
	  }	
	  //either way it goes to next question
	  this.nextIndex();
  }
}


