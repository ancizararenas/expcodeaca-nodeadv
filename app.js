var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/blog', function(request, response) {
    response.send("This would be some HTML");
});

app.get('/api', function(request, response) {
    response.send({name:"ancizar", age:18});
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
