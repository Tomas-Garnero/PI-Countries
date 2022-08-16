require('dotenv').config();
const { Sequelize } = require('sequelize');  // Requiero el modulo 
const fs = require('fs');
const path = require('path');
// const Countrys = require('./models/Country');  // Requiero la funcion que define el modelo de Country y lo guardo en la cost Counstrys
// const Activitys = require('./models/Activity');  // Requiero la funcion que define el modelo de Activity y lo guardo en la cost Counstrys
const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

// Creamos un objeto Sequelize pasandole como parametro un string que indica a que DB conectarse, con que usuario y que password. Estas VARIABLES DE ENTORNO vienen del archivo .env
const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/countries`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Country, Activity } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
Country.belongsToMany(Activity, {through: "CountryXActivity"});
Activity.belongsToMany(Country, {through: "CountryXActivity"});

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
  
};
