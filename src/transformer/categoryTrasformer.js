const {urlData} = require("../helper/Helper")

exports.categoryTransformer = (data) => {
    return {
        status:data?.status ? data.status : 0,
        categoryId: data?._id ? data._id: "",
        categoryName: data?.categoryName ? data.categoryName : "",
        categoryDescription: data?.categoryDescription ? data.categoryDescription : "",
        categoryImage:data?.categoryImage?urlData(data.categoryImage,'category'):"",
    };
};


exports.listCategoryTransformer = (arrayData) => {
    let data = [];

    if (arrayData && arrayData.length > 0) {
        arrayData.forEach((a) => {
            data.push(this.categoryTransformer(a));
        });
    }
    arrayData = data;
    return arrayData;
};


exports.categoryTransformDetails = (arrayData) => {
    let addressData = null;

    if (arrayData) {
        addressData = this.categoryTransformer(arrayData);
    }
    return addressData;
};

