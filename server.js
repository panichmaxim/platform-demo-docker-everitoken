require('./cron');
const app = require('./app');
const bootstrap = require('./bootstrap');
bootstrap().then(() => {
  app.listen(process.env.PORT || 3000, err => {
    if (err) {
      throw err;
    }
    console.log('started');
  });
}).catch(err => console.log(err));
