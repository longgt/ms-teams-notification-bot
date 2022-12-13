import axios from "axios";

export class WebhookTarget {
  /**
   * The bound incoming webhook URL.
   */
  public readonly webhook: URL;

  /**
   * Constructor.
   *
   * @param webhook - the incoming webhook URL.
   */
  constructor(webhook: URL) {
    this.webhook = webhook;
  }

  /**
   * Send a plain text message.
   *
   * @param text - the plain text message.
   * @returns A `Promise` representing the asynchronous operation.
   */
  public sendMessage(text: string): Promise<void> {
    return axios.post(
      this.webhook.toString(),
      {
        text: text,
      },
      {
        headers: { "content-type": "application/json" },
      }
    );
  }

  /**
   * Send an adaptive card message.
   *
   * @param card - the adaptive card raw JSON.
   * @returns A `Promise` representing the asynchronous operation.
   */
  public sendAdaptiveCard(card: unknown): Promise<void> {
    return axios
      .post(
        this.webhook.toString(),
        {
          type: "message",
          attachments: [
            {
              contentType: "application/vnd.microsoft.card.adaptive",
              contentUrl: null,
              content: card,
            },
          ],
        },
        {
          headers: { "content-type": "application/json" },
        }
      );
  }

  /**
   * Call Github API with specific URL
   * @param api_url Github API URL
   */
  public callGithubApi(api_url: string): Promise<string> {
    // Add Github API token for doing authorization, if existed
    const headers = process.env.GITHUB_API_TOKEN ? {
      'Authorization': `Bearer ${process.env.GITHUB_API_TOKEN}`
    } : undefined;

    return axios.get(api_url, {
      headers
    }).then((res) => {
      const { html_url } = res.data;
      return html_url;
    });
  }
}
