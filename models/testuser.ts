'use strict';
import {
  Model
}  from 'sequelize';
interface UserAttributes{
name:string;
emailid:string;
password:string;
companyname:string;
adress:string
}
module.exports = (sequelize:any, DataTypes:any) => {
  class  testuser extends Model<UserAttributes>
  implements UserAttributes {
    name!:string;
emailid!:string;
password!:string;
companyname!:string;
adress!:string
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  testuser.init({
    name:{type:DataTypes.STRING},
    emailid: {type:DataTypes.STRING},
    password:{type:DataTypes.STRING},
    companyname: {type:DataTypes.STRING},
    adress:{type:DataTypes.STRING}
  }, {
    sequelize,
    modelName: 'TESTUSER',
  });
  return testuser ;
};
