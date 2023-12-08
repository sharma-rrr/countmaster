'use strict';
import {
  Model
}  from 'sequelize';
interface UserAttributes{
email:string;
active:boolean;
password:string;
}
module.exports = (sequelize:any, DataTypes:any) => {
  class  Ausers extends Model<UserAttributes>
  implements UserAttributes {
    email!:string;
    active!:boolean;
    password!:string;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here`
    }
  };
  Ausers.init({
    email:{type:DataTypes.STRING},
    password: {type:DataTypes.STRING},
    active: {type:DataTypes.BOOLEAN,defaultValue:0},
 
  }, {
    sequelize,
    modelName: 'aUsers',
  });
  return  Ausers;
};
