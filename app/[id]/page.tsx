"use client";
import React, { useState } from "react";
import Link from "next/link";
import ReCAPTCHA from "react-google-recaptcha";
import { validateGoogleCaptchaToken } from "../action";
import Copy from "@/components/Copy";

export default function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [email, setEmail] = useState<string>("");
  const [verified, setVerified] = useState(false);

  async function onChange(token: string | null) {
    if (!token) return;
    const { email, success, message } = await validateGoogleCaptchaToken(
      token,
      id,
    );
    email && setEmail(email);
    setVerified(success);
    console.log(success, email, message);
  }
  if (verified && !email)
    return (
      <main className="min-h-screen flex flex-col items-center justify-center text-3xl">
        email not found
      </main>
    );
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center">
      {email && <p className="text-lg font-medium">{email}</p>}

      {!verified && (
        <>
          <p className="text-lg font-medium mb-2">
            Please verify you are human to see the email
          </p>
          <ReCAPTCHA
            sitekey="6LfQMhAqAAAAAAvRtfh3uIc6_CrlmHwqiwwwO7mG"
            onChange={onChange}
          />
        </>
      )}
      <Copy data={email} />

      <Link className="absolute bottom-4" href="/">
        Create new
      </Link>
    </main>
  );
}
