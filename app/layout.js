import { Josefin_Sans } from "next/font/google";
import "./globals.tailwind.css";

import Header from "./_components/Header";
import ReservationProvider from "./_components/ReservationContext";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});
export const metadata = {
  title: {
    template: "%s | The Wild Oasis",
    default: "Welcome | The Wild Oasis",
    description:
      "Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests",
  },
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`bg-primary-950 text-primary-100 ${josefin.className} relative flex min-h-dvh flex-col`}
      >
        <Header />
        <main className="grid flex-1 px-8 py-12">
          <div className="mx-auto w-full max-w-[85rem]">
            <ReservationProvider>{children}</ReservationProvider>
          </div>
        </main>
      </body>
    </html>
  );
}
