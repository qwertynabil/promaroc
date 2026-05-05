import HeroSection from '@/components/sections/HeroSection';
import TrustBar from '@/components/sections/TrustBar';
import ValuePropSection from '@/components/sections/ValuePropSection';
import ServicesBentoGrid from '@/components/sections/ServicesBentoGrid';
import FeaturedProjects from '@/components/sections/FeaturedProjects';
import HomeContactCTA from '@/components/sections/HomeContactCTA';

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