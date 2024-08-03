const express = require('express');
const router = express.Router();
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const bodyParser = require('body-parser');

// Middleware per parsing del corpo delle richieste in JSON e URL encoded
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Definisci le rotte usando `router`
router.get('/', (req, res) => {
  res.send("ok.");
});

router.post('/', (req, res) => {
  let jscode = req.body.jscode;
  
  // Modifiche al codice JavaScript
  jscode = jscode.replace("/aes.js", "https://pastebin.com/raw/pKrFHFzf");
  jscode = jscode.replace("location.href", "var uselessvar12345");

  // Utilizzo di JSDOM
  const dom = new JSDOM(jscode, { runScripts: "dangerously", resources: "usable" });
  
  // Risposta con il cookie dopo un timeout
  setTimeout(() => {
    res.send(dom.window.document.cookie);
  }, 500);
});

// Esporta il router per essere utilizzato in index.js
module.exports = router;
