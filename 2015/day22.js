const mm = (p1, p2) => {
  if (p1.mana < 53) return false;
  p1.mana -= 53;
  p2.hp -= 4;
  return [p1, p2];
};

const d = (p1, p2) => {
  if (p1.mana < 73) return false;
  p1.mana -= 73;
  p1.hp += 2;
  p2.hp -= 2;
  return [p1, p2];
};

const s = (p1, p2) => {
  if (p1.mana < 113) return false;
  p1.mana -= 113;
  return [p1, p2];
};

const p = (p1, p2) => {
  if (p1.mana < 173) return false;
  p1.mana -= 173;
  return [p1, p2];
};

const r = (p1, p2) => {
  if (p1.mana < 229) return false;
  p1.mana -= 229;
  return [p1, p2];
};

const moves = [mm, d, s, p, r];
const fxs = [
  ,
  ,
  (p1, p2) => [p1, p2],
  (p1, p2) => {
    p2.hp -= 3;
    return [p1, p2];
  },
  (p1, p2) => {
    p1.mana += 101;
    return [p1, p2];
  },
];
const turns = [0, 0, 6, 6, 5];
const costs = [53, 73, 113, 173, 229];

const me = { hp: 50, mana: 500, armor: 0 };
const boss = { hp: 58, damage: 9 };

const play = (mode = "normal") => {
  let best = Infinity;
  const dfs = (p1, p2, spent, isMyTurn, effects) => {
    if (spent > best) return;
    if (mode === "hard") {
      p1.hp -= 1;
    }

    if (p1.hp <= 0) return;

    // apply effects
    effects.forEach(({ move }) => {
      [p1, p2] = fxs[move](p1, p2);
    });

    // decrease counter
    for (const fx of effects) {
      fx.turns--;
      if (fx.turns === 0 && fx.move === 2) p1.armor = 0;
    }

    // remove counters at 0
    effects = effects.filter(({ turns }) => turns > 0);

    if (p2.hp <= 0) {
      best = Math.min(best, spent);
      return;
    }

    // boss attack
    if (!isMyTurn) {
      p1.hp -= Math.max(1, p2.damage - p1.armor);
      dfs(p1, p2, spent, !isMyTurn, effects);
    } else {
      // my turn
      // find new spell to cast
      for (let i = 0; i < moves.length; i++) {
        if (effects.find(({ move }) => move === i)) continue; // don't start already active effect
        const attempt = moves[i]({ ...p1 }, { ...p2 });
        if (!attempt) continue; // not enough mana

        [newP1, newP2] = attempt;

        const newEffects = [...JSON.parse(JSON.stringify(effects))];
        if (i === 2) newP1.armor = 7;
        // spell with effect
        if (i >= 2) newEffects.push({ turns: turns[i], move: i });

        // add move to path
        dfs(newP1, newP2, spent + costs[i], !isMyTurn, newEffects);
      }
    }
  };

  dfs(me, boss, 0, true, [], []);

  return best;
};
const starOne = () => {
  return play();
};

const starTwo = () => {
  return play("hard");
};

console.log(starOne());
console.log(starTwo());
