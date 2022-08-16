const { DataTypes } = require('sequelize');  // Guardamos en DataTypes los tipos de datos que requerimos de sequelize

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // Models are defined with sequelize.define('name', {attributes}, {options})
    // Defino el modelo
    sequelize.define('Activity', {
        id: {
            type: DataTypes.UUID,  // UUID stands for Universally Unique IDentifier. UUID is defined based on RFC 4122, “a Universally Unique Identifier (UUID) URN Namespace). UUID is designed as a number that is unique globally in space and time. Two UUID values are expected to be distinct, even they are generated on two independent servers.
            defaultValue: DataTypes.UUIDV4,  // The default value of a column is NULL. This behavior can be changed by passing a specific defaultValue to the column definition:. (UUIDV4 || UUIDV1) A default unique universal identifier generated following the UUID v4 standard
            primaryKey: true,  // A combination of a NOT NULL and UNIQUE. Uniquely identifies each row in a table. Only one per table
        },
        name: {
        type: DataTypes.STRING,  // // A variable length string. Default length 255
        allowNull: false,  // Ensures that a column cannot have a NULL value
        },
        difficulty: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: null,
            validate: {
                min: 1,
                max: 5
            }
        },
        duration: {
            type: DataTypes.INTEGER,
        },
        season: {
            type: DataTypes.ENUM("Summer", "Autumn", "Winter", "Spring")
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