"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarCampos = void 0;
const express_validator_1 = require("express-validator");
const validarCampos = (req, res, next) => {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json(errors);
    next();
};
exports.validarCampos = validarCampos;
module.exports = {
    validarCampos: exports.validarCampos
};
//# sourceMappingURL=validar-campos.js.map