const fs = require('fs');
const path = require('path');

function getFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getFiles(fullPath, fileList);
    } else if (file.endsWith('.html')) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

const baseDir = path.join(__dirname, '..', 'stitch_lak_sarees_luxury_boutique');
const htmlFiles = getFiles(baseDir);

const found = new Map();

for (const f of htmlFiles) {
  const content = fs.readFileSync(f, 'utf8');
  // Look for any image URLs (lh3 or others)
  const regex = /https:\/\/[^\s\"'\)]+\.(?:jpg|jpeg|png|webp)|https:\/\/lh3\.googleusercontent\.com\/[^\s\"'\)]+/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const url = match[0];
    if (!found.has(url)) {
      found.set(url, []);
    }
    const idx = match.index;
    const snippet = content.slice(Math.max(0, idx - 100), Math.min(content.length, idx + url.length + 100));
    found.get(url).push({ file: path.relative(baseDir, f), snippet });
  }
}

console.log(`Found ${found.size} unique image URLs across ${htmlFiles.length} HTML files:`);
let idx = 1;
const result = [];
for (const [url, occurrences] of found.entries()) {
  result.push({ id: idx, url, occurrences });
  console.log(`\n[${idx++}] URL: ${url}`);
  occurrences.forEach(o => {
    console.log(`  File: ${o.file}`);
    console.log(`  Snippet: ${o.snippet.replace(/\s+/g, ' ').slice(0, 150)}`);
  });
}

fs.writeFileSync(path.join(__dirname, 'urls.json'), JSON.stringify(result, null, 2));
console.log('Saved to scripts/urls.json');
