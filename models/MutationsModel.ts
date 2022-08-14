import {DataTypes} from "sequelize";
import { dbPostgres } from "../configs/connection";

const RegistroMutationsModel = dbPostgres.define('mutation', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    dna: {
        type: DataTypes.JSON,
    },
    is_mutation: {
        type: DataTypes.BOOLEAN
    },
}, {
    tableName: "mutation",
    freezeTableName: true,
    schema: "public",
    timestamps: false
});
export default RegistroMutationsModel;
