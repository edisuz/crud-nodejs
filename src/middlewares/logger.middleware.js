const logger = (req, res, next) => {

    console.log("================================");
    console.log(`${req.method} ${req.url}`);
    console.log("Fecha:", new Date().toLocaleString());
    console.log("================================");

    next();

}

export default logger;