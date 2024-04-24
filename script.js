document.addEventListener('DOMContentLoaded', function() {
    // Get chatIcon and chatContainer elements
    const chatIcon = document.getElementById('chatIcon');
    const chatContainer = document.getElementById('chatContainer');

    // Function to make an element draggable
    function makeDraggable(element) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

        // Function to handle mouse down event
        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        }

        // Function to handle mouse move event
        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            element.style.top = (element.offsetTop - pos2) + "px";
            element.style.left = (element.offsetLeft - pos1) + "px";
        }

        // Function to handle mouse up event
        function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
        }

        // Event listener to start dragging on mouse down
        element.onmousedown = dragMouseDown;
    }

    // Make chatIcon draggable
    makeDraggable(chatIcon);

    // Make chatContainer draggable
    makeDraggable(chatContainer);

    // Toggle chat portal visibility when chatIcon is double-clicked
    chatIcon.addEventListener('dblclick', function() {
        chatContainer.style.display = 'block';
    });

    // Close chat portal
    document.getElementById('closeChat').addEventListener('click', function() {
        chatContainer.style.display = 'none';
    });

    // Function to append a new message to chatBody
    function appendMessage(sender, message) {
        const chatBody = document.getElementById('chatBody');
        const msgDiv = document.createElement('div');
        msgDiv.className = sender === 'bot' ? 'msg left-msg' : 'msg right-msg';
        msgDiv.innerHTML = `
            <div class="msg-img"></div>
            <div class="msg-bubble">
                <div class="msg-info">
                    <div class="msg-info-name">${sender === 'bot' ? 'ChatBot' : 'You'}</div>
                    <div class="msg-info-time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                </div>
                <div class="msg-text">${message}</div>
            </div>`;
        chatBody.appendChild(msgDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    // Function to handle bot response based on user input
    function handleBotResponse(userInput) {
        const botResponse = getBotResponse(userInput);
        appendMessage('bot', botResponse);
    }

    // Function to get bot response (replace with your own logic)
    function getBotResponse(userInput) {
        if (userInput.toLowerCase().includes('hello')) {
            return 'Hi there! How can I assist you today?';
        } else if (userInput.toLowerCase().includes('bye')) {
            return 'Goodbye! Have a great day.';
        } else {
            return 'I apologize, but I am a simple chatbot and may not understand everything.';
        }
    }
});