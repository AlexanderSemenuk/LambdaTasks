import express, {Request, Response } from 'express';
import { RequestBody, ResponseData } from './types/types.js';
import { calculateResponse } from './utils/calculate.js';

const app = express();
app.use(express.json());


app.post('/process', (req: Request, res: Response) => {
    const requestBody: RequestBody = req.body;
  const responseData: ResponseData = calculateResponse(requestBody);
    res.status(200).json(responseData);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})