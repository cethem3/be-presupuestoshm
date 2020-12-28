exports.userSignupValidator = (req, res, next) => {
    req.check('rut', 'Rut debe ser de largo 9 a 10')
        .notEmpty()
        .withMessage("Rut es requerido")
        .isLength({ min: 10, max:11 })
        .custom(validaRut).withMessage("Rut no válido")
    
    req.check('nombre', "Nombre es requerido").notEmpty()

    req.check('email', "Debe ingresar un email válido")
        .isEmail()

    req.check('password', "Password es requerido")
        .isLength({ min: 6, })
        .withMessage("Password debe contener al menos 6 caracteres")
        .matches(/\d/)
        .withMessage("Password debe contener al menos 1 número")
        .matches(/[A-Z]/)
        .withMessage("Password debe contener mayúscula")
        .notEmpty()
    const errors = req.validationErrors()
    
    if(errors) {
        const firstError = errors.map(err => err.msg)[0]
        return res.status(400).json({error: firstError})
    }
    next()
}   


exports.rutValidator = (req, res, next) => {
    req.check('rut', 'Rut debe ser de largo 9 a 10')
        .notEmpty()
        .withMessage("Rut es requerido")
        .isLength({ min: 10, max:11 })
        .custom(validaRut).withMessage("Rut no válido")
    const errors = req.validationErrors()

    if(errors) {
        const firstError = errors.map(err => err.msg)[0]
        return res.status(400).json({error: firstError})
    }
    next()
}

const validaRut = (rut) => {
    let rutsplitted = rut.split('-');
    if(rutsplitted.length != 2)
        return false;
    let suma = Array.from(rutsplitted[0]).reverse().reduce((acc, cur, idx) => {
        return parseInt(acc) + parseInt(cur) * ((idx < 6) ? idx+2 : idx-4)
    }, 0)
    let dv = (11 - (suma - (Math.trunc(suma/11) * 11)))
    
    dv = (dv == 11) ? 0 : (dv == 10) ? 'K' : dv

    if(rutsplitted[1].toUpperCase()==dv)
        return true;
}