const {urlData} = require("../helper/Helper")

exports.productTransformer = (data) => {
    return {
        status:data?.status ? data.status : 0,
        productId: data?._id ? data._id: "",
        categoryId: data?.categoryId ? data.categoryId: "",
        productName: data?.productName ? data.productName : "",
        productDescription: data?.productDescription ? data.productDescription : "",
        price: data?.price ? data.price : 0,
        stock: data?.stock ? data.stock : 0,
        productImage:data?.productImage?urlData(data.productImage,'product'):"",
    };
};

exports.listProductTransformer = (arrayData) => {
    let data = [];

    if (arrayData && arrayData.length > 0) {
        arrayData.forEach((a) => {
            data.push(this.productTransformer(a));
        });
    }
    arrayData = data;
    return arrayData;
};


exports.productTransformDetails = (arrayData) => {
    let addressData = null;

    if (arrayData) {
        addressData = this.productTransformer(arrayData);
    }
    return addressData;
};

