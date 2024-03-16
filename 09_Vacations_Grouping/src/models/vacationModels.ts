export interface VacationData {
  _id: string;
  user: {
    _id: string;
    name: string;
  };
  usedDays: number;
  startDate: string;
  endDate: string;
}

export interface FormattedVacations {
  _id: string;
  name: string;
  weekendDates: {startDate: string; endDate: string }[];
}