// Styles & CSS
import styled from 'styled-components';
import Image from 'next/image';
import Button from '../Button';
import Link from 'next/link';

const FooterWrapper = styled.footer`
  max-width: 1280px;
  height: 13.5rem;

  position: relative;
  display: flex;
  justify-content: space-between;

  margin: 0px auto;
  padding: 4.5rem 2.5rem;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;

    height: 100%;

    padding: 3.5rem 1.5rem;
  }
`;

const Logo = styled.div`
  display: flex;

  align-items: center;

  .bannerName {
    margin-left: 0.25rem;
    font-weight: 500;
    font-size: 1.5rem;
  }

  .bannerLogo {
  }
`;

const CopyrightTags = styled.div`
  position: absolute;
  left: 40px;
  bottom: 90px;

  margin-top: 2.5rem;
  color: ${({ theme }) => theme.text.secondary};

  @media (max-width: 768px) {
    position: unset;
  }
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <MainSection />
      <InfoSection />
      <CopyrightTags>Quantum Realm © - 2021</CopyrightTags>
    </FooterWrapper>
  );
};

const MainSectionWrapper = styled.div`
  .logo {
    margin-bottom: 0.5rem;
  }
`;

const MainSection = () => {
  return (
    <MainSectionWrapper>
      <div className="logoButtonContainer">
        <Logo className="logo">
          <Image
            className="bannerLogo"
            src="/logo.svg"
            alt="Quanty Logo"
            width={50}
            height={50}
          />
          <div className="bannerName">Quanty</div>
        </Logo>
        <Button text="Add Quanty" />
      </div>
    </MainSectionWrapper>
  );
};

const InfoSectionContainer = styled.div`
  display: flex;

  @media (max-width: 768px) {
    margin-top: 3rem;

    display: flex;
    justify-content: space-between;
  }

  @media (max-width: 560px) {
    display: flex;
    flex-direction: column;
  }

  .list {
    margin: 0;
    padding-left: 0;
    margin-right: 5rem;
  }

  ul .title {
    margin-bottom: 1.5rem;

    color: ${({ theme }) => theme.text.main};
    font-weight: 500;
    font-size: 1.125rem;
  }
`;

const InfoSectionListItem = styled.div`
  color: ${({ theme }) => theme.text.secondary};
  margin-bottom: 1rem;

  .item {
    text-decoration: none;

    color: ${({ theme }) => theme.text.secondary};

    font-size: 0.875rem;
  }

  .item:hover {
    color: #ffffff;
  }
`;

const InfoSection = () => {
  return (
    <InfoSectionContainer>
      {FooterItems.map(({ items, title }) => {
        return (
          <ul className="list" key={title}>
            <div className="title">{title}</div>
            <div>
              {items.map(({ name, route }) => {
                return (
                  <InfoSectionListItem key={name}>
                    <Link href={route} passHref>
                      <a className="item">{name}</a>
                    </Link>
                  </InfoSectionListItem>
                );
              })}
            </div>
          </ul>
        );
      })}
    </InfoSectionContainer>
  );
};

const FooterItems = [
  {
    title: 'Features',
    items: [
      { name: 'Commands', route: '/features/commands' },
      { name: 'Events', route: '/features/events' },
      {
        name: 'Economy',
        route: '/features/economy',
      },
      {
        name: 'Music',
        route: '/features/music',
      },
    ],
  },
  {
    title: 'Quanty',
    items: [
      { name: 'Discord', route: '/discord' },
      { name: 'Docs', route: '/docs' },
      {
        name: 'Support',
        route: '/docs/support',
      },
      {
        name: 'GitHub',
        route: '/github',
      },
    ],
  },
  {
    title: 'Company',
    items: [
      { name: 'Terms of Use', route: '/policy' },
      { name: 'Privacy Policy', route: '/policy' },
      {
        name: 'Cookie Policy',
        route: '/policy',
      },
      {
        name: 'Contact',
        route: '/policy',
      },
    ],
  },
];

export default Footer;
