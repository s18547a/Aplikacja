const UserRepository = require('../repositories/UserRepository');
import config from '../auth/key';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');



interface dataType {
  userId: string;
  userType: UserType|null;
  userTypeId: string;
  isManager: boolean;
  token: string;
  Email: string;
}
enum UserType {
  Owner,
  Vet,
}


export const login=async (req, res) => {
    const Email: string = req.body.Email;
    const Password: string = req.body.Password;

    const user = await UserRepository.getUserByEmail(Email);
    console.log(user);

    if (user == null) {
        return res.status(404).json({ message: 'User not found' });
    } else if (user instanceof Error) {
        res.status(500).json({ message: 'Database error' });
    } else {
        let userType: UserType | null = null;
        let userTypeId = '';

        if (user.OwnerId != null) {
            userType = UserType.Owner;
            userTypeId = user.OwnerId;
        } else if (user.VetId != null) {
            userType = UserType.Vet;
            userTypeId = user.VetId;
            if (user.Manager == null) {
                user.Manager = false;
            }
        }

        if(userType!=null){
            bcrypt.compare(Password,user.Password).then(
                isEqual=>{
                    if(!isEqual){
                        return res.status(401).json({message:'password'});
                    }else{
                        const token=jwt.sign({
                            Email:user.Email,
                            UserId:user.UserId
                        },config.secret,{expiresIn:'10h'});
                         
                        const data: dataType = {
                            userId: user.UserId,
                            userType: userType,
                            userTypeId: userTypeId,
                            isManager: user.Manager,
                            Email: user.Email,
                            token: token,
                        };
                        return  res.status(200).json(data); 
                    }
                }
            ).catch(err=>{
                console.log(err);
                return res.status(500).json({});
            });

        }
  
    }
  
};
