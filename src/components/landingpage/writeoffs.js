import React from "react";
import * as styles from "../../styles";
import WriteOffCard from "./writeoffcard";
import MediaQuery from 'react-responsive';


class WriteOffs extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div>
                <MediaQuery query='(max-width: 568px)'>
                  <div className="text-center">
                    <img style={styles.expensesImg} src="https://storage.googleapis.com/titanium-diode-208122.appspot.com/expense%20examples%20narrow%20(2).png">
                    </img>
                  </div>
                </MediaQuery>

                <MediaQuery query='(min-width: 569px)'>
                    <div className="text-center"> 
                        <img style={styles.expensesImg} src="https://storage.googleapis.com/titanium-diode-208122.appspot.com/expense%20examples.png">
                        </img>
                    </div>
                </MediaQuery>
            </div>
        )
    }
}


export default WriteOffs;
