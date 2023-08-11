export function createFakePrice(actualPrice: number) {
  return (actualPrice + 10).toString().slice(0, 5)
}
