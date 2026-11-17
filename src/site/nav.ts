/** Every chapter of the site. `shape` is what the particle field becomes there. */
export const chapters = [
  { id: "top", n: "00", label: "Hello", shape: "sphere" },
  { id: "about", n: "01", label: "Madame", shape: "word" },
  { id: "work", n: "02", label: "Work", shape: "city" },
  { id: "now", n: "03", label: "Now", shape: "galaxy" },
  { id: "fieldwork", n: "04", label: "Field work", shape: "helix" },
  { id: "library", n: "05", label: "Library", shape: "book" },
  { id: "watch", n: "06", label: "Watch", shape: "reel" },
  { id: "listening", n: "07", label: "Listening", shape: "wave" },
  { id: "contact", n: "08", label: "Contact", shape: "ring" },
] as const;

export type ShapeName = (typeof chapters)[number]["shape"];

/** Where the field sits on screen per chapter: [x, y, scale, opacity] (fractions of the viewport). */
export const placement: Record<ShapeName, [number, number, number, number]> = {
  sphere: [0.7, 0.47, 1, 1],
  word: [0.5, 0.27, 1, 1],
  city: [0.84, 0.55, 0.78, 0.32],
  galaxy: [0.78, 0.5, 1.05, 0.5],
  helix: [0.88, 0.5, 0.8, 0.32],
  book: [0.5, 0.2, 0.75, 0.75],
  reel: [0.84, 0.48, 0.75, 0.35],
  wave: [0.5, 0.55, 1.35, 0.3],
  ring: [0.5, 0.5, 1, 0.75],
};
