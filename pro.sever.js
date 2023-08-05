var express = require('express');
var port = 8088;

var app = express();

var router = express.Router();
router.get('/', function(req,res,next){
	req.url = '/index.html';
	next();
});

app.use(router);



// 接口數據
// 1、讀取json數據
var goods = require('./data/01-商品頁(點菜).json');
var ratings = require('./data/02-商品頁(評價).json');
var seller = require('./data/03-商品頁(商家).json');

// 2、路由
var routes = express.Router();

// 3、編寫接口
routes.get('/goods', (req,res) => {
	// 返回數據給客戶端，返回json數據
	res.json(goods);
});
routes.get('/ratings', (req,res) => {
	// 返回數據給客戶端，返回json數據
	res.json(ratings);
});

routes.get('/seller', (req,res) => {
	// 返回數據給客戶端，返回json數據
	res.json(seller);
});

// 4、中間件
app.use('/api',routes);


// 定義static目錄，指向./dist目錄
app.use(express.static('./dist'));


// 啟動express
module.express = app.listen(port, function(err){
	if(err){
		console.log(err);
		return;
	}
	
	console.log('http://localhost:' + port + '\n');
});