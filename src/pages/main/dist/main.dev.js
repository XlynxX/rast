"use strict";

var _require = require('electron'),
    ipcRenderer = _require.ipcRenderer;

$(function () {
  ipcRenderer.send('event', {
    name: 'get_users',
    args: {}
  });
  ipcRenderer.on('event-reply', function (event, result) {
    result.user_affinities.forEach(function (item) {
      $("#user-guild-list").append("<li><a href=\"#\">".concat(item.user_id, "</a></li>"));
    });
  });
});