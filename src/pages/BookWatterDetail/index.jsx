import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { width } from "@mui/system";
import React, { memo, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Container } from "reactstrap";
import { categories } from "../../models/categories.model";
import { userActions } from "../../models/userActions.model";
import HeaderDetails from "../../shared/HeaderDetails";
import Carousel from "react-material-ui-carousel";
import CarouselLavie from "../../assets/images/CarouselLavie.jpg";
import CarouselLavie1 from "../../assets/images/CarouselLavie1.jpg";
import CarouselAquafina from "../../assets/images/CarouselAquafina.jpg";
import "./style.css";
import moment from "moment/moment";
export default function BookWaterDetail() {
  const location = useLocation();
  const [type, setType] = useState({});
  const [data, setData] = useState();
  const [hours, setHours] = useState();
  const [minutes, setMinutes] = useState();
  const [second, setSecond] = useState();
  const [dateNow, setDateNow] = useState(moment(Date()).format("A"));
  const [carouselItems, setCarouselItem] = useState([
    {
      name: "Nước khoáng tinh khiết",
      description: "Nước lọc đống chai",
      image: CarouselLavie,
    },
    {
      name: "Nước Ngọt",
      description: "Nước chà bồn",
      image: CarouselLavie1,
    },
    {
      name: "Nước Ngọt",
      description: "Nước chà bồn",
      image: CarouselAquafina,
    },
  ]);
  useEffect(() => {
    [...categories, ...userActions].some((item) => {
      if (location.pathname === item.path) {
        setType({
          name: item.name,
          typeHeader: item.typeHeader,
          typeFilter: item.typeFilter,
        });
        return true;
      }

      return false;
    });
  }, [location]);

  // Get Search form child component HEADER DETAILS
  const handleSearch = (data) => {
    console.log(data);
  };
  //  5:59:59
  // let timeOut = null;
  // const decreaseTime = () => {
  //   if (second === -1) {
  //     setMinutes((minutes) => minutes - 1);
  //     setSecond(59);
  //   }
  //   if (minutes === -1) {
  //     setHours((hours) => hours - 1);
  //     setMinutes(59);
  //   }
  //   if (hours === -1) {
  //     clearTimeout(timeOut);
  //     alert("Hết giờ");
  //     return false;
  //   }
  //   timeOut = setTimeout(() => {
  //     setSecond((second) => second - 1);
  //     decreaseTime();
  //   }, 1000);
  // };
  // decreaseTime();
  useEffect(() => {
    const countDown = () => {
      let countDownTime = new Date();
      countDownTime.setHours(countDownTime.getHours() + 3);
      countDownTime.setMinutes(countDownTime.getMinutes());
      let x = setInterval(function () {
        var now = new Date().getTime();
        // Find the distance between now and the count down date
        let distance = countDownTime.getTime() - now;
        // Time calculations for days, hours, minutes and seconds
        let h = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        let m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let s = Math.floor((distance % (1000 * 60)) / 1000);
        setSecond(s);
        setMinutes(m);
        setHours(h);
        // If the count down is finished, write some text
        if (distance < 0) {
          clearInterval(x);
        }
      }, 1000);
    };
    countDown();
  }, []);
  const Item = (props) => {
    return (
      <Paper sx={{ marginTop: "8px", borderRadius: "6px" }}>
        <img
          style={{
            width: "100%",
            height: "300px",
            backgroundRepeat: "no-repeat",
            objectFit: "cover",
            borderRadius: "6px",
          }}
          src={props.item.image}
          alt=""
        />
      </Paper>
    );
  };
  return (
    <>
      <HeaderDetails handleGetSearch={handleSearch} {...type}></HeaderDetails>
      <Box sx={{ width: "100%", overflow: "scroll" }}>
        <Box sx={{ padding: "15px" }}>
          <Typography sx={{ padding: "15px 0px", color: "#787878" }}>
            Gọi là có - nhận đơn và xử lý giao hàng ngay.
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            {/* <Typography sx={{ fontWeight: "bold" }} variant="h5">
              {dateNow === "AM" ? "Buổi Sáng" : "Buổi Tối"}
            </Typography> */}
            {/* <Box sx={{ marginTop: "10px", display: "flex" }}>
              <Box
                sx={{
                  backgroundColor: "#79c6f9",
                  fontWeight: "bold",
                  width: "24px",
                  textAlign: "center",
                  borderRadius: "5px",
                }}
              >
                {hours}
              </Box>
              :
              <Box
                sx={{
                  backgroundColor: "#79c6f9",
                  fontWeight: "bold",
                  width: "24px",
                  textAlign: "center",
                  borderRadius: "5px",
                }}
              >
                {minutes}
              </Box>
              :
              <Box
                sx={{
                  backgroundColor: "#79c6f9",
                  fontWeight: "bold",
                  width: "24px",
                  textAlign: "center",
                  borderRadius: "5px",
                }}
              >
                {second}
              </Box>
            </Box> */}
          </Box>
          <Box>
            <Carousel
              autoPlay
              indicators={false}
              swipe
              fullHeightHover
              cycleNavigation
              navButtonsAlwaysInvisible={false}
              navButtonsAlwaysVisible={false}
              animation="fade"
              duration={500}
            >
              {carouselItems.map((item, index) => {
                return <Item key={index} item={item}></Item>;
              })}
            </Carousel>
          </Box>
          <Typography className="book-watter-title">
            Đơn hàng gần nhất
          </Typography>
          <Box mt={3}></Box>
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              sx={{ marginLeft: 2, borderBottom: "1px solid #c9c9c8c8" }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  width: "100%",
                  height: "5.8rem",
                  borderRadius: "14px",
                  paddingBottom: 1,
                }}
              >
                <img
                  style={{
                    width: "6rem",
                    height: "100%",
                    borderRadius: "14px",
                    display: "block",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                  src="https://firebasestorage.googleapis.com/v0/b/lucky-science-341916.appspot.com/o/assets%2FImagesStores%2F04ebc3fe-840f-4d1a-bbce-dfb22db2b54f?alt=media&token=685c0281-eeab-4dbc-86dd-7d5c5591abb7"
                  alt=""
                />
                <Box sx={{ paddingLeft: 2 }}>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "rgb(100, 100, 100)",
                      fontWeight: "700",
                      width: "100%",
                    }}
                  >
                    Nước bình 19L-20L vòi bấm
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "rgb(100, 100, 100)",
                      fontWeight: "500",
                      width: "100%",
                    }}
                  >
                    Building 1
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "rgb(100, 100, 100)",
                      fontWeight: "500",
                      width: "100%",
                    }}
                  >
                    Nước giải khát
                  </Typography>
                </Box>
              </Box>
            </Grid>{" "}
            <Grid
              item
              xs={12}
              sx={{ marginLeft: 2, borderBottom: "1px solid #c9c9c8c8" }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  width: "100%",
                  height: "5.8rem",
                  borderRadius: "14px",
                  paddingBottom: 1,
                }}
              >
                <img
                  style={{
                    width: "6rem",
                    height: "100%",
                    borderRadius: "14px",
                    display: "block",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                  src="https://firebasestorage.googleapis.com/v0/b/lucky-science-341916.appspot.com/o/assets%2FImagesStores%2F04ebc3fe-840f-4d1a-bbce-dfb22db2b54f?alt=media&token=685c0281-eeab-4dbc-86dd-7d5c5591abb7"
                  alt=""
                />
                <Box sx={{ paddingLeft: 2 }}>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "rgb(100, 100, 100)",
                      fontWeight: "700",
                      width: "100%",
                    }}
                  >
                    Nước bình 19L-20L vòi bấm
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "rgb(100, 100, 100)",
                      fontWeight: "500",
                      width: "100%",
                    }}
                  >
                    Building 1
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "rgb(100, 100, 100)",
                      fontWeight: "500",
                      width: "100%",
                    }}
                  >
                    Nước giải khát
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ marginLeft: 2, borderBottom: "1px solid #c9c9c8c8" }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  width: "100%",
                  height: "5.8rem",
                  borderRadius: "14px",
                  paddingBottom: 1,
                }}
              >
                <img
                  style={{
                    width: "6rem",
                    height: "100%",
                    borderRadius: "14px",
                    display: "block",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                  src="https://firebasestorage.googleapis.com/v0/b/lucky-science-341916.appspot.com/o/assets%2FImagesStores%2F04ebc3fe-840f-4d1a-bbce-dfb22db2b54f?alt=media&token=685c0281-eeab-4dbc-86dd-7d5c5591abb7"
                  alt=""
                />
                <Box sx={{ paddingLeft: 2 }}>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "rgb(100, 100, 100)",
                      fontWeight: "700",
                      width: "100%",
                    }}
                  >
                    Nước bình 19L-20L vòi bấm
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "rgb(100, 100, 100)",
                      fontWeight: "500",
                      width: "100%",
                    }}
                  >
                    Building 1
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "rgb(100, 100, 100)",
                      fontWeight: "500",
                      width: "100%",
                    }}
                  >
                    Nước giải khát
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}
