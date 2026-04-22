export function fisherYatesShuffle(items) {
  const cloned = [...items]

  for (let i = cloned.length - 1; i > 0; i -= 1) {
    const randomIndex = Math.floor(Math.random() * (i + 1))
    ;[cloned[i], cloned[randomIndex]] = [cloned[randomIndex], cloned[i]]
  }

  return cloned
}

export function getRandomUniqueItems(items, count) {
  return fisherYatesShuffle(items).slice(0, count)
}
