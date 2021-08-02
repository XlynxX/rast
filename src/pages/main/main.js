const { ipcRenderer } = require('electron');
let cID;

$(() => {
    $(document).on('click', '#btn-send', function () {
        ipcRenderer.send('event', { name: 'send_message', args: { channelID: cID, content: $('#send-input').val().toString() } })
    });

    $(document).on('click', 'li', function () {
        $('#chat-container').empty();
        console.log($(this).attr('value'), "channel id chosen");
        cID = $(this).attr('value');
        ipcRenderer.send('event', { name: 'get_messages', args: { channelID: cID } })
    });

    ipcRenderer.send('event', { name: 'get_channels', args: {} });
    ipcRenderer.send('event', { name: 'get_users', args: {} });

    // get_users
    ipcRenderer.on('event-reply-get_users', (event, result) => {
        // result.user_affinities.forEach(item => {
        //     $("#user-guild-list").append(`<li value="${item.user_id}"><img src="../../assets/images/user_logo_not_found.png" alt="" width="45px" height="45px"></li>`);
        // });
    })

    // get_messages
    ipcRenderer.on('event-reply-get_messages', (event, result) => {
        console.log(result, "MESSAGES");
        let i = 0;
        result.reverse().forEach(item => {
            if (item.content !== "") {
                $('#chat-container').append(`
                <div class="chat-message">
                    <p id="${item.id}-sender" class="message-sender"/>
                    <div id="${item.id}-message" class="message-inner"/>
                </div>
                `);
                $('#' + item.id + '-sender').text(item.author.username);
                $('#' + item.id + '-message').text(item.content);
                i++;
                //console.log(item.content);
            }

        });
        $('#chat-container').animate({scrollTop: 55 * i}, 'slow');
    })

    // get_channels
    ipcRenderer.on('event-reply-get_channels', (event, result) => {
        console.log(result, "CHANNELS");
        result.forEach(item => {
            $("#user-guild-list").append(`<li value="${item.id}"><img src="../../assets/images/user_logo_not_found.png" alt="" width="45px" height="45px"></li>`);
        });
    })
});