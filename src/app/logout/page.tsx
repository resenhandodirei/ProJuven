"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Alert, AlertTitle, AlertDescription } from "@/components/Alert";
import { CheckCircle2 } from "lucide-react";

export default function LogoutPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.clear();

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    const redirectTimer = setTimeout(() => {
      router.push("/login");
    }, 3000);

    return () => {
      clearTimeout(redirectTimer);
      clearInterval(timer);
    };
  }, [router]);

  return (
    <>
      <Navbar />

      <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full">
          <Alert className="border-l-8 border-[var(--greenLight)] shadow-xl p-6 bg-white rounded-2xl">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[var(--greenLight-transparent)] rounded-full">
                <CheckCircle2 size={36} className="text-[var(--greenLight)]" />
              </div>

              <div>
                <AlertTitle className="text-lg font-bold text-[var(--greenDark)]">
                  Logout realizado com sucesso!
                </AlertTitle>
                <AlertDescription className="text-gray-700 mt-2">
                  Você saiu da sua conta com segurança.  
                  Redirecionando para a tela de login em{" "}
                  <span className="font-semibold text-[var(--greenLight)]">
                    {countdown}
                  </span>{" "}
                  segundos...
                </AlertDescription>
              </div>
            </div>
          </Alert>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Caso o redirecionamento não ocorra automaticamente, clique abaixo:
            </p>
            <button
              onClick={() => router.push("/login")}
              className="mt-3 px-6 py-2 rounded-xl bg-[var(--greenLight)] text-white font-semibold hover:bg-[var(--golden)] transition"
            >
              <a href="/login">Ir para página de login</a>
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
