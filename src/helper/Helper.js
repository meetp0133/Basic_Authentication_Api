capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

exports.validationMessageKey = (apikey, error) => {
    let type = error.details[0].type
    let key = error.details[0].context.key
    type = type.split(".")
    type = capitalizeFirstLetter(type[1])
    type = (type == "Empty") ? "Required" : type
    key = capitalizeFirstLetter(key)
    const result = apikey + type + key
    return result
}
