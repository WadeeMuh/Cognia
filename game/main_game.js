export class Game {    
    constructor() {
        this.player = null;
        this.enemy = null;
        
    }

    loop() {
        this.reset();
        this.startFight();
        this.showWinner();
        this.endFight();
    }

    startFight() {
        const goesFirst = Math.random() < 0.5 ? this.player : this.enemy;
        const goesSecond = goesFirst === this.player ? this.enemy : this.player;

        while (!this.player.isDefeated() && !this.enemy.isDefeated()) {
            [goesFirst, goesSecond].forEach(fighter => {
                const enemy = fighter === goesFirst ? goesSecond : goesFirst;
                const move = fighter.chooseMove();

                if (fighter.isMoveSuccessful()) {
                    move.effectFunction(fighter, enemy);
                }
            });
        }
    }

    showWinner() {
        // show winner on ui
    }

    endFight() {
        // cleanup
    }

    reset() {}
}
    

function startGame(){
    
}