import './app/models';
import mongoose from 'mongoose';
import settings from './settings';

mongoose.Promise = global.Promise;
settings.isEnvTest ? null : mongoose.set('debug', true);

export const connectDb = async () => {
  await mongoose.connect(settings.dbUrl, { useMongoClient: true });
}

export const dropDb = async () => {
  await mongoose.connection.db.dropDatabase();
}

export const closeDb = async () => {
  await mongoose.connection.close;
}

export const User = mongoose.model('users');
export const Ico = mongoose.model('icoes');
export const Article = mongoose.model('articles');

export default mongoose;
