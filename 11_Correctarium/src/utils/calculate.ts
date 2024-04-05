import moment from "moment-timezone";
import { RequestBody, ResponseData } from "../types/types.js";

export function calculateResponse(requestBody: RequestBody): ResponseData {
    const {language, mimetype, count} = requestBody;

    const symbolsPerHour = language === 'en' ? 333 : 1333;
    const globalMultiplier = mimetype === 'other' ? 1.2 : 1;
    const taskTimeInHours = Math.floor(count / symbolsPerHour) * globalMultiplier;
    const currentTime = moment().tz('Europe/Kiev');
    let deadlineTime = currentTime.add(Math.floor(count / symbolsPerHour) * 60, 'minutes');
    const deadline = deadlineTime.unix();
    const deadlineDate = deadlineTime.format('DD/MM/YYYY HH:mm:ss');
    const startingPrice = language === 'en' ? 120 : 50;
    const pricePerSymbol = language === 'en' ? 0.12 : 0.06;
    const finalPrice = (startingPrice + (count * pricePerSymbol)) * globalMultiplier;
    
    const responseData: ResponseData = { 
        price: finalPrice,
        time: taskTimeInHours,
        deadline: deadline,
        'deadline_date': deadlineDate,
    };

    return responseData;

    
}