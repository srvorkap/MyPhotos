export const formatError = error => {
    const startIndex = error.indexOf(":") + 1;
    return error.slice(startIndex);
};
