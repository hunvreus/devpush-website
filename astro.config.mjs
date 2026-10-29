import { defineConfig } from 'astro/config';
import reallySimpleDocs from 'reallysimpledocs/astro';
import { redirects } from './scripts/redirects.mjs';

export default defineConfig({
  site: 'https://devpu.sh',
  output: 'static',
  devToolbar: { enabled: false },
  redirects,
  integrations: [reallySimpleDocs({
    docsDir: './docs',
    routeBase: '/docs',
    style: 'nova',
    customCss: ['./src/styles/site.css'],
    components: {
      SidebarHeader: './src/components/DocsSidebarHeader.astro',
      ContentHeader: './src/components/DocsContentHeader.astro',
    },
    shiki: { themes: { light: 'github-light', dark: 'github-dark' }, defaultColor: false },
    site: {
      title: 'devpush',
      description: 'Deploy from GitHub to your own servers with Docker Compose.',
      url: 'https://devpu.sh',
      favicon: '/favicon.svg?v=2',
      appleTouchIcon: '/apple-touch-icon.png?v=2',
      socialImage: '/social.png?v=2',
      author: { name: 'devpush' },
    },
  })],
});
