import { sheetid } from "@config/config";
import { google } from "googleapis";

export async function getDataFromSheet(row: number): Promise<any> {
  const auth = await google.auth.getClient({scopes: ["https://www.googleapis.com/auth/spreadsheets"]});
  const sheets = google.sheets({version: "v4", auth});
  const range = `Sheet1!A${row}:C${row}`;
  const result = await sheets.spreadsheets.values.get({
    range,
    spreadsheetId: sheetid,
  });
  return result.data.values;
}

export async function addUserToSheet(memberId: string, name: string, _points?: number) {
  const auth = await google.auth.getClient({scopes: ["https://www.googleapis.com/auth/spreadsheets"]});
  const sheets = google.sheets({version: "v4", auth});
  const values = [[memberId, name, _points ?? 0]];
  const result = await sheets.spreadsheets.values.append({
    range: "Sheet1!A2:C500",
    spreadsheetId: sheetid,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {values},
  });
  console.log(result.data.updates.updatedRange.split(":")[1].slice(1) + "  <----that")
  return result.data.updates.updatedRange.split(":")[1].slice(1);
}
