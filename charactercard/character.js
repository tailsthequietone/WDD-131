const character = {
    name: "Phantom Thief",
    class: "Magician",
    level: 1,
    health: 100,
    image: "1776278033434258722-9dae73f1-4470-4621-b43f-8b41f403d758-2212264344.jpg", 
    

    attacked: function() {
        if (this.health > 0) {
            this.health -= 20;
            if (this.health <= 0) {
                this.health = 0;
                alert(`${this.name} has died!`);
            }
            renderCharacter();
        } else {
            alert(`${this.name} is already dead!`);
        }
    },


    levelUp: function() {
        this.level += 1;
        renderCharacter();
    }
};


function renderCharacter() {
    document.getElementById("char-name").textContent = character.name;
    document.getElementById("char-class").textContent = character.class;
    document.getElementById("char-level").textContent = character.level;
    document.getElementById("char-health").textContent = character.health;
    
    const imageEl = document.getElementById("char-image");
    imageEl.src = character.image;
    imageEl.alt = `${character.name} the ${character.class}`;
}


document.addEventListener("DOMContentLoaded", () => {
    renderCharacter();

    document.getElementById("attack-btn").addEventListener("click", () => {
        character.attacked();
    });

    document.getElementById("levelup-btn").addEventListener("click", () => {
        character.levelUp();
    });
});