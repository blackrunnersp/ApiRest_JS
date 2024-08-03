const express = require('express');
const router = express.Router();
const authenticate = require('../utils/authenticate');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const bodyParser = require('body-parser');

// Middleware per parsing del corpo delle richieste in JSON e URL encoded
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Definisci le rotte usando `router`
router.get('/', authenticate, async (req, res) => {
  res.send("authcookie");
});

router.post('/', authenticate, async (req, res) => {
  var jscode = req.body.jscode;
  jscode = jscode.replace("/aes.js", "https://pastebin.com/raw/pKrFHFzf");
  jscode = jscode.replace("location.href", "var uselessvar12345");
  jscode = new JSDOM(jscode, { runScripts: "dangerously", resources: "usable" });
  setTimeout(function() {
  res.send(jscode.window.document.cookie)}, 2000);
  return;
});


// Esporta il router per essere utilizzato in index.js
module.exports = router;
