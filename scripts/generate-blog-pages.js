import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://npkrishna.com';

// Read the base HTML template
const baseHtmlPath = path.join(__dirname, '../dist/index.html');
const baseHtml = fs.readFileSync(baseHtmlPath, 'utf-8');

// Read all MDX files from content/posts
const postsDir = path.join(__dirname, '../src/content/posts');
const postFiles = fs.readdirSync(postsDir).filter(file => file.endsWith('.mdx'));

function extractFrontmatter(content) {
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) return {};

  const frontmatter = {};
  const lines = frontmatterMatch[1].split('\n');

  for (const line of lines) {
    if (line.includes(':')) {
      const [key, ...valueParts] = line.split(':');
      let value = valueParts.join(':').trim();
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }
      frontmatter[key.trim()] = value;
    }
  }

  return frontmatter;
}

function injectMeta(html, { title, description, url, type = 'website', extraMeta = '' }) {
  // Add canonical tag right before </head>
  const canonical = `  <link rel="canonical" href="${url}" />\n`;

  return html
    .replace('<title>Krishna Neupane • Portfolio Website</title>',
             `<title>${title}</title>`)
    .replace('<meta name="description" content="Teacher, Web Developer, and Content Writer - Building meaningful digital experiences and sharing knowledge." />',
             `<meta name="description" content="${description}" />`)
    .replace('<meta property="og:title" content="Krishna Neupane • Portfolio Website" />',
             `<meta property="og:title" content="${title}" />`)
    .replace('<meta property="og:description" content="Teacher, Web Developer, and Content Writer - Building meaningful digital experiences and sharing knowledge." />',
             `<meta property="og:description" content="${description}" />`)
    .replace('<meta property="og:type" content="website" />',
             `<meta property="og:type" content="${type}" />\n  <meta property="og:url" content="${url}" />`)
    .replace('</head>', `${canonical}${extraMeta}</head>`);
}

function writeStaticPage(distPath, html) {
  const dir = path.dirname(distPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(distPath, html);
}

// --- Blog post pages ---
const blogsDir = path.join(__dirname, '../dist/blogs');
if (!fs.existsSync(blogsDir)) fs.mkdirSync(blogsDir, { recursive: true });

postFiles.forEach(file => {
  const slug = file.replace('.mdx', '');
  const filePath = path.join(postsDir, file);
  const content = fs.readFileSync(filePath, 'utf-8');
  const frontmatter = extractFrontmatter(content);

  const title = `${frontmatter.title || 'Untitled'} | Krishna Neupane`;
  const description = frontmatter.excerpt || 'Blog post by Krishna Neupane';
  const url = `${BASE_URL}/blogs/${slug}/`;
  const image = `${BASE_URL}/images/og-site.png`;

  const extraMeta = `  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${frontmatter.title || 'Untitled'}" />
  <meta name="twitter:description" content="${description}" />
  <meta name="twitter:image" content="${image}" />
  <meta property="og:image" content="${image}" />
  <meta property="article:author" content="Krishna Neupane" />
`;

  const html = injectMeta(baseHtml, { title, description, url, type: 'article', extraMeta });
  writeStaticPage(path.join(blogsDir, slug, 'index.html'), html);
  console.log(`Generated: /blogs/${slug}/index.html`);
});

// --- /blogs listing page ---
{
  const html = injectMeta(baseHtml, {
    title: 'Blogs | Krishna Neupane',
    description: 'Articles and stories by Krishna Neupane on technology, education, culture, and more.',
    url: `${BASE_URL}/blogs/`,
  });
  writeStaticPage(path.join(blogsDir, 'index.html'), html);
  console.log('Generated: /blogs/index.html');
}

// --- /projects page ---
{
  const projectsDir = path.join(__dirname, '../dist/projects');
  const html = injectMeta(baseHtml, {
    title: 'Projects | Krishna Neupane',
    description: 'Web development and software projects built by Krishna Neupane.',
    url: `${BASE_URL}/projects/`,
  });
  writeStaticPage(path.join(projectsDir, 'index.html'), html);
  console.log('Generated: /projects/index.html');
}

console.log(`\n✅ Generated ${postFiles.length} blog post(s) + /blogs + /projects`);
