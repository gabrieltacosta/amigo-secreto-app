import Footer from "@/components/footer";
import Header from "@/components/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex flex-col">
        <Header />
      </div>
      <div className="flex-1 flex-col">{children}</div>
      <div className="flex flex-col">
        <Footer />
      </div>
    </>
  );
}
