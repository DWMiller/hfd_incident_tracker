import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';

const Page = styled.div`
  min-height: 100vh;
  color: ${props => props.theme.palette['grey-900']};
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

const Hero = styled.section`
  text-align: center;
  padding: 80px 20px 60px;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  color: white;

  h1 {
    font-size: 48px;
    margin: 0 0 16px;
    font-weight: 800;
  }

  p {
    font-size: 20px;
    max-width: 600px;
    margin: 0 auto 32px;
    opacity: 0.9;
    line-height: 1.5;
  }
`;

const CTALink = styled(Link)`
  display: inline-block;
  background: #e94560;
  color: white;
  text-decoration: none;
  padding: 14px 36px;
  font-size: 18px;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #d63851;
  }
`;

const Section = styled.section`
  max-width: 800px;
  margin: 0 auto;
  padding: 60px 20px;

  h2 {
    font-size: 28px;
    margin: 0 0 20px;
  }

  p {
    font-size: 16px;
    line-height: 1.7;
    color: ${props => props.theme.palette['grey-700']};
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 24px;
  margin-top: 24px;
`;

const Feature = styled.div`
  padding: 20px;
  border-radius: 8px;
  background: ${props => props.theme.palette['grey-050']};

  h3 {
    font-size: 16px;
    margin: 0 0 8px;
  }

  p {
    font-size: 14px;
    margin: 0;
    color: ${props => props.theme.palette['grey-600']};
  }
`;

const AudienceList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 20px 0 0;

  li {
    padding: 8px 0;
    font-size: 16px;
    color: ${props => props.theme.palette['grey-700']};
    border-bottom: 1px solid ${props => props.theme.palette['grey-100']};

    &:last-child {
      border-bottom: none;
    }
  }
`;

const Differentiators = styled.ul`
  list-style: none;
  padding: 0;
  margin: 20px 0 0;

  li {
    padding: 10px 0;
    font-size: 16px;
    line-height: 1.6;
    color: ${props => props.theme.palette['grey-700']};

    strong {
      color: ${props => props.theme.palette['grey-900']};
    }
  }
`;

const FooterCTA = styled.section`
  text-align: center;
  padding: 60px 20px;
  background: ${props => props.theme.palette['grey-050']};
`;

const Footer = styled.footer`
  text-align: center;
  padding: 20px;
  font-size: 13px;
  color: ${props => props.theme.palette['grey-500']};
  border-top: 1px solid ${props => props.theme.palette['grey-100']};
`;

const features = [
  { title: 'Live map', desc: 'Colour-coded markers for fires, medical, accidents, hazmat, and more' },
  { title: 'Filter by type', desc: 'Hide everything except the incident types you care about' },
  { title: 'Search by address', desc: 'Type a street name and find nearby incidents instantly' },
  { title: 'Time slider', desc: 'Slide through up to a week of history to see what you missed' },
  { title: 'Full activity log', desc: 'Every call, including privacy-restricted ones without addresses' },
  { title: 'Shareable links', desc: 'Every incident has its own page you can send to anyone' },
];

function Landing() {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (localStorage.getItem('hfd-state')) {
      navigate('/app', { replace: true });
    }
  }, [navigate]);

  return (
    <Page>
      <Hero>
        <h1>Hamilton Incidents</h1>
        <p>
          Live map of every emergency call across Hamilton, Ontario.
          See what's happening in your city right now.
        </p>
        <CTALink to="/app">Open Live Map</CTALink>
      </Hero>

      <Section>
        <h2>Why This Exists</h2>
        <p>
          You hear fire trucks racing down your street. You see smoke in the distance.
          Your neighbourhood group is full of speculation. You check the news — nothing yet.
        </p>
        <p>
          Hamilton Incidents gives you the answer immediately. No waiting for a news article,
          no scrolling through social media rumours. Just a map showing exactly what's happening,
          where, and what kind of emergency it is.
        </p>
      </Section>

      <Section>
        <h2>What You Can Do</h2>
        <FeaturesGrid>
          {features.map(f => (
            <Feature key={f.title}>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </Feature>
          ))}
        </FeaturesGrid>
      </Section>

      <Section>
        <h2>Who It's For</h2>
        <AudienceList>
          <li>Residents who hear sirens and want to know what's happening</li>
          <li>Neighbours checking if a nearby emergency affects them</li>
          <li>Local journalists covering breaking incidents</li>
          <li>Community safety advocates tracking patterns over time</li>
          <li>Anyone curious about Hamilton's emergency services</li>
        </AudienceList>
      </Section>

      <Section>
        <h2>Why It's Different</h2>
        <Differentiators>
          <li><strong>Real-time</strong> — data from Hamilton Fire Department dispatch, updating every 30 seconds</li>
          <li><strong>Privacy-respecting</strong> — medical call addresses are withheld to protect patients</li>
          <li><strong>Free and open</strong> — no account, no paywall, no tracking</li>
          <li><strong>Remembers you</strong> — your filters and settings persist between visits</li>
        </Differentiators>
      </Section>

      <FooterCTA>
        <h2>See what's happening in Hamilton</h2>
        <CTALink to="/app">Open Live Map</CTALink>
      </FooterCTA>
      <Footer>
        Data from Hamilton Fire Department dispatch via City of Hamilton.
      </Footer>
    </Page>
  );
}

export default Landing;
