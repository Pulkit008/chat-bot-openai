import '@core/declarations'
import OpenAiHelper from '@helpers/openai.helper';

export default async (socket) => {
  socket.on("client-request", async (payload) => {
    const { _user, query } = payload
    const openAiResponse = await OpenAiHelper.GetChatCompletion({ _user, query })
    socket.emit('server-response', openAiResponse)
  });

  socket.on("get-chat-history", async (payload, callBack) => {
    const { _user } = payload
    const chats = await App.Models.Chat.find({
      _user,
    }).sort({_id: -1}).limit(10)
    chats.reverse()
    callBack(chats)
  });
}
