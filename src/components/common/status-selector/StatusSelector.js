import React, { Component } from 'react';
import './StatusSelector.css';

class StatusSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      value: '',
      ddActive: false,
      valueIndex: -1
    };
  }

  componentWillMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  }

  componentDidMount() {
    const { items, value } = this.props;
    const valueIndex = items.indexOf(value);
    this.setState({ items, value, valueIndex });
  }

  componentWillReceiveProps(props) {
    const { items, value } = props;
    const valueIndex = items.indexOf(value);
    this.setState({ items, value, valueIndex });
  }

  /**
   * @desc On Display Section Click
   */
  _onDispValClick() {
    const { ddActive } = this.state;
    this.setState({ ddActive: !ddActive });
  }

  /**
   * @desc On Dropdown Item select
   * @param {*} value
   */
  _onItemClick(value) {
    const { items } = this.state;
    const valueIndex = items.indexOf(value);
    this.setState({ ddActive: false, value, valueIndex });
    this.props.onSelect(value);
  }

  handleClick(e) {
    // if (this.node.contains(e.target)) {
    //   return;
    // } else {
    //   this.setState({ ddActive: false });
    // }
  }
  render() {
    const { ddActive, items, value, valueIndex } = this.state;
    return (
      <div className='status-selector' ref={node => (this.node = node)}>
        <div className={`disp-s i-${valueIndex + 1}`} onClick={() => this._onDispValClick()}>
          <span className='s-text'>{value !== '' ? value : '-'}</span>
        </div>
        {ddActive && (
          <div className='dropdown-s'>
            {items.length > 0 &&
              items.map((item, index) => (
                <div className='s-item' key={`dd_item${index}`} onClick={() => this._onItemClick(item)}>
                  <span>{item !== '' ? item : '-'}</span>
                </div>
              ))}
          </div>
        )}
      </div>
    );
  }
}

export default StatusSelector;
