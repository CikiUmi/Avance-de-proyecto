/* Fragmento de código extraído de MongoAtlas */
const mongoose = require('mongoose');

const connectDB = async () => { /* nombre de función */
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    /* Conexión a MongoDB usando variable de .env */

    await mongoose.connect(process.env.MONGO_URI); /* obtenido de MongoAtlas */
    console.log("¡Conexión exitosa a MongoDB!");
  } catch (error) {
    // Por si algo ocurre
    console.error('Error al conectar a MongoDB:', error.message);
    process.exit(1); /* Cierra si hay algo mal */
  }
};

module.exports = { connectDB }; /* Para poder importarla en otros lugare */