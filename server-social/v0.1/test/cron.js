var cron = require('node-cron');

 cron.schedule('0 * * * *', () => {
   console.log('Runing a job at 01:00 at America/Sao_Paulo timezone');
 }, {
   scheduled: true,
   timezone: "Asia/Ho_Chi_Minh"
 });
