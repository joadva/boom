'use strict';

const AWS = require('aws-sdk');

const bucket = process.env.bucket

const getErrorMessage = message => ({ statusCode: 500, body: JSON.stringify( message )});

const DeleteFile  = async (event, context) => {
    try {

        const s3 = new AWS.S3();
        const { img } = JSON.stringify(event.body);
        var params = {  Bucket: bucket, Key: img };

        const deleteFile = await s3.deleteObject(params);
        console.log(deleteFile)
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Eliminado correctamente"
             })
          }
    } catch (e) {
        return getErrorMessage(e.message)
    }
}


module.exports.DeleteFile = DeleteFile;