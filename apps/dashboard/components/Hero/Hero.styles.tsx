import styled from 'styled-components';

export const HeroContainer = styled.article`
  width: 100%;
  height: 724px;

  display: flex;
  justify-content: center;
`;

export const HeroSection = styled.div`
  max-width: 1280px;
  width: 100%;

  box-sizing: border-box;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 2.5rem;

  @media (max-width: 768px) {
    justify-content: center;
  }

  .bannerLogo {
    @media (max-width: 768px) {
      display: none;
    }
  }
`;

export const MainSection = styled.div`
  max-width: 300px;

  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    align-items: center;

    h1 {
      text-align: center;
    }

    p {
      text-align: center;
    }
  }

  h1 {
    font-size: 4rem;
    font-weight: bold;
    color: ${({ theme }) => theme.text.main};

    margin: 0;
  }

  p {
    font-size: 1rem;
    color: ${({ theme }) => theme.text.secondary};
  }
`;

export const MainSectionButton = styled.div`
  margin-top: 1.125rem;
`;

export const FeaturesButton = styled.div`
  margin-top: 1rem;

  .featuresText {
    width: max-content;

    display: flex;
    justify-content: center;

    padding: 0.679rem 1.5rem;

    border-radius: 60px;
    background: ${({ theme }) => theme.button.background};

    border: none;
    cursor: pointer;

    transition: filter 0.15s ease-out 0s;

    text-decoration: none;
    color: ${({ theme }) => theme.text.main};
    font-weight: normal;

    font-size: 1rem;

    @media (min-width: 768px) {
      display: none;
    }

    :hover {
      filter: saturate(0.8);
      transition: filter 0.15s ease-out 0s;
    }
  }
`;
