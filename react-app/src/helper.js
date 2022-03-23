export const formatError = error => {
    const startIndex = error.indexOf(":") + 1;
    return error.slice(startIndex);
};

// export const defaultImage = 'https://www.al-burraq.com/blogs/wp-content/uploads/2018/10/404-error.png'
