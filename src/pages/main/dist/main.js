var ipcRenderer = require('electron').ipcRenderer;
$(function () {
    ipcRenderer.send('event', { name: 'get_users', args: {} });
    ipcRenderer.on('event-reply', function (event, result) {
        result.user_affinities.forEach(function (item) {
            // $("#user-guild-list").append(`<li><a href="#">${item.user_id}</a></li>`);
            console.log("\nNew item received: ");
            console.log(item.user_id);
        });
    });
});
