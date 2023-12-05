'use strict';
import {
  Model
}  from 'sequelize';
interface UserAttributes{
userid:number;
time:number;

}
module.exports = (sequelize:any, DataTypes:any) => {
  class  average extends Model<UserAttributes>
  implements UserAttributes {
    userid!:number;
    time!:number;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  average.init({
    userid:{type:DataTypes.INTEGER,},
    time: {type:DataTypes.INTEGER},
  
 
  }, {
    sequelize,
    modelName: 'Averagetime',
  });
  return  average;
};
