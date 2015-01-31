// Global Variables
//  -- try to keep this section SHORT! :)
var currentUser = "guest";

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
    .done(callback);
};

//GIT Post
var sendMessage = function(message){
    $.ajax({
    type: "POST",
    url: "http://tiny-pizza-server.herokuapp.com/collections/greenville-chats",
    data: message
  })
  .done(function( msg ) {
    alert( "Data Saved: " + msg );
  });
};

// Helper Functions
// getMessages(function(d) { console.log(d); });
getMessages(function(data) {
  data.forEach(function(message) {
    if (!message.username || !message.message || !message.createdAt) {
      console.log("ITEM WITH BAD DATA: " + message._id);
      return;
    }
    $('.chatbox').append(messageTemplate(message));
  });
});

var loadAndSend = function(data) {
  messagePayload.username = currentUser;
  messagePayload.message = data;
  sendMessage(messagePayload);
};

// Application Loop(s)

// Event Handlers
$('.submit').on('click', function(e) {
  loadAndSend($('.input').val());
  $('.input').val("");
});
