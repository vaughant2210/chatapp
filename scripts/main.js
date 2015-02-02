// Global Variables
//  -- try to keep this section SHORT! :)
var currentUser = "guest";

// Object definitions
var messageTemplate = _.template($('[data-template-name=message]').text(), {variable: "msg"});
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

var deleteMessage = function(id) {
  $.ajax({
    type: "DELETE",
    url: "http://tiny-pizza-server.herokuapp.com/collections/greenville-chats/" + id
  })
  .done(function(d){
    console.log(d);
  });
};

// Helper Functions
// getMessages(function(d) { console.log(d); });
var dynamicFilter = function(rawData) {
  // DUMMY MIDDLEWARE
  // Need to check for images, scripts, links
  return rawData;
}

var populate = function(data) {
  var i = 0;
  $('.chatbox').empty();
  data.forEach(function(message) {
    if (i === 12) { return; }
    if (!message.username || !message.message || !message.createdAt) {
      // console.log("ITEM WITH BAD DATA: " + message._id);
      return;
    }
    message = dynamicFilter(message);
    $('.chatbox').append(messageTemplate(message));
    i++;
  });
};

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
};
// Application Loop(s)

getMessages(populate);
setInterval(function() { getMessages(populate); }, 1000);

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

$('.chatbox').on('click', '.delete', function(e) {
  e.preventDefault();
  var $container = $(this).parents('li'),
      $textbox = $container.children('.leftside').children('span');
  deleteMessage($(this).attr("data-id"));
  $textbox.text("...Message deleted...");
  $textbox.addClass('fade');
  setTimeout(function() { $container.remove(); console.log("done"); }, 1000);
});
