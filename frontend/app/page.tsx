import HeroSection from '@/components/sections/HeroSection';
import TrustBar from '@/components/sections/TrustBar';
import ValuePropSection from '@/components/sections/ValuePropSection';
import ServicesBentoGrid from '@/components/sections/ServicesBentoGrid';
import FeaturedProjects from '@/components/sections/FeaturedProjects';
import HomeContactCTA from '@/components/sections/HomeContactCTA';

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />    
      <TrustBar />
      <ValuePropSection />
      <ServicesBentoGrid />
      <FeaturedProjects />
      <HomeContactCTA />
    </div>
  );
}