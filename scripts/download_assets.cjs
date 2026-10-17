const fs = require('fs');
const path = require('path');
const https = require('https');

const urls = JSON.parse(fs.readFileSync(path.join(__dirname, 'urls.json'), 'utf8'));

// Mapping each ID to a descriptive filename
const mapping = {
  1: { folder: 'branding', file: 'lak-sarees-emblem.png' },
  2: { folder: 'branding', file: 'lak-sarees-emblem-alt.png' },
  3: { folder: 'products', file: 'saree-studio-shoot.jpg' },
  4: { folder: 'products', file: 'saree-devi-crimson.jpg' },
  5: { folder: 'products', file: 'saree-crimson-brocade.jpg' },
  6: { folder: 'products', file: 'saree-mannequin-jasmine.jpg' },
  7: { folder: 'products', file: 'saree-zardozi-kundan.jpg' },
  8: { folder: 'products', file: 'saree-folded-marble.jpg' },
  9: { folder: 'products', file: 'saree-vaishnavi-magenta.jpg' },
  10: { folder: 'products', file: 'saree-royal-patola.jpg' },
  11: { folder: 'products', file: 'saree-sheer-jhumkas.jpg' },
  12: { folder: 'products', file: 'saree-metallic-brass-diya.jpg' },
  13: { folder: 'branding', file: 'pit-loom-artisan.jpg' },
  14: { folder: 'products', file: 'macro-zari-weave.jpg' },
  15: { folder: 'branding', file: 'master-weaver.jpg' },
  16: { folder: 'products', file: 'saree-temple-border-kanchipuram.jpg' },
  17: { folder: 'products', file: 'saree-banarasi-jangla.jpg' },
  18: { folder: 'products', file: 'saree-floral-pallu.jpg' },
  19: { folder: 'products', file: 'saree-folded-jasmine.jpg' },
  20: { folder: 'branding', file: 'muslin-bag.jpg' },
  21: { folder: 'branding', file: 'packaging-box.jpg' },
  22: { folder: 'products', file: 'saree-antique-maroon-bridal.jpg' },
  23: { folder: 'products', file: 'saree-champagne-gold-tissue.jpg' },
  24: { folder: 'products', file: 'saree-emerald-ruby-kanchipuram.jpg' },
  25: { folder: 'products', file: 'saree-burgundy-georgette-zardozi.jpg' },
};

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        return download(response.headers.location, dest).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        return reject(new Error(`Failed to download ${url}: HTTP ${response.statusCode}`));
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve(dest));
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  const publicDir = path.join(__dirname, '..', 'public', 'images');
  ['products', 'branding', 'banners'].forEach(sub => {
    const p = path.join(publicDir, sub);
    if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
  });

  console.log('Downloading 25 high-resolution authentic Stitch assets...');
  for (const item of urls) {
    const map = mapping[item.id];
    if (map) {
      const dest = path.join(publicDir, map.folder, map.file);
      try {
        await download(item.url, dest);
        const stats = fs.statSync(dest);
        console.log(`[Success] ID ${item.id} -> ${map.folder}/${map.file} (${(stats.size / 1024).toFixed(1)} KB)`);
      } catch (err) {
        console.error(`[Error] ID ${item.id}:`, err.message);
      }
    }
  }

  // Also create a fallback saree image from saree-folded-jasmine.jpg or saree-folded-marble.jpg
  const fallbackSrc = path.join(publicDir, 'products', 'saree-folded-jasmine.jpg');
  const fallbackDest = path.join(publicDir, 'fallback-saree.jpg');
  if (fs.existsSync(fallbackSrc)) {
    fs.copyFileSync(fallbackSrc, fallbackDest);
    console.log('[Created] fallback-saree.jpg');
  }

  // Create dedicated category banners using relevant high-res authentic images
  const bannerMap = {
    'banner-bridal.jpg': path.join(publicDir, 'products', 'saree-antique-maroon-bridal.jpg'),
    'banner-banarasi.jpg': path.join(publicDir, 'products', 'saree-devi-crimson.jpg'),
    'banner-kanchipuram.jpg': path.join(publicDir, 'products', 'saree-vaishnavi-magenta.jpg'),
    'banner-cotton.jpg': path.join(publicDir, 'products', 'saree-folded-marble.jpg'),
    'banner-festive.jpg': path.join(publicDir, 'products', 'saree-champagne-gold-tissue.jpg'),
    'banner-heritage.jpg': path.join(publicDir, 'products', 'saree-emerald-ruby-kanchipuram.jpg'),
  };

  for (const [bannerName, srcFile] of Object.entries(bannerMap)) {
    const dest = path.join(publicDir, 'banners', bannerName);
    if (fs.existsSync(srcFile)) {
      fs.copyFileSync(srcFile, dest);
      console.log(`[Created Banner] banners/${bannerName}`);
    }
  }

  console.log('\nAll assets successfully prepared!');
}

run();
