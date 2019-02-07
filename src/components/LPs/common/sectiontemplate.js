import React from "react";
import * as styles from "./styles";
import MediaQuery from 'react-responsive';

class SectionTemplate extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (   
            <div style={styles.sectionBackground}>         
                <MediaQuery query='(max-width: 768px)'>

                    <div> 
                        <div style={styles.heroSection} className="col-md-6 my-auto"> 
                            <div style={styles.sectionTextMobile}> 
                                <div style={styles.sectionTitleMobile}> 
                                    {this.props.sectionTitle}
                                </div>
                                <p style={styles.sectionExplainerTextMobile}> 
                                    {this.props.sectionExplainerText} 
                                </p>
                            </div>
                        </div>
                    </div>

                    <div> 
                        <div style={styles.sectionImage} className="col-6">
                            <img src={this.props.img} style={styles.MP4video} />
                        </div>
                    </div> 

                </MediaQuery>

                <MediaQuery query='(min-width: 769px)'>

                    <div style={styles.heroPaddingMargin} className="col-12 row"> 

                        <div className="col-md-6 my-auto text-left"> 
                            <div style={styles.sectionText}>
                                <p style={styles.sectionTitle}> 
                                    {this.props.sectionTitle}
                                </p>
                                <p style={styles.sectionExplainerText}> 
                                    {this.props.sectionExplainerText} 
                                </p>
                            </div>
                        </div>

                        <div style={styles.sectionImage} className="col-md-6 my-auto">
                            <img src={this.props.img} style={styles.MP4video} />
                        </div>
                    </div>

                </MediaQuery>
            </div>
        )
    }
}

export default SectionTemplate;
