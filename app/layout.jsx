import "./globals.css";

export const metadata = {
  title: "Thulla Masters | Challenge Your Skills",
  description:
    "The ultimate digital arena for the classic Thulla card game. Avoid being the Bhabhi and show off your card mastery.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
