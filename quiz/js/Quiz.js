export default class Quiz {
  constructor(questions) {
    this.questions = questions;
    this.score = 0;
    this.currentIndex = 0;
  }

  //gets the current index of question
  getCurrentQuestion() {
    return this.questions[this.currentIndex];
  }
  //method to go next question
  nextIndex() {
    this.currentIndex++;
  }
  //checks if questions are done
  hasEnded() {
    return this.currentIndex === this.questions.length;
  }

  guess(userGuess) {
    const currentQuestion = this.questions[this.currentIndex];
    if (currentQuestion.isCorrect(userGuess)) {
      this.score++;
    }
    this.nextIndex();
  }

  reset() {
    this.score = 0;
    this.currentIndex = 0;
  }
}