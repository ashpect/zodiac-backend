// Signs in calendar order by start date. Capricorn wraps the year end, so
// anything before Aquarius's start falls back to it.
const SIGNS = [
  { name: "Aquarius", symbol: "♒", element: "Air", dates: "Jan 20 – Feb 18", start: [1, 20],
    facts: [
      "Aquarius is an air sign, even though its symbol is the water bearer.",
      "It is ruled by Uranus, the planet that spins on its side.",
      "Aquarians are stereotyped as the friend who owns a weird hobby nobody asked about.",
    ] },
  { name: "Pisces", symbol: "♓", element: "Water", dates: "Feb 19 – Mar 20", start: [2, 19],
    facts: [
      "Pisces is the last sign of the zodiac, so it supposedly carries a bit of every other sign.",
      "Its symbol is two fish swimming in opposite directions.",
      "Pisces is ruled by Neptune, the planet of dreams and losing your keys.",
    ] },
  { name: "Aries", symbol: "♈", element: "Fire", dates: "Mar 21 – Apr 19", start: [3, 21],
    facts: [
      "Aries is the first sign of the zodiac, which explains the whole 'me first' reputation.",
      "It is ruled by Mars, so the stereotype is impatient, brave and slightly loud.",
      "The ram was chosen because rams charge headfirst at problems.",
    ] },
  { name: "Taurus", symbol: "♉", element: "Earth", dates: "Apr 20 – May 20", start: [4, 20],
    facts: [
      "Taurus is ruled by Venus, so good food and comfy blankets are basically a religion.",
      "The bull is one of the oldest constellations, drawn in cave paintings 17,000 years ago.",
      "Stubbornness is the cliché, but the flattering word is 'consistent'.",
    ] },
  { name: "Gemini", symbol: "♊", element: "Air", dates: "May 21 – Jun 20", start: [5, 21],
    facts: [
      "Gemini's twins are Castor and Pollux, two bright stars you can spot in winter.",
      "Ruled by Mercury, so the stereotype is fast talker, faster texter.",
      "Geminis get blamed for having two personalities; they say they just have range.",
    ] },
  { name: "Cancer", symbol: "♋", element: "Water", dates: "Jun 21 – Jul 22", start: [6, 21],
    facts: [
      "Cancer is ruled by the Moon, the only sign with a 'planet' that changes shape every night.",
      "The crab symbol comes from a crab that pinched Hercules mid-fight. It lost.",
      "Cancers are the stereotypical hosts who send you home with leftovers.",
    ] },
  { name: "Leo", symbol: "♌", element: "Fire", dates: "Jul 23 – Aug 22", start: [7, 23],
    facts: [
      "Leo is ruled by the Sun, which is the only sign ruled by an actual star.",
      "The lion is the Nemean lion from the Hercules myths, so the ego is mythologically sanctioned.",
      "Regulus, Leo's brightest star, literally means 'little king'.",
    ] },
  { name: "Virgo", symbol: "♍", element: "Earth", dates: "Aug 23 – Sep 22", start: [8, 23],
    facts: [
      "Virgo is the largest zodiac constellation by area.",
      "It shares Mercury with Gemini, but Virgo uses it for lists instead of gossip.",
      "Virgos are stereotyped as the ones who notice the typo in the birthday card.",
    ] },
  { name: "Libra", symbol: "♎", element: "Air", dates: "Sep 23 – Oct 22", start: [9, 23],
    facts: [
      "Libra is the only zodiac sign represented by an object rather than a creature.",
      "The scales were once considered the claws of Scorpio next door.",
      "Libras take forever to pick a restaurant, then pick a great one.",
    ] },
  { name: "Scorpio", symbol: "♏", element: "Water", dates: "Oct 23 – Nov 21", start: [10, 23],
    facts: [
      "Scorpio's brightest star, Antares, is a red supergiant 700 times wider than the Sun.",
      "It is ruled by Pluto, which astrology never demoted.",
      "Scorpios are stereotyped as intense, which is astrology for 'remembers everything'.",
    ] },
  { name: "Sagittarius", symbol: "♐", element: "Fire", dates: "Nov 22 – Dec 21", start: [11, 22],
    facts: [
      "The centre of the Milky Way sits in Sagittarius, so the archer is aiming at a black hole.",
      "Ruled by Jupiter, the largest planet, so 'go big' is on brand.",
      "Sagittarians are stereotyped as blunt, honest and already planning the next trip.",
    ] },
  { name: "Capricorn", symbol: "♑", element: "Earth", dates: "Dec 22 – Jan 19", start: [12, 22],
    facts: [
      "Capricorn's symbol is a sea-goat: a goat on top, a fish tail underneath.",
      "It is ruled by Saturn, the planet of discipline, deadlines and rings.",
      "Capricorns are stereotyped as the ones who had a five-year plan at age nine.",
    ] },
];

export function signFor(month, day) {
  let match = SIGNS[SIGNS.length - 1];
  for (const sign of SIGNS) {
    const [m, d] = sign.start;
    if (month > m || (month === m && day >= d)) match = sign;
  }
  return match;
}
