const router = require('koa-router')();
const multer = require('koa-multer');//加载koa-multer模块  
//文件上传  
//配置  
var storage = multer.diskStorage({  
  //文件保存路径  
  destination: function (req, file, cb) {  
    cb(null, '../file/')
  },  
  //修改文件名称  
  filename: function (req, file, cb) {  
    var fileFormat = (file.originalname).split(".");  
    cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);  
  }  
})  
//加载配置
router.post('/files', async function (ctx, next) {
  ctx.state = {
    title: ctx.req.file.path
  };
  await ctx.render('index', {
    filename: ctx.req.file.path//返回文件名  
  });
})
module.exports = router;
