export class Fighter {
    constructor(name, health, damage, moves) {
        this.name = name;
        this.health = health;
        this.maxHealth = health;
        this.damage = damage;
        this.moves = moves;
    }

    takeDamage(amount) {
        this.health -= amount;
    }

    heal(amount) {
        this.health += amount;
    }

    isDefeated() {
        return this.health <= 0;
    }

    chooseMove(){
        return this.moves[Math.floor(Math.random() * this.moves.length)];
    }

    isMoveSuccessful() {
        return Math.random() <= .8
    }
}
