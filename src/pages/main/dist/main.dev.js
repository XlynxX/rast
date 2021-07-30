"use strict";

var _require = require('electron'),
    ipcRenderer = _require.ipcRenderer;

var cID = "697024481222459442";
$(function () {
  $(document).on('click', '#btn-send', function () {
    ipcRenderer.send('event', {
      name: 'send_message',
      args: {
        channelID: cID,
        content: $('#send-input').val().toString()
      }
    });
  });
  $(document).on('click', 'li', function () {
    console.log($(this).attr('value'), "VALUE");
  });
  ipcRenderer.send('event', {
    name: 'get_users',
    args: {}
  });
  ipcRenderer.send('event', {
    name: 'get_messages',
    args: {
      channelID: cID
    }
  }); // get_users

  ipcRenderer.on('event-reply-get_users', function (event, result) {
    result.user_affinities.forEach(function (item) {
      $("#user-guild-list").append("<li value=\"".concat(item.user_id, "\"><img src=\"../../assets/images/user_logo_not_found.png\" alt=\"\" width=\"45px\" height=\"45px\"></li>"));
    });
  }); // get_messages

  ipcRenderer.on('event-reply-get_messages', function (event, result) {
    console.log(result);
    result.reverse().forEach(function (item) {
      if (item.content !== "") {
        $('#chat-container').append("\n                <div class=\"chat-message\">\n                    <p id=\"".concat(item.id, "-sender\" class=\"message-sender\"/>\n                    <div id=\"").concat(item.id, "-message\" class=\"message-inner\"/>\n                </div>\n                "));
        $('#' + item.id + '-sender').text(item.author.username);
        $('#' + item.id + '-message').text(item.content);
        console.log(item.content);
      }
    });
  });
});