import { VacationData, FormattedVacations } from "../models/vacationModels.js";
import * as fs from "fs";

export function transformVacations(originalData) {
    return originalData.reduce((acc, curr) => {
      const userId = curr.user._id;
      const userName = curr.user.name;
  
      const existingUser = acc.find(user => user.userId === userId);
  
      if (existingUser) {
        existingUser.weekendDates.push({
          startDate: curr.startDate,
          endDate: curr.endDate
        });
      } else {
        acc.push({
          userId,
          name: userName,
          weekendDates: [
            {
              startDate: curr.startDate,
              endDate: curr.endDate
            }
          ]
        });
      }
  
      return acc;
    }, []);
  }
