/**
 * Generates a random number in the interval [0,n).
 * @param n The number to generate up to.
 */
const rand = (n: number): number => Math.floor(Math.random() * n)

/**
 * Generates a random number in the interval [min, max].
 * @param min The minimum number in the interval.
 * @param max The maximum number in the interval.
 */
const randRange = (min: number, max: number): number => min + rand(max - min + 1)
const rrThunk = (min: number, max: number) => (): number => randRange(min, max)

/**
 * Gets the seconds after the epoch.
 */
const now = () => Math.floor(Date.now() / 1000)

export { rand, randRange, rrThunk }
