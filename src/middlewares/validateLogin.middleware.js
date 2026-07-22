const validateLogin = (req, res, next) => {

    const { email, password } = req.body;

    if (!email || !password) {

        return res.status(400).json({
            ok: false,
            message: "Email y contraseña son obligatorios."
        });

    }

    next();

}

export default validateLogin;