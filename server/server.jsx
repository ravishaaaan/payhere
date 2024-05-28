const express = require('express');
const mysql = require('mysql2/promise');
const axios = require('axios');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 4000;

app.use(bodyParser.json());
app.use(cors());

// Function to calculate MD5 hash and convert to uppercase
const md5 = (value) => crypto.createHash('md5').update(value).digest('hex').toUpperCase();

app.post('/process-order', async (req, res) => {
  const { order_id } = req.body;

  try {
    // Create a connection to the database
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      port: process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    // Query to retrieve the required data
    const [rows] = await connection.execute(`
      SELECT order_id, amount, currency, NIC, first_name, last_name, email, phone, address, city, country 
      FROM orders 
      WHERE order_id = ?`, [order_id]);

    if (rows.length === 0) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }

    const order = rows[0];

    // Format the amount
    const amountFormatted = parseFloat(order.amount)
      .toLocaleString("en-US", { minimumFractionDigits: 2 })
      .replace(/,/g, "");

    // Calculate the hash
    const merchantId = '1226200'; // Replace with your actual merchant ID
    const merchantSecret = process.env.PAYHER_SECRET;
    const hashedSecret = md5(merchantSecret);
    const hash = md5(merchantId + order.order_id + amountFormatted + order.currency + hashedSecret);

    // Prepare the data to send to the payment gateway
    const paymentData = {
      merchant_id: merchantId,
      return_url: "http://localhost:3000",
      cancel_url: "http://localhost:3000",
      notify_url: "http://sample.com/notify",
      order_id: order.order_id,
      items: order.order_id,
      currency: order.currency,
      amount: amountFormatted,
      nic: order.NIC,
      first_name: order.first_name,
      last_name: order.last_name,
      email: order.email,
      phone: order.phone,
      address: order.address,
      city: order.city,
      country: order.country,
      hash: hash,
    };

    // Send the data to the payment gateway
    const response = await axios.post(process.env.PAYMENT_GATEWAY_URL, paymentData);

    res.json(response.data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
