import { Enemy } from "./enemy.js";
import { Player } from "./player.js";
import {Moves} from "./moves.js";

export class Game {    
    constructor() {
        this.player = null;
        this.enemy = null;
    }

    startFight() {
        const goesFirst = Math.random() < 0.5 ? this.player : this.enemy;
        const goesSecond = goesFirst === this.player ? this.enemy : this.player;

        document.getElementById("move-narration").textContent = '';

        while (!this.player.isDefeated() && !this.enemy.isDefeated()) {
            [goesFirst, goesSecond].forEach(fighter => {
                if (fighter === this.player) {
                    document.getElementById("battle-menu").style.display = 'none';
                }else {
                    document.getElementById("battle-menu").style.display = 'grid';
                }

                const enemy = fighter === goesFirst ? goesSecond : goesFirst;
                const move = fighter.chooseMove();
                
                if (fighter.isMoveSuccessful()) {
                    document.getElementById("move-narration").textContent = `${fighter.name} used ${move.name}, ${move.description}`;
                    move.effectFunction(fighter, enemy);
                } else {
                    document.getElementById("move-narration").textContent = `${fighter.name} used ${move.name}, but it missed!`;
                }

                document.getElementById("enemy-hp-text").textContent = `${this.enemy.health} / ${this.enemy.maxHealth}`;
                document.getElementById("player-hp-text").textContent = `${this.player.health} / ${this.player.maxHealth}`;

                document.getElementById("enemy-bar").style.width = Math.floor(this.enemy.health/this.enemy.maxHealth * 100) + '%';
                document.getElementById("player-bar").style.width = Math.floor(this.player.health/this.player.maxHealth * 100) + '%';
            });
        }
    }

    showWinner() {
        // show winner on ui
        document.getElementById("winner-narration").style.display = "none";

        let result = ""
        if (this.player.isDefeated()) {
          result = "You Lost!\nClick To Go Back To Menu!"
        }else {
          result = "Congrats You Won!\nClick To Go Back To Menu!"
        }

        document.getElementById("winner-narration").textContent = result;
    }

    reset() {
        this.enemy = new Enemy("Job Application", "easy", "job-application")
        this.player = new Player("Bao", 100, [Moves["Big Hug"], Moves["Virus"], Moves["Bug"], Moves["Self Hug"]])

        document.getElementById("move-narration").textContent = '';
    }
}
