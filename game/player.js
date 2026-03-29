import { Fighter } from "./fighter.js";

async function getAllQuestions() {
  const result = await fetch('/get_questions', {
    method: 'GET'
  });
  const data = await result.json();
  return data;
}

export class Player extends Fighter {
  constructor(name, health, damage, moves) {
    super(name, health, damage, moves);

    this.questions = [];
    this.questionCorrect = [];
    this.questionsIncorrect = [];

    this.currentQuestion = null;

    this.getQuestions();
  }

  async getQuestions() {
    this.questions = await getAllQuestions();
    console.log(this.questions);
    console.log(this.questions[0]);
  }

  async chooseMove() {
    document.getElementsByClassName("battle-menu")[0].style.display = 'flex';

    return new Promise(resolve => {
      const controller = new AbortController();
      const moveButtons = Array.from(document.getElementsByClassName("menu-btn"));

      moveButtons.forEach(button => {
        button.addEventListener('click', () => {
          controller.abort(); // removes ALL listeners at once
          document.getElementsByClassName("battle-menu")[0].style.display = 'grid';
          resolve(button.id);
        }, { signal: controller.signal });
      });
    });
  }

  getMoveQuestion() {
    // get a random question or make an algorithm to determine which question to ask based on the player's past performance and shuffle answer choices cuz ai sucks
    return this.questions[Math.floor(Math.random() * this.questions.length)];
  }

  async getAnswer() {
    return new Promise(resolve => {
      const controller = new AbortController();
      const choiceButtons = Array.from(document.getElementsByClassName("choice-btn"));

      choiceButtons.forEach(button => {
        button.addEventListener('click', () => {
          controller.abort(); // removes ALL listeners at once
          resolve(button.id);
        }, { signal: controller.signal });
      });
    });
  }

  async isMoveSuccessful() {
    // check if answered correctly
    this.currentQuestion = this.getMoveQuestion();
    console.log("question is:", this.currentQuestion);

    document.getElementById('popup-overlay').style.display = 'flex';
    document.getElementById('popup-question').textContent = this.currentQuestion["question"];

    const choiceButtons = Array.from(document.getElementsByClassName("choice-btn"));
    choiceButtons.forEach(button => {
      button.textContent = this.currentQuestion[button.id];
    });

    let answer = await this.getAnswer();
    document.getElementById('popup-overlay').style.display = '';

    return answer == this.currentQuestion.correct_answer
  };
}