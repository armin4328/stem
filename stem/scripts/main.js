import * as WebFontLoader from '../scripts/webfontloader.js';

class Menu extends Phaser.Scene {
  constructor() {
    super('Game');

    // 2D list of cybersecurity questions (format: ["question", true/false])
    this.questions = [
      ["Using 'password' as your password is secure.", false],
      ["Updating software regularly can improve security.", true],
      ["Sharing your password with a friend is safe.", false],
      ["Two-factor authentication adds an extra layer of security.", true],
      ["Phishing attacks can steal your personal information.", true]
    ];

    this.currentQuestionIndex = 0; // Keep track of the current question
  }

  preload() {
    // Preload assets
    this.load.spritesheet("scores","../assets/scoreSheet.png", {
      frameWidth: 130,
      frameHeight: 640,
    });
    this.load.image('logo', 'https://labs.phaser.io/assets/sprites/phaser3-logo.png');
    this.load.image('true', '../assets/true.png');
    this.load.image('false', '../assets/false.png');
    this.load.image('menuButton', '../assets/true.png'); // Placeholder menu button
  }

  create() {
    this.currentQuestionIndex = 0;
    this.score = 0;
    // Create game objects
    const logo = this.add.image(this.scale.width / 2, this.scale.height / 2 - 150, 'logo');
    const trueButton = this.add.image(this.scale.width / 2 - 300, this.scale.height / 2 + 100, 'true').setInteractive();
    const falseButton = this.add.image(this.scale.width / 2 + 300, this.scale.height / 2 + 100, 'false').setInteractive();

    this.scoreBoard = this.add.sprite(300,550, "scores");
    
    this.anims.create({
      key: "xp_0",
      frames: [{frame: 0}],
      defaultTextureKey: 'scores',
      repeat: -1
    });

    this.anims.create({
      key: "xp_1",
      frames: [{frame: 1}],
      defaultTextureKey: 'scores',
      repeat: -1
    });

    this.anims.create({
      key: "xp_2",
      frames: [{frame: 2}],
      defaultTextureKey: 'scores',
      repeat: -1
    });

    this.anims.create({
      key: "xp_3",
      frames: [{frame: 3}],
      defaultTextureKey: 'scores',
      repeat: -1
    });

    this.anims.create({
      key: "xp_4",
      frames: [{frame: 4}],
      defaultTextureKey: 'scores',
      repeat: -1
    });

    this.anims.create({
      key: "xp_5",
      frames: [{frame: 5}],
      defaultTextureKey: 'scores',
      repeat: -1
    });

    // Display the first question
    this.questionText = this.add.text(this.scale.width / 2, this.scale.height / 2, this.questions[this.currentQuestionIndex][0], {
      fontSize: '50px',
      color: '#ffffff',
      fontFamily: 'GameFont',
      letterSpacing: 50,
    }).setOrigin(0.5);

    // Handle true button click
    trueButton.on('pointerdown', () => {
      this.checkAnswer(true);
      this.addClickEffect(trueButton);
    });

    // Handle false button click
    falseButton.on('pointerdown', () => {
      this.checkAnswer(false);
      this.addClickEffect(falseButton);
    });

    // Add hover effects
    this.addHoverEffect(trueButton);
    this.addHoverEffect(falseButton);

    // Add a "Main Menu" button
    const menuButton = this.add.image(100, 50, 'menuButton').setInteractive();
    menuButton.setScale(0.5); // Adjust button size
    this.add.text(80, 40, 'Menu', { fontSize: '20px', color: '#ffffff' }).setOrigin(0.5);

    // Handle menu button click
    menuButton.on('pointerdown', () => {
      this.scene.start('MainMenu'); // Redirect to the MainMenu scene
    });

    // Add a resize listener
    this.scale.on('resize', this.resize, this);
    
  }

  addHoverEffect(button) {
    this.tweens.add({
      targets: button,
      y: button.y - 10, // Move slightly upwards
      duration: 1000, // Animation duration in ms
      ease: 'Sine.easeInOut',
      yoyo: true, // Reverse the animation
      repeat: -1 // Repeat indefinitely
    });
  }

  addClickEffect(button) {
    this.tweens.add({
      targets: button,
      scaleX: 0.9,
      scaleY: 0.9,
      duration: 100,
      yoyo: true,
      ease: 'Sine.easeInOut'
    });
  }
  
  checkAnswer(answer) {
    const correctAnswer = this.questions[this.currentQuestionIndex][1];
    if (answer === correctAnswer) {
      this.score++;
    }

    // Move to the next question
    this.currentQuestionIndex++;

    if (this.currentQuestionIndex < this.questions.length) {
      // Update the question text
      this.questionText.setText(this.questions[this.currentQuestionIndex][0]);
    } else {
      // No more questions - display a completion message
      this.questionText.setText('Quiz Complete!');
    }
  }

  resize(gameSize) {
    const width = gameSize.width;
    const height = gameSize.height;
    this.cameras.resize(width, height);
  }
  

  update() {
    switch(this.score) {
      case 0:
        this.scoreBoard.play("xp_0", true);
        break
      case 1:
        this.scoreBoard.play("xp_1", true);
        break
      case 2:
        this.scoreBoard.play("xp_2", true);
        break
      case 3:
        this.scoreBoard.play("xp_3", true);
        break
      case 4:
        this.scoreBoard.play("xp_4", true);
        break
      case 5:
        this.scoreBoard.play("xp_5", true);
        break
    }
    // Add game logic that updates every frame
  }
}

// Main Menu Scene
class MainMenu extends Phaser.Scene {
  constructor() {
    super('MainMenu');
  }

  preload() {
    // Load any assets needed for the main menu
    this.load.image('logo', 'https://labs.phaser.io/assets/sprites/phaser3-logo.png');
    
  }

  create() {

    this.add.text(this.scale.width / 2, this.scale.height / 2 - 100, 'Main Menu', {
      fontSize: '40px',
      color: '#ffffff',
      fontFamily: 'GameFont'
    }).setOrigin(0.5);

    this.add.text(this.scale.width / 2, this.scale.height / 2 - 50, 'Levels', {
      fontSize: '35px',
      color: '#ffffff',
      fontFamily: 'GameFont'
    }).setOrigin(0.5);

    const playButton = this.add.text(this.scale.width / 2, this.scale.height / 2, 'Start Quiz', {
      fontSize: '30px',
      color: '#00ff00',
      fontFamily: 'GameFont'
    }).setOrigin(0.5).setInteractive();

    playButton.on('pointerdown', () => {
      this.scene.stop('MainMenu');
      this.scene.start('Game'); // Redirect back to the Quiz Scene
    });
  }
}

// Game configuration
const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: '#3498db',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },
  scene: [MainMenu, Menu] // Register both scenes
};

// Create a new Phaser Game instance
const game = new Phaser.Game(config);

// Handle window resizing
window.addEventListener('resize', () => {
  game.scale.resize(window.innerWidth, window.innerHeight);
});
