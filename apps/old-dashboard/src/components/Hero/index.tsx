import Image from 'next/image'
import Link from 'next/link'

import {
  HeroContainer,
  MainSection,
  MainSectionButton,
  HeroSection,
  FeaturesButton,
} from './Hero.styles'

import Button from '../Button'

const HeroComponent = () => {
  return (
    <HeroContainer>
      <HeroSection>
        <MainSection>
          <h1>Meet Quanty</h1>
          <p>
            Create the server of your dreams, while letting Quanty do the heavy
            lifting!
          </p>
          <MainSectionButton>
            <Link
              href="https://discord.com/api/oauth2/authorize?client_id=824106276404854844&permissions=8&scope=bot%20applications.commands"
              passHref
            >
              <a>
                <Button text="Add to Server" />
              </a>
            </Link>
          </MainSectionButton>
          <FeaturesButton>
            <Link href="/features" passHref>
              <button className="featuresText">See features</button>
            </Link>
          </FeaturesButton>
        </MainSection>
        <div className="bannerLogo">
          <Image
            src="/logo.svg"
            alt="Quantum Logo"
            width={350}
            height={350}
            priority
          />
        </div>
      </HeroSection>
    </HeroContainer>
  )
}

export default HeroComponent
