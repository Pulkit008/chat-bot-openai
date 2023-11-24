import '@core/declarations'
import OpenAI from 'openai';

class OpenAiHelper {
  private openai: OpenAI

  constructor() {
    this.openai = new OpenAI({
      apiKey: App.Config.OPEN_AI_API_KEY,
    });
  }

  async GetChatCompletion(payload: { _user: string; query: string }) {
    const { _user, query } = payload

    const chatCompletion = await this.openai.chat.completions.create({
      messages: [{ role: 'user', content: query }],
      model: 'gpt-3.5-turbo',
    });

    this.CreateChatLog({
      _user,
      query,
      response: chatCompletion.choices[0].message?.content,
    })

    return chatCompletion.choices[0]?.message?.content
  }

  async CreateChatLog(payload: { _user: string; query: string; response: string }) {
    // Create Chat
    await App.Models.Chat.create(payload)
  }
}

// All Done
export default new OpenAiHelper()
