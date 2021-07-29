const { ipcRenderer } = require('electron');

$(() => {
    $(document).on('click', 'li', function() {
        console.log($(this).attr('value'), "VALUE");
    });

    ipcRenderer.send('event', { name: 'get_users', args: {} })

    ipcRenderer.on('event-reply', (event, result) => {
        result.user_affinities.forEach(item => {
            $("#user-guild-list").append(`<li value="${item.user_id}"><img src="../../assets/user_logo_not_found.png" alt="" width="45px" height="45px"></li>`);
            console.log("\nNew item received: ");
            console.log(item.user_id);
        });
    })
});