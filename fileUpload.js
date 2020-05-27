AUTH_TOKEN = process.env.AUTH_TOKEN;
const fs = require('fs');
(() => {
  const dropboxV2Api = require('dropbox-v2-api');

  const dropbox = dropboxV2Api.authenticate({
    token: AUTH_TOKEN,
  });

  dropbox({
    resource: 'files/upload',
    parameters: {
      path: `/android/app-release_${new Date().toUTCString()}.apk`,
    },
    readStream: fs.createReadStream('android/app/build/outputs/apk/release/app-release.apk'),
  }, (err, result, response) => {
    if(err) {
      console.log(`Failed to upload ${JSON.stringify(response)}`);
    }
  });
})();
