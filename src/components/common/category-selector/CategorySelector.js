import React, { Component } from 'react';
import './CategorySelector.css';
import * as _ from 'lodash';

class CategorySelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      filteredItem: [],
      value: '',
      ddActive: false,
      searchText: '',
      searchActive: false
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
    const filteredItem = [...items];

    this.setState({ items, value, filteredItem });
  }

  componentWillReceiveProps(props) {
    const { items, value } = props;
    const filteredItem = [...items];
    this.setState({ items, value, filteredItem });
  }

  handleClick(e) {
    // if (this.node.contains(e.target)) {
    //   return;
    // } else {
    //   this.setState({ ddActive: false });
    // }
  }

  _onDispValClick() {
    this.setState({ ddActive: true, searchActive: true }, () => {
      this.searchInput.focus();
    });
  }

  _onSearch(e) {
    const val = e.target.value;
    const { items } = this.state;
    let newItems;
    if (val !== '') {
      newItems = _.filter(items, item => {
        return item.display_name.indexOf(val) > -1;
      });
    } else {
      newItems = [...items];
    }

    this.setState({ [e.target.name]: e.target.value, filteredItem: newItems });
  }

  _onSearchBlur(e) {
    this.setState({ searchActive: false, ddActive: false });
  }

  /**
   * @desc On Dropdown Item select
   * @param {*} value
   */
  _onItemClick(value) {
    this.setState({ ddActive: false, value });
    this.props.onSelect(value);
  }

  render() {
    const { ddActive, searchText, searchActive, filteredItem, value } = this.state;

    return (
      <div className='category-selector' ref={node => (this.node = node)}>
        {searchActive && (
          <div className='input-s'>
            <input
              type='text'
              name='searchText'
              className='search-input'
              value={searchText}
              onChange={e => this._onSearch(e)}
              onBlur={e => this._onSearchBlur(e)}
              ref={input => (this.searchInput = input)}
            />
          </div>
        )}
        {!searchActive && (
          <div className='disp-s' onClick={() => this._onDispValClick()}>
            <span className='disp-text'>{value !== '' ? value : '-'}</span>
          </div>
        )}
        {ddActive && (
          <div className='dropdown-s'>
            {filteredItem.length > 0 &&
              filteredItem.map((item, index) => (
                <div className='s-item' key={`dd_item${index}`} onClick={() => this._onItemClick(item.display_name)}>
                  <span>{item.display_name !== '' ? item.display_name : '-'}</span>
                </div>
              ))}
          </div>
        )}
      </div>
    );
  }
}

export default CategorySelector;
