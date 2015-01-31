// Global Variables
//  -- try to keep this section SHORT! :)
var currentUser = "guest";

// Object definitions
var messageTemplate = _.template($('[data-template-name=message]').text());
var messagePayload = {
  username: '',
  message: '',
  createdAt: Date.now(),
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

var login = function(username) {
  currentUser = username;
  $('.input').attr('placeholder', '(Type your message here)');
  $('.submit i').removeClass('fi-key').addClass('fi-plus');
  $('.current-user').text(currentUser);
}
// Application Loop(s)

// Event Handlers
$('.submit').on('click', function(e) {
  var input = $('.input').val();
  if (!input || !/\S/g.test(input) ) { return; }
  if (currentUser === "guest") {
    login(input);
  } else {
    loadAndSend(input);
  }
  $('.input').val("");
});

$('.input').on('keydown', function(e) {
  if (e.keyCode === 13) {
    $('.submit').click();
    console.log('clicked');
  }
});
