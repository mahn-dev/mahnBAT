import * as ProductService from '~/services/ProductService';

export const search = async (search) => {
    try {
        const res = await ProductService.getAllProduct(search);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
