import fs from "fs";
import url from "url";
import http from "http";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import sendingEmails from "./mailer.js";
import { getData } from "./miIndicador.js";

const PORT = 3000;
http
  .createServer(function (req, res) {
    if (req.url == "/") {
      res.setHeader("content-type", "text/html");
      fs.readFile("index.html", "utf8", (err, data) => {
        res.end(data);
      });
    }
    if (req.url.startsWith("/mailing")) {
      let { to, subject, content } = url.parse(req.url, true).query;
      console.log(content);
      if (to !== "" && subject !== "" && content !== "") {
        let file = `mails/${moment().format("LLL")}-${uuidv4().slice(
          24,
          36
        )}.txt`;
        getData().then((text) => {
          let textMessage = content + text;
          fs.writeFile(
            file,
            textMessage.replace(/(&nbsp;|<([^>]+)>)/gi, ""),
            "UTF-8",
            (err, data) => {
              err
                ? console.log(err)
                : console.log(`file created - ${file.slice(-16)}`);
            }
          );
          sendingEmails(to.split(","), subject, textMessage);
        });
        res.write("Emails sent successfully");
        res.end();
      } else {
        console.log("you must complete all fields");
        res.write("you must complete all fields");
        res.end();
      }
    }
  })
  .listen(PORT, () =>
    console.log(
      `Server listen on http://localhost:${PORT} on pid ${process.pid}`
    )
  );
