interface FeiShuBotMessage {
  msg_type: 'text' | 'post';
  content: {
    text?: string;
    post?: {
      zh_cn: {
        title: string;
        content: Array<Array<{
          tag: 'text' | 'a';
          text: string;
          href?: string;
        }>>;
      };
    };
  };
}

export class FeiShuBot {
  private webhook: string;

  constructor(webhook: string) {
    this.webhook = webhook;
  }

  async sendText(text: string) {
    const message: FeiShuBotMessage = {
      msg_type: 'text',
      content: {
        text
      }
    };
    return this.sendMessage(message);
  }

  async sendError(error: Error, context: Record<string, any> = {}) {
    const message: FeiShuBotMessage = {
      msg_type: 'post',
      content: {
        post: {
          zh_cn: {
            title: '🚨 翻译服务异常警告',
            content: [
              [
                {
                  tag: 'text',
                  text: `错误信息：${error.message || context.typr}\n`
                }
              ],
              [
                {
                  tag: 'text',
                  text: `上下文信息：${JSON.stringify(context, null, 2)}\n`
                }
              ],
              [
                {
                  tag: 'text',
                  text: `发生时间：${new Date().toLocaleString('zh-CN')}`
                }
              ]
            ]
          }
        }
      }
    };
    return this.sendMessage(message);
  }

  private async sendMessage(message: FeiShuBotMessage) {
    try {
      const response = await fetch(this.webhook, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to send message to FeiShu bot:', error);
      throw error;
    }
  }
} 