const app = require('./app.js')

const port = process.env.PORT || 3000;

app.listen(app.get('port'), () => {
  console.log(`Listening on port ${port}`);
})