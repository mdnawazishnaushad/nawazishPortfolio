// =========================================================================
// GOOGLE APPS SCRIPT CODE FOR GOOGLE SHEETS FORM CAPTURE
// =========================================================================
// INSTRUCTIONS:
// 1. Open Google Sheets (https://sheets.google.com) and create a new sheet.
// 2. In Row 1, add headers:
//    Col A: Timestamp | Col B: Name | Col C: Email | Col D: Subject | Col E: Message
// 3. Click Extensions > Apps Script.
// 4. Delete existing code, paste the script below, and click Save.
// 5. Click Deploy > New Deployment.
// 6. Select type: "Web app".
// 7. Execute as: "Me", Who has access: "Anyone".
// 8. Click Deploy, grant permissions, and copy the Web App URL!
// 9. Put that URL into your .env.local:
//    GOOGLE_SHEETS_WEBHOOK_URL="https://script.google.com/macros/s/..."
// =========================================================================

/*
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.name || "",
      data.email || "",
      data.subject || "",
      data.message || ""
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ status: "success", message: "Row added" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
*/
