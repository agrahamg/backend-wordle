export function checkLetters([...word]: string, [...guess]: string) {
  const letterCounts = word.reduce<Record<string, number>>(
    (acc, letter) => ({ ...acc, [letter]: (acc[letter] || 0) + 1 }),
    {}
  );

  return guess
    .map((letter, index) => {
      if (letter === word[index]) {
        letterCounts[letter] -= 1;
        return "🟩";
      }
      return letter;
    })
    .map((letter) => {
      if (letter === "🟩") {
        return letter;
      } else if ((letterCounts[letter] ?? 0) > 0) {
        letterCounts[letter] -= 1;
        return "🟨";
      }
      return "⬜️";
    });
}
