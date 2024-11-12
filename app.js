// app.js
const express = require("express");
const app = express();
const port = 9000;

// Serve static files from the "public" directory
app.use(express.static("public"));

// API endpoint for testing
app.get("/api", (req, res) => {
  res.json({ message: "Hello from Node.js app!" });
});

// Serve the index.html file for the SPA
app.get("*", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
