import { AdaptiveCards } from "@microsoft/adaptivecards-tools";
import { WatcherParam } from "./types";

function watch(param: WatcherParam) {
  const { webhooks, webhookTarget, template, sendNotification } = param;
  webhooks.on("workflow_job", async ({ id, name, payload }) => {
    const { action, workflow_job, repository, sender } = payload;
    const {
      full_name,
      git_commits_url,
      description,
      html_url: repo_html_url,
    } = repository;
    const { login, html_url: sender_html_url } = sender;
    const { head_sha, html_url, status, started_at, completed_at } =
      workflow_job;
    let commitUrl = git_commits_url.replace("{/sha}", "/" + head_sha);
    commitUrl = await webhookTarget.callGithubApi(commitUrl);

    /**
     * Send adaptive cards.
     */
    sendNotification(
      AdaptiveCards.declare(template).render({
        title: `[${full_name}](${repo_html_url}): A workflow job has been ${action} - ${started_at}!`,
        appName: `${description}`,
        description: `[${login}](${sender_html_url}): head revision [${head_sha}](${commitUrl})`,
        notificationUrl: `${html_url}`,
      })
    );
  });
}

export default watch;
