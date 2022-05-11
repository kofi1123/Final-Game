
//console.log("Hello from main.js");

/*
------------    ON TRACK     ------------

Collaborations: Josh Temple, Kofi Quansah, Sophie Martin
Dat Completed:  5/1/2022

-...do something technically interesting? Are you particularly proud of a programming technique you implemented? 
    Did you look beyond the class examples and learn how to do something new? (5)

    I belive the system for spawning trains is technically interesting. It takes into
    account a large amount of factors in order to figure out where/if to spawn a train, as well as including an
    indicator beforehand of where the train will spawn.This helps create a balane where trains
    won't spawn on-top of eachother as often, helping balance the game while still providing
    opportunities for unique circumstanes to come about.

- ...have a great visual style? Does it use music or art that you're particularly proud of? 
    Are you trying something new or clever with the endless runner form? (5)

    I believe the game has a distinct and interesting visual/autistyle, largely inspired by the works of
    Piet Mondarian. The audio elements also work to fit in with this style as well. It's a very 
    unique style for an endless runner. Furthermore, the concept of an endless runner which takes plae in
    a small, confined space is something different for the -endless runner genre.

------------ POINT BREAKDOWN ------------
- Submit a link to your GitHub repository (5)
- Submit a playable link on GitHub pages (5)
- In main.js (or equivalent), include a header with collaborator names, game title, date completed, and your creative tilt justification (see below) (5)
- Use multiple Scene classes (defined by your game's style) (5)
- Properly transition between Scenes and allow the player to restart w/out having to reload the page (5)
- Communicate how to play w/ clear instructions (5)
- Have some form of player input/control appropriate to your game design (5)
- Include an animated character(s) that use a texture atlas (5)
- Implement proper collision detection (via Arcade Physics or use your own) (10)
- Have looping background music (5)
- Use sound effects for key mechanics, UI, and/or significant events appropriate to your game design (5)
- Use randomness to generate challenge, e.g. terrain, pickups, etc. (10)
- Include some metric of accomplishment that a player can improve over time, e.g., score (5)
- Be theoretically endless (5)
- Be playable for at least 15 seconds for a new player of low to moderate skill (5)

- The criterea for:
    Simulate scrolling with a tileSprite or equivalent means (5)
    Isn't included in this project, due to the naeture of the game. The game takes place in a
    stationary space, therefore scrolling wouldn't be appropriate for this project. Therefore, I believe
    these points shouldnt' be deducted from this projet.



*/
let config = {
    type: Phaser.CANVAS,
    width: 900,
    height: 700,
    backgroundColor: '#000000',
    scene: [Menu/*, Play, GameOver*/],
    fps: {
        target: 60,
        forceSetTimeOut: true
    }
};

let keyUP, keyDOWN, keyLEFT, keyRIGHT, keyR;
let borderUISize = config.height / 15;
let borderPadding = config.height / 7;
let game = new Phaser.Game(config);
let finalScore;