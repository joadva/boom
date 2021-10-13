'use strict';
require('dotenv').config();
const formParser = require("../../helpers/formParser");
const {generateResponse} = require("../../helpers/generateResponse");
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const s3 = new AWS.S3();
const {  DNi } = require('../../models/DNI');

const bucket = process.env.bucket
const MAX_SIZE = 4000000
const PNG_MIME_TYPE = "image/png"
const JPEG_MIME_TYPE = "image/jpeg"
const JPG_MIME_TYPE = "image/jpg"
const MIME_TYPES = [PNG_MIME_TYPE, JPEG_MIME_TYPE, JPG_MIME_TYPE]

const getErrorMessage = message => generateResponse(500, {message});


const uploadToS3 = (bucket, key, buffer, mimeType) =>
    new Promise((resolve, reject) => {
        s3.upload(
            { Bucket: bucket, Key: key, ACL: 'public-read' , Body: buffer, ContentType: mimeType },
            function(err, data) {
                if (err) reject(err);
                resolve(data)
            })
})


const UploadImg  = async (event, context) => {
    try {
        const uid = uuidv4();
        const formData = await formParser.parser(event, MAX_SIZE)
        const file = formData.files[0]


        const originalKey = `${uid}_original_${file.filename}`
        //const thumbnailKey = `${uid}_thumbnail_${file.filename}`

        const originalFile = await uploadToS3(bucket, originalKey, file.content, file.contentType);

        //const signedOriginalUrl = s3.getSignedUrl("getObject", { Bucket: originalFile.Bucket, Key: originalKey, Expires: 60000 })
        //const signedThumbnailUrl = s3.getSignedUrl("getObject", { Bucket: thumbnailFile.Bucket, Key: thumbnailKey, Expires: 60000 })
        return generateResponse(200, {
            id: uid,
            src: originalFile.Location.replace(originalFile.key,""),
            mimeType: file.contentType,
            originalKey: originalFile.key,
            //thumbnailKey: thumbnailFile.key,
            bucket: originalFile.Bucket,
            fileName: file.filename,
            originalUrl: originalFile.Location.replace(originalFile.key,"")+originalKey,
            //thumbnailUrl: originalFile.Location.replace(originalFile.key,"")+thumbnailKey,
            originalSize: file.content.byteLength
         });

    } catch (e) {
        return getErrorMessage(e.stack)
    }
}



module.exports.UploadImg = UploadImg;