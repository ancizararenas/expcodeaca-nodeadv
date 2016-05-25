
app.get('/', function(req, res){
  res.send("Hello World");
})

app.get('/blog', function(req, res){
  res.sendfile("./views/index.html");
})

app.get('/api', function(req, res){
  res.send({name :"Janen", age :20});
})
