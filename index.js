
const fs = require("fs");
const puppeteer = require("puppeteer");



async function createPDFFromURL(url) {
  try {
    console.log("opening browser");
    const browser = await puppeteer.launch({
      dumpio: false,
      pipe: true,
      headless: false,
      args: ['--disable-gpu', '--full-memory-crash-report', '--unlimited-storage',
         '--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-dev-profile']
    });

    const page = await browser.newPage();

    
    // Navigate to the URL
    await page.goto(url, { waitUntil: 'networkidle0' });

     // Scroll to the bottom of the page
    let scrollHeight = 0;
    let previousHeight;
    while (scrollHeight !== previousHeight) {
      previousHeight = scrollHeight;
      scrollHeight = await page.evaluate(() => {
        window.scrollBy(0, window.innerHeight);
        return document.body.scrollHeight;
      });
      await page.waitForTimeout(10000); // Adjust this value if needed
    }
      console.log("generating PDF");
    
      await page.pdf({ path: `x.pdf`, format: "A4", scale: 0.5 });
      await browser.close();
  
    
  } catch (error) {
    console.error("Error:", error);
  }
}


createPDFFromURL('https://github.com/07-Mayankraj')
