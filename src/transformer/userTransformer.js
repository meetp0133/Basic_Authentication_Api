const {urlData} = require("../helper/Helper")

exports.transformer = (data) => {
    return {
        status: data?.status ? data.status : 0,
        userId: data?._id ? data._id : "",
        profileImage: data?.profileImage ? urlData(data.profileImage,"user") : "",
        Name: data?.name ? data.name : "",
        Email: data?.email ? data.email : "",
        Password: data?.password ? data.password : "",
        Phone: data?.phone ? data.phone : "",
        Gender: data?.gender ? data.gender : "",

    };
};
exports.userTransformer = (arrayData) => {
    let addressData = null;

    if (arrayData) {
        addressData = this.transformer(arrayData);
    }
    return addressData;
};

exports.signtransformer = (data) => {
    return {
        status: data?.status ? data.status : 0,
        userId: data?._id ? data._id : "",
        Name: data?.name ? data.name : "",
        Email: data?.email ? data.email : "",
        Phone: data?.phone ? data.phone : "",
        Gender: data?.gender ? data.gender : "",
        profileImage: data?.profileImage ? urlData(data.profileImage,"user") : "",

    };
};
exports.signInTransformer = (arrayData) => {
    let addressData = null;

    if (arrayData) {
        addressData = this.signtransformer(arrayData);
    }
    return addressData;
};

