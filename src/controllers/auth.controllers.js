export const login = async (req, res) => {

    const user = req.user;

    return res.status(200).json({

        ok: true,
        message: "Inicio de sesión exitoso.",

        user: {

            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role

        }

    });

}

