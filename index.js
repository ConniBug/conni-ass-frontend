const { name, version } = require('./package.json');
const express = require('express');
const router = express.Router();

router.all('/', (_req, res) => res.send('My awesome dashboard!'));

// These exports are REQUIRED by ass, so don't forget to set them!
module.exports = {
    router,                       // The dashboard router itself
    enabled: true,                // Required to activate frontend in ass; DO NOT change unless you want to disable your frontend
    brand: `${name} v${version}`, // Printed in ass logs & reported to client. Can be changed to your liking
    endpoint: '/dashboard'        // URL to use for your dashboard router. ass will automatically set up Express to use this value. Can be changed to your liking
};