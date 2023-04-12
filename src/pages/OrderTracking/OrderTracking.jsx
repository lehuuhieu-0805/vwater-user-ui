import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import HeaderDetails from "../../shared/HeaderDetails";
import EmptyProduct from "../../assets/images/empty.png";
import "./style.css";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { orderTrackingService } from "../../services/OrderTrackingService";
import { AuthConsumer } from "../../context/AuthContext";
import { productService } from "../../services/ProductService";
import { toast } from "react-toastify";
import Loading from "../../components/Loading/Loading";
import { HelperUtils } from "../../utils/helper";
import { statusService } from "../../services/StatusService";
import { STATUS_ORDER } from "../../consts/StatusOrder";
import { isEmpty } from "lodash";
export default function OrderTracking() {
  const { token } = AuthConsumer();
  const location = useLocation();
  const [type, setType] = useState();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    setType({
      name: "Tra cứu đơn hàng",
      typeHeader: "NoLocation",
      // typeFilter: "searchStatusOrder",
    });
  }, [location]);
  useEffect(() => {
    handleSearch();
  }, []);
  const handleSearch = (data) => {
    setLoading(true);
    orderTrackingService.getOrderTrackingById(token.customerId)
      .then(order => {
        setData(order);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
        toast.error("Đã có lỗi xảy ra !!!");
      });
  };
  return (
    <>
      <Loading isLoading={loading} />
      <HeaderDetails {...type}></HeaderDetails>
      <Box className="history-container">
        {data.length === 0 && (
          <Box className="empty-history">
            <img
              src={EmptyProduct}
              alt=""
              style={{ width: "40%", height: "40%" }}
            />
            <Typography
              sx={{
                fontSize: "25px",
                fontWeight: "700",
              }}
            >
              Không có dữ liệu!
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: "300",
              }}
            >
              Hiện không có đơn hàng nào.
            </Typography>
          </Box>
        )}

        {data.map((orderTracking) => {
          return (
            <>
              <Box
                width={"100%"}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                }}
              >
                <Box
                  height={40}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom: "1px solid #e8e8e8",
                    flexWrap: "wrap",
                    padding: "0px 16px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: "700",
                    }}
                  >
                    Mã đơn hàng :{" "}
                    <span
                      style={{
                        // color: "#2596be",
                        fontSize: "14px",
                        // fontWeight: "700",
                      }}
                    >
                      {orderTracking?.Id}
                    </span>
                  </Typography>
                  <Typography
                    paddingRight={2}
                    sx={{
                      fontSize: "14px",
                      fontWeight: "700",
                    }}
                  >
                    Trạng thái:{" "}
                    <span
                      style={{
                        color: STATUS_ORDER[orderTracking.StatusId].color,
                        fontSize: "14px",
                        fontWeight: "700",
                      }}
                    >
                      {orderTracking?.Status?.Note}
                    </span>
                  </Typography>
                </Box>
                <Box width="100%">
                  {orderTracking?.OrderDetails?.map((orderDetail) => {
                    return (
                      <Box
                        padding={2}
                        display={"flex"}
                        justifyContent={"space-between"}
                        flexWrap={"wrap"}
                      >
                        <Typography
                          sx={{
                            fontSize: "14px",
                            fontWeight: "700",
                          }}
                        >
                          Tên sản phẩm:{" "}
                          <span
                            style={{
                              // color: "#2596be",
                              fontSize: "14px",
                              // fontWeight: "700",
                            }}
                          >
                            {orderDetail?.ProductInMenu?.Product?.ProductName}
                          </span>
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "14px",
                            fontWeight: "700",
                          }}
                        >
                          Số lượng:{" "}
                          <span
                            style={{
                              // color: "#2596be",
                              fontSize: "14px",
                              // fontWeight: "700",
                            }}
                          >
                            {orderDetail?.Quantity}
                          </span>
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "14px",
                            fontWeight: "700",
                          }}
                        >
                          Đơn giá:{" "}
                          <span
                            style={{
                              // color: "#2596be",
                              fontSize: "14px",
                              // fontWeight: "700",
                            }}
                          >
                            {HelperUtils.formatCurrency(orderDetail?.Price)}
                          </span>
                        </Typography>
                      </Box>
                    );
                  })}
                </Box>
                <Box
                  height={40}
                  width="100%"
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    borderTop: "1px solid #e8e8e8",
                  }}
                >
                  <AttachMoneyIcon
                    sx={{
                      fontSize: "18px",
                    }}
                  />
                  <Typography
                    component={"span"}
                    sx={{
                      fontSize: "13px",
                    }}
                  >
                    Thành tiền:{" "}
                  </Typography>
                  <Typography
                    component={"span"}
                    sx={{
                      color: "#3498db",
                      fontWeight: 500,
                    }}
                  >
                    {HelperUtils.formatCurrency(orderTracking?.TotalPrice)}
                  </Typography>
                  <Box width={10}></Box>
                </Box>
              </Box>
              <Box height={10}></Box>
            </>
          );
        })}
      </Box>
    </>
  );
}
