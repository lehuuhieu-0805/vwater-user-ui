import { Box, Grid, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import TextFieldElement from "../../components/Form/TextFieldElement";
import { HeaderDetaillsStyle } from "./HeaderDetailsStyles";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import DrawerSideBar from "../DrawerSideBar";
import {
  FilterOptions,
  FilterType,
  HeaderType,
} from "../../models/header.model";
import SelectForm from "../../components/Form/SelectElement/SelectForm";
import { headerFilters } from "../../models/headerFilters.model";
import DatePickerElement from "../../components/Form/DatePickerElement";
import NumbericElement from "../../components/Form/NumbericElement";
// import DialogCustom from "../../components/Dialog";

export default function HeaderDetails(props) {
  const { handleGetSearch, linkToBack, name, typeHeader, typeFilter } = props;
  const classes = HeaderDetaillsStyle();
  const navigate = useNavigate();
  const [state, setState] = useState(false);
  // const [visible, setVisible] = useState(true);
  const { control, getValues } = useForm({
    address: "",
    [FilterOptions.quickFilter.id]: "",
    [FilterOptions.arrangeFilter.id]: "",
    [FilterOptions.menuFilter]: "",
  });

  useEffect(() => { }, [name, typeHeader, typeFilter]);

  // Search form child to parent
  const handleSearch = (event) => {
    if (event.key === "Enter") {
      handleGetSearch(getValues("address"));
    }
  };

  // show drawer component
  const toggleDrawer = (statusState) => {
    setState(statusState);
  };

  return (
    <>
      <DrawerSideBar toggleDrawer={toggleDrawer} state={state} />
      <Box component={"div"} className={classes.HeaderContent}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <IconButton
              sx={{ color: "#333" }}
              onClick={() => {
                let routeObj;
                if (linkToBack && linkToBack.path) {
                  routeObj = JSON.parse(localStorage.getItem('productType'))
                }
                navigate(routeObj?.path || '/', { state: { productType: routeObj } });
              }}
            >
              <ArrowBackIosIcon sx={{ fontSize: "1.2rem" }} />
            </IconButton>

            {typeHeader === HeaderType.hasLocation && (
              <Box>
                <Typography
                  sx={{
                    fontSize: "14px",
                  }}
                >
                  Giao đến:
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    left: "-5px",
                  }}
                >
                  <LocationOnIcon sx={{ color: "#3498db" }} />
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontWeight: "700",
                    }}
                  >
                    123 Nguyễn Cư Trinh
                  </Typography>
                </Box>
              </Box>
            )}

            {typeHeader === HeaderType.noLocation && (
              <Box>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "700",
                  }}
                >
                  {name}
                </Typography>
              </Box>
            )}
          </Box>
          <IconButton
            onClick={() => {
              toggleDrawer(true);
            }}
            sx={{ width: 40, height: 40 }}
          >
            <MenuIcon sx={{ fontSize: "1.8rem", color: "#333" }} />
          </IconButton>
        </Box>

        {/* <Box sx={{ height: 15 }}></Box> */}

        {typeFilter === FilterType.search && (
          <>
            <Box className={classes.SearchContainer}>
              <TextFieldElement
                control={control}
                name="address"
                size="small"
                placeholder="Tìm kiếm..."
                className={classes.SearchAddress}
                onKeyPress={handleSearch}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ color: "#3498db" }} />,
                }}
              />
            </Box>
          </>
        )}

        {typeFilter === FilterType.filter && (
          <Box className={classes.FilterContainer}>
            {(headerFilters || []).map((item) => (
              <SelectForm
                key={item.id}
                label={item.lable}
                name={item.id}
                control={control}
                size="small"
                fontSize="14px"
                widthContainer="20%"
                options={item.options}
              />
            ))}
          </Box>
        )}
        {typeFilter === FilterType.searchHistory && (
          <Grid container spacing={1}>
            <Grid item xs={3}>
              <DatePickerElement
                control={control}
                label="Ngày order"
                name="dateOrder"
                size="small"
              ></DatePickerElement>
            </Grid>
            <Grid item xs={3}>
              <TextFieldElement
                label="Tên khách hàng"
                name="customer_name"
                control={control}
                size="small"
              ></TextFieldElement>
            </Grid>
            <Grid item xs={3}>
              <TextFieldElement
                label="Số điện thoại đặt hàng"
                name="customer_phone"
                control={control}
                size="small"
              ></TextFieldElement>
            </Grid>
            <Grid item xs={3}>
              <NumbericElement
                label="Giá tiền"
                name="money"
                control={control}
                size="small"
              ></NumbericElement>
            </Grid>
            <Grid item xs={12}>
              <TextFieldElement
                label="Địa chỉ giao hàng"
                name="address_shipping"
                control={control}
                size="small"
              ></TextFieldElement>
            </Grid>
          </Grid>
        )}
        {typeFilter === FilterType.searchStatusOrder && (
          <Grid container spacing={1}>
            <Grid item xs={8}>
              <Box className={classes.SearchContainer}>
                <TextFieldElement
                  control={control}
                  name="address"
                  size="small"
                  placeholder="Tìm kiếm..."
                  className={classes.SearchAddress}
                  onKeyPress={handleSearch}
                  InputProps={{
                    startAdornment: <SearchIcon sx={{ color: "#3498db" }} />,
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={4}>
              <SelectForm
                label="Trạng thái đơn hàng"
                name="status_order"
                control={control}
                size="small"
                options={[
                  { value: "CXN", label: "Chờ xát nhận" },
                  { value: "DANGGIAO", label: "Đang giao" },
                  { value: "DAGIAO", label: "Đã giao" },
                ]}
              ></SelectForm>
            </Grid>
          </Grid>
        )}
      </Box>
    </>
  );
}
