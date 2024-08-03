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
  try {
    var jscode = req.body.jscode;
    jscode = jscode.replace("/aes.js", "https://pastebin.com/raw/pKrFHFzf");
    jscode = jscode.replace("location.href", "var uselessvar12345");

    const dom = new JSDOM(jscode, { 
      runScripts: "dangerously", 
      resources: "usable",
      url: "http://example.com", // Imposta un URL di base
      referrer: "http://example.com", // Imposta un referrer
      contentType: "text/html",
      includeNodeLocations: true,
      storageQuota: 10000000, // Simula una quota di storage
    });

    const { window } = dom;

    // Simula oggetti e funzioni del browser
    window.alert = console.log;
    window.console = console;
    window.fetch = () => Promise.resolve(new Response());
    window.localStorage = {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
    };
    window.sessionStorage = { ...window.localStorage };

    // Simula navigator
    window.navigator = {
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      language: "en-US",
      languages: ["en-US", "en"],
      onLine: true,
      cookieEnabled: true,
    };

    // Simula screen
    window.screen = {
      width: 1920,
      height: 1080,
      colorDepth: 24,
    };

    setTimeout(function() {
      res.send(window.document.cookie || "No cookie set");
    }, 500);

  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Esporta il router per essere utilizzato in index.js
module.exports = router;