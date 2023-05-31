'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Employer, { foreignKey: 'employerId' })
      this.belongsTo(models.Category, { foreignKey: 'categoryId' })
      this.hasMany(models.JobList, { foreignKey: 'jobId' })
      this.hasMany(models.JobContract, { foreignKey: 'jobId' })
      this.hasMany(models.Schedule, { foreignKey: 'jobId' })
    }
  }
  Job.init({
    title: DataTypes.STRING,
    employerId: DataTypes.INTEGER,
    location: DataTypes.STRING,
    salary: DataTypes.INTEGER,
    expireDate: DataTypes.DATE,
    status: DataTypes.STRING,
    totalHours: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    duration: DataTypes.INTEGER,
    hash: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Job',
  });
  return Job;
};