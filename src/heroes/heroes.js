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
    stats: { ability: null, attack: 3, hp: 17 },
    id: 1
  };

  constructor(scene, x, y, socket) {
    super(
      scene,
      x,
      y,
      Ralph.data.frame,
      Ralph.data.name,
      Ralph.data.stats.attack,
      Ralph.data.stats.hp,
      Ralph.data.stats.ability,
      Ralph.data.abilities.map(a => a.key),
      null,
      socket,
      Ralph.data.id
    );
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
    stats: { ability: null, attack: 1, hp: 19 },
    id: 2
  };

  constructor(scene, x, y, socket) {
    super(
      scene,
      x,
      y,
      Vic.data.frame,
      Vic.data.name,
      Vic.data.stats.attack,
      Vic.data.stats.hp,
      Vic.data.stats.ability,
      Vic.data.abilities.map(a => a.key),
      null,
      socket,
      Vic.data.id
    );
  }
}

export class Mineiro extends Hero {
  static data = {
    abilities: [
      {
        description: skills.goodLuck.description,
        key: 'goodLuck',
        name: skills.goodLuck.name
      }
    ],
    frame: 0,
    name: 'Mineiro',
    stats: { ability: 'Sprint', attack: 1, hp: 18 },
    id: 3
  };

  constructor(scene, x, y, socket) {
    super(
      scene,
      x,
      y,
      Mineiro.data.frame,
      Mineiro.data.name,
      Mineiro.data.stats.attack,
      Mineiro.data.stats.hp,
      Mineiro.data.stats.ability,
      Mineiro.data.abilities.map(a => a.key),
      null,
      socket,
      Mineiro.data.id
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
    stats: { ability: null, attack: 3, hp: 16 },
    id: 4
  };

  constructor(scene, x, y, socket) {
    super(
      scene,
      x,
      y,
      Blade.data.frame,
      Blade.data.name,
      Blade.data.stats.attack,
      Blade.data.stats.hp,
      Blade.data.stats.ability,
      Blade.data.abilities.map(a => a.key),
      null,
      socket,
      Blade.data.id
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
    stats: { ability: 'Ranged', attack: 2, hp: 18 },
    id: 5
  };

  constructor(scene, x, y, socket) {
    super(
      scene,
      x,
      y,
      Dante.data.frame,
      Dante.data.name,
      Dante.data.stats.attack,
      Dante.data.stats.hp,
      Dante.data.stats.ability,
      Dante.data.abilities.map(a => a.key),
      null,
      socket,
      Dante.data.id
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
    stats: { ability: 'Taunt', attack: 1, hp: 33 },
    id: 6
  };

  constructor(scene, x, y, socket) {
    super(
      scene,
      x,
      y,
      Ceos.data.frame,
      Ceos.data.name,
      Ceos.data.stats.attack,
      Ceos.data.stats.hp,
      Ceos.data.stats.ability,
      Ceos.data.abilities.map(a => a.key),
      null,
      socket,
      Ceos.data.id
    );
  }
}
