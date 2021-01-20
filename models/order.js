import { timing } from "react-native-reanimated";
import order from "../store/reducers/order";

class Order {
  constructor(id, items, totalAmount, date) {
    this.id = id;
    this.items = items;
    this.totalAmount = totalAmount;
    this.date = date;
  }
}
export default Order;
