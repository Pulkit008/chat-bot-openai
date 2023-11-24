const socket = io();
const input = document.getElementById('input')
const messages = document.getElementById('messages')


function uuidV4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
}

let _user = localStorage.getItem('openai-chat-userId')
if (!_user) {
  const random_uuid = uuidV4();
  _user = random_uuid
  localStorage.setItem('openai-chat-userId', random_uuid)
}


function appendNewChat(chatType, chat) {
  const msgElement = document.createElement('div');
  msgElement.className = chatType
  msgElement.textContent = chat
  messages.appendChild(msgElement)
}

function sendQueryEventHandler() {
  appendNewChat('message-user', input.value)
  socket.emit('client-request', {
    _user,
    query: input.value.trim(),
  })
  input.value = ''
}

document.addEventListener("DOMContentLoaded", function () {
  const send_button = document.getElementById('send_button')

  send_button.addEventListener('click', event => {
    if (input.value.trim()) {
      sendQueryEventHandler()
    }
  })


  socket.emit('get-chat-history', {
    _user,
  }, (response) => {
    for (const chat of response) {
      appendNewChat('message-user', chat.query)
      appendNewChat('message-chat-bot', chat.response)
    }
  })
});

input.addEventListener('keydown', event => {
  if (event.key === 'Enter' && input.value.trim()) {
    sendQueryEventHandler()
  }
})

socket.on("server-response", (arg) => {
  appendNewChat('message-chat-bot', arg)
});