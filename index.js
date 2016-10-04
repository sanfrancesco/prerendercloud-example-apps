var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/ajax', function (req, res) {
  setTimeout(() => {
    res.send('ajax response!!');
  }, 1000)
});

let port = process.env.PORT || 4000;
app.listen(port, function () {
  console.log('ReactJS app listening on port', port);
});
