# ms-teams-notification-bot
A notification bot of MS Teams integrates with GitHub web hook

## How to configure

Open `.env` file then replace the following key with appropriate value:
 - MS_TEAMS_WEBHOOK_URL: MS Teams channel > Connectors > Incoming Webhook
 - GITHUB_WEBHOOK_SECRET: Use https://generate-random.org/api-key-generator to generate
 - GITHUB_API_TOKEN: Settings > Developer settings > Personal access token > Must grant "Readonly" to Repository contents, commits, branches, downloads, releases, and merges.

> Notes:
 - For organization repository, an access token key for organization is required.
 - For public repository, Github API Token is optional.

## How to run

Install dependencies

```
npm install
```

Start server
```
npm run start
```

The server will be served at http://localhost:3000/api/github/webhooks

Publish to Internet by using [Ngrok](https://ngrok.com/)
```
ngrok http 3000
```

At this time, use the public URL of Ngrok to configure Github Webhook at `<Your repo> > Settings > Webhooks`:
 - Payload URL: <Ngrok public URL>/api/github/webhooks
 - Content type: application/json (`application/x-www-form-urlencoded` is not supported)
 - Secret: same value as <GITHUB_WEBHOOK_SECRET>
  
