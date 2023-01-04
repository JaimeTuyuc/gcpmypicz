const { Storage } = require('@google-cloud/storage');
const path = require('path');
const config = require('../settings');
const { v4 } = require('uuid');

const { storage_id, bucket_name } = config;

const gc = new Storage({
    keyFilename: path.join(__dirname, '../../google-credentials/gcp-my-picz-8876ebc08cbd.json'),
    projectId: storage_id
});

const uploadFileToStorage = gc.bucket(bucket_name);

const uploadImgToBucket = (file) => new Promise((resolve, reject) => {
    const { name, data } = file.file;
    const blob = uploadFileToStorage.file( v4() + name.replace(/ /g, '_'))
    const blobStream = blob.createWriteStream({
        resumable: false,
        gzip: true
    })

    blobStream.on('finish', async () => {
        const publicUrl = `https://storage.cloud.google.com/${uploadFileToStorage.name}/${blob.name}`;
        resolve(publicUrl);
    }).on('error', error => {
        console.error(error);
        reject(error, 'Unable to upload the IMG')
    }).end(data)
})

module.exports = uploadImgToBucket;