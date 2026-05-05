import HeroSection from 'frontend/components/sections/HeroSection';
import TrustBar from 'frontend/components/sections/TrustBar';
import ValuePropSection from 'frontend/components/sections/ValuePropSection';
import ServicesBentoGrid from 'frontend/components/sections/ServicesBentoGrid';
import FeaturedProjects from 'frontend/components/sections/FeaturedProjects';
import HomeContactCTA from 'frontend/components/sections/HomeContactCTA';

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* 1. Cinematic Entry */}
      <HeroSection />    
      {/* 2. Social Proof / Platforms */}
      <TrustBar />      
      {/* 3. Core Philosophy (Transition to White background) */}
      <ValuePropSection />
      {/* 4. Next up: The Services Bento Grid! */}
      <ServicesBentoGrid />
      <FeaturedProjects />
      <HomeContactCTA />
    </div>
  );
}