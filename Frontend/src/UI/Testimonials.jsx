import { useState, useEffect } from "react";
import styled from "styled-components";
import Heading from "./Heading";

const Section = styled.section`
  max-width: 100rem;
  margin: 0 auto;
  overflow: hidden;
`;

const SectionTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SectionDescription = styled.p`
  font-family: "Nunito", sans-serif;
  color: rgb(101, 126, 148);
  font-weight: 600;
  font-size: 18px;
  line-height: 27px;
  text-align: center;
  width: 70%;
  margin-top: 0.5rem;
`;

const SliderContainer = styled.div`
  position: relative;
  height: 400px;
`;

const Slide = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 1s;
`;

const Testimonial = styled.div`
  width: 70%;
  position: relative;
  padding: 2rem;

  &::before {
    content: "“";
    position: absolute;
    top: -5.7rem;
    left: -6.8rem;
    font-size: 20rem;
    color: var(--color-green-600);
    z-index: -1;
  }
  margin-left: 8rem;
`;

const TestimonialHeader = styled.h5`
  font-size: 2.25rem;
  font-weight: 500;
  margin-bottom: 1.5rem;
`;

const TestimonialText = styled.blockquote`
  font-size: 1.7rem;
  margin-bottom: 3.5rem;
  color: #666;
`;

const TestimonialAuthor = styled.address`
  font-style: normal;
  display: grid;
  grid-template-columns: 6.5rem 1fr;
  column-gap: 2rem;
`;

const TestimonialPhoto = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const TestimonialName = styled.h6`
  font-size: 1.7rem;
  font-weight: 500;
`;

const TestimonialLocation = styled.p`
  font-size: 1.5rem;
`;

const SliderButton = styled.button`
  position: absolute;
  top: 50%;
  z-index: 10;
  border: none;
  background: rgba(255, 255, 255, 0.7);
  color: #333;
  border-radius: 50%;
  height: 5.5rem;
  width: 5.5rem;
  font-size: 3.25rem;
  cursor: pointer;

  &.left {
    left: 6%;
    transform: translate(-50%, -50%);
  }

  &.right {
    right: 6%;
    transform: translate(50%, -50%);
  }
`;

const DotsContainer = styled.div`
  position: absolute;
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
`;

const Dot = styled.button`
  border: none;
  background-color: ${(props) =>
    props.$active ? "var(--color-green-600)" : "#b9b9b9"};
  opacity: ${(props) => (props.$active ? "1" : "0.7")};
  height: 1rem;
  width: 1rem;
  border-radius: 50%;
  margin-right: 1.75rem;
  cursor: pointer;
  transition: all 0.5s;

  &:hover,
  &:focus {
    background-color: var(--color-green-700);
    transform: scale(1.2);
  }
`;

const testimonials = [
  {
    header: "A life-changing experience!",
    text: "I never thought an online platform could provide such depth in my yoga practice. The classes are well-structured, and the instructors are world-class. This has truly transformed my daily routine.",
    author: {
      name: "Aarav Lynn",
      location: "San Francisco, USA",
      photo:
        "https://res.cloudinary.com/dtlj4q6a4/image/upload/v1726495827/b2lmtaebqanw38ccrvym.jpg",
    },
  },
  {
    header: "The perfect blend of flexibility and guidance",
    text: "The ability to choose my own pace while still having access to expert guidance is amazing. This platform helped me grow both mentally and physically through the yoga practices.",
    author: {
      name: "Miyah Miles",
      location: "London, UK",
      photo:
        "https://res.cloudinary.com/dtlj4q6a4/image/upload/v1726495827/b2lmtaebqanw38ccrvym.jpg",
    },
  },
  {
    header: "Connecting body and mind effortlessly",
    text: "The classes have allowed me to go deeper into my practice and connect more mindfully. I love the variety of sessions offered and how accessible everything is. This is a must for anyone serious about yoga!",
    author: {
      name: "Francisco Gomes",
      location: "Lisbon, Portugal",
      photo:
        "https://res.cloudinary.com/dtlj4q6a4/image/upload/v1726495827/iudipc4m6gz9djrupswm.jpg",
    },
  },
];

// Slider Component
const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const maxSlide = testimonials.length;

  const goToSlide = (slide) => {
    setCurrentSlide(slide);
  };

  const nextSlide = () => {
    setCurrentSlide(currentSlide === maxSlide - 1 ? 0 : currentSlide + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? maxSlide - 1 : currentSlide - 1);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentSlide]);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(slideInterval);
  }, [currentSlide]);

  return (
    <Section>
      <SectionTitle>
        <Heading type="h1">Testimonials</Heading>
        <SectionDescription>
          Discover how individuals from all walks of life have transformed their
          lives, deepened their practice, and embraced the true essence of yoga
          through our platform.
        </SectionDescription>
      </SectionTitle>

      <SliderContainer>
        {testimonials.map((testimonial, index) => (
          <Slide
            key={index}
            style={{
              transform: `translateX(${100 * (index - currentSlide)}%)`,
            }}
          >
            <Testimonial>
              <TestimonialHeader>{testimonial.header}</TestimonialHeader>
              <TestimonialText>{testimonial.text}</TestimonialText>
              <TestimonialAuthor>
                <TestimonialPhoto
                  src={testimonial.author.photo}
                  alt=""
                  loading="lazy"
                />
                <div>
                  <TestimonialName>{testimonial.author.name}</TestimonialName>
                  <TestimonialLocation>
                    {testimonial.author.location}
                  </TestimonialLocation>
                </div>
              </TestimonialAuthor>
            </Testimonial>
          </Slide>
        ))}

        <SliderButton className="left" onClick={prevSlide}>
          &larr;
        </SliderButton>
        <SliderButton className="right" onClick={nextSlide}>
          &rarr;
        </SliderButton>

        <DotsContainer>
          {testimonials.map((_, i) => (
            <Dot
              key={i}
              $active={currentSlide === i}
              onClick={() => goToSlide(i)}
            />
          ))}
        </DotsContainer>
      </SliderContainer>
    </Section>
  );
};

export default Slider;
