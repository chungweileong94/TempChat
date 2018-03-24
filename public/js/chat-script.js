$(document).ready(() => {
    let socket = io.connect("https://lcw-chat.herokuapp.com");

    socket.on("broadMessage", (data) => {
        $("#chat-wrapper").append(`
                <div class="message-wrapper">
                    <div class="message other-message">
                        ${data.message}
                    </div>
                </div>
                `);

        $('html, body').animate({
            scrollTop: $(document).height()
        }, 'slow');

        notifyMe(data.message);
    });

    $("#send-button").click(sendMessage);
    //$("#message-box").keypress((e) => { if (e.which == 13) sendMessage(); })

    function sendMessage() {
        let messageInput = $("#message-box");

        if (messageInput.val().trim().length == 0) { return; }

        let data = {
            id: socket.id,
            message: messageInput.val().replace(/\n\r?/g, "<br />")
        }

        socket.emit("message", data);

        $("#chat-wrapper").append(`
                <div class="message-wrapper">
                    <div class="message  self-message">
                        ${messageInput.val().replace(/\n\r?/g, "<br />")}
                    </div>
                </div>
                `);

        messageInput.val("");

        $('html, body').animate({
            scrollTop: $(document).height()
        }, 'slow');
    }

    function notifyMe(message) {
        // Let's check if the browser supports notifications
        if (!("Notification" in window)) {
            alert("This browser does not support desktop notification");
        }

        // Let's check whether notification permissions have already been granted
        else if (Notification.permission === "granted") {
            // If it's okay let's create a notification
            var notification = new Notification(message);
        }

        // Otherwise, we need to ask the user for permission
        else if (Notification.permission !== "denied") {
            Notification.requestPermission(function (permission) {
                // If the user accepts, let's create a notification
                if (permission === "granted") {
                    var notification = new Notification(message);
                }
            });
        }
    }
});