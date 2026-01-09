import { Layout } from "@/components/layout/Layout";
import { Hero } from "@/components/home/Hero";
import { FeaturedVehicles } from "@/components/home/FeaturedVehicles";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Categories } from "@/components/home/Categories";
import { Testimonials } from "@/components/home/Testimonials";
import { CTA } from "@/components/home/CTA";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <FeaturedVehicles />
      <Categories />
      <HowItWorks />
      <Testimonials />
      <CTA />
    </Layout>
  );
};

export default Index;
