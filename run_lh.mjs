import lighthouse from 'lighthouse';
import puppeteer from 'puppeteer';

(async () => {
  console.log("Starting Puppeteer...");
  const browser = await puppeteer.launch({headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox']});
  const port = new URL(browser.wsEndpoint()).port;
  console.log("Browser launched on port " + port);
  
  const options = {logLevel: 'error', output: 'json', port, onlyCategories: ['accessibility', 'seo']};
  
  const pages = ['index.html', 'about.html', 'projects.html', 'skills.html', 'contact.html'];
  
  for (const page of pages) {
      const url = `http://localhost:3000/${page}`;
      const runnerResult = await lighthouse(url, options);
      
      const acc = Math.round(runnerResult.lhr.categories.accessibility.score * 100);
      const seo = Math.round(runnerResult.lhr.categories.seo.score * 100);
      console.log(`[RESULT] ${page} | Accessibility: ${acc} | SEO: ${seo}`);
  }
  
  await browser.close();
  console.log("Done.");
})();
