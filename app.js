const express = require("express");
const app = express();
const port = 3000;
const https = require("https");
const { nextTick } = require("process");
const options = {
  hostname: "cdn-api.co-vin.in",
  path: "/api/v2/appointment/sessions/public/calendarByDistrict?district_id=664&date=28-10-2021",
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "user-agent":
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36",
  },
};
const bot = {
  hostname: "api.telegram.org",
  path: "/bot2090421634:AAHr4_9cGWHxzlnEAHRi48CQttHl3x8xUgU/sendMessage?chat_id=1337164949&text=hello",
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "user-agent":
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36",
  },
};
let arr = [];

app.get("/", demo, (re, res) => {
  res.send("Hello");
});
async function demo(req, res, next) {
  try {
    await url(options);
    arr[0] = JSON.parse(arr[0]);
    let centres = [];

    centres = arr[0].centers;
    console.log(centres.length)

    let message = "";
    let path = "";

    for (let i = 0; i < centres.length; i++) {
      let available_capacity_dose1 =
        centres[i].sessions[0].available_capacity_dose1;
      if (available_capacity_dose1 > 0 && centres[i].center_id === 697278) {
          console.log("if block")
        message =centres[i].sessions[0].slots + "" + centres[i].sessions[0].vaccine;
        path = `/bot2090421634:AAHr4_9cGWHxzlnEAHRi48CQttHl3x8xUgU/sendMessage?chat_id=1337164949&text=${message}`;
        bot.path=path;
        console.log(bot.path);
        await url(bot);
        break;
      }
    }
  } catch (err) {
    console.log(err);
  }
  next();
}

async function url(options) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      console.log(`statusCode: ${res.statusCode}`);
      var body = "";
      res.on("data", (d) => {
        body = body + d;
      });
      res.on("end", function () {
        arr.push(body);
        resolve(arr);
      });
    });

    req.on("error", (error) => {
      console.error(error);
      reject();
    });

    req.end();
  });
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
