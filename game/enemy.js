import {Fighter} from "./fighter.js";

const difficultySettings = {
    "easy": {
        health: 100,  
        damage: 10,
        successChance: .5,
    },
    "medium": {
        health: 150,
        damage: 15,
        successChance: .8,
    },
    "hard": {
        health: 200,
        damage: 20,
        successChance: 1,
    }
};

const enemyMoves = {
    "job": [],
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