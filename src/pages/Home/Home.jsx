import React from 'react';
import Banner from '../../components/Banner';
import Features from '../../components/Features';
import HowItWorks from '../../components/HowItWorks';
import ImpactSection from '../../components/ImpactSection';
import PremiumSection from '../../components/PremiumSection';
import LatestResolvedIssues from '../../components/LatestResolvedIssues';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Features></Features>
            <LatestResolvedIssues></LatestResolvedIssues>
            <HowItWorks></HowItWorks>
            <ImpactSection></ImpactSection>
            <PremiumSection></PremiumSection>
        </div>
    );
};

export default Home;