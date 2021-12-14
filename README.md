## 🛍️ Quản Lí Của Hàng Tiện Lơi

- 🖥  Javascript,Css
- 💼  NodeJs, ExpressJS ,ReactDOM, React Redux
- 💾  Mongoose
- 🌐  Restful Api


## Install and Deploy

Create .env file contain after variables, replace {placeholder} with your config.
For install mongoose
```sh
$ npm install mongoose
```
```js
DB_HOST=0.0.0.0 #you can replace with other server ip here.
DB_DATABASE={database name}
DB_USERNAME={database username}
DB_PASSWORD={database password}


JWT_SECRET={jwt secret key}
```

For development environments...

```sh
npm install --development
NODE_ENV=development node app
```
For production environments...

```sh
npm install --production
NODE_ENV=production
sudo pm2 start npm -- start
```
For install React Redux 
```sh
# If you use npm:
npm install react-redux

# Or if you use Yarn:
yarn add react-redux
```
For install React Redux 
```sh
$ npm install express --save
```
For install Nodemon
```sh
npm install -g nodemon
```
For instal body Parser
```sh
$ npm install body-parser
```
