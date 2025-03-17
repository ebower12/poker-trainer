const outs = [
  { hand: "pocket pair", handToMake: ["set"], outs: 2 },
  { hand: "high card", handToMake: ["pair"], outs: 3 },
  { hand: "inside straight draw", handToMake: ["inside straight"], outs: 4 },
  { hand: "two pair", handToMake: ["full house"], outs: 4 },
  { hand: "one pair", handToMake: ["two pair", "set"], outs: 5 },
  { hand: "no pair", handToMake: ["pair", "set"], outs: 5 },
  { hand: "two high cards", handToMake: ["pair"], outs: 6 },
  { hand: "set", handToMake: ["full house", "four of a kind"], outs: 7 },
  {
    hand: "open-ended straight draw",
    handToMake: ["open-ended straight"],
    outs: 8,
  },
  { hand: "flush draw", handToMake: ["flush"], outs: 9 },
  {
    hand: "inside straight flush draw",
    handToMake: ["straight", "flush", "straight flush"],
    outs: 12,
  },
  {
    hand: "open ended straight flush draw",
    handToMake: ["straight", "flush", "straight flush"],
    outs: 15,
  },
];

export default outs;
