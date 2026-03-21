import React from 'react';
import Hero from '../components/Hero';
import SearchSection from '../components/SearchSection';
import FeaturedListings from '../components/FeaturedListings';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';

const Home = () => {
  return (
    <>
      <Hero />
      <SearchSection />
      <FeaturedListings />
      <HowItWorks />
      <Testimonials />
    </>
  );
};

export default Home;
