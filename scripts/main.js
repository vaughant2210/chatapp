// Global Variables
//  -- try to keep this section SHORT! :)


// Object definitions
var messageTemplate = _.template($('[data-template-name=message]').text());
var messagePayload = {
  username: '',
  message: '',
  created_at: Date.now(),
  appName: "After12"
};

// Primary Data Functions (AJAX)
var getMessages = function(callback) {
  $.ajax("http://tiny-pizza-server.herokuapp.com/collections/greenville-chats")
    .fail(function(err) { console.log(err); })
    .done(function(d) { callback(d); });
};

// Helper Functions
// getMessages(function(d) { console.log(d); });
getMessages(function(data) {
  data.forEach(function(message) {
    if (!message.username) { return; }
    console.log(message);
    $('.chatbox').append(messageTemplate(message));
  });
});


// Application Loop(s)
