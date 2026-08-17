const https = require('https');
https.get('https://www.amazon.in/dp/B08D64C9FN', { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const match = data.match(/"large":"(https:\/\/m\.media-amazon\.com\/images\/I\/[^"]+\.jpg)"/);
    console.log(match ? match[1] : 'Not found');
  });
});
