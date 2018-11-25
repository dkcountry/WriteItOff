import React from "react";
import * as styles from "../../styles";

class WriteOffCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            emoji: this.props.emoji,
            title: this.props.title,
            summary: this.props.summary
        };
    }

    render() {

        return (
            <div style={styles.actionCardWhite}> 
                <div className="row align-items-start"> 
                    <div style={styles.howItWorksEmoji} className= "col-4 text-center">
                        <span role="img" aria-label="emoji">{this.state.emoji}</span>
                    </div>
                    <div style={styles.writeoffPadding} className= "col-8">
                    <p>
                        {this.state.title}
                    </p>
                    <p style={{"fontSize": "25px"}}>
                        {this.state.summary}
                    </p>
                    </div>
                </div>

            </div>
        )
    }
}


export default WriteOffCard;
