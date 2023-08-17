module.exports = {
  "development": {
    "username": "root",
    "password": "password",
    "database": "vegan_restaurant_forum",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "vegan_restaurant_forum",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.MYSQL_USER,
    "password": process.env.MYSQL_PASSWORD,
    "database": process.env.MYSQL_DATABASE,
    "host": "mysql-ut4q",
    "dialect": "mysql"
  },
  "docker": {
    "username": "root",
    "password": "password",
    "database": "vegan_restaurant_forum",
    "host": "mysql",
    "dialect": "mysql"
  }
}