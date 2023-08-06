import BuyOrder from "./buy-order";
import Address from "./address";
import UserRegisterInformation from "./user-register-information";

export default interface User extends UserRegisterInformation{
  address?: Address | null,
  buyOrders?: Array<BuyOrder>,
  preferredCategory?: string | null,
  creationTimestamp?: string | null,
}
