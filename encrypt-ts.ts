// encrypt-ts.ts
import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

// কনফিগারেশন
const PASSWORD = 'Bhai123@2026';
const OUT_DIR = './out';
const ENCRYPTED_DIR = './encrypted';

// কালার কোড
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

console.log(`${colors.cyan}================================${colors.reset}`);
console.log(`${colors.cyan}  🚀 এনক্রিপশন প্রক্রিয়া শুরু  ${colors.reset}`);
console.log(`${colors.cyan}================================${colors.reset}`);

// 1. আউট ফোল্ডার চেক
if (!fs.existsSync(OUT_DIR)) {
  console.log(
    `${colors.red}❌ Error: ${OUT_DIR} ফোল্ডার নেই! আগে বিল্ড করুন।${colors.reset}`,
  );
  process.exit(1);
}

// 2. পুরোনো এনক্রিপ্টেড ফোল্ডার ডিলিট
if (fs.existsSync(ENCRYPTED_DIR)) {
  console.log(
    `${colors.yellow}📌 পুরোনো ${ENCRYPTED_DIR} ফোল্ডার ডিলিট করা হচ্ছে...${colors.reset}`,
  );
  fs.rmSync(ENCRYPTED_DIR, { recursive: true, force: true });
}

// 3. নতুন এনক্রিপ্টেড ফোল্ডার তৈরি
console.log(
  `${colors.yellow}📁 নতুন ${ENCRYPTED_DIR} ফোল্ডার তৈরি করা হচ্ছে...${colors.reset}`,
);
fs.mkdirSync(ENCRYPTED_DIR, { recursive: true });

// 4. _next ফোল্ডার কপি (এটাই সবচেয়ে গুরুত্বপূর্ণ - TailwindCSS এখানে থাকে)
const NEXT_SRC = path.join(OUT_DIR, '_next');
const NEXT_DEST = path.join(ENCRYPTED_DIR, '_next');

if (fs.existsSync(NEXT_SRC)) {
  console.log(
    `${colors.yellow}📂 _next ফোল্ডার কপি করা হচ্ছে...${colors.reset}`,
  );
  fs.cpSync(NEXT_SRC, NEXT_DEST, { recursive: true, force: true });

  // CSS ফাইল চেক
  const cssDir = path.join(NEXT_DEST, 'static', 'css');
  if (fs.existsSync(cssDir)) {
    const cssFiles = fs.readdirSync(cssDir);
    console.log(
      `${colors.green}   ✅ CSS ফাইল পাওয়া গেছে: ${cssFiles.length}টি${colors.reset}`,
    );
    cssFiles.forEach((file, index) => {
      if (index < 3) console.log(`      - ${file}`);
    });
  }
} else {
  console.log(
    `${colors.red}❌ Error: _next ফোল্ডার পাওয়া যায়নি!${colors.reset}`,
  );
  process.exit(1);
}

// 5. অন্যান্য ফাইল ও ফোল্ডার কপি (HTML ছাড়া)
console.log(
  `${colors.yellow}📦 অন্যান্য অ্যাসেট কপি করা হচ্ছে...${colors.reset}`,
);

const items = fs.readdirSync(OUT_DIR);
items.forEach((item) => {
  if (item === '_next' || item === 'index.html') return;

  const srcPath = path.join(OUT_DIR, item);
  const destPath = path.join(ENCRYPTED_DIR, item);
  const stat = fs.statSync(srcPath);

  if (stat.isDirectory()) {
    fs.cpSync(srcPath, destPath, { recursive: true });
    console.log(`   📁 ফোল্ডার: ${item}/`);
  } else {
    fs.copyFileSync(srcPath, destPath);
    console.log(`   📄 ফাইল: ${item}`);
  }
});

// 6. index.html এনক্রিপ্ট
console.log(
  `${colors.yellow}🔒 index.html এনক্রিপ্ট করা হচ্ছে...${colors.reset}`,
);

const indexPath = path.join(OUT_DIR, 'index.html');
const encryptedIndexPath = path.join(ENCRYPTED_DIR, 'index.html');

try {
  execSync(
    `npx staticrypt "${indexPath}" -p "${PASSWORD}" -o "${encryptedIndexPath}"`,
    {
      stdio: 'inherit',
    },
  );
  console.log(`${colors.green}✅ index.html এনক্রিপ্ট সম্পন্ন${colors.reset}`);
} catch (error) {
  console.error(
    `${colors.red}❌ index.html এনক্রিপ্ট করতে সমস্যা:${colors.reset}`,
    error,
  );
  process.exit(1);
}

// 7. অন্য HTML ফাইল থাকলে তাদের জন্যও
items.forEach((item) => {
  if (item.endsWith('.html') && item !== 'index.html') {
    console.log(
      `${colors.yellow}🔒 ${item} এনক্রিপ্ট করা হচ্ছে...${colors.reset}`,
    );
    const srcPath = path.join(OUT_DIR, item);
    const destPath = path.join(ENCRYPTED_DIR, item);

    try {
      execSync(
        `npx staticrypt "${srcPath}" -p "${PASSWORD}" -o "${destPath}"`,
        {
          stdio: 'inherit',
        },
      );
      console.log(
        `${colors.green}   ✅ ${item} এনক্রিপ্ট সম্পন্ন${colors.reset}`,
      );
    } catch (error) {
      console.log(
        `${colors.red}   ❌ ${item} এনক্রিপ্ট করতে সমস্যা${colors.reset}`,
      );
    }
  }
});

// 8. ভেরিফিকেশন HTML ফাইল তৈরি
const testHtmlPath = path.join(ENCRYPTED_DIR, 'test-assets.html');
const testContent = `<!DOCTYPE html>
<html>
<head>
    <title>Asset Test</title>
    <style>
        body { font-family: sans-serif; padding: 20px; background: #f5f5f5; }
        .card { background: white; border-radius: 8px; padding: 15px; margin: 10px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .success { color: #10b981; font-weight: bold; }
        .error { color: #ef4444; font-weight: bold; }
        h1 { color: #2563eb; }
        pre { background: #f0f0f0; padding: 10px; border-radius: 4px; overflow-x: auto; }
    </style>
</head>
<body>
    <h1>🔍 অ্যাসেট টেস্ট পেজ</h1>
    <p>পাসওয়ার্ড: <strong>${PASSWORD}</strong></p>
    
    <div class="card">
        <h2>📁 _next ফোল্ডার চেক</h2>
        <div id="next-check">চেক করা হচ্ছে...</div>
    </div>
    
    <div class="card">
        <h2>🎨 CSS ফাইল চেক</h2>
        <div id="css-check">চেক করা হচ্ছে...</div>
    </div>
    
    <div class="card">
        <h2>📊 কনসোল লগ</h2>
        <pre id="console-log"></pre>
    </div>
    
    <script>
        const logDiv = document.getElementById('console-log');
        function log(msg) {
            logDiv.textContent += msg + '\\n';
            console.log(msg);
        }
        
        // _next ফোল্ডার চেক
        fetch('/_next/static/css/')
            .then(res => {
                const div = document.getElementById('next-check');
                if (res.ok) {
                    div.innerHTML = '<span class="success">✅ _next ফোল্ডার অ্যাক্সেসযোগ্য</span>';
                } else {
                    div.innerHTML = '<span class="error">❌ _next ফোল্ডার অ্যাক্সেসযোগ্য নয়</span>';
                }
            })
            .catch(() => {
                document.getElementById('next-check').innerHTML = '<span class="error">❌ _next ফোল্ডার পাওয়া যায়নি</span>';
            });
        
        // CSS ফাইল চেক
        setTimeout(() => {
            const links = document.querySelectorAll('link[rel="stylesheet"]');
            const cssDiv = document.getElementById('css-check');
            let cssHtml = '';
            
            if (links.length === 0) {
                cssHtml = '<span class="error">❌ কোন CSS ফাইল পাওয়া যায়নি</span>';
            } else {
                cssHtml = '<span class="success">✅ CSS ফাইল পাওয়া গেছে:</span><ul>';
                links.forEach(link => {
                    cssHtml += \`<li>\${link.href} - \${link.href.startsWith('/_next/') ? '✅' : '⚠️'}</li>\`;
                });
                cssHtml += '</ul>';
            }
            cssDiv.innerHTML = cssHtml;
        }, 500);
    </script>
</body>
</html>`;

fs.writeFileSync(testHtmlPath, testContent);
console.log(
  `${colors.green}✅ টেস্ট ফাইল তৈরি হয়েছে: test-assets.html${colors.reset}`,
);

// 9. ফাইনাল রিপোর্ট
console.log(`${colors.cyan}================================${colors.reset}`);
console.log(`${colors.green}✅ এনক্রিপশন সম্পন্ন!${colors.reset}`);
console.log(
  `${colors.yellow}📁 লোকেশন:${colors.reset} ${path.resolve(ENCRYPTED_DIR)}`,
);
console.log(`${colors.cyan}--------------------------------${colors.reset}`);
console.log(`${colors.yellow}🔗 পার্মালিংক:${colors.reset}`);
console.log(
  `${colors.magenta}   https://your-site.netlify.app/#${PASSWORD}${colors.reset}`,
);
console.log(`${colors.cyan}--------------------------------${colors.reset}`);
console.log(
  `${colors.yellow}🔍 টেস্ট করতে:${colors.reset} test-assets.html ফাইলটি ওপেন করুন`,
);
console.log(`${colors.cyan}================================${colors.reset}`);
