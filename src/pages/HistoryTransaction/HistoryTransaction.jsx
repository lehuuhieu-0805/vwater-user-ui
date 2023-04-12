import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { categories } from "../../models/categories.model";
import { userActions } from "../../models/userActions.model";
import HeaderDetails from "../../shared/HeaderDetails";
import { HelperUtils } from "../../utils/helper";
import EmptyProduct from "../../assets/images/empty.png";
import Product1 from "../../assets/images/nuoc_lavie_viva.png";
import "./style.css";
import { isEmpty } from "lodash";
import { orderService } from "../../services/OrderService";
import { AuthConsumer } from "../../context/AuthContext";
import moment from "moment";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { deliveryAddressService } from "../../services/DeliveryAddressService";
import Loading from "../../components/Loading/Loading";
import { storeService } from "../../services/StoreService";
import { statusService } from "../../services/StatusService";
import { toast } from "react-toastify";
import { productService } from "../../services/ProductService";
import { deliverySlotService } from "../../services/DeliverySlot";
import { STATUS_ORDER } from "../../consts/StatusOrder";
import { VWaterPaths } from "../../confgurations/paths/vwaterPath";
import DialogCustom from "../../components/Dialog";

export default function HistoryTransaction() {
  const { token, setVwaterInfo } = AuthConsumer();
  //
  const navigate = useNavigate();
  const location = useLocation();
  const [type, setType] = useState({});
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentSelect, setCurrentSelect] = useState(-1);
  const [selectedOrder, setSelectedOrder] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    handleLoadData();
  }, []);

  useEffect(() => {
    setType({
      name: "Lịch sử giao dịch",
      typeHeader: "NoLocation",
      // typeFilter: "searchHistory",
      // typeFilter: "",
    });
  }, [location]);

  useEffect(() => {
    if (!isEmpty(type)) {
      handleSearch();
    }
  }, [type]);

  const handleLoadData = () => {
    setLoading(true);
    orderService.getOrderByCustomerId(token.customerId)
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

  const handleSearch = async (data) => { };

  const onChangeAccordion = (data, expanded, index) => {
    // reset
    setCurrentSelect(index);
    setLoading(false);

    if (!expanded) {
      setCurrentSelect(-1);
    }
  };

  const hanldeClose = () => {
    setVisible(false);
  };

  const handleConfirmation = (state) => {
    if (state) {
      navigate(`${VWaterPaths.cart}?reorderbyId=true&${selectedOrder.Id}`);
    }
    setVisible(false);
  };

  const handleReOrder = (item) => {
    setSelectedOrder(item);
    setVisible(true);
  }

  const customDialogContent = (
    <React.Fragment>
      <Typography sx={{ marginBottom: "5px" }}>
        <span style={{ fontWeight: "700" }}>Địa chỉ giao hàng:</span>{"  "}
        {selectedOrder?.DeliveryAddress?.Address}
      </Typography>
      <Typography sx={{ marginBottom: "5px" }}>
        <span style={{ fontWeight: "700" }}>Thời gian giao hàng dự kiến:</span>{"  "}
        {`${selectedOrder?.DeliverySlot?.SlotName}: ${selectedOrder?.DeliverySlot?.TimeFrom}-${selectedOrder?.DeliverySlot?.TimeTo}`}
      </Typography>
      <Typography sx={{ marginBottom: "5px" }}>
        <span style={{ fontWeight: "700" }}>Tổng đơn hàng:</span>{"  "}
        {HelperUtils.formatCurrency(selectedOrder?.TotalPrice)}
      </Typography>
    </React.Fragment>
  );

  return (
    <>
      <Loading isLoading={loading} />
      <HeaderDetails handleGetSearch={handleSearch} {...type}></HeaderDetails>
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
              Hiện không có lịch sử giao dịch nào.
            </Typography>
          </Box>
        )}

        {data.length > 0 && (
          <Box className="history-list">
            {data.map((item, index) => (
              <Accordion
                expanded={currentSelect === index}
                onChange={(event, expanded) =>
                  onChangeAccordion(item, expanded, index)
                }
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Box className="history-item">
                    <Box className="history-item-left">
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: "700",
                        }}
                      >
                        Mã đơn hàng: &nbsp;
                        <span
                          style={{
                            color: "#2596be",
                            fontSize: "14px",
                            fontWeight: "700",
                          }}
                        >
                          {item.Id}
                        </span>
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: "700",
                        }}
                      >
                        Tên khách hàng: &nbsp;
                        <span
                          style={{
                            color: "#2596be",
                            fontSize: "14px",
                            fontWeight: "700",
                          }}
                        >
                          {token.customerName}
                        </span>
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: "700",
                        }}
                      >
                        Số điện thoại: &nbsp;
                        <span
                          style={{
                            color: "#2596be",
                            fontSize: "14px",
                            fontWeight: "700",
                          }}
                        >
                          {token.phoneNumber}
                        </span>
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: "700",
                        }}
                      >
                        Địa chỉ: &nbsp;
                        <span
                          style={{
                            color: "#2596be",
                            fontSize: "14px",
                            fontWeight: "700",
                          }}
                        >
                          {item?.DeliveryAddress?.Address}
                        </span>
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: "700",
                        }}
                      >
                        Thời gian nhận hàng: &nbsp;
                        <span
                          style={{
                            color: "#2596be",
                            fontSize: "14px",
                            fontWeight: "700",
                          }}
                        >
                          {item?.DeliverySlot?.SlotName}
                        </span>
                      </Typography>
                    </Box>
                    <Box className="history-item-right">
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: "700",
                        }}
                      >
                        Thành tiền:{" "}
                        {HelperUtils.formatCurrency(item?.TotalPrice)}
                      </Typography>

                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: "700",
                        }}
                      >
                        Số lượng mặt hàng : {item?.TotalQuantity}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "12px",
                          fontWeight: "400",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        Trạng thái: &nbsp;
                        <Card
                          sx={{
                            fontSize: "12px",
                            fontWeight: "400",
                            backgroundColor: STATUS_ORDER[item.StatusId].color,
                            padding: "2px 5px",
                            color: "white",
                          }}
                        >
                          {item?.Status?.Note}
                        </Card>
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "12px",
                          fontWeight: "400",
                        }}
                      >
                        Ngày giao dịch :{" "}
                        {moment(item.OrderDate).format("DD/MM/yyyy")}
                      </Typography>
                    </Box>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  {item?.OrderDetails.map((orderDetail) => {
                    return (
                      <Box className="order-detail-container">
                        <Typography
                          sx={{
                            fontSize: "14px",
                            // fontWeight: "700",
                            alignSelf: "start",
                          }}
                        >
                          Tên sản phẩm :{" "}
                          <span style={{ fontWeight: "700", fontSize: "14px" }}>
                            {orderDetail?.ProductInMenu?.Product?.ProductName}
                          </span>
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "14px",
                            // fontWeight: "700",
                            alignSelf: "start",
                          }}
                        >
                          Số lượng :{" "}
                          <span style={{ fontWeight: "700", fontSize: "14px" }}>
                            {orderDetail?.Quantity}
                          </span>
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "14px",
                            // fontWeight: "700",
                            alignSelf: "start",
                          }}
                        >
                          Đơn giá :{" "}
                          <span style={{ fontWeight: "700", fontSize: "14px" }}>
                            {HelperUtils.formatCurrency(orderDetail?.Price)}
                          </span>
                        </Typography>
                      </Box>
                    );
                  })}
                  <Box height={5}></Box>
                  <Box sx={{ textAlign: "end" }}>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        handleReOrder(item);
                      }}
                    >
                      Đặt lại
                    </Button>
                  </Box>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        )}
      </Box>

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
