const boss = { hp: 104, damage: 8, armor: 1 };

let currentCategory = null;
const shop = `Weapons:    Cost  Damage  Armor
Dagger        8     4       0
Shortsword   10     5       0
Warhammer    25     6       0
Longsword    40     7       0
Greataxe     74     8       0

Armor:      Cost  Damage  Armor
Leather      13     0       1
Chainmail    31     0       2
Splintmail   53     0       3
Bandedmail   75     0       4
Platemail   102     0       5

Rings:      Cost  Damage  Armor
Damage +1    25     1       0
Damage +2    50     2       0
Damage +3   100     3       0
Defense +1   20     0       1
Defense +2   40     0       2
Defense +3   80     0       3
`
  .split("\n")
  .reduce((items, line, index, arr) => {
    if (line === "") return items;

    if (index === 0 || arr[index - 1] === "") {
      const [name] = line.match(/^\w+(?=:)/g);
      items[name.toLowerCase()] = [];
      currentCategory = name.toLowerCase();
    } else {
      const [cost, damage, armor] = line.match(/(?<=\s)\d+/g);
      items[currentCategory].push({
        cost: +cost,
        damage: +damage,
        armor: +armor,
      });
    }

    return items;
  }, {});

const playGame = (me) => {
  const enemy = { ...boss };
  let myTurn = true;

  while (true) {
    if (myTurn) {
      enemy.hp -= Math.max(1, me.damage - enemy.armor);
      if (enemy.hp <= 0) return true;
    } else {
      me.hp -= Math.max(1, enemy.damage - me.armor);
      if (me.hp <= 0) return false;
    }
    myTurn = !myTurn;
  }
};

const exec = () => {
  const { weapons, armor: armors, rings } = shop;

  let cheapestSet = Infinity;
  let expensiveSet = 0;

  for (let x = 0; x < shop.weapons.length; x++) {
    const weapon = weapons[x];

    for (let y = -1; y < armors.length; y++) {
      const armor = armors[y] || { cost: 0, armor: 0 };

      // no rings
      const meWithoutRings = {
        hp: 100,
        damage: weapon.damage,
        armor: armor.armor,
        spent: weapon.cost + armor.cost,
      };
      if (playGame(meWithoutRings))
        cheapestSet = Math.min(cheapestSet, meWithoutRings.spent);
      else expensiveSet = Math.max(expensiveSet, meWithoutRings.spent);

      // 1 ring
      for (let z = 0; z < rings.length; z++) {
        const ring = rings[z];

        const meWithOneRing = {
          hp: 100,
          damage: weapon.damage + ring.damage,
          armor: armor.armor + ring.armor,
          spent: weapon.cost + armor.cost + ring.cost,
        };
        if (playGame(meWithOneRing))
          cheapestSet = Math.min(cheapestSet, meWithOneRing.spent);
        else expensiveSet = Math.max(expensiveSet, meWithOneRing.spent);

        for (let z2 = z + 1; z2 < rings.length; z2++) {
          const ring2 = rings[z2];

          const meWithTwoRings = {
            hp: 100,
            damage: weapon.damage + ring.damage + ring2.damage,
            armor: armor.armor + ring.armor + ring2.armor,
            spent: weapon.cost + armor.cost + ring.cost + ring2.cost,
          };
          if (playGame(meWithTwoRings))
            cheapestSet = Math.min(cheapestSet, meWithTwoRings.spent);
          else expensiveSet = Math.max(expensiveSet, meWithTwoRings.spent);
        }
      }
    }
  }

  return { cheapestSet, expensiveSet };
};

const starOne = () => {
  return exec().cheapestSet;
};

const starTwo = () => {
  return exec().expensiveSet;
};

console.log(starOne());
console.log(starTwo());
