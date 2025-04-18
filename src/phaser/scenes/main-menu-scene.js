export default class MainMenuScene extends Phaser.Scene {
  constructor() {
    super('MainMenuScene');
  }

  preload() {
    //
  }

  create() {
    const { width } = this.scale;

    this.add.text(width / 2, 100, 'Heroes Tactics', {
      color: '#ffffff',
      fontSize: '48px',
    }).setOrigin(0.5);

    this.createButton(width / 2, 200, 'OFFLINE', () => {
      this.scene.start('HeroSelectionScene');
    });

    this.createButton(width / 2, 270, 'ONLINE', () => {
      this.scene.start('MatchOnlineScene');
    });
    this.createButton(width / 2, 340, 'Heroes (Em desenvolvimento)', null, true);
  }

  createButton(x, y, text, callback, disabled = false) {
    const btn = this.add.text(x, y, text, {
      align: 'center',
      backgroundColor: disabled ? '#333' : '#555',
      color: disabled ? '#777' : '#fff',
      fontSize: '28px',
      padding: { x: 20, y: 10 }
    }).setOrigin(0.5).setInteractive();

    if (disabled) {
      btn.disableInteractive();
    } else if (callback) {
      btn.on('pointerdown', callback);
      btn.on('pointerover', () => btn.setStyle({ backgroundColor: '#777' }));
      btn.on('pointerout', () => btn.setStyle({ backgroundColor: '#555' }));
    }
  }
}
