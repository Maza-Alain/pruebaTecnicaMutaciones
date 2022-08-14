import { QueryTypes } from "sequelize";
import { dbPostgres } from "../configs/connection";
import RegistroMutationsModel from "../models/MutationsModel";

export default class MutationsService {
    // query para postear un registro
    static async postRegistro(registro: {dna: JSON, is_mutation: boolean}) {
        return await RegistroMutationsModel.create(registro)
    }
    // qery para contar las mutaciones, recibe el aprametro alias que renombra dependiendo si es o no mutacion
    // y el parametro state para determinar si traeremos los mutados o no
    static async getStats(alias: string, state: string) {
        return await dbPostgres.query(`
        select
        count(is_mutation) as ${alias}
        from
        public.mutation
        where
        is_mutation = ${state}
        `, {
            type: QueryTypes.SELECT,
            plain: true
        })
    }
}