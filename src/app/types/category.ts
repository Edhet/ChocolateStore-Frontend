import Product from "./product";

export default interface Category {
  id: number,
  name: string,
  products: Array<Product>
}
