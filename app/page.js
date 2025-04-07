import Image from "next/image";
import HersoSection from "./components/HersoSection";
import { Navbar } from "./components/Navbar";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import EmailSection from "./components/EmailSection";
import Footer from "./components/Footer";
import AchievementsSection from "./components/AchievementsSection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#121212]">
       <Navbar/>
      <div className="container mt-24 mx-auto px-12 py-4">
        <HersoSection/>
        <AchievementsSection/>
        <AboutSection/>
        <ProjectsSection/>
        <EmailSection/>
      </div>
      <Footer/>
      </main>
  );
}
