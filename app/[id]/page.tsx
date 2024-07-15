"use client";
import React, { useRef, useState } from "react";
import Link from "next/link";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { validateCaptchaToken } from "../action";

export default function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const captchaRef = useRef<HCaptcha>(null);
  const [email, setEmail] = useState<string>("");
  const showCaptcha = () => {
    captchaRef.current?.execute();
  };

  const onVerify = async (token: string) => {
    console.log("onVerify", token);
    const { email, success, message } = await validateCaptchaToken(token, id);
    email && setEmail(email);
    console.log(success, email, message);
  };
  // if (!data) return <main className="min-h-screen">not found</main>;
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center">
      {email && <p className="text-lg font-medium">{email}</p>}
      <HCaptcha
        sitekey="e274430e-2a4a-4a26-b45a-820a61825334"
        onVerify={onVerify}
        ref={captchaRef}
      />
      <button onClick={showCaptcha}>show email</button>
      {/* <Copy data={data} /> */}

      <Link className="absolute bottom-4" href="/">
        Create new
      </Link>
    </main>
  );
}
