import Faucet20L from "../assets/images/19-20l-voi.jpg";
import FaceDown20L from "../assets/images/19-20l-up.jpg";
import Bottle350ml from "../assets/images/350ml-chai.png";
import Bottle500ml from "../assets/images/500ml-chai.png";
import { FilterType, HeaderType } from "./header.model";
import { VWaterPaths } from "../confgurations/paths/vwaterPath";

export const categories = [
  {
    id: "faucet",
    name: "Nước bình 19L-20L vòi bấm",
    image: Faucet20L,
    typeHeader: HeaderType.noLocation,
    typeFilter: FilterType.filter,
    path: VWaterPaths.faucet1920L,
  },
  {
    id: "facedown",
    name: "Nước bình 19L-20L úp máy",
    image: FaceDown20L,
    typeHeader: HeaderType.noLocation,
    typeFilter: FilterType.filter,
    path: VWaterPaths.facedown1920L,
  },
  {
    id: "bottle350",
    name: "Nước chai nhỏ 350ml",
    image: Bottle350ml,
    typeHeader: HeaderType.noLocation,
    typeFilter: FilterType.filter,
    path: VWaterPaths.bottle350ml,
  },
  {
    id: "bottle500",
    name: "Nước chai nhỏ 500ml",
    image: Bottle500ml,
    typeHeader: HeaderType.noLocation,
    typeFilter: FilterType.filter,
    path: VWaterPaths.bottle500ml,
  },
];
