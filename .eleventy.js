const moment = require('moment');
const pluginRss = require("@11ty/eleventy-plugin-rss");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
moment.locale('en');

module.exports = function(eleventyConfig) {
  // Markdown Extension Setup
  const md = require('markdown-it')({ html: true, linkify: true, typographer: true })
    .use(require('markdown-it-anchor'), {}) // adds id tags to each header element so you can link directly to them
    .use(require('markdown-it-link-attributes'), { // add attributes to links
      matcher(href, config) {
        return href.startsWith("https:") || href.startsWith("http:")
      },
      attrs: {
        target: "_blank",
        rel: "noopener",
      },
    });

  eleventyConfig.addPlugin(syntaxHighlight); //https://www.11ty.dev/docs/plugins/syntaxhighlight/

  eleventyConfig.setLibrary("md", md)

  eleventyConfig.addFilter('dateIso', date => {
    return moment(date).toISOString();
  });

  eleventyConfig.addFilter('dateReadable', date => {
    return moment(date).utc().format('LL'); // E.g. May 31, 2019
  });

  eleventyConfig.addFilter('dateSimple', date => {
    return moment(date).utc().format('YYYY-MM-DD'); // E.g. May 31, 2019
  });

  // CSS Setup
  eleventyConfig.addPassthroughCopy('static');
  eleventyConfig.addWatchTarget('static');

  // Shortcode Setup
  eleventyConfig.addShortcode('excerpt', article => extractExcerpt(article));

  // RSS Setup
  eleventyConfig.addPlugin(pluginRss);

  return {
    dir: {
      input: 'pages'
    },
    // markdownTemplateEngine: "njk",
  }
};

function extractExcerpt(article) {
  if (!article.hasOwnProperty('templateContent')) {
    console.warn('Failed to extract excerpt: Document has no property "templateContent".');
    return null;
  }

  let excerpt = null;
  const content = article.templateContent;

  // console.log(content)

  // The start and end separators to try and match to extract the excerpt
  const separatorsList = [
    { start: '<!-- Excerpt Start -->', end: '<!-- Excerpt End -->' },
    { start: '<p>', end: '</p>' }
  ];

  separatorsList.some(separators => {
    const startPosition = content.indexOf(separators.start);
    const endPosition = content.indexOf(separators.end);

    if (startPosition !== -1 && endPosition !== -1) {
      excerpt = content.substring(startPosition + separators.start.length, endPosition).trim();
      return true; // Exit out of array loop on first match
    }
  });

  return excerpt;
}
