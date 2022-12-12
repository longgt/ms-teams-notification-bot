import * as dotenv from "dotenv";
import * as http from "http";
import { AdaptiveCards } from "@microsoft/adaptivecards-tools";
import { Webhooks, createNodeMiddleware } from "@octokit/webhooks";
import { WebhookTarget } from "./webhookTarget";
import pullRequestWatcher from "./watcher/pull-request";
import workJobWatcher from "./watcher/work-job";
import template from "./adaptiveCards/notification-default.json";

// Load environment variables
dotenv.config();

async function sendNotification(card: AdaptiveCards.Schema) {
  /**
   * Send adaptive cards.
   */
  return webhookTarget
    .sendAdaptiveCard(card)
    .catch((e) => console.log(`Failed to send adaptive card. ${e}`));
}

const webhooks = new Webhooks({
  secret: process.env.GITHUB_WEBHOOK_SECRET,
});

/**
 * Fill in your incoming webhook url.
 */
const webhookUrl: string = `${process.env.MS_TEAMS_WEBHOOK_URL}`;
const webhookTarget = new WebhookTarget(new URL(webhookUrl));

pullRequestWatcher({ webhooks, webhookTarget, template, sendNotification });
workJobWatcher({ webhooks, webhookTarget, template, sendNotification });

// Create server
http
  .createServer(
    createNodeMiddleware(webhooks, {
      path: process.env.API_PATH,
    })
  )
  .listen(process.env.API_PORT);
