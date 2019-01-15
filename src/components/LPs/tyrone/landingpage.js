import React from "react";
import { Link } from "react-router-dom";
import * as styles from "../../../styles";
import KeeperNav from "./nav";
import Hero from "./hero";
import WriteOffs from "./writeoffs";
import HeroImg from "./heroImg";
import HowItWorks from "../../howitworks";
import PhoneSignUp from "../../phonesignup";
import MediaQuery from 'react-responsive';
import SectionTemplate from "../../sectiontemplate";
import SectionTemplateRight from "../../sectiontemplate-right";
import TestimonialTemplate from "../../testimonial";
import PartnerTestimonialTemplate from "../../partnertestimonial";

class TyroneLP extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <div style={styles.outerContainerLP} className="container">
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

            <PartnerTestimonialTemplate
                byLine='' 
                body="For everyone who had trouble keeping track of receipts last year... this could change the game!"
                img='https://yt3.ggpht.com/a-/AAuE7mBBEWqPcAas96zLHavKgJcFUjz1-HZlPh27=s288-mo-c-c0xffffffff-rj-k-no'
                link='https://www.youtube.com/channel/UCDd4DYxkosoX5UDGB0u2G2A'
            />

            <div style={styles.howItWorksTextBackground}>
                <p style={styles.sectionTitleMobile} className="text-center">
                    Here's how it works ⚙️
                </p>
            </div>

            <SectionTemplateRight 
                sectionTitle='We find tax write offs among your bank statements 🏦' 
                sectionExplainerText='Signing up is simple - just tell us what you do for work, and link a bank account. From there, our bookkeeping team starts looking for tax write offs among your purchases.'
                img='https://storage.googleapis.com/titanium-diode-208122.appspot.com/ezgif.com-resize.gif'
            />

            <SectionTemplate
                sectionTitle="Stay up to date via SMS 💬" 
                sectionExplainerText="When we find a tax write off, we send a quick text to let you know. It’s fun to find out that something you bought is deductible, and that there’s a team of bookkeepers behind you at all times!"
                img='https://storage.googleapis.com/titanium-diode-208122.appspot.com/uptodate.png'
            />

            <SectionTemplateRight 
                sectionTitle='Answer questions to unlock more write offs 💸' 
                sectionExplainerText="Our bookkeepers will sometimes ask for more information that unlocks additional tax write offs. The most common examples are large restaurant bills, or whether you’re out of town for work."
                img='https://storage.googleapis.com/titanium-diode-208122.appspot.com/answer-questions.png'
            />

            <SectionTemplate 
                sectionTitle='Monthly summaries prepared by real bookkeepers 👨‍💼' 
                sectionExplainerText="At the end of each month, a member of our bookkeeping team will prepare an expense summary for your review. You can also put us in touch directly with your accountant for quarterly and end-of-year tax filing."
                img='https://storage.googleapis.com/titanium-diode-208122.appspot.com/summary.png'
            />

            <div style={styles.howItWorksTextBackground}>
                <p style={styles.sectionTitleMobile} className="text-center">
                    Here's what our users tell us 😊
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
                body="Had no idea how much [tax write offs] I could claim! This is great."
                img='https://storage.googleapis.com/titanium-diode-208122.appspot.com/sarah.png'
            />

            <div>
                <PhoneSignUp />
            </div>
        </div>
    )}
}


export default TyroneLP;
