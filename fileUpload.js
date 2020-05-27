AUTH_TOKEN = process.env.AUTH_TOKEN;
const fs = require('fs');
(() => {
  const dropboxV2Api = require('dropbox-v2-api');

  const dropbox = dropboxV2Api.authenticate({
    token: AUTH_TOKEN,
  });
  let filePath = './android/app/build/outputs/apk/release/app-release.apk';
  if (!fs.existsSync(filePath)) {
    console.log("File missing. Exiting")
    process.exit(1);
  } else {
    dropbox({
      resource: 'files/upload',
      parameters: {
        path: `/android/app-release_${new Date().toUTCString()}.apk`,
      },
      readStream: fs.createReadStream(filePath),
    }, (err, result, response) => {
      if (err) {
        console.log(`Failed to upload ${JSON.stringify(response)}`);
        process.exit(1);
      }
    });
  }
})();
