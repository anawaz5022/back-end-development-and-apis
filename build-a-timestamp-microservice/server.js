import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static("public"));

app.get("/", (_req, res) => {
  res.sendFile(import.meta.dirname + "/views/index.html");
});

// Do not change code above this line

// 1. Route for empty date parameter -> returns current time
app.get("/api", (req, res) => {
  const dateObj = new Date();
  res.json({
    unix: dateObj.getTime(),
    utc: dateObj.toUTCString(),
  });
});

// 2. Route with date parameter
app.get("/api/:date", (req, res) => {
  const { date } = req.params;
  let dateObj;

  if (!isNaN(date)) {
    dateObj = new Date(Number(date));
  } else {
    dateObj = new Date(date);
  }

  if (dateObj.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: dateObj.getTime(),
    utc: dateObj.toUTCString(),
  });
});

// Do not change code below this line

const PORT = 8000;
const listener = app.listen(PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});