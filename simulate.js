const axios = require('axios');

// --- CONFIGURATION ---
// 🔑 IMPORTANT: Replace with the API Key of the sensor you want to simulate
const API_KEY = 'b6d33252d67b5f8583b9a86b6e3d9ce5';
const API_URL = 'http://localhost:3001/api/measurements';
const SIMULATION_INTERVAL_MS = 2000; // Send data every 2 seconds

/**
 * Generates random sensor data to simulate a real device.
 * @returns {{temperature: string, humidity: string}}
 */
function generateRandomData() {
  // Temperature between 20.00 and 35.00
  const temperature = (Math.random() * 15 + 20).toFixed(2);
  // Humidity between 40.00 and 80.00
  const humidity = (Math.random() * 40 + 40).toFixed(2);
  return { temperature, humidity };
}

/**
 * Sends the simulated sensor data to the backend API.
 */
async function sendMeasurement() {
  const data = generateRandomData();
  const timestamp = new Date().toLocaleTimeString('en-US', { timeZone: 'Africa/Dakar' });

  console.log(`[${timestamp}] Simulating data: Temp: ${data.temperature}°C, Humidity: ${data.humidity}%`);

  try {
    await axios.post(API_URL, data, {
      headers: {
        'X-API-Key': API_KEY,
        'Content-Type': 'application/json',
      },
    });
    console.log(`   ✅ Data sent successfully.`);
  } catch (error) {
    const errorMessage = error.response ? error.response.data.message : error.message;
    console.error(`   ❌ Error sending data: ${errorMessage}`);
  }
}

// --- SCRIPT EXECUTION ---
function main() {
  if (API_KEY === '' || !API_KEY) {
    console.error('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    console.error('!!! PLEASE SET A VALID API_KEY IN simulate.js.       !!!');
    console.error('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    process.exit(1);
  }

  console.log('Sensor simulator started.');
  console.log(`Targeting API Key: ...${API_KEY.slice(-6)}`);
  console.log(`Sending data to ${API_URL} every ${SIMULATION_INTERVAL_MS / 1000} seconds.`);
  
  // Send data immediately on start, then begin the interval
  sendMeasurement();
  setInterval(sendMeasurement, SIMULATION_INTERVAL_MS);
}

main();