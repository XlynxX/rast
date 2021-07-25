const { ipcRenderer } = require('electron');

$(() => {
    ipcRenderer.send('event', { name: 'get_users', args: {} })

    ipcRenderer.on('event-reply', (event, result) => {
        result.user_affinities.forEach(item => {
            $("#user-guild-list").append(`<li><a href="#">${item.user_id}</a></li>`);
        });
    })
});