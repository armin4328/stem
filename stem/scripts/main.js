class Menu extends Phaser.Scene {
    constructor() {
      super('Menu');
    }
  
    preload() {
      // Preload assets
      this.load.image('logo', 'https://labs.phaser.io/assets/sprites/phaser3-logo.png');
    }
  
    create() {
      // Create game objects
      const logo = this.add.image(this.scale.width / 2, this.scale.height / 2, 'logo');
      this.tweens.add({
        targets: logo,
        y: this.scale.height - 100,
        duration: 2000,
        ease: 'Power2',
        yoyo: true,
        loop: -1
      });
  
      // Add a resize listener
      this.scale.on('resize', this.resize, this);
    }
  
    resize(gameSize) {
      const width = gameSize.width;
      const height = gameSize.height;
      this.cameras.resize(width, height);
    }
  
    update() {
      // Add game logic that updates every frame
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
    scene: Menu
  };
  
  // Create a new Phaser Game instance
  const game = new Phaser.Game(config);
  
  // Handle window resizing
  window.addEventListener('resize', () => {
    game.scale.resize(window.innerWidth, window.innerHeight);
  });
  