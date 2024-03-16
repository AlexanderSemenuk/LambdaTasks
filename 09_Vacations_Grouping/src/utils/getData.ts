import { VacationData, FormattedVacations } from "../models/vacationModels.js";
import * as fs from "fs";

export function transformVacations(rawVacations: VacationData[]): FormattedVacations[] {
    const formattedVacations: Map<string, FormattedVacations> = new Map();
  
    for (const vacation of rawVacations) {
        const user = vacation.user;
        const existingVacation = formattedVacations.get(user._id);

        // Ensure startDate and endDate are strings (format if necessary)
        const startDateString = typeof vacation.startDate === 'string' ? vacation.startDate : formatDate(new Date(vacation.startDate));
        const endDateString = typeof vacation.endDate === 'string' ? vacation.endDate : formatDate(new Date(vacation.endDate));

        if (existingVacation) {
            existingVacation.weekendDates.push({
                startDate: startDateString,
                endDate: endDateString,
            });
        } else {
            formattedVacations.set(user._id, {
                _id: user._id,
                name: user.name,
                weekendDates: [
                    {
                        startDate: startDateString,
                        endDate: endDateString,
                    },
                ],
            });
        }
    }

    return Array.from(formattedVacations.values());
}

// Helper function to format date into string
function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`; // Format: YYYY-MM-DD
}
