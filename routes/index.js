const express = require('express');
const router = express.Router();
const qrcode = require('qrcode');
const validUrl = require('valid-url');






// router.get('/', requiresAuth(), (req, res) => {
//     res.render('index', { shortenedUrl: null });
// });

router.post('/shorten', (req, res) => {
  const { url } = req.body;

  // Generate the shortened URL logic here
  const shortenedUrl = generateRandomCode(); 
  
  if (!validUrl.isUri(url)) {
    return res.status(401).json('Invalid url');
  }


  // Generate the QR code
  qrcode.toDataURL(url, (err, qrCodeUrl) => {
    if (err) {
      console.error('Error generating QR code:', err);
      res.sendStatus(500);
    } else {
      const longUrl = url;
      const clickCount = 0; // Replace with the actual click count

      res.render('index', { shortenedUrl, longUrl, clickCount, qrCodeUrl });
    }
  });
});

function generateRandomCode() {
    // Generate a random alphanumeric code
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < 5; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
};

module.exports = router;