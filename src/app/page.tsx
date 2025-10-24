import Navbar from "./(landing-page)/_components/navbar";
import Hero from "./(landing-page)/_components/hero";
import PropertyList from "./(landing-page)/_components/property.list";

export default function Page() {
  return (
    <main className="h-full">
      <Navbar />
      <Hero />
      <PropertyList />
    </main>
  );
}
