"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarios_1 = require("../controllers/usuarios");
const express_validator_1 = require("express-validator");
const validar_campos_1 = require("../middlewares/validar-campos");
const db_validators_1 = require("../helpers/db-validators");
const router = express_1.Router();
router.get('/', usuarios_1.getUsuarios);
router.get('/:id', usuarios_1.getUsuario);
router.put('/:id', usuarios_1.usuariosPut);
router.post('/', [
    express_validator_1.check('email', 'El correo no es valido').isEmail().custom(db_validators_1.existeEmail),
    express_validator_1.check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    express_validator_1.check('password', 'El password debe ser de más de 6 letras').isLength({ min: 6 }),
    // check('rol','No es un rol valido').isIn(['USER_ROL', 'ADMIN_ROL']),
    express_validator_1.check('rol').custom(db_validators_1.esRolValido),
    validar_campos_1.validarCampos
], usuarios_1.postUsuario);
exports.default = router;
//# sourceMappingURL=usuarios.js.map