import App from "../src/App";
import React from "react";
import { ServerLocation } from "@reach/router";
import express from "express";
import fs from "fs";
import { renderToNodeStream } from "react-dom/server";

const PORT = process.env.PORT || 3000;

const html = fs.readFileSync("dist/index.html").toString();

const parts = html.split("not rendered");

const app = express();

app.use("/dist", express.static("dist"));
app.use((req, res) => {
  res.write(parts[0]);
  const reactMarkup = (
    <ServerLocation url={req.url}>
      <App />
    </ServerLocation>
  );
  const stream = renderToNodeStream(reactMarkup);

  stream.pipe(
    res,
    { end: false }
  );

  stream.on("end", () => {
    res.write(parts[1]);
    res.end();
  });
});

console.log("listening on " + PORT);
app.listen(PORT);
