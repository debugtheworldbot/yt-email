"use client";
import React, { useRef, useState } from "react";
import Link from "next/link";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { validateCaptchaToken } from "../action";
import Copy from "@/components/Copy";

export default function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const captchaRef = useRef<HCaptcha>(null);
  const [email, setEmail] = useState<string>("");
  const [verified, setVerified] = useState(false);
  const showCaptcha = () => {
    captchaRef.current?.execute();
  };

  const onVerify = async (token: string) => {
    console.log("onVerify", token);
    const { email, success, message } = await validateCaptchaToken(token, id);
    email && setEmail(email);
    setVerified(success);
    console.log(success, email, message);
  };
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
          <HCaptcha
            sitekey="e274430e-2a4a-4a26-b45a-820a61825334"
            onVerify={onVerify}
            ref={captchaRef}
          />
          <button
            className="border block mx-auto rounded py-2 px-4 text-lg font-medium mt-6 bg-green-400 text-white"
            onClick={showCaptcha}
          >
            show email
          </button>
        </>
      )}
      <Copy data={email} />

      <Link className="absolute bottom-4" href="/">
        Create new
      </Link>
    </main>
  );
}
