class Engine {
  constructor(theRoot) {
    this.root = theRoot;
    this.player = new Player(this.root);
    this.enemies = [];
    this.bonuses = [];
    this.score = new Text(this.root, 740, 10, 25);
    this.timelapsed = 0;
    addBackground(this.root);
  }

  gameLoop = () => {
    if (this.lastFrame === undefined) {
      this.lastFrame = new Date().getTime();
    }

    let timeDiff = new Date().getTime() - this.lastFrame;
    this.lastFrame = new Date().getTime();
    this.timelapsed += timeDiff;
    this.score.update(this.timelapsed);
    this.enemies.forEach((enemy) => {
      enemy.update(timeDiff);
    });

    this.bonuses.forEach((bonus) => {
      bonus.update(timeDiff);
    });
    this.enemies = this.enemies.filter((enemy) => {
      return !enemy.destroyed;
    });
    this.bonuses = this.bonuses.filter((bonus) => {
      return !bonus.destroyed;
    });

    while (this.enemies.length < MAX_ENEMIES) {
      const spot = nextEnemySpot(this.enemies);
      this.enemies.push(new Enemy(this.root, spot));
    }

    while (this.bonuses.length < MAX_BONUSES) {
      const spot = nextBonusSpot(this.bonuses);
      this.bonuses.push(new Bonus(this.root, spot));
    }

    if (this.isPlayerBonus()) {
      this.timelapsed = this.timelapsed + 700;
    }

    if (this.isPlayerDead()) {
      let text = new Text(this.root, 50, 300, 45);
        text.update("You failed to escape the Empire ...");
      let reset = document.createElement("button");
        reset.className = "start";
        reset.innerText = "RETRY";
        app.appendChild(reset);
        reset.addEventListener("click", () => this.resetGame(reset, text));
      return;
    }

    setTimeout(this.gameLoop, 20);
  };

  resetGame(reset, text) {
    reset.style.display = "none";
    this.gameLoop();
    text.update("");
    this.timelapsed = 0;
    this.lastFrame = new Date().getTime();
    this.score.update(0);
  }

  isPlayerBonus = () => {
    let isPlayerBonus = false;

    this.bonuses.forEach((bonus) => {
      if (this.player.x === bonus.x && this.player.y < bonus.y + BONUS_HEIGHT) {
        isPlayerBonus = true;
      }
    });
    return isPlayerBonus;
  };

  isPlayerDead = () => {
    let isPlayerDead = false;
      this.enemies.forEach((enemy) => {
        if (this.player.x === enemy.x && this.player.y < enemy.y + ENEMY_HEIGHT) {
          isPlayerDead = true;
      }
    });
      return isPlayerDead;
  }; 
}

