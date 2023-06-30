const express = require('express');
const router = express.Router();
const qrcode = require('qrcode');
const validUrl = require('valid-url');


/**
 * @swagger
 * /books:
 *   post:
 *     summary: Shorten Url
 *     tags: [url]
 *     requestBody:
 *       required: true
 *     responses:
 *       200:
 *         description: The url was successfully shortened
 *       500:
 *         description: Some server error
 */




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
