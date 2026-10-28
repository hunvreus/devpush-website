import examples from './compose-examples.json';

const names = ['WordPress', 'Gitea', 'GitLab', 'n8n', 'Hermes Agent', 'Metabase', 'Mattermost', 'Strapi', 'Penpot', 'PostHog', 'Open WebUI', 'Plausible'];
export const homepageApps = names.map(name => {
  const app = examples.find(app => app.name === name);
  if (!app) throw new Error(`Missing homepage app: ${name}`);
  return app;
});
