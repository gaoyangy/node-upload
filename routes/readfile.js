const router = require('koa-router')();
const fs = require('fs');

const MIME_TYPE = {
    "css": "text/css",
    "gif": "image/gif",
    "html": "text/html",
    "ico": "image/x-icon",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "js": "text/javascript",
    "json": "application/json",
    "pdf": "application/pdf",
    "png": "image/png",
    "svg": "image/svg+xml",
    "swf": "application/x-shockwave-flash",
    "tiff": "image/tiff",
    "txt": "text/plain",
    "wav": "audio/x-wav",
    "wma": "audio/x-ms-wma",
    "wmv": "video/x-ms-wmv",
    "xml": "text/xml"
};

router.get('/:path/:fileName', function (ctx, next) {
  //ctx.body = 'this a users response!';
for (let fileType in MIME_TYPE) {
        if (ctx.params.fileName.includes('.'+fileType)) {
            fs.readFile('../'+ctx.params.path+'/'+ ctx.params.fileName, function(err) {
                if (err) {
                    ctx.res._headers['content-type']=`${MIME_TYPE[fileType]}`;
                    ctx.res.write(err.message);
                    ctx.res.end();
                } else {
                    ctx.res._headers['content-type']=`${MIME_TYPE[fileType]}`;
                    ctx.body=fs.readFile('../'+ctx.params.path+'/'+ ctx.params.fileName);
                }
            });
        }
    }
});
module.exports = router;
