export default class Question {
  constructor(question, choices, answerKey) {
    this.question = question;
    this.choices = choices;
    this.answerKey = answerKey;
  }
  //method for checking if guess is equal to answerkey
  isCorrect(guessKey) {
    return guessKey === this.answerKey;
  }
}
