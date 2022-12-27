const colorKeyMap = {
  "🟩": "#6aaa64",
  "🟨": "#c9b458",
  "⬜️": "#787c7e",
} as Record<string, string>;

export function colorKey(key?: string | null) {
  if (key) {
    return colorKeyMap[key];
  }
  return;
}
