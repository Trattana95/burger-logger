var express = require("express");

var router = express.Router();

// Import the model (burger.js) to use its database functions.
var burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  burger.all(function(data) {
    var hbsObject = {
      burger: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/burger", function(req, res) {
  burger.insert(["name", "devoured"
], [req.body.name, req.body.devoured], 
    function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

router.put("/api/burger/:id", function(req, res) {
  var devoured = "id = " + req.params.id;

  console.log("devoured", devoured);

  burger.update(
    {
      devoured: req.body.devoured
    },
    devoured, function(result) {
      if (result.changedRows === 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      }
      res.status(200).end();

    }
  );
});

// Export routes for server.js to use.
module.exports = router;
