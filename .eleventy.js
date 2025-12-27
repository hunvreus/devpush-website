import eleventyLucideicons from "@grimlink/eleventy-plugin-lucide-icons";
import * as lucideIcons from "lucide-static";
import markdownIt from "markdown-it"
import markdownItAnchor from "markdown-it-anchor"
import pluginTOC from "eleventy-plugin-toc"

export default async function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("media");
  eleventyConfig.addWatchTarget("docs/docs.json");
  eleventyConfig.addPlugin(eleventyLucideicons);
  let options = {
		html: true,
		breaks: true,
		linkify: true,
	};

  eleventyConfig.addGlobalData("siteUrl", process.env.SITE_URL || 'http://localhost:8080');
  
  let markdownLib = markdownIt(options).use(
    markdownItAnchor,
    { permalink: markdownItAnchor.permalink.headerLink() }
  );

  const defaultTableOpen = markdownLib.renderer.rules.table_open;
  const defaultTableClose = markdownLib.renderer.rules.table_close;

  markdownLib.renderer.rules.table_open = (tokens, idx, options, env, self) => {
    return '<div class="relative w-full overflow-auto my-6"><table>' + (defaultTableOpen ? defaultTableOpen(tokens, idx, options, env, self) : '');
  };

  markdownLib.renderer.rules.table_close = (tokens, idx, options, env, self) => {
    return (defaultTableClose ? defaultTableClose(tokens, idx, options, env, self) : '') + '</table></div>';
  };

  eleventyConfig.setLibrary("md", markdownLib);
  eleventyConfig.addPlugin(pluginTOC);

  var flattenedMenu = null;
  var flattenedMenuHash = null;

  function flattenMenu(menu) {
    let flat = [];
    menu.forEach(group => {
      if (group.type === 'group') {
        group.items.forEach(item => {
          if (item.type === 'submenu') {
            item.items.forEach(subitem => flat.push(subitem));
          } else {
            flat.push(item);
          }
        });
      }
    });
    return flat;
  }
  
  eleventyConfig.addFilter('getNavigation', function(menu) {
    const menuHash = JSON.stringify(menu);
    if (flattenedMenu === null || flattenedMenuHash !== menuHash) {
      flattenedMenu = flattenMenu(menu);
      flattenedMenuHash = menuHash;
    }
    
    const currentUrl = this.page.url;
    
    const index = flattenedMenu.findIndex(item => {
      const itemUrl = "/docs/" + item;
      return itemUrl === currentUrl;
    });
    
    if (index === -1) return { prev: null, next: null };
    
    return {
      prev: index > 0 ? {
        url: "/docs/" + flattenedMenu[index - 1],
        label: flattenedMenu[index - 1].split('/').pop().replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
      } : null,
      next: index < flattenedMenu.length - 1 ? {
        url: "/docs/" + flattenedMenu[index + 1],
        label: flattenedMenu[index + 1].split('/').pop().replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
      } : null
    };
  });

  let cachedMenus = null;
  let cachedMenuHash = null;

  function buildMenus(menu, collections) {
    const menuHash = JSON.stringify(menu);
    if (cachedMenus && cachedMenuHash === menuHash) return cachedMenus;
    
    cachedMenuHash = menuHash;

    function slugToUrl(slug) {
      if (slug === 'index') return '/docs/';
      if (slug.endsWith('/index')) return '/docs/' + slug.replace(/\/index$/, '/');
      return '/docs/' + slug + '/';
    }

    function processMenuItem(slug) {
      const url = slugToUrl(slug);
      const doc = collections.docs.find(d => d.url === url);
      const iconName = doc?.data?.icon;
      let iconSvg = null;
      if (iconName) {
        const pascalName = iconName.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('');
        const iconComponent = lucideIcons[pascalName];
        if (iconComponent) {
          iconSvg = iconComponent.replace('class="lucide', `class="lucide lucide-${iconName}`);
        }
      }
      const sidebarItem = {
        icon: iconSvg,
        url: url,
        label: doc?.data?.title || slug.replace(/\.md$/, ''),
        description: doc?.data?.description || ''
      };
      const iconHtml = iconSvg ? iconSvg : '';
      const keywords = [sidebarItem.label, sidebarItem.description].filter(Boolean).join(' ');
      const commandItem = {
        type: 'item',
        label: sidebarItem.label,
        content: `${iconHtml}<span>${sidebarItem.label}</span>`,
        keywords: keywords,
        attrs: {
          onclick: `window.location.href='${url}'; this.closest('dialog')?.close();`
        }
      };
      return { sidebar: sidebarItem, command: commandItem };
    }

    function processGroup(group) {
      const sidebarItems = group.items.map(item => {
        if (item.type === 'submenu') {
          return {
            ...item,
            items: item.items ? item.items.map(subitem => processMenuItem(subitem).sidebar) : []
          };
        } else {
          return processMenuItem(item).sidebar;
        }
      });
      const commandItems = group.items.map(item => {
        if (item.type === 'submenu') {
          return {
            type: 'group',
            label: item.label,
            items: item.items ? item.items.map(subitem => processMenuItem(subitem).command) : []
          };
        } else {
          return processMenuItem(item).command;
        }
      });
      return {
        sidebar: { ...group, items: sidebarItems },
        command: { type: 'group', label: group.label, items: commandItems }
      };
    }

    const processed = menu.map(processGroup);
    cachedMenus = {
      sidebar: processed.map(p => p.sidebar),
      command: processed.map(p => p.command)
    };
    return cachedMenus;
  }

  eleventyConfig.addFilter('sidebarMenu', function(menu, collections) {
    return buildMenus(menu, collections).sidebar;
  });

  eleventyConfig.addFilter('commandMenu', function(menu, collections) {
    return buildMenus(menu, collections).command;
  });
}