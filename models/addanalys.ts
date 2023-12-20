'use strict';
import {
  Model
}  from 'sequelize';
interface UserAttributes{
userid:number;
show:number;
click:number;
}
module.exports = (sequelize:any, DataTypes:any) => {
  class  addlis extends Model<UserAttributes>
  implements UserAttributes {
    userid!:number;
    show!:number;
    click!:number;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  addlis.init({                                                           
    userid:{type:DataTypes.INTEGER,},
    show: {type:DataTypes.INTEGER},
    click:{type:DataTypes.INTEGER},
 
  }, {
    sequelize,
    modelName: 'Add',
  });
  
  return  addlis;
};
