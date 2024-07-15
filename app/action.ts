"use server";

import { neon } from "@neondatabase/serverless";
import { verify } from "hcaptcha";

const secret = process.env.H_SESRET as string;
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
export const validateCaptchaToken = async (token: string, id: string) => {
  try {
    if (!token)
      return {
        message: "No token provided",
        success: false,
      };
    const { success } = await verify(secret, token);
    if (!success) {
      return { message: "Invalid captcha", success: false };
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
