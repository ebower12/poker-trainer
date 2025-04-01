const outs = [
  { hand: "pair", name: "pocket pair", handToMake: ["set"], outs: 2 },
  { hand: "highCard", name: "high card", handToMake: ["pair"], outs: 3 },
  {
    hand: "insideStraightDraw",
    name: "inside straight draw",
    handToMake: ["inside straight"],
    outs: 4,
  },
  { hand: "twoPair", name: "two pair", handToMake: ["full house"], outs: 4 },
  { hand: "pair", name: "one pair", handToMake: ["two pair", "set"], outs: 5 },
  { hand: "noPair", name: "no pair", handToMake: ["pair", "set"], outs: 5 },
  { hand: "highCard", name: "two high cards", handToMake: ["pair"], outs: 6 },
  {
    hand: "threeOfAKind",
    name: "set",
    handToMake: ["full house", "four of a kind"],
    outs: 7,
  },
  {
    hand: "openEndedStraightDraw",
    name: "open-ended straight draw",
    handToMake: ["open-ended straight"],
    outs: 8,
  },
  { hand: "flushDraw", name: "flush draw", handToMake: ["flush"], outs: 9 },
  {
    hand: "insideStraightFlushDraw",
    name: "inside straight flush draw",
    handToMake: ["straight", "flush", "straight flush"],
    outs: 12,
  },
  {
    hand: "openEndedStraightFlushDraw",
    name: "open ended straight flush draw",
    handToMake: ["straight", "flush", "straight flush"],
    outs: 15,
  },
];

export default outs;
