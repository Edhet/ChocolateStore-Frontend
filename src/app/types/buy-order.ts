import Product from "./product";

export default interface BuyOrder {
  id?: number,
  product: Product,
  amount: number
}
