import ButtonSummaryNavigation from "./_components/button.summary.navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div>
        <ButtonSummaryNavigation />
        {children}
      </div>
    </>
  );
}
