class Move {
    constructor(name, effectFunction, description) {
        this.name = name;
        this.effectFunction = effectFunction;
        this.description = description;
    }
}

export const Moves = {
    "be cute": new Move("be cute", (user, target) => {
        user.heal(10);
    }, "Heal yourself for 10 health by being cute."),
}