'use strict';
import {
  Model
}  from 'sequelize';
interface UserAttributes{
email:string;
data:string;
orderId:string;
}
module.exports = (sequelize:any, DataTypes:any) => {
  class  checkOut extends Model<UserAttributes>
  implements UserAttributes {
    email!:string;
    data!:string;
    orderId!:string;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  checkOut.init({
    email:{type:DataTypes.STRING},
    data:{type:DataTypes.STRING},
    orderId:{type:DataTypes.STRING}
 
  }, {
    sequelize,
    modelName: 'CheckOut',
  });
  return  checkOut;
};
