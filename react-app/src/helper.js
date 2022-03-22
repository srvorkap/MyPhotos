export const formatError = error => {
    const startIndex = error.indexOf(":") + 1;
    return error.slice(startIndex);
};

export const defaultImage = 'https://www.makdigitaldesign.com/wp-content/uploads/2018/02/shutterstock_325494917-5a68d8403418c600190a3e1f.jpg'
