import { VacationData } from "./src/models/vacationModels.js";
import { transformVacations } from "./src/utils/getData.js";
import vacations from "./vacations.json" assert { type: "json" };

const rawVacations: VacationData[] = vacations;

console.log(transformVacations(rawVacations));

