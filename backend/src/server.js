require("dotenv").config();
const app = require("./app");

const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
const connectDB = require("./config/db");

connectDB();

const PORT = process.env.PORT || 5000



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
