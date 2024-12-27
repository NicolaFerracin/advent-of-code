const { getRawInput } = require("./utils");

const parseArmy = (name, army, boost = 0) => {
  let id = 0;
  const [, ...groups] = army.split("\n");
  return groups.map((group) => {
    const [units, hitPoints, attack, initiative] = group
      .match(/\d+/g)
      .map(Number);
    const attackType = group.match(/\s(\w+)\sdamage/)[1];
    const immune = group.match(/immune to ([^;)]+)/)?.[1]?.split(", ");
    const weak = group.match(/weak to ([^;)]+)/)?.[1]?.split(", ");

    return {
      id: `${name}-${++id}`,
      army: name,
      units,
      hitPoints,
      attack: attack + boost,
      initiative,
      attackType,
      immune,
      weak,
    };
  });
};

const getInput = (boost) => {
  const [immune, infection] = getRawInput("day24").split("\n\n");
  return [
    ...parseArmy("immune", immune, boost),
    ...parseArmy("infection", infection),
  ];
};

const effectivePower = (a) => a.units * a.attack;
const targetingSort = (a, b) =>
  effectivePower(b) - effectivePower(a) || b.initiative - a.initiative;

const isWeak = (a, b) => b.weak?.includes(a.attackType);
const isImmune = (a, b) => b.immune?.includes(a.attackType);

const getAttack = (a, b) =>
  effectivePower(a) * (isWeak(a, b) ? 2 : isImmune(a, b) ? 0 : 1);

const attackingSort = (attacker, defA, defB) =>
  getAttack(attacker, defB) - getAttack(attacker, defA) ||
  effectivePower(defB) - effectivePower(defA) ||
  defB.initiative - defA.initiative;

const hasUnitsLeft = (name, army) =>
  army.filter((x) => x.army === name).some((g) => g.units > 0);

const untilsLeft = (tot, g) => tot + g.units;

const solve = () => {
  let boost = 0;

  while (true) {
    const armies = getInput(boost);

    let rounds = 0;
    while (
      hasUnitsLeft("immune", armies) &&
      hasUnitsLeft("infection", armies)
    ) {
      // prevent infinite battles
      if (rounds++ > 5_000) break;
      armies.sort(targetingSort);

      const alreadyChosenTargets = new Set();

      const attackerDefenderPairs = armies
        .map((g) => {
          // find the defending group that would take the most damage
          const potentialTargets = armies
            .filter((a) => a.army !== g.army && a.units > 0)
            .sort((a, b) => attackingSort(g, a, b));

          let target = potentialTargets.shift();
          if (!target) return undefined;
          while (alreadyChosenTargets.has(target?.id)) {
            target = potentialTargets.shift();
          }

          if (!target || !getAttack(g, target)) return undefined;

          alreadyChosenTargets.add(target.id);

          return [g, target];
        })
        .filter(Boolean)
        .sort((a, b) => b[0].initiative - a[0].initiative)
        .map(([a, b]) => [a.id, b.id]);

      // attack
      attackerDefenderPairs?.forEach(([attackerId, defenderId]) => {
        const attacker = armies.find((a) => a.id === attackerId);
        const defender = armies.find((a) => a.id === defenderId);
        const attack = getAttack(attacker, defender);
        const unitsLost = Math.floor(attack / defender.hitPoints);
        // can't go below 0
        const remainingUnits = Math.max(0, defender.units - unitsLost);

        defender.units = remainingUnits;
      });
    }

    if (boost === 0) {
      console.log("Star1", armies.reduce(untilsLeft, 0));
    }

    if (hasUnitsLeft("immune", armies) && !hasUnitsLeft("infection", armies)) {
      console.log("Star2:", armies.reduce(untilsLeft, 0));
      return;
    }

    boost++;
  }
};

console.log(solve());
