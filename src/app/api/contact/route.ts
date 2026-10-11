import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required fields." },
        { status: 400 }
      );
    }

    const submissionData = {
      timestamp: new Date().toISOString(),
      name,
      email,
      subject: subject || "Portfolio Inquiry / Recruiter",
      message,
    };

    // Google Apps Script Webhook URL from environment variables
    const googleSheetWebhook = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

    if (googleSheetWebhook) {
      try {
        await fetch(googleSheetWebhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(submissionData),
        });
      } catch (sheetError) {
        console.error("Failed to forward to Google Sheets webhook:", sheetError);
        // We still succeed and notify the client so recruiter UX is seamless
      }
    } else {
      console.log(
        "⚡ [CONTACT FORM SUBMISSION RECEIVED]:",
        submissionData,
        "\nTo sync directly to Google Sheets, set GOOGLE_SHEETS_WEBHOOK_URL in .env.local or Vercel Environment Variables."
      );
    }

    return NextResponse.json({
      success: true,
      message: "Your message has been received! Nawazish will get back to you shortly.",
      data: submissionData,
    });
  } catch (error: any) {
    console.error("Error in /api/contact:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
