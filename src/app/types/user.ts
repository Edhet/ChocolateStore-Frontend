import Gender from "./gender";
import BuyOrder from "./buy-order";

export default interface User {
  firstName: string,
  surname: string,
  email: string,
  password: string | null,
  birthDate: Date,
  gender: Gender,
  buyOrders?: Array<BuyOrder>,
  preferredCategory?: string | null,
  creationTimestamp?: string,
}
