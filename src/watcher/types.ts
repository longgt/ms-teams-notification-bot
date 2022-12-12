import { AdaptiveCards } from "@microsoft/adaptivecards-tools"
import { Webhooks } from "@octokit/webhooks"
import { WebhookTarget } from "../webhookTarget";

export type WatcherParam = {
    webhooks: Webhooks;
    webhookTarget: WebhookTarget;
    template: any;
    sendNotification: (card: AdaptiveCards.Schema) => void;
}