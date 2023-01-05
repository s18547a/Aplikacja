import Repository from './Repository';

export{};

const sql = require('mssql');

class SharedRepository extends Repository{

    constructor(db){
        super(db);
    }
    
    emailExists = async (Email: string)=> {
        try {
            const pool = await sql.connect(this.databaseConfiguration);
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


}

export default SharedRepository;
