class Helper {
    formatCurrency = (value) => {
        return new Intl.NumberFormat('vi-VN',
            {
                style: 'currency',
                currency: 'VND'
            })
            .format(value);
    }
}

export const HelperUtils = new Helper();