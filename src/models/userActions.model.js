import { FilterType, HeaderType } from "./header.model";
import IconOrderDrink from "../assets/icons/order-drink.png";
import IconShoppingCart from "../assets/icons/shopping-card.png";
import IconTracking from "../assets/icons/tracking.png";
import IconBooking from "../assets/icons/booking.png";
import { VWaterPaths } from "../confgurations/paths/vwaterPath";

export const userActions = [
  {
    id: "rebook",
    name: "Đặt lại",
    typeHeader: HeaderType.noLocation,
    image: IconBooking,
    path: VWaterPaths.cart_reOrder,
    typeFilter: FilterType.search,
  },
  {
    id: "cart",
    name: "Giỏ hàng của bạn",
    typeHeader: HeaderType.noLocation,
    image: IconShoppingCart,
    path: VWaterPaths.cart,
    typeFilter: FilterType.empty,
  },
];
