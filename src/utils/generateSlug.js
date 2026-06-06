const generateSlug = (text) => {

    return text
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-");
};

export default generateSlug;