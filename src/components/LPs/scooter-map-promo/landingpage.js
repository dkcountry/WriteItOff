import React from "react";
import MediaQuery from 'react-responsive';
import * as styles from "../common/styles";
import KeeperNav from "./nav";
import Hero from "./hero";
import HeroImg from "./heroImg";
import PhoneSignUp from "../common/phonesignup";
import SectionTemplate from "../common/sectiontemplate";
import TestimonialTemplate from "../common/testimonial";
import PartnerQuoteTemplate from "../common/partnerQuoteTemplate";
import PricingBanner from "../common/pricingBannerPromo";

class ScooterMapLP extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <div style={styles.outerContainerLP}>
            <KeeperNav />
            <MediaQuery query='(max-width: 768px)'>
                <div> 
                    <HeroImg />
                </div> 
                <div> 
                    <Hero />
                </div> 
            </MediaQuery>

            <MediaQuery query='(min-width: 769px)'>
                <div style={styles.heroPaddingMargin} className="col-12 row align-items-start"> 
                    <Hero />
                    <HeroImg />
                </div>
            </MediaQuery>

            <PartnerQuoteTemplate 
                link = 'https://blog.scootermap.com/'
                body='Do things right and you should be paying close to $0 in taxes on your scooter charging 1099 income … Keeper Tax makes sure of that!' 
            />

            <div style={styles.howItWorksTextBackground}>
                <p style={styles.howItWorksFont} className="text-center">
                    HOW IT WORKS 
                </p>
            </div>

            <SectionTemplate 
                sectionTitle='We find tax write offs among your bank statements 🏦' 
                sectionExplainerText='Signing up is simple - just tell us what you do for work, and link a bank account.'
                img='https://storage.googleapis.com/titanium-diode-208122.appspot.com/ezgif.com-resize.gif'
            />

            <SectionTemplate
                sectionTitle="Stay up to date via SMS 💬" 
                sectionExplainerText="When we find a tax write off, we send a quick text to let you know."
                img='https://storage.googleapis.com/titanium-diode-208122.appspot.com/uptodate.png'
            />

            <SectionTemplate 
                sectionTitle='Answer questions to unlock more write offs 💸' 
                sectionExplainerText="Our bookkeepers will sometimes ask for more information that unlocks additional tax write offs."
                img='https://storage.googleapis.com/titanium-diode-208122.appspot.com/answer-questions.png'
            />

            <SectionTemplate 
                sectionTitle='Monthly summaries prepared by real bookkeepers 👨‍💼' 
                sectionExplainerText="At the end of each month, a member of our bookkeeping team will prepare an expense summary for your review."
                img='https://storage.googleapis.com/titanium-diode-208122.appspot.com/summary.png'
            />

            <PricingBanner />

            <div style={styles.howItWorksTextBackground}>
                <p style={styles.howItWorksFont} className="text-center">
                    Here's what our subscribers tell us:
                </p>
            </div>

            <TestimonialTemplate
                byLine='- Nic, freelance designer' 
                body="I'm already busy doing everything from design to sales to marketing and being the janitor. Not having to scan receipts at 4am every day is so nice."
                img='https://storage.googleapis.com/titanium-diode-208122.appspot.com/nic.jpg'
            />

            <TestimonialTemplate
                byLine='- Amanda, real estate agent' 
                body="No more QuickBooks sessions on Sunday nights … I love it!"
                img='https://storage.googleapis.com/titanium-diode-208122.appspot.com/amanda.png'
            />

            <TestimonialTemplate
                byLine='- Sarah, online reseller' 
                body="Had no idea how much [tax write offs] I could claim! Brilliant."
                img='https://storage.googleapis.com/titanium-diode-208122.appspot.com/sarah.png'
            />

            <div>
                <PhoneSignUp />
            </div>
        </div>
    )}
}


export default ScooterMapLP;
