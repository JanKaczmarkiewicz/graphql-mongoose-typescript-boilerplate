import * as mongoose from "mongoose";

const createDatabaseConnection = (options: mongoose.ConnectionOptions = {}) => {
  mongoose.connection
    .on("error", console.error)
    .on("disconnected", createDatabaseConnection);

  return mongoose
    .connect(
      `mongodb://${process.env.DB_ADDRESS}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        ...options,
      }
    )
    .catch((err) => {
      throw new Error(err);
    });
};

export default createDatabaseConnection;
