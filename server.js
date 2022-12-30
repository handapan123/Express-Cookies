const express = require("express");
const cookieParser = require("cookie-parser");
const timeseries = require("timeseries-analysis");
// const data = [
//   ["2022-01-23T08:08:30.47", 12],
//   ["2022-03-23T08:08:30.47", 16],
//   ["2022-10-23T08:08:30.47", 14],
//   ["2023-01-23T08:08:30.47", 13],
//   ["2023-05-23T08:08:30.47", 11],
//   ["2023-10-23T08:08:30.47", 10],
//   ["2023-12-23T08:08:30.47", 9],
//   ["2024-01-23T08:08:30.47", 11],
//   ["2024-05-23T08:08:30.47", 23],
// ];
const data = [
  6.7, 4.6, 10, 12.7, 6.5, 4.6, 9.8, 13.6, 6.9, 5, 10.4, 14.1, 7, 5.5, 10.8, 15,
  7.1, 5.7, 11.1, 4.5, 8, 6.2, 11.4, 14.9,
];
var t = new timeseries.main(timeseries.adapter.fromArray(data));

const app = express();
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.cookie("newUser", false, { maxAge: 60 * 60 * 1000, httpOnly: true });
  res.send("You got the cookie");
});

app.get("/home", (req, res) => {
  console.log(req.cookies);
  res.json(req.cookies);
});

var coeffs = t.ARMaxEntropy();

console.log(coeffs);

app.listen(3000, () => {
  console.log("server started on port 3000");
  var forecast = 0; // Init the value at 0.
  for (var i = 0; i < coeffs.length; i++) {
    // Loop through the coefficients
    forecast -= t.data[23 - i][1] * coeffs[i];
    // Explanation for that line:
    // t.data contains the current dataset, which is in the format [ [date, value], [date,value], ... ]
    // For each coefficient, we substract from "forecast" the value of the "N - x" datapoint's value, multiplicated by the coefficient, where N is the last known datapoint value, and x is the coefficient's index.
  }
  console.log("forecast", forecast);

  // Now we add the new datapoint to the dataset.
  data.push(forecast);
  t = new timeseries.main(timeseries.adapter.fromArray(data));

  coeffs = t.ARMaxEntropy();
  forecast = 0; // Init the value at 0.
  for (var i = 0; i < coeffs.length; i++) {
    // Loop through the coefficients
    forecast -= t.data[24 - i][1] * coeffs[i];
    // Explanation for that line:
    // t.data contains the current dataset, which is in the format [ [date, value], [date,value], ... ]
    // For each coefficient, we substract from "forecast" the value of the "N - x" datapoint's value, multiplicated by the coefficient, where N is the last known datapoint value, and x is the coefficient's index.
  }
  console.log("forecast", forecast);
});
