const express = require('express');
const app = express();
 
app.get('/', (req, res) => {
  res.send("Hello");
});

app.get('/bye', (req, res) => {
    res.send("Bye");
  });
 
app.listen(process.env.PORT || 3000, () => {
  console.log('Web Server is listening at port ' + (process.env.PORT || 3000));
});