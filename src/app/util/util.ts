export function createFakePrice(actualPrice: number) {
  return (actualPrice + 10).toString().slice(0, 5)
}

// My instance of AWS S3
const imageByCategory: Map<string, string> = new Map<string, string>([
  ["White Chocolate", "whitechoc.png"],
  ["Milk Chocolate", "milkchoc.png"],
  ["Dark Chocolate", "darkchoc.png"]

])

export function getImageByString(string: string): string | null {
  return imageByCategory.get(string) ?? null
}
