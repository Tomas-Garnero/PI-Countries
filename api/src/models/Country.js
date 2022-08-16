const { DataTypes } = require('sequelize');  // Guardamos en DataTypes los tipos de datos que requerimos de sequelize

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // Models are defined with sequelize.define('name', {attributes}, {options})
  // Defino el modelo
  sequelize.define('Country', {
    id: {
      type: DataTypes.CHAR(3),  // A FIXED length string (can contain letters, numbers, and special characters). The size parameter specifies the column length in characters - can be from 0 to 255. Default is 1
      allowNull: false,  // Ensures that a column cannot have a NULL value
      unique: true,  // Ensures that all values in a column are different. Can have many per table
      primaryKey: true,  // A combination of a NOT NULL and UNIQUE. Uniquely identifies each row in a table. Only one per table
    },
    name: {
      type: DataTypes.STRING,  // A variable length string. Default length 255
      allowNull: false,
      validate: {  // Data validation is the method for checking the accuracy and quality of data.  It is often performed prior to adding, updating, or processing data. Model validators allow you to specify format/content/inheritance validations for each attribute of the model.
        notNull: {  // Won't allow null
          msg: "Please enter a Country"  // Custom error message
        }
      },
    },
    flag_img: {
      type: DataTypes.STRING, 
      allowNull: false,
      validate: {
        msg: "Please enter a Flag"
      }
    },   
    continent: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        msg: "Please enter a Continent"
      }
    },
    capital: {
      type: DataTypes.STRING,
      validate: {
        msg: "Please enter a Capital"
      }
    },
    subregion: {
      type: DataTypes.STRING,
      defaultValue: "Other"  // The default value of a column is NULL. This behavior can be changed by passing a specific defaultValue to the column definition
    },
    area: {
      type: DataTypes.INTEGER,  // Equal to INT(size)
      validate: {
        min: 0,  // Only allow values >= 23
      }
    },
    population: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0
      }
    }
  }, {
    timestamps: false,  // don't add the timestamp attributes (updatedAt, createdAt)
    freezeTableName: true  // disable the modification of table names (into plural)
  });
};


// En las tablas es muy comun usar este modelo de id:
// id: {
//   type: DataTypes.UUID,
//   defaultValue: DataTypes.UUIDV4,
//   primaryKey: true 
// },