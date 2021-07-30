"use strict";

var _require = require('electron'),
    ipcRenderer = _require.ipcRenderer;

var cID;
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
    $('#chat-container').empty();
    console.log($(this).attr('value'), "channel id chosen");
    cID = $(this).attr('value');
    ipcRenderer.send('event', {
      name: 'get_messages',
      args: {
        channelID: cID
      }
    });
  });
  ipcRenderer.send('event', {
    name: 'get_channels',
    args: {}
  });
  ipcRenderer.send('event', {
    name: 'get_users',
    args: {}
  }); // get_users

  ipcRenderer.on('event-reply-get_users', function (event, result) {// result.user_affinities.forEach(item => {
    //     $("#user-guild-list").append(`<li value="${item.user_id}"><img src="../../assets/images/user_logo_not_found.png" alt="" width="45px" height="45px"></li>`);
    // });
  }); // get_messages

  ipcRenderer.on('event-reply-get_messages', function (event, result) {
    console.log(result, "MESSAGES");
    result.reverse().forEach(function (item) {
      if (item.content !== "") {
        $('#chat-container').append("\n                <div class=\"chat-message\">\n                    <p id=\"".concat(item.id, "-sender\" class=\"message-sender\"/>\n                    <div id=\"").concat(item.id, "-message\" class=\"message-inner\"/>\n                </div>\n                "));
        $('#' + item.id + '-sender').text(item.author.username);
        $('#' + item.id + '-message').text(item.content); //console.log(item.content);
      }
    });
  }); // get_channels

  ipcRenderer.on('event-reply-get_channels', function (event, result) {
    console.log(result, "CHANNELS");
    result.forEach(function (item) {
      $("#user-guild-list").append("<li value=\"".concat(item.id, "\"><img src=\"../../assets/images/user_logo_not_found.png\" alt=\"\" width=\"45px\" height=\"45px\"></li>"));
    });
  });
});