const { getStringArrayInput } = require("./utils");

console.log(
  (function starOne() {
    const input = getStringArrayInput("day04");
    const passports = [];

    let str = "";
    for (let i = 0; i < input.length; i++) {
      if (!input[i]) {
        passports.push(str);
        str = "";
      } else {
        str += input[i];
      }
    }

    return passports.filter((passport) =>
      ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"].every(
        (property) => passport.indexOf(property) !== -1,
        passport
      )
    ).length;
  })()
);

console.log(
  (function starTwo() {
    const input = getStringArrayInput("day04");
    const passports = [];

    let str = "";
    for (let i = 0; i < input.length; i++) {
      if (!input[i]) {
        passports.push(str.trim());
        str = "";
      } else {
        str += ` ${input[i]}`;
      }
    }

    const rules = [
      {
        match: "byr",
        rule: (s) => s.length === 4 && Number(s) >= 1920 && Number(s) <= 2002,
      },
      {
        match: "iyr",
        rule: (s) => s.length === 4 && Number(s) >= 2010 && Number(s) <= 2020,
      },
      {
        match: "eyr",
        rule: (s) => s.length === 4 && Number(s) >= 2020 && Number(s) <= 2030,
      },
      {
        match: "hgt",
        rule: (s) => {
          const [, height, unit] = s.match(/(\d+)(\w+)/);
          if (unit === "cm")
            return Number(height) >= 150 && Number(height) <= 193;
          if (unit === "in")
            return Number(height) >= 59 && Number(height) <= 76;
          return false;
        },
      },
      {
        match: "hcl",
        rule: (s) => !!s.match(/^#[0-9a-f]{6}$/),
      },
      {
        match: "ecl",
        rule: (s) =>
          ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].indexOf(s) >= 0,
      },
      {
        match: "pid",
        rule: (s) => !!s.match(/^[0-9]{9}$/),
      },
    ];

    return passports
      .filter((passport) =>
        ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"].every(
          (property) => passport.indexOf(property) !== -1,
          passport
        )
      )
      .filter((passport) => {
        const properties = passport.split(" ").reduce((acc, s) => {
          const [name, value] = s.split(":");
          acc[name] = value;
          return acc;
        }, {});

        for (let i = 0; i < rules.length; i++) {
          const { match, rule } = rules[i];
          if (!rule(properties[match])) return false;
        }

        return true;
      }).length;
  })()
);
