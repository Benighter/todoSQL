import http from 'http';
import {app} from '../Router/app.js'

const PORT = 5001;

const server = http.createServer(app)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});





