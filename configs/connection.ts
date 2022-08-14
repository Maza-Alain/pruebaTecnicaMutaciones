import { Sequelize } from 'sequelize';
export const dbPostgres = new Sequelize(
    'registroMutaciones',
    'alainMaza',
    'jorge12345bd',
    {
        host: 'pruebatecnicadna.cn5mk0ph2tob.us-east-1.rds.amazonaws.com',
        dialect: 'postgres',
        timezone: 'America/Mexico_City'
    }

);