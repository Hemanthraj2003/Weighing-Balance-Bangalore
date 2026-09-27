import "./globals.css";

export const metadata = {
  title: "Weighing Balance Bangalore | Scientific Instruments & Laboratory Balances",
  description: "Weighing Balance Bangalore provides laboratory, analytical and professional weighing solutions in Bangalore.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
