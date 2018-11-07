const cron = require('node-cron');
const deployService = require('./src/service/deploy');

cron.schedule('* * * * *', async () => {
  try {
    await deployService.deployProjects();
  } catch (e) {
    console.error('CRON[deployService.deployProjects]: ', e);
  }
});
