class Move {
    constructor(name, effectFunction, description) {
        this.name = name;
        this.effectFunction = effectFunction;
        this.description = description;
    }
}

export const Moves = {
    "Big Hug": new Move("Big Hug", (user, target) => {
        target.takeDamage(20);
    }, "You Dealt 20 Damage To Job Application!"),
    "Virus": new Move("Virus", (user, target) => {
        target.takeDamage(Math.floor(Math.random() * 40));
    }, "You Dealt A Random Amount Of Damage To Job Application!"),
    "Bug": new Move("Bug", (user, target) => {
        target.takeDamage(10);
    }, "You Dealt 5 Damage To Job Application!"),
    "Self Hug": new Move("Big Hug", (user, target) => {
        user.heal(15);
    }, "You Healed 15 HP!"),

    "Rejection": new Move("Rejection", (user, target) => {
        target.takeDamage(20);
    }, "You Lost 20 Health, And You Are Unemployed!"),
    "Overqualified": new Move("Overqualified", (user, target) => {
        target.takeDamage(15);
    }, "You Lost 15 Health, McDonalds Does Not Need A PHD!"),
    "Homeless": new Move("Homeless", (user, target) => {
        target.takeDamage(10);
    }, "You Lost 10 Health, You Are Now Homeless!"),
    "Employment": new Move("Employment", (user, target) => {
        user.heal(15);
    }, "Job Application Hired Someone Else, He Healed 15 HP!"),
}