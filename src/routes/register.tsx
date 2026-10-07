import { createFileRoute, Link } from "@tanstack/react-router";
import { QrCode } from "lucide-react";
import { Logo } from "@/components/brand/Logo";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Download App | Real-Estate Business Network" },
      {
        name: "description",
        content:
          "Download the Real-Estate Business Network app from Google Play Store or Apple App Store.",
      },
      { property: "og:title", content: "Download App — Real-Estate Business Network" },
      { property: "og:description", content: "Get the app for your mobile device." },
    ],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  return (
    <div className="min-h-screen bg-surface">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <Logo />

        <h1 className="mt-10 text-3xl font-bold tracking-tight sm:text-4xl">
          Click To Download App
        </h1>
        <div className="mt-4 h-1 w-12 bg-primary rounded-full"></div>
        <p className="mt-6 text-muted-foreground">
          Get the Real-Estate Business Network app on your mobile device.
        </p>

        <div className="mt-8 flex flex-col gap-6 lg:flex-row">
          {/* Google Play Section */}
          <div className="flex flex-col items-center gap-6 rounded-2xl border bg-card p-6 shadow-sm sm:flex-row">
            <div className="flex flex-col items-center gap-2">
              <div className="relative flex h-32 w-32 items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/50">
                <img 
                  src="/app-links/android-app.png" 
                  alt="Android QR Code" 
                  className="h-full w-full object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <QrCode className="hidden h-16 w-16 text-muted-foreground/50" />
              </div>
              <p className="text-[10px] font-medium uppercase text-muted-foreground">Android QR</p>
            </div>

            <div className="hidden h-32 w-px bg-border sm:block"></div>

            <a
              href="https://play.google.com/store/apps/details?id=com.salespro.cpnetwork"
              className="flex w-full items-center justify-center gap-3 rounded-xl bg-black px-4 py-3 text-white transition-transform hover:scale-105 sm:w-48"
            >
              <svg viewBox="0 0 512 512" className="h-8 w-8 shrink-0" fill="currentColor">
                <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
              </svg>
              <div className="flex flex-col text-left">
                <span className="text-[10px] uppercase tracking-wider text-gray-300">
                  Get it on
                </span>
                <span className="text-lg font-semibold leading-none">Google Play</span>
              </div>
            </a>
          </div>

          {/* App Store Section */}
          <div className="flex flex-col items-center gap-6 rounded-2xl border bg-card p-6 shadow-sm sm:flex-row">
            <div className="flex flex-col items-center gap-2">
              <div className="relative flex h-32 w-32 items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/50">
                <img 
                  src="/app-links/ios-app.png"  
                  alt="iOS QR Code" 
                  className="h-full w-full object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <QrCode className="hidden h-16 w-16 text-muted-foreground/50" />
              </div>
              <p className="text-[10px] font-medium uppercase text-muted-foreground">iOS QR</p>
            </div>

            <div className="hidden h-32 w-px bg-border sm:block"></div>

            <a
              href="https://apps.apple.com/in/app/cp-broadcast/id6739004166"
              className="flex w-full items-center justify-center gap-3 rounded-xl bg-black px-4 py-3 text-white transition-transform hover:scale-105 sm:w-48"
            >
              <svg viewBox="0 0 384 512" className="h-8 w-8 shrink-0" fill="currentColor">
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
              </svg>
              <div className="flex flex-col text-left">
                <span className="text-[10px] uppercase tracking-wider text-gray-300">
                  Available on the
                </span>
                <span className="text-lg font-semibold leading-none">App Store</span>
              </div>
            </a>
          </div>
        </div>

        <p className="mt-12 text-sm">
          <Link to="/" className="text-muted-foreground hover:text-primary">
            ← Back to the public site
          </Link>
        </p>
      </div>
    </div>
  );
}
