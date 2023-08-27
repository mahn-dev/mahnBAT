import { orderContant } from '~/contant';

export const isJsonString = (data) => {
    try {
        JSON.parse(data);
    } catch (error) {
        return false;
    }
    return true;
};

export const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

export function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}
export const renderOptions = (arr) => {
    let results = [];
    if (arr) {
        results = arr?.map((opt) => {
            return {
                value: opt,
                label: opt,
            };
        });
    }
    results.push({
        label: 'Thêm type',
        value: 'add-type',
    });
    return results;
};

const formatter = new Intl.NumberFormat({
    style: 'decimal',
});

export const convertPrice = (price) => {
    try {
        const result = formatter.format(price);
        return `${result} ₫`;
    } catch (error) {
        return null;
    }
};
export const convertChartData = (data, type) => {
    try {
        const object = {};
        Array.isArray(data) &&
            data.forEach((option) => {
                if (!object[option[type]]) {
                    object[option[type]] = 1;
                } else {
                    object[option[type]] += 1;
                }
            });
        const results =
            Array.isArray(Object.keys(object)) &&
            Object.keys(object).map((item) => {
                return {
                    name: orderContant.payment[item],
                    value: object[item],
                };
            });
        return results;
    } catch (e) {
        return [];
    }
};
