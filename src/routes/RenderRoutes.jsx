import React from "react";
import { Navigate, Route } from "react-router-dom";
import { VWaterPaths } from "../confgurations/paths/vwaterPath";
import BookWaterDetail from "../pages/BookWatterDetail";
import CartPage from "../pages/Cart";
import HistoryTransaction from "../pages/HistoryTransaction/HistoryTransaction";
import Home from "../pages/Home";
import ListItems from "../pages/ListItems";
import OrderTracking from "../pages/OrderTracking/OrderTracking";

const routesList = [
  {
    exact: true,
    path: "/",
    element: <Home />,
  },
  {
    exact: true,
    path: VWaterPaths.home,
    element: <Home />,
  },
  {
    exact: true,
    path: VWaterPaths.booking_water,
    element: <BookWaterDetail />,
  },
  {
    exact: true,
    path: VWaterPaths.product,
    element: <ListItems />,
  },
  // {
  //   exact: true,
  //   path: VWaterPaths.facedown1920L,
  //   element: <ListItems />,
  // },
  // {
  //   exact: true,
  //   path: VWaterPaths.bottle350ml,
  //   element: <ListItems />,
  // },
  // {
  //   exact: true,
  //   path: VWaterPaths.bottle500ml,
  //   element: <ListItems />,
  // },
  {
    exact: true,
    path: VWaterPaths.cart,
    element: <CartPage />,
  },
  {
    exact: true,
    path: VWaterPaths.orderTracking,
    element: <OrderTracking />,
  },
  {
    exact: true,
    path: VWaterPaths.historyTransaction,
    element: <HistoryTransaction />,
  },
];

function RenderRoutes() {
  return routesList.map((route, index) => {
    if (route.path === "/" || route.path === "") {
      return (
        <Route
          key={index}
          path="/"
          element={<Navigate to={VWaterPaths.home} replace={true} />}
        />
      );
    }

    return <Route key={index} path={route.path} element={route.element} />;
  });
}

export default RenderRoutes;
