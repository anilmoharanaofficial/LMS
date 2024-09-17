import FeatureCard from "../UI/FeatureCard";
import Hero from "../UI/Hero";
import MainHeader from "../UI/MainHeader";
import Testimonials from "../UI/Testimonials";

function Home() {
  return (
    <>
      <MainHeader />
      <Hero />
      <FeatureCard
        image="/assets/feature1.svg"
        heading="Beginner Yoga Course"
        title="Start Your Journey: Beginner Yoga"
        description="Learn the basics of yoga with step-by-step guidance. Perfect for new
          practitioners looking to build a strong foundation."
      />

      <FeatureCard
        positionType="reverse"
        image="/assets/feature3.svg"
        heading="Yoga for Stress Relief"
        title="Relax & Unwind: Yoga for Stress Relief"
        description="Soothe your mind and body with calming yoga practices designed to relieve stress and anxiety"
      />

      <FeatureCard
        image="/assets/feature2.svg"
        heading="Power Yoga for Strength"
        title="Empower Yourself: Power Yoga"
        description="A dynamic and fast-paced practice that builds strength, stamina, and flexibility."
      />

      <FeatureCard
        positionType="reverse"
        image="/assets/feature4.svg"
        heading="Essential Yoga Ebook"
        title="Master the Art: Essential Yoga Ebook"
        description="A comprehensive guide to yoga postures, techniques, and philosophies. Perfect for practitioners at all levels."
      />

      <Testimonials />
    </>
  );
}

export default Home;
