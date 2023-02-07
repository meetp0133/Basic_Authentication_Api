exports.transformer = (data) => {
    return {
        status: data?.status ? data.status : 0,
        userId: data?._id ? data._id : "",
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

    };
};
exports.signInTransformer = (arrayData) => {
    let addressData = null;

    if (arrayData) {
        addressData = this.signtransformer(arrayData);
    }
    return addressData;
};

