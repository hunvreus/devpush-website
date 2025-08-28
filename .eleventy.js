import eleventyLucideicons from "@grimlink/eleventy-plugin-lucide-icons";
import markdownIt from "markdown-it"
import markdownItAnchor from "markdown-it-anchor"
import pluginTOC from "eleventy-plugin-toc"

export default async function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPlugin(eleventyLucideicons);
  let options = {
		html: true,
		breaks: true,
		linkify: true,
	};
  
  let markdownLib = markdownIt(options).use(
    markdownItAnchor,
    { permalink: markdownItAnchor.permalink.headerLink() }
  );

  const defaultTableOpen = markdownLib.renderer.rules.table_open;
  const defaultTableClose = markdownLib.renderer.rules.table_close;

  markdownLib.renderer.rules.table_open = (tokens, idx, options, env, self) => {
    return '<div class="relative w-full overflow-auto"><table>' + (defaultTableOpen ? defaultTableOpen(tokens, idx, options, env, self) : '');
  };

  markdownLib.renderer.rules.table_close = (tokens, idx, options, env, self) => {
    return (defaultTableClose ? defaultTableClose(tokens, idx, options, env, self) : '') + '</table></div>';
  };

  eleventyConfig.setLibrary("md", markdownLib);
  eleventyConfig.addPlugin(pluginTOC);

  var flattenedMenu = null;

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
    if (flattenedMenu === null) flattenedMenu = flattenMenu(menu);
    const currentUrl = this.page.url.replace(/^\/|\/$/g, '')
    const index = flattenedMenu.findIndex(item => item.url.replace(/^\/|\/$/g, '') === currentUrl);
    
    if (index === -1) return { prev: null, next: null };
    return {
      prev: index > 0 ? flattenedMenu[index - 1] : null,
      next: index < flattenedMenu.length - 1 ? flattenedMenu[index + 1] : null
    };
  });
}