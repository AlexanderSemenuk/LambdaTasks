import * as fs from 'fs'
import csvParser from 'csv-parser';

export interface IpRange {
    from: bigint;
    to: bigint;
    country: string;
    countryCode: string;
}

export const cvsData = (path: 'IP2LOCATION-LITE-DB1.cvs'): Promise<IpRange[]> => {
  return new Promise((resolve, reject) => {
    const ipRanges: IpRange[] = [];

    fs.createReadStream(path)
      .pipe(csvParser({ headers: ["from", "to", "countryCode", "country"] }))
      .on("data", (row) => {
        console.log(row);
        ipRanges.push({
          from: BigInt(row.from),
          to: BigInt(row.to),
          countryCode: row.countryCode,
          country: row.country,
        });
      })
      .on("end", () => {
        console.log("CSV file successfully processed");
        resolve(ipRanges);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
};