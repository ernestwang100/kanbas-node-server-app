export default function Hello(app) {
// console.log("Hello World!");
function sayHello(req, res) {
    res.send('Hello Ted!')
  }
  app.get('/hello', sayHello);
  app.get('/', (req, res) => {res.send('Welcome to Full Stack Development!')})

}