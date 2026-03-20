import { google, gmail_v1 } from 'googleapis';
import 'dotenv/config';


export async function fetchOtp(): Promise<string> {

  // Create OAuth client using .env
  const auth = new google.auth.OAuth2(
    process.env.GMAIL_CLIENT_ID,
    process.env.GMAIL_CLIENT_SECRET,
    process.env.GMAIL_REDIRECT_URI
  );

  //  Use refresh token from ENV
  auth.setCredentials({
    refresh_token: process.env.GMAIL_REFRESH_TOKEN!,
  });

  const gmail = google.gmail({ version: 'v1', auth });

  const maxAttempts = 12;
  const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

  // Only read NEW OTP emails
  const startTime = Math.floor(Date.now() / 1000);

  console.log('Waiting 10 seconds for new OTP email...');
  await delay(10000);

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    console.log(`Checking for OTP... Attempt ${attempt}`);

    try {
      const res = await gmail.users.messages.list({
        userId: 'me',
        q: `to:${process.env.EMAIL} after:${startTime}`,
        includeSpamTrash: true,
        maxResults: 5,
      });

      const messageId = res.data.messages?.[0]?.id;

      if (!messageId) {
        console.log('No NEW OTP email found yet. Retrying...');
        await delay(5000);
        continue;
      }

      const messageRes = await gmail.users.messages.get({
        userId: 'me',
        id: messageId,
      });

      const emailBody = extractBody(messageRes.data.payload);

      const otpMatch = emailBody.match(/\d{4,6}/);

      if (otpMatch) {
        const otp = otpMatch[0];
        console.log('OTP Found:', otp);
        return otp;
      }

    } catch (err) {
      console.error('Error fetching messages:', err);
    }

    await delay(5000);
  }

  throw new Error('OTP not found after waiting 120 seconds');
}

function extractBody(payload: gmail_v1.Schema$MessagePart | undefined): string {
  if (!payload) return '';

  if (payload.body?.data) {
    return Buffer.from(payload.body.data, 'base64').toString('utf-8');
  }

  if (payload.parts) {
    for (const part of payload.parts) {
      const data = extractBody(part);
      if (data) return data;
    }
  }

  return '';
}