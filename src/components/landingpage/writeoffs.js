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
            <div style={styles.actionCardWhite}> 
                <MediaQuery query='(max-width: 1000px)'>
                    <div className= "col-3">
                        <WriteOffCard emoji='📞' title='phone bill' summary="if you use your phone for work, it's a write off!"/>
                    </div>
                    <div className= "col-3">
                        <WriteOffCard emoji='📓' title='work supplies' summary="notebooks, staplers, pens, etc."/>
                    </div>
                    <div className= "col-3">
                        <WriteOffCard emoji='⛽' title='gas fill ups' summary="If you drive your car for work, add in gas, tolls, and maintenance"/>
                    </div>
                </MediaQuery>
                <MediaQuery query='(min-width: 1001px)'>

                <div className="row align-items-start container"> 
                    <div style={styles.writeoffPadding} className= "col-6">
                        <WriteOffCard emoji='📞' title='phone bill' summary="if you use your phone for work, it's a write off!"/>
                    </div>
                    <div style={styles.writeoffPadding} className= "col-6">
                        <WriteOffCard emoji='📓' title='work supplies' summary="notebooks, pens, laptops, etc."/>
                    </div>
                    <div style={styles.writeoffPadding} className= "col-6">
                        <WriteOffCard emoji='⛽' title='gas fill ups' summary="If you drive your car for work, add in gas, tolls, and maintenance"/>
                    </div>
                    <div style={styles.writeoffPadding} className= "col-6">
                        <WriteOffCard emoji='🏠' title='home office' summary="Take off a portion of your rent if you have a work office inside your home"/>
                    </div>
                    <div style={styles.writeoffPadding} className= "col-6">
                        <WriteOffCard emoji='🚗' title='transportation' summary="Uber, Lyft, bike share co-op, you name it!"/>
                    </div>
                    <div style={styles.writeoffPadding} className= "col-6 ">
                        <WriteOffCard emoji='🍲' title='client meals' summary="Write off client meals and entertainment"/>
                    </div>

                </div>
                </MediaQuery>

            </div>
        )
    }
}


export default WriteOffs;
