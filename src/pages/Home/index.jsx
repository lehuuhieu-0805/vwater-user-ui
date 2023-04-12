import React, { useEffect, useState } from "react";
import { Avatar, Box, Card, Grid, IconButton, Typography } from "@mui/material";
import { HomeStyles } from "./HomeStyles";
import DrawerSideBar from "../../shared/DrawerSideBar/index";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MenuIcon from "@mui/icons-material/Menu";
import VWaterDelivery from "../../assets/images/delivery-water3.png";
import { useNavigate } from "react-router-dom";
// import { categories } from "../../models/categories.model";
import { userActions } from "../../models/userActions.model";
import { AuthConsumer } from "../../context/AuthContext";
import AuthenDialog from "../../common/AuthenDialog/AuthenDialog";
import { useAuthService } from "../../context/AuthenServiceContext";
import { productTypeService } from "../../services/ProductTypeService";
import { FilterType, HeaderType } from "../../models/header.model";


// mock
import Faucet20L from "../../assets/images/19-20l-voi.jpg";
// import FaceDown20L from "../../assets/images/19-20l-up.jpg";
// import Bottle350ml from "../../assets/images/350ml-chai.png";
// import Bottle500ml from "../../assets/images/500ml-chai.png";
import { VWaterPaths } from "../../confgurations/paths/vwaterPath";
import Loading from "../../components/Loading/Loading";
import { toast } from 'react-toastify';
import { storeService } from "../../services/StoreService";

function Home() {
  const navigate = useNavigate();
  const classes = HomeStyles();
  const [state, setState] = useState(false);
  const [loading, setLoading] = useState(false);
  const { token } = AuthConsumer();
  const { handleSetVisible } = useAuthService();
  const [productType, setProductType] = useState([]);
  const [store, setStore] = useState([]);
  const toggleDrawer = (statusState) => {
    setState(statusState);
  };

  useEffect(() => {
    setLoading(true);
    productTypeService
      .getProductTypes()
      .then((data) => {
        const types = (data || []).map((item) => {
          return {
            id: item.Id,
            name: item.ProductTypeName,
            image: item.Img || Faucet20L,
            typeHeader: HeaderType.noLocation,
            typeFilter: FilterType.filter,
            path: VWaterPaths.product,
          };
        });
        setProductType(types);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toast.error("Đã có lỗi xảy ra!!!");
        console.log("===== Begin Get product Type ERROR: ", error);
      });

    storeService.getStores()
      .then(data => {
        setStore(data);
      })
      .catch(error => {
        setLoading(false);
        toast.error("Đã có lỗi xảy ra!!!");
        console.log("===== Begin Get Stores ERROR: ", error);
      })
  }, []);

  return (
    <>
      <Loading isLoading={loading} />
      <Box className={classes.BoxBodyContent}>
        <Box component={"div"} className={classes.HeaderContent}>
          <Typography
            variant="subtitle1"
            sx={{
              color: "#fff",
              marginBottom: "5px",
              marginLeft: "17px",
            }}
          >
            Giao đến:
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              className={classes.SearchContainer}
              onClick={() => {
                handleSetVisible(true);
              }}
            >
              <LocationOnIcon
                sx={{
                  color: "#3498db",
                  position: "relative",
                  top: "10px",
                  left: "6px",
                  zIndex: "3",
                }}
              />
              <span className={classes.LabelAddress}>
                {token
                  ? token?.building?.split("-")[1] +
                  ", " +
                  token?.apartment?.split("-")[1] +
                  ", " +
                  token?.area?.split("-")[1]
                  : "Địa chỉ"}
              </span>
              <div className={classes.SearchAddress}></div>
            </Box>
            <IconButton
              onClick={() => {
                toggleDrawer(true);
              }}
              sx={{ width: 40, height: 40 }}
            >
              <MenuIcon sx={{ color: "#fff", fontSize: "2rem" }} />
            </IconButton>
          </Box>
          <Box className={classes.HeaderInfo}>
            <Box>
              <img src={VWaterDelivery} alt="" />
            </Box>
            <Box
              sx={{
                marginLeft: "10px",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bolder",
                  color: "#fff",
                  "@media screen and (min-width: 0px) and (max-width:640px)": {
                    fontSize: '18px'
                  }
                }}
              >
                VWATER.NET
              </Typography>
              <Typography
                sx={{
                  color: "#fff",
                  "@media screen and (min-width: 0px) and (max-width:640px)": {
                    fontSize: '14px'
                  }
                }}
              >
                Dịch vụ tiện ích giao hàng tận nơi cho cư dân
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box className={classes.FooterContainer}>
        <Box className={classes.FooterContent}>
          {(userActions || []).map((item) => (
            <Card
              key={item.id}
              className={classes.CardContent}
              onClick={() => {
                if (!token) {
                  handleSetVisible(true);
                  return;
                }
                localStorage.removeItem('productType');
                navigate(item.path);
              }}
            >
              <img
                style={{ width: 55, height: 55 }}
                src={item.image}
                alt={"#"}
                loading="lazy"
              />
              <Typography
                variant="p"
                sx={{
                  fontSize: "1.2rem",
                  fontWeight: "700",
                  color: "white",
                }}
              >
                <b>{item.name}</b>
              </Typography>
            </Card>
          ))}
        </Box>
        <Box className={classes.FooterCategory}>
          <Grid
            container
            sx={{
              margin: "0 auto",
              justifyContent: "space-evenly",
              alignItems: "center",
              padding: "1.25rem 4rem",
            }}
          >
            {/* <Grid item xs={3} sx={{ padding: "0.625rem" }}>
              <Box sx={{ textAlign: "center" }}>
                <IconButton>
                  <Avatar
                    alt="#"
                    src={WatterIcon}
                    className={classes.CategoryContent}
                  />
                </IconButton>
                <Typography variant="subtitle2">Nước suối</Typography>
              </Box>
            </Grid> */}
            {(productType || []).map((cate) => (
              <Grid
                key={cate.id}
                item
                xs={6}
                sx={{ padding: "0.625rem" }}
                className={classes.CategoryGrid}
                onClick={() => {
                  if (!token) {
                    handleSetVisible(true);
                    return;
                  }
                  localStorage.setItem("productType", JSON.stringify(cate));
                  navigate(cate.path, { state: { productType: cate } });
                }}
              >
                <Box
                  sx={{ textAlign: "center" }}
                  className={classes.CategoryBox}
                >
                  {/* <IconButton> */}
                  <Avatar
                    alt="#"
                    src={cate.image}
                    className={classes.CategoryContent}
                  />
                  {/* </IconButton> */}
                  <Typography variant="subtitle2" sx={{ fontWeight: "700" }}>
                    {cate.name}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
          {/* <Accordion
            expanded={expanded}
            onChange={() => setExpanded(!expanded)}
            className={classes.Accordion}
            TransitionProps={{ unmountOnExit: true }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Quán gần bạn</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel
                sequi recusandae minus ut deleniti. Fugiat nobis, recusandae
                laudantium itaque nihil fugit id tenetur officia veritatis neque
                animi illum a soluta!
              </Typography>
            </AccordionDetails>
          </Accordion> */}
        </Box>
        <Box className={classes.FooterNearLocation}>
          <Grid item xs={12} sx={{ marginBottom: "25px" }}>
            <Typography
              sx={{
                height: "52px",
                background: "rgb(246, 249, 252)",
                lineHeight: "52px",
                paddingLeft: "15px",
                fontWeight: "600",
                color: "rgb(100, 100, 100)",
              }}
            >
              Danh sách cửa hàng
            </Typography>
          </Grid>
          {/* <Grid container sx={{ gap: "30px" }}> */}
          {store.map(s => (<Box className={classes.NeLoBox}>
            <Box sx={{
              width: "80px",
              height: "80px",
            }}>
              <img
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "14px",
                  display: "block",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
                src="https://firebasestorage.googleapis.com/v0/b/lucky-science-341916.appspot.com/o/assets%2FImagesStores%2F04ebc3fe-840f-4d1a-bbce-dfb22db2b54f?alt=media&token=685c0281-eeab-4dbc-86dd-7d5c5591abb7"
                alt=""
              />
            </Box>
            <Box
              sx={{
                marginLeft: "20px"
              }}
            >
              <Typography sx={{
                fontSize: "14px",
                fontWeight: "700",
                color: "rgb(100, 100, 100)",
              }}>
                <span style={{ color: '#333', fontWeight: '700' }}>Tên cửa hàng:</span> {s.StoreName}
              </Typography>
              <Typography sx={{
                fontSize: "14px",
                fontWeight: "700",
                color: "rgb(100, 100, 100)",
              }}>
                <span style={{ color: '#333', fontWeight: '700' }}>Địa chỉ:</span> {s.Address}
              </Typography>
              <Typography sx={{
                fontSize: "14px",
                fontWeight: "700",
                color: "rgb(100, 100, 100)",
              }}>
                <span style={{ color: '#333', fontWeight: '700' }}>Ghi chú:</span> {s.Note}
              </Typography>
            </Box>
          </Box>))}
          {/* </Grid> */}
        </Box>
      </Box>
      <DrawerSideBar toggleDrawer={toggleDrawer} state={state} />
      <AuthenDialog />
    </>
  );
}

export default Home;
