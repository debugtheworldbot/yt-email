"use server";

import { neon } from "@neondatabase/serverless";

const gSecret = process.env.G_SECRET as string;
async function getData(id: string): Promise<string | null> {
  const sql = neon(process.env.DATABASE_URL as string);
  const response = await sql(`SELECT email FROM emails WHERE short_id = $1;`, [
    id,
  ]);
  if (response.length === 0) {
    return null;
  }
  return response[0].email;
}
interface GoogleCaptchaResponse {
  success: boolean;
  challenge_ts: string; // timestamp of the challenge load (ISO format yyyy-MM-dd'T'HH:mm:ssZZ)
  hostname: string; // the hostname of the site where the reCAPTCHA was solved
  "error-codes"?: string[]; // optional
}
export const validateGoogleCaptchaToken = async (token: string, id: string) => {
  try {
    if (!token)
      return {
        message: "No token provided",
        success: false,
      };
    console.log(gSecret);
    const data = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${gSecret}&response=${token}`,
      {
        method: "POST",
      },
    );
    const res: GoogleCaptchaResponse = await data.json();

    const { success, "error-codes": errorCodes } = res;
    if (!success) {
      return {
        message: "Invalid captcha" + JSON.stringify(errorCodes),
        success: false,
      };
    }

    const email = await getData(id);
    return { message: "Success", success: true, email };
  } catch (e) {
    return {
      message: "Verification failed" + JSON.stringify(e),
      success: false,
    };
  }
};
