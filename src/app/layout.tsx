import "../styles/globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";

export const metadata = {
  title: "Towhidul Islam | Software Developer",
  description:
    "Personal portfolio and blog of Towhidul Islam - Software Developer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="pt-16">
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
