import "./tokens.css";
import "./styles.css";
import "./demo-styles.css";

export const metadata = {
  title: "Mereday · A little order, every day.",
  description:
    "A clearer Desktop. Downloads in their place. Meet Mereday, a native Mac app that gives your files a home—with previews, receipts, and Undo.",
  openGraph: {
    title: "Mereday · A little order, every day.",
    description:
      "A clearer Desktop. Downloads in their place. Mereday gives your files a home, with previews, receipts, and Undo.",
    type: "website",
  },
  icons: {
    icon: { url: "/assets/favicon.ico", sizes: "16x16 32x32 48x48" },
    apple: "/assets/apple-touch-icon.png",
  },
};

export const viewport = { themeColor: "#1e2638" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
