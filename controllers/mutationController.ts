import {Request, Response} from "express";
import MutationsService from "../services/MutationsService";

export const hasMutation = async (req:Request, res: Response) => {
    const { dna } = req.body;
    // console.log(dna);
    let isMutation = false;
    // se colocan un for anidado, puesto que haremos iteraciones sobre una matriz
    for (let i = 0; i < dna.length; i++) {
        for (let j = 0; j < dna[i].length; j++) {
            // console.log(dna[i]);
            // console.log(dna[i][j]);
            // el primer if sirve para validar que no nos salgamos de los limites de la matriz
            // ya que un if no puede tener undefined y al sumarle valores al index podriamos obtner uno
            if (dna[i+1] !== undefined &&
                dna[i+2] !== undefined &&
                dna[i+3] !== undefined &&
                dna[i+1][j+1] !== undefined &&
                dna[i+2][j+2] !== undefined &&
                dna[i+3][j+3] !== undefined){
                    // este segundo if es para verificar si existe la misma letra en diagonal hacia la derecha
                    // se realiza la comparacionde la linea en curso con su letra en curso con las de las 
                    // siguientes 3 lineas i y sus 3 siguientes posiciones j y asi sabremos si se forma una 
                    // diagonal de 4
                if(dna[i][j]===dna[i+1][j+1] &&
                   dna[i][j]===dna[i+2][j+2] &&
                   dna[i][j]===dna[i+3][j+3]){
                    // console.log('++');
                    isMutation = true;
                    // se coloca break puesto que con que se cumpla una de las condiciones basta para declarar
                    // la entrada como mutacion, por lo que no tiene caso continuar con las iteraciones
                    break;
                   }
            }

            // el primer if sirve para validar que no nos salgamos de los limites de la matriz como se explicó
            if (dna[i+1] !== undefined &&
                dna[i+2] !== undefined &&
                dna[i+3] !== undefined &&
                dna[i+1][j-1] !== undefined &&
                dna[i+2][j-2] !== undefined &&
                dna[i+3][j-3] !== undefined){
                    // este segundo if es para verificar si existe la misma letra en diagonal hacia la izquierda
                    // se realiza la comparacionde la linea en curso con su letra en curso con las de las 
                    // siguientes 3 lineas i y sus 3 anteriores posiciones j y asi sabremos si se forma una 
                    // diagonal de 4
                if(dna[i][j]===dna[i+1][j-1] &&
                   dna[i][j]===dna[i+2][j-2] &&
                   dna[i][j]===dna[i+3][j-3]){
                    // console.log('--')
                    isMutation = true;
                    break;
                }
            }
            // nuevamente nos cercioramos de no arrevasar los limites de la matriz
            if (dna[i+1] !== undefined &&
                dna[i+2] !== undefined &&
                dna[i+3] !== undefined ){
                    // comparamos respecto a la linea i y letra j actual con sus 3 seguientes lineas en la misma
                    // posicion j y asi sabremos si tiene una secuencia vertical 
                if (dna[i][j] === dna[i+1][j] &&
                    dna[i][j] === dna[i+2][j] &&
                    dna[i][j] === dna[i+3][j] ){
                        // console.log('||');
                        isMutation = true;
                        break;
                }
            }
            // nuevamente nos cercioramos de no arrevasar los limites de la matriz
            if (dna[i][j+1] !== undefined &&
                dna[i][j+2] !== undefined &&
                dna[i][j+3] !== undefined ){
                    // comparamos respecto a la linea i y letra j actual, en su misma linea, pero con las 3
                    // siguientes posicion j y asi sabremos si tiene una secuencia horizontal 
                if (dna[i][j] === dna[i][j+1] &&
                    dna[i][j] === dna[i][j+2] &&
                    dna[i][j] === dna[i][j+3] ){
                        // console.log('_ _');
                        isMutation = true;
                        break;
                }
            }
        }        
    }
    // se postea el registro en la base
    const registro = { dna, is_mutation: isMutation };
    await MutationsService.postRegistro(registro);
    // si mutacion es true devolvera un status 200 y si no un 403
    return res.status(isMutation ? 200 : 403).send();
}

export const statsController = async (req:Request, res: Response) => {
    // se traen los qeries que cuentan cantos mutados y no mutados hay
    const mutations: { mutations: string }| null | any = await MutationsService.getStats('mutations', 'true');
    const no_mutations: { no_mutation: string }| null | any = await MutationsService.getStats('no_mutation', 'false');
    // validacion
    if(mutations && no_mutations){
        // se asignan los valores a variables para mejorar la sintaxis
        const count_mutations = +mutations.mutations;
        const count_no_mutation = +no_mutations.no_mutation;
        // se obtiene el ratio
        const ratio = count_no_mutation / count_mutations;
        const stats: any = {
            count_mutations,
            count_no_mutation,
            ratio
        }
        // console.log(stats);
        return res.status(200).send(stats);
    }
    return res.status(500).send();
}