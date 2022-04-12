const app = require("./routes/index");
const port = process.env.PORT || "5000";
const DatabaseConn = require("./config/dbConfig");
DatabaseConn()
require("dotenv").config();
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
