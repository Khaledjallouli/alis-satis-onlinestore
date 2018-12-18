var express = require('express');
var cors = require('cors')
var app = express()
var assert = require('assert');
var MongoClient = require('mongodb').MongoClient;

const bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));


app.use(cors())

var url = 'mongodb://localhost:27017/test';
MongoClient.connect(url, function(err, db) {
  console.log("Connected correctly to MongoDB server.");
  db.close();
});




/*https://github.com/mschwarzmueller/nodejs-basics-tutorial */
app.post('/post-product', async function (req, res,next) {
  var item = {
    productPermalink: req.body.productPermalink ,
    productTitle : req.body.productTitle,
    productPrice : req.body.productPrice,
    productDescription : req.body.productDescription , 
    productPublished : req.body.productPublished , 
    productTags : req.body.productTags,
    productOptions : req.body.productOptions , 
    productImage : req.body.productImage ,
  };
  console.log(req.params, req.body);

    MongoClient.connect(url, function(err, database) {
      assert.equal(null,err);
      const db = database.db('test');
      db.collection('products').insertOne(item, function(err, result){
        assert.equal(null,err);
        console.log('Inserted',item);
        res.json(item);
        console.log('got mongo result', item)
        database.close();
  
      });
    });


  
});


/*https://gist.github.com/aerrity/fd393e5511106420fba0c9602cc05d35
https://www.twilio.com/docs/voice/tutorials/click-to-call-node-express
https://stackoverflow.com/questions/4295782/how-do-you-extract-post-data-in-node-js */
 /*https://expressjs.com/en/4x/api.html#req.body*/ 




var findProducts = function(db, productList, callback) {
  var cursor =db.collection('products').find( );
  cursor.each(function(err, doc) {
     assert.equal(err, null);
     if (doc != null) {
        productList.push(doc);
     } else {
        callback();
     }
  });
};

app.get('/products', function (req, res) {
  console.log('Received request for products from', req.ip)
  MongoClient.connect(url, function(err, database) {
    assert.equal(null, err);
    var productList = [];
    const db = database.db('test');
    findProducts(db, productList, function() {
      res.json(productList);
      database.close();
    });

  });
});


var findProduct = function(db, productId, callback) {
  var cursor =db.collection('products').find({productPermalink: productId} );
  var product;
  cursor.each(function(err, doc) {
     assert.equal(err, null);
     if (doc != null) {
       product = doc;
     } else {
        callback(product);
     }
  });
};


app.get('/product/:productId', function (req, res) {
  console.log('Received request for '+req.param('productId')+' from', req.ip)
  MongoClient.connect(url, function(err, database) {
    assert.equal(null, err);
    const db = database.db('test');
    findProduct(db, req.param('productId'),  function(product) {
      console.log(product)
      res.json(product);
      database.close();
    });

  });
});  

app.get('/', function (req, res) {
  console.log('Received request from', req.ip)
  res.send('Welcome to the back of my website!');
});


//var productList = require('./data/products/products.json');
//console.log("Products", productList)



//app.get('/products', function (req, res) {
 // console.log('Received request for products from', req.ip)
  //res.json(productList);
//});

/*app.get('/product/:productPermalink', function (req, res) {
  console.log('Received request for '+req.param('productPermalink')+' from', req.ip)
  var productDetails = require('./data/products/details/'+req.param('productPermalink')+'.json');
  res.json(productDetails);
});
*/

app.use('./data/products/img', express.static('img'));   
app.use(express.static('./app'));

   
// en express
app.listen(3000);
console.log('localhost:3000 is the magic port!');

/* en node?
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Listening at http://%s:%s', host, port);
});

*/