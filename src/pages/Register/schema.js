import * as yup from 'yup';

export const schema = yup.object().shape({
    phone: yup
        .string()
        .required('Số điện thoại không được để trống')
        .max(10, 'Số điên thoại tối đa 10 kí tự')
        .matches(/(0[3|5|7|8|9])+([0-9]{8})\b/, 'Số điện thoại không hợp lệ'),
    password: yup
        .string()
        .required('Mặt khẩu không được để trống')
        .min(6, 'Mặt khẩu không được ít hơn 6 kí tự'),
    passwordConfirmation: yup
        .string()
        .required('Xác nhận mặt khẩu không được để trống')
        .oneOf([yup.ref('password'), null], 'Xác nhận mặt khẩu không chính xác'),
})