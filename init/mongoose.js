import mongoose from 'mongoose';
import '../app/models';
import settings from '../settings/settings';

mongoose.Promise = global.Promise;
settings.isEnvTest ? null : mongoose.set('debug', true);

export const connectDb = async () => {
  await mongoose.connect(settings.dbUrl, {
    useMongoClient: true,
    server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
  });
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
export const News = mongoose.model('news');
export const Video = mongoose.model('videos');
export const Ticker = mongoose.model('tickers');
export const Portfolio = mongoose.model('portfolios');
export const Hot = mongoose.model('hot');

export default mongoose;
