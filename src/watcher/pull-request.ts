import { AdaptiveCards } from "@microsoft/adaptivecards-tools";
import { WatcherParam } from "./types";

function watch(param: WatcherParam) {
  const { webhooks, template, sendNotification } = param;
  webhooks.on("pull_request.opened", ({ id, name, payload }) => {
    const { action, pull_request, repository, sender } = payload;
    const { title, html_url, created_at } = pull_request;
    const { full_name } = repository;
    const { login } = sender;

    /**
     * Send adaptive cards.
     */
    sendNotification(
      AdaptiveCards.declare(template).render({
        title: `[${full_name}]: A PR has been ${action} - ${created_at}!`,
        appName: "Github Webhook Notification App",
        description: `[${login}]: ${title}`,
        notificationUrl: `${html_url}`,
      })
    );
  });

  webhooks.on("pull_request.closed", ({ id, name, payload }) => {
    const { action, pull_request, repository, sender } = payload;
    const { title, html_url, closed_at, merged } = pull_request;
    const { full_name } = repository;
    const { login } = sender;

    /**
     * Send adaptive cards.
     */
    sendNotification(
      AdaptiveCards.declare(template).render({
        title: `[${full_name}]: A PR has been ${
          merged ? "merged" : action
        } - ${closed_at}!`,
        appName: "Github Webhook Notification App",
        description: `[${login}]: ${title}`,
        notificationUrl: `${html_url}`,
      })
    );
  });
}

export default watch;
