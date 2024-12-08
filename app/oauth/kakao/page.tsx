"use client";

import { sendCode } from "@/api/social-login";
import { atomSignUpForm } from "@/jotai/sign-up";
import { useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function OAuthKakaoPage() {
  const router = useRouter();
  const setSignUpForm = useSetAtom(atomSignUpForm);

  const init = async (code: string) => {
    const { data, status } = await sendCode(code);
    const isSuccess = status === "success";

    let path = "/";

    if (isSuccess && data) {
      path = "/signUp";
      setSignUpForm((prev) => {
        return {
          ...prev,
          nickname: data.nickname,
          providerId: data.providerId,
        };
      });
      router.push(path);
    } else {
      router.push("/");
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (code) {
      init(code);
    }
  }, []);

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <p className="mb-4 text-xl font-semibold">잠시만 기다려주세요.</p>
      <div className="border-t-white-001 mx-auto size-20 animate-spin rounded-full border-8 border-black/10" />
    </div>
  );
}
