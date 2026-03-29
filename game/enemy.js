import {Fighter} from "./fighter.js";
import {Moves} from "./moves.js";

const difficultySettings = {
    "easy": {
        health: 1,  
        damageMultiplier: 10,
        successChance: .5,
    },
    "medium": {
        health: 150,
        damageMultiplier: 1.5,
        successChance: .8,
    },
    "hard": {
        health: 200,
        damageMultiplier: 2,
        successChance: 1,
    }
};

const enemyMoves = {
    "job-application": [Moves.Rejection, Moves.Overqualified, Moves.Homeless, Moves.Employment],
    "shower": [],
};

export class Enemy extends Fighter {
    constructor(name, difficulty, enemyType) {
        super(name, difficultySettings[difficulty].health, difficultySettings[difficulty].damage, enemyMoves[enemyType] || []);

        this.difficulty = difficulty;
        this.enemyType = enemyType;
    }   

    chooseMove(){
        return this.moves[Math.floor(Math.random() * this.moves.length)];
    }

    isMoveSuccessful() {
        return Math.random() <= difficultySettings[this.difficulty].successChance;
    }
}