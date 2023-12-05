'use strict';
import {
  Model
}  from 'sequelize';
interface UserAttributes{
uniqueid:string;
purchaseapp:boolean;
playlable:number;
}
module.exports = (sequelize:any, DataTypes:any) => {
  class  User extends Model<UserAttributes>
  implements UserAttributes {
    uniqueid!:string;
    purchaseapp!:boolean;
    playlable!:number;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    uniqueid:{type:DataTypes.STRING},
    playlable: {type:DataTypes.INTEGER},
    purchaseapp: {type:DataTypes.BOOLEAN,defaultValue:0},
 
  }, {
    sequelize,
    modelName: 'Users',
  });
  return  User;
};
