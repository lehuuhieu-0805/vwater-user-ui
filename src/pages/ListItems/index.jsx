import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import { categories } from "../../models/categories.model";
// import { userActions } from "../../models/userActions.model";
import HeaderDetails from "../../shared/HeaderDetails";
import EmptyProduct from "../../assets/images/empty.png";
// import { listFaucets } from "../../mock/mock";
import "./style.css";
import Cart from "../../shared/Cart";
import { VWaterPaths } from "../../confgurations/paths/vwaterPath";
import Loading from "../../components/Loading/Loading";
import DialogCustom from "../../components/Dialog";
import { HelperUtils } from "../../utils/helper";
import { productService } from "../../services/ProductService";
import ProductDefaultImage from '../../assets/images/nuoc_lavie_viva.png';
import { AuthConsumer } from "../../context/AuthContext";
import { toast } from 'react-toastify';

function ListItems() {
  const location = useLocation();
  const { token } = AuthConsumer();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [type, setType] = useState({});
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState(() => {
    const getCart = JSON.parse(localStorage.getItem("cart"));
    if (getCart) {
      return getCart;
    }

    const value = [];
    localStorage.setItem("cart", JSON.stringify(value));
    return value;
  });
  const [visible, setVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const currentIndex = useRef(0);

  useEffect(() => {
    Object.keys(VWaterPaths).some((p) => {
      if (
        VWaterPaths[p] === location.pathname &&
        location.pathname === VWaterPaths.product
      ) {
        setLoading(true);
        let areaId = -1;
        let productTypeId = -1;

        if (token) {
          areaId = token.area.split('-')[0]; // get areaId from local storage
        }

        if (!location.state?.productType) {
          const typeStorage = JSON.parse(localStorage.getItem('productType'));
          productTypeId = typeStorage && typeStorage.id;
        } else {
          productTypeId = location.state?.productType.id
        }

        productService.getMenu((new Date().toISOString()), areaId)
          .then(menu => productService.getProductByFilter(menu.Id, productTypeId))
          .then(productInMenu => {
            const listProducts = (productInMenu || []).map(item => {
              return {
                id: item.Id,
                type: item.Product.ProductType_Id,
                name: item.Product.ProductName,
                unit: item.Product.Description, // get unit from description
                price: item.Price,
                shop: 'Cửa hàng bách hóa', // hardcode
                image: item.Product.Img || ProductDefaultImage
              }
            });
            setData(listProducts);
            setLoading(false);
          })
          .catch(error => {
            setLoading(false);
            toast.error('Đã có lỗi xảy ra!!!');
            console.log(error);
          });
        return true;
      }
      return false;
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      name: '',
      typeHeader: '',
      typeFilter: '',
    }

    if (location?.state?.productType) {
      type.name = location.state.productType.name;
      type.typeHeader = location.state.productType.typeHeader;
      // type.typeFilter = location.state.productType.typeFilter;
    } else {
      const typeStorage = JSON.parse(localStorage.getItem('productType'));
      type.name = typeStorage && typeStorage.name;
      type.typeHeader = typeStorage && typeStorage.typeHeader;
      // type.typeFilter = typeStorage && typeStorage.typeFilter;
    }

    setType(type);

  }, [location]);

  useEffect(() => {
    if (!loading && data.length) {
      handleCartChange(cart);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart, loading]);

  const handleAdded = (item) => {
    let check = false;
    let getCart = JSON.parse(localStorage.getItem("cart"));

    getCart.forEach((c) => {
      if (c.id === item.id) {
        check = true;
      }
    });

    if (check) {
      getCart.some((c) => {
        if (c.id === item.id) {
          c.count += 1;
          return true;
        }
        return false;
      });
      setCart(getCart);
    } else {
      const value = [...getCart, { id: item.id, count: 1, data: { ...item } }];

      localStorage.setItem("cart", JSON.stringify(value));
      setCart(value);
    }
  };

  const handleCartChange = (cart) => {
    const value = data.map((faucet) => {
      faucet.isAdded = false;
      (cart || []).some((c) => {
        if (faucet.id === c.id) {
          faucet.isAdded = true;
          return true;
        }
        return false;
      });
      return {
        ...faucet,
      };
    });

    setData(value);
  };

  const handleMinus = (item) => {
    let getCart = JSON.parse(localStorage.getItem("cart"));
    if (getCart.length === 0) {
      const value = data.map((faucet) => {
        faucet.isAdded = false;
        return faucet;
      });
      setData(value);
      return;
    }

    getCart.some((c, index) => {
      if (item.id === c.id) {
        if (c.count === 1) {
          setCurrentProduct(item);
          setVisible(true);
          currentIndex.current = index;
        } else {
          c.count -= 1;
        }

        return true;
      }
      return false;
    });

    setCart(getCart);
    localStorage.setItem("cart", JSON.stringify(getCart));
  };

  const handlePlus = (item) => {
    let getCart = JSON.parse(localStorage.getItem("cart"));
    getCart.some((c) => {
      if (item.id === c.id) {
        c.count += 1;
        return true;
      }
      return false;
    });

    setCart(getCart);
    localStorage.setItem("cart", JSON.stringify(getCart));
  };

  const getQuantityFromCart = (id) => {
    return cart.reduce((acc, val) => {
      return val.id === id ? val.count : acc;
    }, 0);
  };

  const hanldeClose = () => {
    setVisible(false);
  };

  const handleConfirmation = (state) => {
    if (state) {
      let getCart = JSON.parse(localStorage.getItem("cart"));
      getCart.splice(currentIndex.current, 1);
      setCart(getCart);
      localStorage.setItem("cart", JSON.stringify(getCart));
    }

    setVisible(false);
  };

  return (
    <>
      <Loading isLoading={loading} />
      <HeaderDetails {...type}></HeaderDetails>
      <Box className="product-container">
        {data.length === 0 && (
          <Box className="empty-product">
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
              Không có sản phẩm nào!
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: "300",
              }}
            >
              Hiện không có sản phẩm nào, Bạn vui lòng quay lại vào lúc khác.
            </Typography>
          </Box>
        )}

        {data.length > 0 && (
          <Box className="product-list">
            {data.map((item) => (
              <Box key={item.id} className="product-item">
                <Box className="product-item-left">
                  <img src={item.image} alt="" className="product-item-image" />
                  <Box>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: "700",
                      }}
                    >
                      {item.name}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "11px",
                        fontWeight: "300",
                        color: "rgb(102, 102, 102)",
                      }}
                    >
                      {item.shop}
                    </Typography>
                    {!item.isAdded && (
                      <Button
                        onClick={() => handleAdded(item)}
                        sx={{
                          color: "#0c5f95",
                          fontWeight: "600",
                          background: "rgba(150, 213, 255,0.2)",
                          width: "120px",
                          height: "30px",
                          marginTop: "10px",
                        }}
                      >
                        Thêm
                      </Button>
                    )}
                    {item.isAdded && (
                      <Box className="quantity-input">
                        <Box className="cart-quantity">
                          <Box
                            onClick={() => handleMinus(item)}
                            className="cart-quantity-minus"
                          >
                            -
                          </Box>
                          <Box className="cart-quantity-text">
                            {getQuantityFromCart(item.id)}
                          </Box>
                          <Box
                            onClick={() => handlePlus(item)}
                            className="cart-quantity-plus"
                          >
                            +
                          </Box>
                        </Box>
                      </Box>
                    )}
                  </Box>
                </Box>
                <Box className="product-item-right">
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: "700",
                    }}
                  >
                    {HelperUtils.formatCurrency(item.price)}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "11px",
                      fontWeight: "300",
                      color: "rgb(102, 102, 102)",
                    }}
                  >
                    {item.unit}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </Box>
      {cart.length > 0 && data.length > 0 && (
        <Box
          onClick={() =>
            navigate(VWaterPaths.cart, {
              state: {
                productType: {
                  id: location.state.productType.id,
                  name: location.state.productType.name,
                  typeHeader: location.state.productType.typeHeader,
                  typeFilter: location.state.productType.typeFilter,
                  path: location.pathname
                }
              },
            })
          }
          className="cart-container"
        >
          <Cart count={cart.length}></Cart>
        </Box>
      )}

      {/* Dialog */}
      <DialogCustom
        visible={visible}
        modal={true}
        isDialogFooter={true}
        isCloseIcon={true}
        onClose={hanldeClose}
        onConfirmed={handleConfirmation}
        headerContent="Bạn có chắc muốn xóa?"
        bodyContentColor="red"
        bodyContentFontweight="700"
        bodyContent={currentProduct?.name}
      />
    </>
  );
}

export default ListItems;
