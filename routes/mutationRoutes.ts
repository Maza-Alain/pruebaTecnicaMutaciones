import {Router} from "express";
import {validarCampos} from "../middlewares/validar-campos";
import { hasMutation, statsController} from "../controllers/mutationController";
import { check } from "express-validator";
import { validDna } from "../helpers/validDna";

const router = Router();

router.post('/',[
    check('dna').custom( validDna ),
    validarCampos
] , hasMutation );

router.get('/stats', statsController );

export default router;
