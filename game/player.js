import {Fighter} from "./fighter.js";

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

    chooseMove() {
        // prompt player to choose a move 
    }

    getMoveQuestion() {
        // get a random question or make an algorithm to determine which question to ask based on the player's past performance and shuffle answer choices cuz ai sucks
    }

    isMoveSuccessful() {
        // check if answered correctly
    }
}