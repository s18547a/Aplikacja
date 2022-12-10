import sql from 'mssql';
import User from '../classes/User';
import Repository from './Repository';

class UserRepository extends Repository{

    constructor(db){
        super(db);
    }

    getUserByEmail = async (Email: string) => {
        try {
            const pool = await sql.connect(this.databaseConfiguration);
            const userPool = await pool
                .request()
                .input('Email', sql.VarChar, Email)
                .query('Select * From [User] Where Email=@Email');
    
            if (userPool.recordset.length == 0) {
                return null;
            }
    
            const userRecordset = userPool.recordset[0];
    
            return new User(
                userRecordset.UserId,
                userRecordset.Email,
                userRecordset.Password,
                userRecordset.OwnerId,
                userRecordset.VetId,
                userRecordset.Manager
            );
        } catch (error) {
            console.log(error);
            return error;
        }
    };
    

}

export default UserRepository;
