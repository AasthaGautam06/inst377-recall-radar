const express = require('express');
const bodyParser = require('body-parser');
const supabaseClient = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const WebSocket = require('ws');

const app = express();
const port = 3000;

dotenv.config();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = supabaseClient.createClient(
  supabaseUrl,
  supabaseKey,
  {
    realtime: {
      transport: WebSocket,
    },
  }
);

app.get('/', (req, res) => {
  res.sendFile('public/index.html', { root: __dirname });
});


app.get('/recalls', async (req, res) => {
  const keyword = req.query.keyword || '';
  const classification = req.query.classification || '';

  let url = 'https://api.fda.gov/food/enforcement.json?limit=10';

  if (keyword) {
    url = `https://api.fda.gov/food/enforcement.json?search=product_description:${keyword}&limit=10`;
  }

  if (classification) {
    url = `https://api.fda.gov/food/enforcement.json?search=classification:%22${classification}%22&limit=10`;
  }

  const response = await fetch(url);
  const data = await response.json();
  res.json(data);
});

app.get('/saved-recalls', async (req, res) => {
  const { data, error } = await supabase.from('saved_recalls').select();

  if (error) {
    res.status(500).json(error);
  } else {
    res.json(data);
  }
});

app.post('/saved-recalls', async (req, res) => {
  const { product_description, reason_for_recall, classification, report_date } = req.body;

  const { data, error } = await supabase
    .from('saved_recalls')
    .insert({
      product_description,
      reason_for_recall,
      classification,
      report_date,
    })
    .select();

  if (error) {
    res.status(500).json(error);
  } else {
    res.json(data);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});