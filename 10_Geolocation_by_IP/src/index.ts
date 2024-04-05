import express from 'express';
import { loadIpData, IpRange } from './data/processCSV.js';
import { isIpInRange } from './data/isInIpRange.js';

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});