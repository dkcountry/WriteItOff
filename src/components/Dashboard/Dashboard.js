import React, { Component } from 'react';
import * as styles from '../../styles';
import KeeperNav from '../partials/nav';
import PhoneInput from '../LPs/common/phoneinput';
import axios from 'axios';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
  }

  componentDidMount() {}

  render() {
    return (
      <div style={styles.outerContainer} className='container'>
        <KeeperNav />
        <div style={styles.containerStyle} className='container'>
          <div className='row align-items-start'>
            <div style={styles.actionCardPricing} className='col-8 my-auto'>
              <div className='container'>
                <div>
                  <p style={styles.header}>$10 / month</p>

                  <p style={styles.pricingText}>
                    This includes daily bookkeeping, monthly reviews, and everything you need to plug your numbers into TurboTax / H&R Block
                    at tax time.
                  </p>

                  <br />

                  <div style={styles.landingPageInput} className='text-left'>
                    <PhoneInput />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
