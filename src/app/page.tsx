import { Topbar } from "@/components/layout/topbar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSlider } from "@/components/sections/hero-slider";
import { HostingSolutions } from "@/components/sections/hosting-solutions";
import { Testimonials } from "@/components/sections/testimonials";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Topbar />
      <Header />
      <main className="flex-1">
        <HeroSlider />
        <HostingSolutions />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
