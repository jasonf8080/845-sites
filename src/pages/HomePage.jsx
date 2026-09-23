import { Helmet } from 'react-helmet-async'
import { Hero, Services, WhyChooseUs, MyWork, ProcessSteps, Reviews, ServiceArea, CTASection } from '../components/Home'

const SITE_URL = 'https://845sites.com'

export const HomePage = () => (
  <>
    <Helmet>
      <title>845 Sites | Hudson Valley Web Design & Development</title>
      <meta
        name="description"
        content="845 Sites builds fast, visually stunning websites for Hudson Valley small businesses. $350 flat-rate builds, $25/month maintenance."
      />
      <link rel="canonical" href={SITE_URL} />
      <meta property="og:title" content="845 Sites | Hudson Valley Web Design & Development" />
      <meta
        property="og:description"
        content="Fast, high-performing, visually appealing websites for Hudson Valley businesses. $350 flat-rate builds, $25/month maintenance."
      />
      <meta property="og:url" content={SITE_URL} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: '845 Sites',
          description:
            'Independent web design studio building fast, high-performing websites for Hudson Valley small businesses.',
          areaServed: 'Hudson Valley, NY',
          email: 'jasonf8080@gmail.com',
          url: SITE_URL,
        })}
      </script>
    </Helmet>

    <Hero />
    <WhyChooseUs />
    <Services />
    <MyWork />
    <ProcessSteps />
    <Reviews />
    <ServiceArea />
    <CTASection />
  </>
)
