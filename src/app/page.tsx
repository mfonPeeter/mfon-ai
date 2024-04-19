import { Toaster } from "sonner";
import Sidebar from "@/components/Home/Sidebar";
import MainSection from "@/components/Home/MainSection";

export default function Home() {
  return (
    <main className="flex text-white/95">
      <Toaster richColors position="top-right" />
      <Sidebar />
      <MainSection />
    </main>
  );
}
