const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config();

if (process.env.NODE_ENV !== 'test') {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log('MongoDB connected ✅');
      app.listen(5000, () => {
        console.log('Server running on http://localhost:5000');
      });
    })
    .catch((err) => {
      console.error('MongoDB connection error ❌', err);
    });
}
