import Hero from '../core/hero.js';
import { skills } from './skills.js';

export class Ralph extends Hero {
  static data = {
    abilities: [
      {
        description: skills.firstPunch.description,
        key: 'firstPunch',
        name: skills.firstPunch.name
      },
      {
        description: skills.autoDefense.description,
        key: 'autoDefense',
        name: skills.autoDefense.name
      }
    ],
    frame: 2,
    name: 'Ralph',
    stats: { ability: null, attack: 3, hp: 17 }
  };

  constructor(scene, x, y) {
    super(
      scene,
      x,
      y,
      Ralph.data.frame,
      Ralph.data.name,
      Ralph.data.stats.attack,
      Ralph.data.stats.hp,
      Ralph.data.stats.ability,
      Ralph.data.abilities.map(a => a.key)
    );
    this.state.hasPunched = false;
    this.state.firstPunchApplied = false;
  }

  counterAttack(target) {
    console.log(`${this.name} realiza um contra-ataque em ${target.name}!`);
    target.takeDamage(this.stats.attack, this);

    if (!this.state.hasPunched) {
      this.increaseAttack(-2);
      this.state.hasPunched = true;
    }

    this.updateHeroStats();
  }

  takeDamage(amount, attacker = null, isCounterAttack = false) {
    if (isCounterAttack) {
      amount = Math.max(0, amount - 1); 
    }
    
    super.takeDamage(amount, attacker);
  }
}

export class Vic extends Hero {
  static data = {
    abilities: [
      {
        description: skills.poisonAttack.description,
        key: 'poisonAttack',
        name: skills.poisonAttack.name
      }
    ],
    frame: 1,
    name: 'Vic',
    stats: { ability: null, attack: 1, hp: 19 }
  };

  constructor(scene, x, y) {
    super(
      scene,
      x,
      y,
      Vic.data.frame,
      Vic.data.name,
      Vic.data.stats.attack,
      Vic.data.stats.hp,
      Vic.data.stats.ability,
      Vic.data.abilities.map(a => a.key)
    );
  }
}

export class Gold extends Hero {
  static data = {
    abilities: [
      {
        description: skills.goodLuck.description,
        key: 'goodLuck',
        name: skills.goodLuck.name
      }
    ],
    frame: 0,
    name: 'Gold',
    stats: { ability: 'Sprint', attack: 1, hp: 18 }
  };

  constructor(scene, x, y) {
    super(
      scene,
      x,
      y,
      Gold.data.frame,
      Gold.data.name,
      Gold.data.stats.attack,
      Gold.data.stats.hp,
      Gold.data.stats.ability,
      Gold.data.abilities.map(a => a.key)
    );
  }
}

export class Blade extends Hero {
  static data = {
    abilities: [
      {
        description: skills.beyondFront.description,
        key: 'beyondFront',
        name: skills.beyondFront.name
      }
    ],
    frame: 4,
    name: 'Blade',
    stats: { ability: null, attack: 4, hp: 16 }
  };

  constructor(scene, x, y) {
    super(
      scene,
      x,
      y,
      Blade.data.frame,
      Blade.data.name,
      Blade.data.stats.attack,
      Blade.data.stats.hp,
      Blade.data.stats.ability,
      Blade.data.abilities.map(a => a.key)
    );
  }
}

export class Dante extends Hero {
  static data = {
    abilities: [
      {
        description: skills.brokenDefense.description,
        key: 'brokenDefense',
        name: skills.brokenDefense.name
      },
      {
        description: skills.trustInTeam.description,
        key: 'trustInTeam',
        name: skills.trustInTeam.name
      }
    ],
    frame: 5,
    name: 'Dante',
    stats: { ability: 'Ranged', attack: 2, hp: 18 }
  };

  constructor(scene, x, y) {
    super(
      scene,
      x,
      y,
      Dante.data.frame,
      Dante.data.name,
      Dante.data.stats.attack,
      Dante.data.stats.hp,
      Dante.data.stats.ability,
      Dante.data.abilities.map(a => a.key)
    );
  }
}

export class Ceos extends Hero {
  static data = {
    abilities: [
      {
        description: skills.absorbRoots.description,
        key: 'absorbRoots',
        name: skills.absorbRoots.name
      }
    ],
    frame: 3,
    name: 'Ceos',
    stats: { ability: 'Taunt', attack: 1, hp: 26 }
  };

  constructor(scene, x, y) {
    super(
      scene,
      x,
      y,
      Ceos.data.frame,
      Ceos.data.name,
      Ceos.data.stats.attack,
      Ceos.data.stats.hp,
      Ceos.data.stats.ability,
      Ceos.data.abilities.map(a => a.key)
    );
  }
}
