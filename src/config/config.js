let config;

if (process.env.NODE_ENV === "production") {
    config = {
        baseUrl: '/vueScanAgent'
    };
} else {
    config = {
        baseUrl: '/'
    };
}

export { config }
