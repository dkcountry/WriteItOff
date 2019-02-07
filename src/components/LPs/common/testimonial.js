import React from "react";
import * as styles from "./styles";
import MediaQuery from 'react-responsive';

class TestimonialTemplate extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (   
            <div style={styles.sectionBackground}>         
                <MediaQuery query='(max-width: 768px)'>

                    <div> 
                        <div style={styles.sectionImage} className="col-6">
                            <img src={this.props.img} style={styles.testimonialImg} />
                        </div>
                    </div> 

                    <div> 
                        <div style={styles.heroSection} className="col-md-6 my-auto"> 
                            <div style={styles.sectionTextMobile}> 
                                <div style={styles.sectionExplainerText}>
                                    <img 
                                        src={'http://www.clker.com/cliparts/r/L/A/C/5/b/gray-quotation-marks-hi.png'}
                                        style={styles.testimonialQuote}
                                    />
                                    <br />
                                        {this.props.body}
                                </div>
                                <p style={styles.testimonialByLine}> 
                                    {this.props.byLine} 
                                </p>
                            </div>
                        </div>
                    </div>

                </MediaQuery>

                <MediaQuery query='(min-width: 769px)'>

                    <div className="row">

                        <div className="col-3 my-auto"> </div> 
                        <div className="col-2 my-auto">
                            <img style={styles.testimonialImg} src={this.props.img} />
                        </div>

                        <div className="col-4 my-auto text-left"> 
                            <div>
                                <p style={styles.testimonialBody}>
                                    " {this.props.body}"
                                </p>
                                <p style={styles.testimonialByLineDesk} className="text-left"> 
                                    {this.props.byLine} 
                                </p>
                            </div>
                        </div>
                        <div className="col-3 my-auto"> </div>
                    </div>

                </MediaQuery>
            </div>
        )
    }
}

export default TestimonialTemplate;
