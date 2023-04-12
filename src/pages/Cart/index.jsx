import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import SelectForm from "../../components/Form/SelectElement/SelectForm";
// import { categories } from "../../models/categories.model";
// import { userActions } from "../../models/userActions.model";
import HeaderDetails from "../../shared/HeaderDetails";
import IconMoney from "../../assets/images/pay.png";
import "./style.css";
import DialogCustom from "../../components/Dialog";
import { HelperUtils } from "../../utils/helper";
import { VWaterPaths } from "../../confgurations/paths/vwaterPath";
import { HeaderType } from "../../models/header.model";
import { AuthConsumer } from "../../context/AuthContext";
import { deliverySlotService } from "../../services/DeliverySlot";
import Loading from "../../components/Loading/Loading";
import { orderService } from "../../services/OrderService";
import { toast } from "react-toastify";
import PersonIcon from "@mui/icons-material/Person";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import ProductDefaultImage from "../../assets/images/nuoc_lavie_viva.png";

function CartPage() {
  const location = useLocation();
  const { token } = AuthConsumer();
  const [type, setType] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [cart, setCart] = useState(() => {
    const getCart = JSON.parse(localStorage.getItem("cart"));
    if (getCart) {
      return getCart;
    }
    return [];
  });
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
    control,
  } = useForm({
    deliveryTime: "",
  });

  const [customerInfo, setCustomerInfo] = useState({
    name: token?.customerName || "",
    phone: token?.phoneNumber || "",
  });

  const [deliTime, setDeliTime] = useState("initalValue");
  // const [isDisableSelection, setIsDisableSelection] = useState(false);
  const isDisableSelection = useRef(false);
  // const [deliveryOptions, setDeliveryOptions] = useState(() => {
  //   const currentHour = new Date().getHours();
  //   const options = deliveryTime.filter((item) => {
  //     if (item && item.value === "not") {
  //       return true;
  //     }
  //     const timeEnd = item.value && item.value.split("-")[1].split(":")[0];
  //     return currentHour < timeEnd;
  //   });

  //   if (options.length > 1) {
  //     return options.filter((item) => item.value !== "not");
  //   }
  //   setValue("deliveryTime", "not");
  //   isDisableSelection.current = true;
  //   return options;
  // });
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [visible, setVisible] = useState(false);
  const [isBookingSuccess, setIsBookingSuccess] = useState(false);

  useEffect(() => {
    getDeliverySlot();
  }, []);

  useEffect(() => {
    // [...categories, ...userActions].some((item) => {
    //   if (location.pathname === item.path) {
    //     setType({
    //       name: item.name,
    //       typeHeader: item.typeHeader,
    //       typeFilter: item.typeFilter,
    //     });
    //     return true;
    //   }

    //   return false;
    // });
    const type = {
      name: "Giỏ hàng của bạn",
      typeHeader: HeaderType.noLocation,
      // typeFilter: FilterType.filter,
      typeFilter: "",
      path: VWaterPaths.cart,
    };

    if (location?.state?.productType) {
      // type.name = location.state.productType.name;
      type.typeHeader = location.state.productType.typeHeader;
      type.typeFilter = location.state.productType.typeFilter;
      type.path = location.pathname;
    } else {
      const typeStorage = JSON.parse(localStorage.getItem("productType"));
      // type.name = typeStorage && typeStorage.name;
      type.typeHeader = typeStorage && typeStorage.typeHeader;
      type.typeFilter = typeStorage && typeStorage.typeFilter;
      type.path = location.pathname;
    }

    type.typeFilter = "";

    if (location.search.includes("reorder=true")) {
      // Reorder by latest order
      orderService
        .getLastedOrderByCustomerId(token.customerId)
        .then((data) => {
          localStorage.setItem("cart", JSON.stringify([]));
          const cartList = data.OrderDetails.map((item) => {
            return {
              count: item.Quantity,
              data: {
                id: item.ProductInMenu.Id,
                type: item.ProductInMenu.Product.ProductType_Id,
                name: item.ProductInMenu.Product.ProductName,
                unit: item.ProductInMenu.Product.Description, // get unit from description
                price: item.ProductInMenu.Price,
                shop: "Cửa hàng bách hóa", // hardcode
                image: item.ProductInMenu.Product.Img || ProductDefaultImage,
              },
            };
          });
          setCart([...cartList]);
          setIsBookingSuccess(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
          toast.error("Đã có lỗi xảy ra khi đặt lại đơn hàng!!!");
        });
    } else if (location.search.includes("reorderbyId=true")) {
      // Reorder by order Id
      const orderId = location.search.split("&")[1];
      orderService
        .reOrderByOrderId(orderId)
        .then((data) => {
          localStorage.setItem("cart", JSON.stringify([]));
          const cartList = data.OrderDetails.map((item) => {
            return {
              count: item.Quantity,
              data: {
                id: item.ProductInMenu.Id,
                type: item.ProductInMenu.Product.ProductType_Id,
                name: item.ProductInMenu.Product.ProductName,
                unit: item.ProductInMenu.Product.Description, // get unit from description
                price: item.ProductInMenu.Price,
                shop: "Cửa hàng bách hóa", // hardcode
                image: item.ProductInMenu.Product.Img || ProductDefaultImage,
              },
            };
          });
          setCart([...cartList]);
          setIsBookingSuccess(true);
          toast.success("Bạn đã đặt hàng thành công!");
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
          toast.error("Đã có lỗi xảy ra khi đặt lại đơn hàng!!!");
        });
    }

    setType(type);
  }, [location]);

  const calculateTotalPriceCart = () => {
    const value = cart.reduce((acc, val) => {
      return acc + val.count * val.data.price;
    }, 0);

    return value;
  };

  const handleTotalPrice = () => {
    return HelperUtils.formatCurrency(calculateTotalPriceCart());
  };

  const calculateTotalQuantityCart = () => {
    const value = cart.reduce((acc, val) => {
      return acc + val.count;
    }, 0);

    return value;
  };

  const handleBook = () => {
    if (getValues("deliveryTime")) {
      setVisible(true);
    }
    setDeliTime(getValues("deliveryTime"));
  };

  const handleContinuteBooking = () => {
    setIsBookingSuccess(false);
  };

  const hanldeClose = () => {
    setVisible(false);
  };

  const handleConfirmation = (state) => {
    if (state) {
      const orderPayload = {
        DeliveryAddressId: token.deliveryAddressId,
        TotalQuantity: calculateTotalQuantityCart(),
        TotalPrice: calculateTotalPriceCart(),
        DeliverySlotId: deliTime?.split("=")[0],
        OrderDetails: [],
      };

      cart.forEach((item) => {
        const orderDetail = {
          ProductInMenuId: item.data.id,
          Quantity: item.count,
          Price: item.data.price,
        };
        orderPayload.OrderDetails.push(orderDetail);
      });

      orderService
        .CreateOrder(orderPayload)
        .then(() => {
          setLoading(false);
          setIsBookingSuccess(true);
          toast.success("Tạo hóa đơn thành công!!!");
          navigate("/order-tracking");
          localStorage.removeItem("cart");
        })
        .catch((error) => {
          setLoading(false);
          toast.error("Tạo hóa đơn không thành công!!!");
        });
    }
    setVisible(false);
  };

  const getDeliverySlot = () => {
    setLoading(true);
    deliverySlotService
      .getDeliverySlot()
      .then((data) => {
        processTimeDeliverySlot(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        toast.error("Đã có lỗi xảy ra !!!");
      });
  };

  const processTimeDeliverySlot = (data) => {
    // const currentHour = new Date().getHours();
    // const result = []
    // data.forEach((item) => {
    //   const timeEnd = item.TimeTo && item.TimeTo.split(":")[0];
    //   if (currentHour < timeEnd) {
    //     result.push({
    //       label: `${item.SlotName}: ${item.TimeFrom}-${item.TimeTo}`,
    //       value: item.Id
    //     })
    //   }
    // });

    const result = data.map((item) => {
      return {
        label: `${item.SlotName}: ${item.TimeFrom}-${item.TimeTo}`,
        value: `${item.Id}=${item.SlotName}: ${item.TimeFrom}-${item.TimeTo}`,
      };
    });

    setDeliveryOptions(result);
  };

  const handleMinus = (item) => {
    let findIndex = -1;
    cart.some((c, index) => {
      if (item.data.id === c.data.id) {
        if (c.count === 1) {
          findIndex = index;
        } else {
          c.count -= 1;
        }

        return true;
      }
      return false;
    });

    if (findIndex !== -1) {
      cart.splice(findIndex, 1);
    }

    setCart([...cart]);
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const handlePlus = (item) => {
    cart.some((c) => {
      if (item.data.id === c.data.id) {
        c.count += 1;
        return true;
      }
      return false;
    });

    setCart([...cart]);
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const getQuantityFromCart = (id) => {
    return cart.reduce((acc, val) => {
      return val.data.id === id ? val.count : acc;
    }, 0);
  };

  const customDialogContent = (
    <React.Fragment>
      <Typography sx={{ marginBottom: "5px" }}>
        <span style={{ fontWeight: "700" }}>Địa chỉ giao hàng:</span>
        {token?.building?.split("-")[1] + ", "}
        {token?.apartment?.split("-")[1] + ", "}
        {token?.area?.split("-")[1]}
      </Typography>
      <Typography sx={{ marginBottom: "5px" }}>
        <span style={{ fontWeight: "700" }}>Thời gian giao hàng dự kiến:</span>{" "}
        {deliTime?.split("=")[1]} ngày {new Date().getDate()}/
        {new Date().getMonth() + 1}/{new Date().getFullYear()}
      </Typography>
      <Typography sx={{ marginBottom: "5px" }}>
        <span style={{ fontWeight: "700" }}>Tổng đơn hàng:</span>{" "}
        {handleTotalPrice()}
      </Typography>
    </React.Fragment>
  );

  return (
    <>
      <Loading isLoading={loading} />
      <HeaderDetails
        {...type}
        name={
          location.pathname.includes("cart") === false
            ? location.state?.productType?.name
            : "Giỏ hàng của bạn"
        }
        typeHeader={
          location.pathname.includes("cart") === false
            ? location.state?.productType?.typeHeader
            : HeaderType.noLocation
        }
        linkToBack={
          location.pathname.includes("cart") === false
            ? location.state?.productType
            : { path: "/" }
        }
      ></HeaderDetails>
      <div
        style={{
          width: "100%",
          height: "100%",
          overflow: "auto",
        }}
      >
        <div>
          <Typography className="order-cart-title order-cart-title-first">
            Giao đến
          </Typography>
          <Typography
            sx={{
              fontSize: "17px",
              fontWeight: "700",
              paddingLeft: "10px",
              paddingTop: "10px",
            }}
          >
            {token?.building?.split("-")[1] + ", "}
            {token?.apartment?.split("-")[1] + ", "}
            {token?.area?.split("-")[1]}
          </Typography>
          <Typography className="order-cart-subtitle">Được giao từ</Typography>
          <Typography
            sx={{
              fontSize: "15px",
              fontWeight: "600",
              paddingLeft: "10px",
            }}
          >
            Cửa hàng bách hóa
          </Typography>
          <Typography className="order-cart-subtitle">
            Hình thức giao hàng
          </Typography>
          <Typography
            sx={{
              fontSize: "15px",
              fontWeight: "500",
              paddingLeft: "10px",
              color: "rgb(77, 184, 86)",
              textTransform: "uppercase",
            }}
          >
            Giao hàng trong ngày
          </Typography>
          <Typography className="order-cart-subtitle">
            Khung giờ giao hàng
          </Typography>
          <Box
            sx={{
              width: "35%",
              paddingLeft: "10px",
              marginTop: "5px !important",
            }}
          >
            <SelectForm
              label="Chọn thời gian"
              name="deliveryTime"
              required={true}
              messageRequired="Vui lòng chọn khung giờ giao hàng"
              control={control}
              size="small"
              options={deliveryOptions}
              disabled={isDisableSelection.current}
              showLabel={false}
            />
          </Box>
        </div>
        <div className="order-cart_content-user-info">
          <Typography className="order-cart-title">
            Thông tin người nhận
          </Typography>
          <Box className="item-user-info">
            <Box
              sx={{
                // background: "#ccc",
                width: "50px",
                height: "50px",
                display: "flex",
                alignItems: "center",
                borderRadius: "5px",
              }}
            >
              <PersonIcon
                sx={{
                  fontSize: "40px",
                  color: "#1890ff",
                }}
              />
            </Box>
            <Box>
              <Typography
                sx={{
                  color: "#828282",
                  fontSize: "14px",
                  marginBottom: "3px",
                }}
              >
                Tên người nhận
              </Typography>
              <Typography
                sx={{
                  fontWeight: "700",
                  fontSize: "15px",
                }}
              >
                {customerInfo.name}
              </Typography>
            </Box>
          </Box>
          <Box className="item-user-info">
            <Box
              sx={{
                // background: "#ccc",
                width: "50px",
                height: "50px",
                display: "flex",
                alignItems: "center",
                borderRadius: "5px",
              }}
            >
              <LocalPhoneIcon
                sx={{
                  fontSize: "40px",
                  color: "#1890ff",
                }}
              />
            </Box>
            <Box>
              <Typography
                sx={{
                  color: "#828282",
                  fontSize: "14px",
                  marginBottom: "3px",
                }}
              >
                Số điện thoại nhận hàng
              </Typography>
              <Typography
                sx={{
                  fontWeight: "700",
                  fontSize: "15px",
                }}
              >
                {customerInfo.phone}
              </Typography>
            </Box>
          </Box>
          {/* <Box className="item-user-info">
            <Box
              sx={{
                background: "#ccc",
                width: "50px",
                height: "50px",
                borderRadius: "5px",
              }}
            >
              <img src="" alt="" />
            </Box>
            <Box>
                <Typography
                  sx={{
                    color: "#828282",
                    fontSize: "14px",
                    marginBottom: "3px",
                  }}
                >
                  Ghi chú
                </Typography>
                <Typography
                  sx={{
                    fontWeight: "700",
                    fontSize: "15px",
                  }}
                >
                  Không có
                </Typography>
              </Box>
          </Box> */}
          <Typography
            sx={{
              position: "absolute",
              top: "11px",
              right: "10px",
              color: "rgb(24, 144, 255)",
              fontSize: "15px",
              cursor: "pointer",
            }}
          >
            Thay đổi
          </Typography>
        </div>
        <div className="order-cart_content-summary">
          <Typography className="order-cart-title">Tóm tắt đơn hàng</Typography>
          <Box className="order-cart_content-list">
            {cart.map((item) => (
              <Box key={item.id} className="order-cart_content-item">
                <Box className="order-cart_content-item-left">
                  <Box
                    sx={{
                      width: "70px",
                      height: "70px",
                    }}
                  >
                    <img
                      src={item.data.image}
                      alt=""
                      style={{
                        width: "100%",
                        height: "100%",
                        backgroundSize: "cover",
                      }}
                    />
                  </Box>
                  <Typography
                    sx={{
                      width: "28px",
                      height: "28px",
                      border: "1px solid #ccc",
                      textAlign: "center",
                      lineHeight: "28px",
                      fontSize: "14px",
                      color: "#1890ff",
                      boxShadow: "0 1px 6px 0 rgb(32 33 36 / 20%)",
                    }}
                  >
                    {item.count}x
                  </Typography>
                  <Box
                    sx={{
                      width: "50%",
                      height: "100%",
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: "700",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        fontSize: "15px",
                      }}
                    >
                      {item.data.name}
                    </Typography>
                    <Box className="quantity-input">
                      <Box className="cart-quantity">
                        <Box
                          onClick={() => handleMinus(item)}
                          className="cart-quantity-minus"
                        >
                          -
                        </Box>
                        <Box className="cart-quantity-text">
                          {getQuantityFromCart(item.data.id)}
                        </Box>
                        <Box
                          onClick={() => handlePlus(item)}
                          className="cart-quantity-plus"
                        >
                          +
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box className="order-cart_content-item-right">
                  <Typography
                    sx={{
                      fontSize: "15px",
                    }}
                  >
                    {HelperUtils.formatCurrency(item.data.price)}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
          <Box className="order-cart_content-brief">
            <Box className="order-cart_content-brief-item">
              <Typography
                sx={{
                  fontSize: "15px",
                }}
              >
                Tiền hàng
              </Typography>
              <Typography
                sx={{
                  fontSize: "15px",
                }}
              >
                {calculateTotalPriceCart()}
              </Typography>
            </Box>
            <Box className="order-cart_content-brief-item">
              <Typography
                sx={{
                  fontSize: "15px",
                }}
              >
                Phí giao hàng
              </Typography>
              <Typography
                sx={{
                  fontSize: "15px",
                }}
              >
                0đ
              </Typography>
            </Box>
            <Box className="order-cart_content-brief-item">
              <Typography
                sx={{
                  fontSize: "15px",
                }}
              >
                Phí dịch vụ
              </Typography>
              <Typography
                sx={{
                  fontSize: "15px",
                }}
              >
                0đ
              </Typography>
            </Box>
          </Box>
        </div>
      </div>
      <div className="order-cart-footer">
        <Box className="order-cart_footer-payment-method">
          <Box
            sx={{
              width: "40px",
              height: "35px",
              marginRight: "5px",
            }}
          >
            <img
              src={IconMoney}
              alt=""
              style={{ width: "100%", height: "100%", backgroundSize: "cover" }}
            />
          </Box>
          <Typography
            sx={{
              fontSize: "15px",
            }}
          >
            Thanh toán khi nhận hàng
          </Typography>
        </Box>
        <Box className="order-cart_footer-total">
          <Box className="order-cart_footer-total-left">
            <Typography>Tổng cộng</Typography>
            {!deliTime && (
              <Typography
                sx={{
                  color: "red",
                  fontSize: "14px",
                }}
              >
                Chưa chọn khung giờ giao hàng
              </Typography>
            )}
            {deliTime === "not" && (
              <Typography
                sx={{
                  color: "red",
                  fontSize: "14px",
                }}
              >
                Không có khung giờ phù hợp
              </Typography>
            )}
          </Box>
          <Box className="order-cart_footer-total-right">
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: "700",
              }}
            >
              {handleTotalPrice()}
            </Typography>
          </Box>
        </Box>
        <Box className="order-cart_footer-submit">
          {!isBookingSuccess && (
            <Button
              sx={{
                width: "100%",
                background: "rgba(18,173,232,1)",
                padding: "10px 0",
                borderRadius: "5px",
                color: "#fff",
                fontWeight: "700",
                "&:hover ": {
                  background: "rgba(18,173,232,.7)",
                },
              }}
              onClick={handleBook}
            >
              Đặt hàng
            </Button>
          )}

          {isBookingSuccess && (
            <Button
              sx={{
                width: "100%",
                background: "rgba(18,173,232,1)",
                padding: "10px 0",
                borderRadius: "5px",
                color: "#fff",
                fontWeight: "700",
                "&:hover ": {
                  background: "rgba(18,173,232,.7)",
                },
              }}
              onClick={handleContinuteBooking}
            >
              Tiếp tục đặt hàng
            </Button>
          )}
        </Box>
      </div>

      {/* Dialog */}
      <DialogCustom
        visible={visible}
        modal={true}
        isCloseIcon={true}
        isDialogFooter={true}
        onClose={hanldeClose}
        onConfirmed={handleConfirmation}
        headerContent="Bạn đang thanh toán đơn hàng?"
        isCustomContent={true}
        bodyContent={customDialogContent}
      />
    </>
  );
}

export default CartPage;
