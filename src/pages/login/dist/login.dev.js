"use strict";

var _require = require('electron'),
    ipcRenderer = _require.ipcRenderer;

$(function () {
  var login;
  var password;
  $('#input-login').on('input', function () {
    login = $(this).val(); // get the current value of the input field.
  });
  $('#input-password').on('input', function () {
    password = $(this).val(); // get the current value of the input field.
  });
  $('#btn-login-submit').click(function (e) {
    ipcRenderer.send('event', {
      name: 'login',
      args: {
        login: login,
        password: password
      }
    });
  });
  ipcRenderer.on('event-reply-login', function (event, result) {
    console.log(result);
    if (result == true) window.location.href = '../main/main.html';else {
      console.log('Cannot login, wrong password or login');
    }
    ;
    ipcRenderer.removeAllListeners('event-reply');
  });
});