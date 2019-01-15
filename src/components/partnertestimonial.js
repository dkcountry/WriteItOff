import React from "react";
import * as styles from "../styles";
import MediaQuery from 'react-responsive';

class PartnerTestimonialTemplate extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (   
            <div style={styles.parterTestimonialBackground}>         
                <MediaQuery query='(max-width: 768px)'>

                    <div> 
                        <div style={styles.sectionImage} className="col-6">
                            <img src={this.props.img} style={styles.testimonialImg} />
                        </div>
                    </div> 

                    <div> 
                        <div style={styles.heroSection} className="col-md-6 my-auto"> 
                            <div style={styles.sectionTextMobile}> 
                                <div style={styles.sectionExplainerTextWhite}>
                                    <br />
                                        {this.props.body}
                                </div>
                                <p style={styles.testimonialByLine}> 
                                    {this.props.byLine} 
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="container"> 
                        <div className="col-md-auto text-center"> 
                            <a href= {this.props.link} >
                                <button style={styles.btnStyleGrey} className="btn btn-primary btn-lg">
                                    watch the video
                                </button>
                            </a>
                        </div> 
                        </div>
                    </div>

                </MediaQuery>

                <MediaQuery query='(min-width: 769px)'>

                    <div className="row">

                        <div className="col-2 my-auto"> </div> 
                        <div className="col-2 my-auto">
                            <img style={styles.testimonialImg} src={this.props.img} />
                        </div>

                        <div className="col-6 my-auto text-left"> 
                            <div>
                                <p style={styles.PartnerQuote}>
                                    " {this.props.body}"
                                </p>
                                <p style={styles.testimonialByLineDesk} className="text-left"> 
                                    {this.props.byLine} 
                                </p>
                            </div>
                        </div>
                        <div className="col-2 my-auto"> </div>
                    </div>
                    <div className="row">
                        <div className="container"> 
                        <div className="col-md-auto text-center"> 
                            <a href= {this.props.link} >
                                <button style={styles.btnStyleGrey} className="btn btn-primary btn-lg">
                                    watch the video
                                </button>
                            </a>
                        </div> 
                        </div>
                    </div>

                </MediaQuery>
            </div>
        )
    }
}

export default PartnerTestimonialTemplate;
