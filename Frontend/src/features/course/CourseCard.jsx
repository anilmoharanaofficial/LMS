import styled from "styled-components";

// Styled Components
const Card = styled.div`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 340px;
  padding: 1.5rem;
  margin: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const Title = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 0.5rem;
  cursor: pointer;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const Tag = styled.span`
  background-color: #f0f0f0;
  color: #666;
  font-size: 1rem;
  padding: 0.4rem 0.7rem;
  border-radius: 20px;
`;

const Description = styled.p`
  color: #555;
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #777;
  font-size: 0.9rem;
`;

const FooterIcon = styled.span`
  display: flex;
  align-items: center;
  gap: 0.3rem;

  svg {
    font-size: 1.2rem;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  margin-bottom: 1rem;

  img {
    width: 100%;
    height: 160px;
    object-fit: cover;
    border-radius: 10px;
    transition: opacity 0.3s ease;
  }

  &:hover img {
    opacity: 0.8;
  }

  &:hover .play-button {
    opacity: 1;
    transform: scale(1);
  }
`;

const PlayButton = styled.div`
  position: absolute;
  top: 35%;
  left: 40%;
  transform: translate(-50%, -50%) scale(0.5);
  opacity: 0;
  background-color: rgba(255, 255, 255, 0.8);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.3s ease, transform 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;

  svg {
    font-size: 2rem;
    color: #333;
  }
`;

// CourseCard Component
const CourseCard = ({ course }) => {
  const { title, thumbnail, description, category } = course;

  return (
    <Card>
      <ImageWrapper>
        <img src={thumbnail.secure_url} alt={title} loading="lazy" />
        <PlayButton className="play-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </PlayButton>
      </ImageWrapper>
      <Title>{title}</Title>
      <Tags>
        <Tag>{category}</Tag>
      </Tags>
      <Description>{description}</Description>
      <Footer>
        <FooterIcon>
          <i className="fas fa-eye"></i> Data
        </FooterIcon>
        <FooterIcon>
          <i className="fas fa-comments"></i> Data
        </FooterIcon>
        <FooterIcon>
          <i className="fas fa-bookmark"></i> Data
        </FooterIcon>
      </Footer>
    </Card>
  );
};

export default CourseCard;
