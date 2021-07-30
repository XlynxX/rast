const { ipcRenderer } = require('electron');
const cID = "697024481222459442"

$(() => {
    $(document).on('click', '#btn-send', function () {
        ipcRenderer.send('event', { name: 'send_message', args: { channelID: cID, content: $('#send-input').val().toString() } })
    });

    $(document).on('click', 'li', function () {
        console.log($(this).attr('value'), "VALUE");
    });

    ipcRenderer.send('event', { name: 'get_users', args: {} });
    ipcRenderer.send('event', { name: 'get_messages', args: { channelID: cID } })

    // get_users
    ipcRenderer.on('event-reply-get_users', (event, result) => {
        result.user_affinities.forEach(item => {
            $("#user-guild-list").append(`<li value="${item.user_id}"><img src="../../assets/images/user_logo_not_found.png" alt="" width="45px" height="45px"></li>`);
        });
    })

    // get_messages
    ipcRenderer.on('event-reply-get_messages', (event, result) => {
        console.log(result);
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
                console.log(item.content);
            }

        });
    })
});