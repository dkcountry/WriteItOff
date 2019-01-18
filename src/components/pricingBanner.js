import React from "react";
import * as styles from "../styles";
import MediaQuery from 'react-responsive';

class PricingBanner extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (   
            <div style={styles.pricingBannerBackground} className="my-auto">         
                <MediaQuery query='(max-width: 768px)'>
                    <div style={styles.pricingHeroSection} className="col-md-6 my-auto"> 
                        <div style={styles.sectionTextMobile}> 
                            <div style={styles.pricingBannerTitleMobile}> 
                                BENEFIT
                            </div>
                            <p style={styles.pricingBannerExplainerTextMobilePricing}> 
                                <strong>$173 saved / month</strong>
                            </p>
                            <p style={styles.pricingBannerExplainerTextMobile}> 
                                Based on the tax write offs subscribers report they would've missed otherwise.
                            </p>
                        </div>
                    </div>
                    <div style={styles.pricingSeparationLine}></div>

                    <div style={styles.pricingHeroSectionBottom} className="col-md-6 my-auto"> 
                        <div style={styles.sectionTextMobile}> 
                            <div style={styles.pricingBannerTitleMobile}> 
                                COST
                            </div>
                            <p style={styles.pricingBannerExplainerTextMobilePricing}> 
                                <strong>$10 / month</strong>
                            </p>
                            <p style={styles.pricingBannerExplainerTextMobile}> 
                            We only charge subscribers after we've found them $100 in tax write offs.
                            </p>
                        </div>
                    </div>

                </MediaQuery>

                <MediaQuery query='(min-width: 769px)'>
                    <div style={styles.heroPaddingMargin} className="col-12 row"> 
                        <div className="col-md-6 text-left" style={styles.pricingLeft}> 
                            <div style={styles.pricingSectionText}>
                                <p style={styles.pricingBannerTitle}> 
                                    BENEFIT
                                </p>
                                <p style={styles.pricingBannerExplainerTextPrice}> 
                                    <strong>$173 saved / month</strong>
                                </p>
                                <p style={styles.pricingBannerExplainerText}> 
                                    Based on the tax write offs subscribers report they would've missed otherwise.
                                </p>
                            </div>
                        </div>

                        <div className="col-md-6 text-left" style={styles.pricingRight}> 
                            <div style={styles.pricingSectionText}>
                                <p style={styles.pricingBannerTitle}> 
                                    COST
                                </p>
                                <p style={styles.pricingBannerExplainerTextPrice}> 
                                    <strong>$10 / month</strong>
                                </p>
                                <p style={styles.pricingBannerExplainerText}> 
                                    We only charge subscribers after we've found them over $100 in tax write offs.
                                </p>
                            </div>
                        </div>
                    </div>
                </MediaQuery>
            </div>
        )
    }
}

export default PricingBanner;
