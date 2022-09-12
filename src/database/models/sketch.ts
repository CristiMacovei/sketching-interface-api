import { DataTypes, Model, Optional } from 'sequelize';

import { sequelize } from '../connection';

interface SketchAttributes {
  id: number;
  json: string;

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface SketchInput extends Optional<SketchAttributes, 'id'> {
  ownerId: number;
}
export interface SketchOutput extends Required<SketchAttributes> {}

class Sketch
  extends Model<SketchAttributes, SketchInput>
  implements SketchAttributes
{
  public id!: number;
  public json!: string;
  public ownerId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Sketch.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    json: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize: sequelize,
    paranoid: true,
    timestamps: true
  }
);

export default Sketch;
