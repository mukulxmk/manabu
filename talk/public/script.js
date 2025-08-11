const socket = io();
const messagesDiv = document.getElementById('messages');
const sendBtn = document.getElementById('send');

socket.on('loadMessages', (messages) => {
  messages.forEach(msg => addMessage(msg.username, msg.text));
});

socket.on('message', (data) => {
  addMessage(data.username, data.text);
});

sendBtn.addEventListener('click', () => {
  const username = document.getElementById('username').value || "Anonymous";
  const message = document.getElementById('message').value;

  if (message.trim()) {
    socket.emit('chatMessage', { username, text: message });
    document.getElementById('message').value = '';
  }
});

function addMessage(username, text) {
  const msgElement = document.createElement('p');
  msgElement.textContent = `${username}: ${text}`;
  messagesDiv.appendChild(msgElement);
}
