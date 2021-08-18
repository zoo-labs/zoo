const fs = require("fs");

if (!fs.existsSync("./src/contracts.json")) {
  try {
    fs.writeFileSync("./src/contracts.json", JSON.stringify({}));

    console.log("src/contracts.json created.");
  } catch (error) {
    console.log(error);
  }
}
