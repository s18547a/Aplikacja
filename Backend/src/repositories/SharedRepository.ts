export{};
const config = require('../db/userConnection');
const sql = require('mssql');

exports.emailExists = async (Email: string) => {
    try {
        const pool = await sql.connect(config);
        const results = await pool
            .request()
            .input('Email', sql.VarChar, Email)
            .query('Select * From [User] Where Email=@Email');
        if (!results.recordset[0]) {
            return false;
        } else return true;
    } catch (error) {
        return error;
    }
};
