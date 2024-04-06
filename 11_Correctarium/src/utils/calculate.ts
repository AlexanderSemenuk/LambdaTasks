import moment from "moment-timezone";
import { RequestBody, ResponseData } from "../types/types.js";

export function calculateResponse(requestBody: RequestBody): ResponseData {
    const { language, mimetype, count } = requestBody;

    const symbolsPerHour = language === 'en' ? 333 : 1333;
    const globalMultiplier = mimetype === 'other' ? 1.2 : 1;
    const taskTime = Math.floor((count / symbolsPerHour) * globalMultiplier) * 60;
    const deadline = calculateDeadline(taskTime);
    const startingPrice = language === 'en' ? 120 : 50;
    const pricePerSymbol = language === 'en' ? 0.12 : 0.05;
    const finalPrice = (startingPrice + (count * pricePerSymbol)) * globalMultiplier;
    
    const responseData: ResponseData = { 
        price: finalPrice,
        time: taskTime / 60,
        deadline: Math.floor(deadline.getTime() / 1000),
        'deadline_date': deadline.toLocaleString(),
    };

    return responseData;
}

export function calculateDeadline(taskDurationInMinutes: number, now: Date = new Date()) {
    let durationLeft = taskDurationInMinutes;
  
    const startOfWorkDay = 10;
    const endOfWorkDay = 19;
    const workDayDurationInMinutes = (endOfWorkDay - startOfWorkDay) * 60;
  
    let deadline = new Date(now);
  
    if (now.getDay() === 0) {
      deadline.setDate(deadline.getDate() + 1);
    } else if (now.getDay() === 6) {
      deadline.setDate(deadline.getDate() + 2);
    } else if (now.getHours() < startOfWorkDay) {
      deadline.setHours(startOfWorkDay, 0, 0, 0);
    } else if (now.getHours() >= endOfWorkDay || (now.getHours() === endOfWorkDay && now.getMinutes() > 0)) {
      deadline.setDate(deadline.getDate() + 1);
      deadline.setHours(startOfWorkDay, 0, 0, 0);
    } else {
      let currentDayWorkTimeLeft = endOfWorkDay * 60 - (deadline.getHours() * 60 + deadline.getMinutes());
      if (durationLeft <= currentDayWorkTimeLeft) {
        deadline.setMinutes(deadline.getMinutes() + durationLeft);
      } else {
        durationLeft -= currentDayWorkTimeLeft;
        deadline.setDate(deadline.getDate() + 1);
        deadline.setHours(startOfWorkDay, 0, 0, 0);
      }
    }
  
    while (durationLeft !== 0) {
      if (deadline.getDay() === 6) {
        deadline.setDate(deadline.getDate() + 2);
        deadline.setHours(startOfWorkDay, 0, 0, 0);
      }
  
      if (durationLeft <= workDayDurationInMinutes) {
        deadline.setMinutes(deadline.getMinutes() + durationLeft);
        durationLeft -= durationLeft;
      } else {
        deadline.setDate(deadline.getDate() + 1);
        deadline.setHours(startOfWorkDay, 0, 0, 0);
        durationLeft -= 540;
      }
    }
  
    return deadline;
  }
