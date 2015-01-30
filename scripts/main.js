
var getMessages = function(callback) {
  $.ajax("http://tiny-pizza-server.herokuapp.com/collections/greenville-chats")
    .fail(function(err) { console.log(err); })
    .done(function(d) { callback(d); });
};

getMessages(function(d) { console.log(d); });
