const connection = mysql.createConnection({
  host: process.env.DB_HOST, // Pastikan ini terisi di Dashboard Hosting
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
