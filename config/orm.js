var connection = require("./connection.js");

// Object Relational Mapper (ORM)

// The ?? signs are for swapping out table or column names
// The ? signs are for swapping out other values
// These help avoid SQL injection
// https://en.wikipedia.org/wiki/SQL_injection
var orm = {


  selectAll: function (cb) {
    //var queryString = "SELECT * FROM ?? ";
    //connection.query(queryString, [tableInput], function(err, result) {
    connection.query('SELECT * FROM burgers', function (err, result) {

      if (err) throw err;
      cb(result);
    });
  },
  insertOne: function (burgers_name, cb) {
    //var queryString = "SELECT ?? FROM ?? ORDER BY ?? DESC";
    //cb(queryString);
    ///connection.query(queryString, [burgers_name, cb], 
    connection.query('INSERT INTO burgers SET ?',
      { burger_name: burger_name, devoured: false }, function (err, result) {
        if (err) throw err;
        cb(result);
      });
  },
  updateOne: function (burgerID, cb) {
    //var queryString =
    //"SELECT ??, COUNT(??) AS count FROM ?? LEFT JOIN ?? ON ??.??= ??.id GROUP BY ?? ORDER BY count DESC LIMIT 1";

    connection.query('UPDATE burgers SET ? WHERE ?', [{ devoured: true }, { id: burgerID }],

      function (err, result) {
        if (err) throw err;
        cb(result);
      });
  },


  // delete: function (burgerID, cb) {
  //   var queryString = "DELETE FROM burgers WHERE " + id + ";";
  //   connection.query(queryString, [id], function (err, res) {
  //     if (err) throw err;
  //     cb(res);
  //   });
  // },


}
module.exports = orm;
