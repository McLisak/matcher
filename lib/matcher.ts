export function shuffle<T extends Array<U>, U>(original: T): T {
  const shuffled = Array.from(original) as T;
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = shuffled[i];
    shuffled[i] = shuffled[j];
    shuffled[j] = temp;
  }
  const hasSameValueAtIndex = shuffled.some(
    (val, index) => original[index] === val,
  );
  if (hasSameValueAtIndex) {
    return shuffle(original);
  }
  return shuffled;
}

export type MatchEntry<T> = [T, T];
export type MatchResult<T> = MatchEntry<T>[];

export function matcher<T extends Array<U>, U>(arr: T): MatchResult<U> {
  const shuffled = shuffle(arr);
  const entries = arr.reduce<MatchResult<U>>((acc, val, idx) => {
    const entry: MatchEntry<U> = [val, shuffled[idx]];
    acc.push(entry);
    return acc;
  }, []);
  return entries;
}

export async function matcherAsync<T extends Array<U>, U>(
  arr: T,
): Promise<MatchResult<U>> {
  return new Promise((resolve, reject) => {
    try {
      resolve(matcher(arr));
    } catch (e) {
      reject(e);
    }
  });
}
