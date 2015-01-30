// Global Variables 
//  -- try to keep this section SHORT! :)


// Object definitions


// Primary Data Functions (AJAX)
var getMessages = function(callback) {
  $.ajax("http://tiny-pizza-server.herokuapp.com/collections/greenville-chats")
    .fail(function(err) { console.log(err); })
    .done(function(d) { callback(d); });
};


// Helper Functions
getMessages(function(d) { console.log(d); });


// Application Loop(s)
