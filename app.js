const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const views = require('koa-views');
//const co = require('co');
//const convert = require('koa-convert');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser')();
//const logger = require('koa-logger');
const multer = require('koa-multer');//加载koa-multer模块
//路由注入 
const index = require('./routes/index');
const users = require('./routes/users');
const upload = require('./routes/upload');
const readfile = require('./routes/readfile')

const res_format = require('./middlewares/res_format');

// middlewares
app.use((bodyparser));
app.use((json()));
//app.use((logger()));
app.use((require('koa-static')(__dirname + '/public')));
//app.use((require('koa-static')(__dirname + '/file')));

// app.use(views(__dirname + '/views', {
//   extension: 'jade'
// }));

//页面模版
app.use(views(__dirname + '/views-ejs', {
  extension: 'ejs'
}));


// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

var storage = multer.diskStorage({  
  //文件保存路径  
  destination: function (req, file, cb) {  
    cb(null, '../files')
  },  
  //修改文件名称  
  filename: function (req, file, cb) {  
    var fileFormat = (file.originalname).split(".");  
    cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);  
  }  
}) 
//加载配置  
const uploadfile = multer({ storage: storage });

//实现输出res统一
//app.use(res_format('^/api'))

//路由注册 
router.use('/',index.routes());
router.use('/users', users.routes());
router.use('/upload', uploadfile.single('file'), upload.routes());
router.use('/readfile', readfile.routes());

app.use(router.routes());
// response
app.on('error', function(err, ctx){
  console.log(err)
  console.error('server error', err, ctx);
});


module.exports = app;