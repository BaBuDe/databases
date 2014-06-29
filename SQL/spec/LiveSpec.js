/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */

var mysql = require('mysql');
var request = require("request"); // You might need to npm install the request module!
var _ = require('underscore');
var expect = require('../../node_modules/chai/chai').expect;

describe("Persistent Node Chat Server", function() {
  var dbConnection;

  beforeEach(function(done) {
    dbConnection = mysql.createConnection({
    /* TODO: Fill this out with your mysql username */
      user: "test",
     // and password.
      password: "12345",
      database: "chat"
    });
    dbConnection.connect();

    var tables = ['Users', 'Rooms', 'Messages']; // TODO: fill this out

    /* Empty the db table before each test so that multiple tests
     * (or repeated runs of the tests) won't screw each other up: */
    _.each(tables, function(table) {
      dbConnection.query("DELETE FROM " + table, done);
    });
  });

  afterEach(function() {
    dbConnection.end();
  });

  it("Should insert posted messages to the DB", function(done) {
    // Post a message to the node chat server:

    var messageData = {
      username: "Valjean",
      text: "In mercy's name, three days is all I need."
    };
    var messageString = JSON.stringify(messageData);

    request({method: "POST",
             uri: "http://127.0.0.1:3000/classes/room1",
             body: messageString
            },
            function(error, response, body) {
              /* Now if we look in the database, we should find the
               * posted message there. */

              /* TODO: Change the above queryString & queryArgs to match your schema design
               * The exact query string and query args to use
               * here depend on the schema you design, so I'll leave
               * them up to you. */
              dbConnection.query( 'SELECT Username FROM Users', function(err, results) {
                // Should have one result:
                expect(results.length).to.equal(1);
                expect(results[0]).to.equal("Valjean");
                /* TODO: You will need to change these tests if the
                 * column names in your schema are different from
                 * mine! */

                dbConnection.query( 'SELECT Content FROM Messages', function(err, results) {
                  // Should have one result:
                  expect(results.length).to.equal(1);
                  expect(results[0]).to.equal("In mercy's name, three days is all I need.");
                  /* TODO: You will need to change these tests if the
                   * column names in your schema are different from
                   * mine! */
                  done();
                });
              });
            }
    );
  });

  it("Should output all messages from the DB", function(done) {
    // Let's insert a message into the db
    var queryString = "";
    var queryArgs = ["Javert", "Men like you can never change!"];
    /* TODO - The exact query string and query args to use
     * here depend on the schema you design, so I'll leave
     * them up to you. */

    dbConnection.query( queryString, queryArgs,
      function(err, results, fields) {
        /* Now query the Node chat server and see if it returns
         * the message we just inserted: */
        request("http://127.0.0.1:3000/classes/room1",
          function(error, response, body) {
            var messageLog = JSON.parse(body);
            expect(messageLog[0].username).to.equal("Javert");
            expect(messageLog[0].message).to.equal("Men like you can never change!");
            done();
          });
      });
  });
});
