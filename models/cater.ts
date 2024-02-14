'use strict';
import {
  Model
}  from 'sequelize';
interface UserAttributes{
idCompo:string;
idDensity:string;
idYarnCount:string;
idWT:string;
IdWidth:string;
idUpdatepx:string;
idSittingSampleWithColors:string;
inputDte:string;
Location1:string;
Location2:string;
Remarks:string;



}
module.exports = (sequelize:any, DataTypes:any) => {
  class  cater extends Model<UserAttributes>
  implements UserAttributes {
    idCompo!:string;
    idDensity!:string;
    idYarnCount!:string;
    idWT!:string;
    IdWidth!:string;
    idUpdatepx!:string;
    idSittingSampleWithColors!:string;
    inputDte!:string;
    Location1!:string;
    Location2!:string;
    Remarks!:string;
    
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  cater.init({
    idCompo:{type:DataTypes.STRING},
    idDensity:{type:DataTypes.STRING},
    idYarnCount:{type:DataTypes.STRING},
    idWT:{type:DataTypes.STRING},
    IdWidth:{type:DataTypes.STRING},
    idUpdatepx:{type:DataTypes.STRING},
    idSittingSampleWithColors:{type:DataTypes.STRING},
    inputDte:{type:DataTypes.STRING},
    Location1:{type:DataTypes.STRING},
    Location2:{type:DataTypes.STRING},
    Remarks:{type:DataTypes.STRING},
 
  }, {
    sequelize,
    modelName: 'CATERS',
  });
  return  cater;
};
