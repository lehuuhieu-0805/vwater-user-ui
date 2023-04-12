import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import SelectForm from "../../components/Form/SelectElement/SelectForm";
import { Grid } from "@mui/material";
import TextFieldElement from "../../components/Form/TextFieldElement";
import DialogCustom from "../../components/Dialog";
import { useAuthService } from "../../context/AuthenServiceContext";
import { authenService } from "../../services/AuthenService";
import { toast } from 'react-toastify';
import { AuthConsumer } from "../../context/AuthContext";
import Loading from '../../components/Loading/Loading';
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
const AuthenDialog = () => {
  const { token, setVwaterInfo } = AuthConsumer();
  const { visible, handleSetVisible } = useAuthService();
  const [changeAreas, setChangeAreas] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(() => ({
    area: [],
    apartment: [],
    building: [],
    deliveryType: [],
  }));
  const [area, setArea] = useState([]);
  const schema = Yup.object().shape({
    phoneNumber: Yup.string()
      .required("Số điện thoại không được để trống")
      .max(10, "Số điên thoại tối đa 10 kí tự")
      .matches(/(0[3|5|7|8|9])+([0-9]{8})\b/, "Số điện thoại không hợp lệ"),
  });
  const fromContext = useForm({
    defaultValues: {
      area: "",
      apartment: "",
      building: "",
      deliveryType: "",
      customerName: "",
      phoneNumber: "",
    },
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const { handleSubmit, watch, getValues, setValue, control, formState:{errors} } = fromContext;
 console.log(errors);
  const handleOnSubmit = handleSubmit(async (data) => {
    if (checkDataChange(data)) {
      toast.warning("Thông tin không thay đổi");
      handleSetVisible(false);
      return;
    }

    setLoading(true);

    const customerPayload = {
      FullName: data.customerName,
      PhoneNumber: data.phoneNumber,
    };
    const customer = (await authenService.saveCustomer(customerPayload))
      .customer;

    if (customer?.Id) {
      const deliveryAddress = {
        CustomerId: customer.Id,
        Address: `${getData(data.area, "name")} - ${getData(
          data.apartment,
          "name"
        )} - ${getData(data.building, "name")}`,
        BuildingId: getData(data.building, "id"),
        DeliveryTypeId: getData(data.deliveryType, "id"),
      };
      authenService.saveDeliveryAddress(deliveryAddress).then(
        (response) => {
          const model = {
            area: data.area,
            apartment: data.apartment,
            building: data.building,
            deliveryType: data.deliveryType,
            customerName: customer.FullName,
            phoneNumber: customer.PhoneNumber,
            deliveryAddressId: response?.Id,
            customerId: customer.Id,
            address: response?.Address,
          };
          setVwaterInfo(model);
          setLoading(false);
          handleSetVisible(false);
          toast.success("Bạn đã hoàn thành điền thông tin");
          clearFormData();
        },
        (error) => {
          setLoading(false);
          toast.error("Đã có lỗi xảy ra!!!");
          console.log(error);
        }
      );
    }
  });

  const checkDataChange = (data) => {
    return (
      data &&
      token &&
      data.area == token.area &&
      data.apartment == token.apartment &&
      data.building == token.building &&
      data.deliveryType == token.deliveryType &&
      data.customerName == token.customerName &&
      data.phoneNumber == token.phoneNumber
    );
  };

  const hanldeClose = () => {
    clearFormData();
    handleSetVisible(false);
  };

  const handleConfirmation = (state) => {
    if (state) {
      if (
        !getValues("area") ||
        !getValues("apartment") ||
        !getValues("building") ||
        !getValues("deliveryType") ||
        !getValues("customerName") ||
        !getValues("phoneNumber")
      ) {
        toast.error("Vui lòng điền đầy đủ thông tin!!!");
      } else {
        handleOnSubmit();
      }
    } else {
      handleSetVisible(false);
      clearFormData();
    }
  };

  const clearFormData = () => {
    setValue("area", "");
    setValue("apartment", "");
    setValue("building", "");
    setValue("deliveryType", "");
    setValue("customerName", "");
    setValue("phoneNumber", "");
  };

  const getAreas = () => {
    setLoading(true);
    authenService.getAreas().then(
      (data) => {
        const areas = data.map((item) => {
          return {
            value: `${item.Id}-${item.AreaName}`,
            label: item.AreaName,
          };
        });
        setFormData((prev) => ({ ...prev, area: areas }));
        setArea(data);
        setLoading(false);
      },
      (error) => {
        setLoading(false);
        toast.error("Đã có lỗi xảy ra!!!");
        console.log(error);
      }
    );
  };

  const getDeliveryTypes = () => {
    setLoading(true);
    authenService.getDeliveryTypes().then(
      (data) => {
        const deliveryType = data.map((item) => {
          return {
            value: `${item.Id}-${item.TypeName}`,
            label: item.TypeName,
          };
        });
        setFormData((prev) => ({ ...prev, deliveryType: deliveryType }));
        setLoading(false);
      },
      (error) => {
        setLoading(false);
        toast.error("Đã có lỗi xảy ra!!!");
        console.log(error);
      }
    );
  };

  const getDeliveryTypeById = (id) => {
    setLoading(true);
    authenService.getDeliveryTypeById(id).then(
      (data) => {
        setValue("deliveryType", `${data.Id}-${data.TypeName}`);
        setLoading(false);
      },
      (error) => {
        setLoading(false);
        toast.error("Đã có lỗi xảy ra!!!");
        console.log(error);
      }
    );
  };

  const getApartmentsByArea = (areaId, apartmentId = "") => {
    const areaFound = area.find((item) => item.Id == areaId);
    const apartment = areaFound?.Apartments?.map((item) => {
      if (apartmentId == item.Id) {
        setValue("apartment", `${item.Id}-${item.ApartmentName}`);
      }
      return {
        value: `${item.Id}-${item.ApartmentName}`,
        label: item.ApartmentName,
      };
    });
    setFormData((prev) => ({
      ...prev,
      apartment: apartment,
    }));
  };

  const getBuidingsByApartment = (apartmentId, buidingId = "") => {
    setLoading(true);
    authenService.getApartmmentById(apartmentId).then(
      (data) => {
        const building = data?.Buildings?.map((item) => {
          if (buidingId == item.Id) {
            setValue("building", `${item.Id}-${item.BuildingName}`);
          }
          return {
            value: `${item.Id}-${item.BuildingName}`,
            label: item.BuildingName,
          };
        });
        setFormData((prev) => ({ ...prev, building: building }));
        setLoading(false);
      },
      (error) => {
        setLoading(false);
        toast.error("Đã có lỗi xảy ra!!!");
        console.log(error);
      }
    );
  };

  const getInitialArea = (areaId) => {
    if (area.length && areaId) {
      const areaObj = area.find((a) => a.Id == areaId);
      if (areaObj) {
        setValue("area", `${areaObj.Id}-${areaObj.AreaName}`);
      }
    }
  };

  const getInitialApartment = (apartmentId) => {
    if (apartmentId) {
      getApartmentsByArea(getData(token.area, "id"), apartmentId);
    }
  };

  const getInitialBuidling = (buidingId) => {
    if (buidingId) {
      getBuidingsByApartment(getData(token.apartment, "id"), buidingId);
    }
  };

  const getData = (data, getIdOrName) => {
    const strs = data?.split("-");
    if (strs?.length) {
      const getId = getIdOrName.toLowerCase() === "id" && strs[0];
      const getName = getIdOrName.toLowerCase() === "name" && strs[1];
      return getId || getName || "";
    }
    return "";
  };

  useEffect(() => {
    if (visible) {
      getAreas();
      getDeliveryTypes();
    }
  }, [visible]);

  useEffect(() => {
    if (visible) {
      if (!changeAreas) {
        setValue("apartment", "");
      }
      getApartmentsByArea(getData(getValues("area"), "id"));
      setChangeAreas(false);
    }
  }, [watch("area")]);

  useEffect(() => {
    if (visible) {
      if (!changeAreas) {
        setValue("building", "");
      }
      getBuidingsByApartment(getData(getValues("apartment"), "id"));
      setChangeAreas(false);
    }
  }, [watch("apartment")]);

  useEffect(() => {
    if (token && token.area && token.deliveryAddressId) {
      getDeliveryTypeById(getData(token.deliveryType, "id"));
      getInitialArea(getData(token.area, "id"));
      getInitialApartment(getData(token.apartment, "id"));
      getInitialBuidling(getData(token.building, "id"));
      setValue("customerName", token.customerName);
      setValue("phoneNumber", token.phoneNumber);
    }
    setChangeAreas(true);
  }, [area]);

  const customDialogContent = (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <SelectForm
              control={control}
              name="area"
              size="small"
              label="Khu vực"
              options={formData?.area}
            />
          </Grid>
          <Grid item xs={12}>
            <SelectForm
              control={control}
              name="apartment"
              size="small"
              label="Cụm tòa nhà"
              options={formData?.apartment}
            />
          </Grid>
          <Grid item xs={12}>
            <SelectForm
              control={control}
              name="building"
              size="small"
              label="Building (Tòa nhà)"
              options={formData?.building}
            />
          </Grid>
          <Grid item xs={12}>
            <SelectForm
              control={control}
              name="deliveryType"
              size="small"
              label="Loại hình"
              options={formData?.deliveryType}
            />
          </Grid>
          <Grid item xs={12}>
            <TextFieldElement
              control={control}
              name="customerName"
              size="small"
              label="Tên người nhận"
            />
          </Grid>
          <Grid item xs={12}>
            <TextFieldElement
              control={control}
              name="phoneNumber"
              size="small"
              label="Số điện thoại người nhận"
            />
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );

  return (
    <>
      <Loading isLoading={loading} />
      <DialogCustom
        visible={visible}
        modal={true}
        isCloseIcon={true}
        isDialogFooter={true}
        onClose={hanldeClose}
        onConfirmed={handleConfirmation}
        headerContent="Nơi nhận"
        isCustomContent={true}
        bodyContent={customDialogContent}
      />
    </>
  );
};

export default AuthenDialog;