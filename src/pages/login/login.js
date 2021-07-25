const { ipcRenderer } = require('electron');

$(() => {
    let login;
    let password;
    
    $('#input-login').on('input', function() { 
        login = $(this).val() // get the current value of the input field.
    });

    $('#input-password').on('input', function() { 
        password = $(this).val() // get the current value of the input field.
        console.log(password, "password")
    });
    
    $('#btn-login-submit').click(function (e) {
        ipcRenderer.sendSync('event', { name: "login", args: {login: login, password: password}});
    });
});