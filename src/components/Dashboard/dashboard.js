import React, { Component } from 'react';
import * as styles from '../../styles';
import KeeperNav from '../partials/nav';

import StatusSelector from '../common/status-selector/StatusSelector';
import CategorySelector from '../common/category-selector/CategorySelector';
import { getExpenseList, getExpenseCategoryList } from '../../actions/expenseActions';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import moment from 'moment';
import Loader from '../common/Loader';
import './Dashboard.css';

const statusArr = ['prob', 'maybe', 'yes', 'no', 'maybe*', '-'];

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: true,
      expenseList: [],
      expenseCategories: [],
      listIndex: -1,
      amountIndex: -1
    };
  }

  componentDidMount() {
    const userObj = {
      user_id: '19528078024',
      userName: 'David'
    };
    getExpenseCategoryList(categories => {
      this.setState({ expenseCategories: categories }, () => {
        getExpenseList(userObj, res => {
          this.setState({ expenseList: res, loader: false });
        });
      });
    });
  }

  /**
   * @desc Collapse Action for expense list
   * @param {*} listInd
   * @param {*} expInd
   */
  _collapseAction(listInd, expInd) {
    let { expenseList } = this.state;
    expenseList[listInd].expenses[expInd].collapsed = !expenseList[listInd].expenses[expInd].collapsed;
    this.setState({ expenseList });
  }

  /**
   * @dec On Textbox change event
   * @param {*} e
   * @param {*} listInd
   * @param {*} expInd
   */
  _onTxtChange(e, listInd, expInd) {
    const val = e.target.value;
    let { expenseList } = this.state;
    expenseList[listInd].expenses[expInd].clean_name = val;
    expenseList[listInd].expenses[expInd].changed = true;
    this.setState({ expenseList });
  }

  /**
   * @desc On Textbox Blur event
   * @param {*} e
   * @param {*} listInd
   * @param {*} expInd
   */
  _onTxtBlur(e, listInd, expInd) {
    const val = e.target.value;
    let { expenseList } = this.state;
    this.setState({ expenseList }, () => {
      // await this.props.updateLocalExpenses(expenseList);
      // await this.createMessage();
    });
  }

  /**
   * @dec On Status change event
   * @param {*} val
   * @param {*} listInd
   * @param {*} expInd
   */
  _onStatusChange(val, listInd, expInd) {
    let { expenseList } = this.state;
    expenseList[listInd].expenses[expInd].status = val;
    expenseList[listInd].expenses[expInd].changed = true;
    this.setState({ expenseList });

    this.setState({ expenseList }, () => {
      // await this.props.updateLocalExpenses(expenseList);
      // await this.createMessage();
    });
  }

  /**
   * @dec On Category change event
   * @param {*} val
   * @param {*} listInd
   * @param {*} expInd
   */
  _onCategoryChange(val, listInd, expInd) {
    let { expenseList, expenseCategories } = this.state;
    expenseList[listInd].expenses[expInd].keeper_category = val;
    expenseList[listInd].expenses[expInd].changed = true;
    for (const index in expenseCategories) {
      if (val === expenseCategories[index].display_name) {
        expenseList[listInd].expenses[expInd].keeper_category_id = expenseCategories[index].id;
      }
    }
    this.setState({ expenseList }, () => {
      // await this.props.updateLocalExpenses(expenseList);
      // await this.createMessage();
    });
  }

  /**
   * @desc Create Custom Message
   */
  createMessage() {
    let { expenseList, expenseCategories } = this.state;
    const { memberInfo } = this.props.user;
    let probArr = [];
    let maybeArr = [];
    for (const index in expenseList) {
      for (const expense in expenseList[index].expenses) {
        if (expenseList[index].expenses[expense].status === 'prob') {
          probArr.push(expenseList[index].expenses[expense]);
        } else if (expenseList[index].expenses[expense].status === 'maybe') {
          maybeArr.push(expenseList[index].expenses[expense]);
        }
      }
    }

    const sentenceObj = {
      userName: memberInfo.userName,
      categories: expenseCategories,
      maybeArr,
      probArr
    };

    // await this.props.updateMessageSentence(sentenceObj);
  }

  /**
   * @desc Change Display Format based on date
   * @param {*} date
   */
  __displayDate(date) {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    // const newDate = new Date(date);
    // newDate.setDate(newDate.getDate() + 1);

    const newDateStr = moment(today).format('YYYY-MM-DD');
    const newYestStr = moment(yesterday).format('YYYY-MM-DD');

    if (newDateStr === date) {
      return 'Today';
    } else if (newYestStr === date) {
      return `Yesterday, ${moment(date).format('M/D')}`;
    } else {
      return moment(date).format('M/D');
    }
  }

  /**
   * @desc On Amount Click
   * @param {*} e
   * @param {*} listInd
   * @param {*} expInd
   */
  _onAmountClick(e, listInd, expInd) {
    this.setState({ listIndex: listInd, amountIndex: expInd }, () => {
      this.expenseAmountInput.focus();
    });
  }

  /**
   * @desc On Amount textbox change event
   * @param {*} e
   * @param {*} listInd
   * @param {*} expInd
   */
  _onAmountChange(e, listInd, expInd) {
    const val = e.target.value;
    let { expenseList } = this.state;
    expenseList[listInd].expenses[expInd].amount = val;
    expenseList[listInd].expenses[expInd].changed = true;
    this.setState({ expenseList });
  }

  /**
   * @desc On Amount Textbox Blur event
   * @param {*} e
   * @param {*} listInd
   * @param {*} expInd
   */
  _onAmountBlur(e, listInd, expInd) {
    let { expenseList } = this.state;
    const val = parseFloat(e.target.value);
    expenseList[listInd].expenses[expInd].amount = val % 1 !== 0 ? val.toFixed(2) : val;
    this.setState({ expenseList, listIndex: -1, amountIndex: -1 }, () => {
      // await this.props.updateLocalExpenses(expenseList);
      // await this.createMessage();
    });
  }

  render() {
    const { expenseCategories, expenseList, listIndex, amountIndex, loader } = this.state;

    return (
      <div style={styles.outerContainer} className='container'>
        <KeeperNav />
        <div style={styles.containerStyle} className='container'>
          <div className='row align-items-start'>
            <div className='col-12 my-auto'>
              <h1 className='page-heading'>Hi, Paul</h1>
              <p className='important-text'>Here is Januaray 2019 Tax Write off summary! Any modifications you make will be saved.</p>
              <div className='expense'>
                {loader && <Loader />}
                {!loader &&
                  expenseList.length > 0 &&
                  expenseList.map((list, listInd) => (
                    <div className='e-section' key={`exp_${listInd}`}>
                      <div className='s-header'>
                        <span>{this.__displayDate(list.date)}</span>
                      </div>
                      <div className='s-list'>
                        {list.expenses.length > 0 &&
                          list.expenses.map((expense, expInd) => (
                            <div className='l-item' key={`exp_i_${expInd}`}>
                              <div className='status'>
                                <StatusSelector
                                  items={statusArr}
                                  value={expense.status}
                                  onSelect={item => this._onStatusChange(item, listInd, expInd)}
                                />
                              </div>
                              <div className='amount'>
                                {(listInd !== listIndex || expInd !== amountIndex) && (
                                  <span onClick={e => this._onAmountClick(e, listInd, expInd)}>${expense.amount}</span>
                                )}
                                {listIndex === listInd && amountIndex === expInd && (
                                  <input
                                    type='text'
                                    className='txtbx'
                                    name='amount'
                                    onChange={e => this._onAmountChange(e, listInd, expInd)}
                                    onBlur={e => this._onAmountBlur(e, listInd, expInd)}
                                    value={expense.amount}
                                    ref={input => {
                                      this.expenseAmountInput = input;
                                    }}
                                  />
                                )}
                              </div>
                              <div className='category'>
                                <CategorySelector
                                  items={expenseCategories}
                                  value={expense.keeper_category}
                                  onSelect={item => this._onCategoryChange(item, listInd, expInd)}
                                />
                              </div>
                              <div className='description'>
                                <input
                                  type='text'
                                  className='txtbx'
                                  name={`desc${expInd}`}
                                  onChange={e => this._onTxtChange(e, listInd, expInd)}
                                  onBlur={e => this._onTxtBlur(e, listInd, expInd)}
                                  value={expense.clean_name}
                                />
                              </div>
                              <div className='pending'>
                                <span>{expense.pending ? 'P' : '-'}</span>
                              </div>
                              <div className='control'>
                                {expense.collapsed && (
                                  <span onClick={() => this._collapseAction(listInd, expInd)}>
                                    <i className='fa fa-angle-down' />
                                  </span>
                                )}
                                {!expense.collapsed && (
                                  <span onClick={() => this._collapseAction(listInd, expInd)}>
                                    <i className='fa fa-angle-left' />
                                  </span>
                                )}
                              </div>
                              {expense.collapsed && (
                                <div className='i-description'>
                                  <p>
                                    <b>Raw Description:</b>
                                    <span> {expense.name}</span>
                                    <CopyToClipboard text={expense.name} onCopy={() => alert('Copied to clipboard!')}>
                                      <button className='copy-btn'>
                                        <i className='fa fa-copy' />
                                      </button>
                                    </CopyToClipboard>
                                  </p>
                                  <p>
                                    <b>Pliad Category:</b>
                                    <span> {expense.category}</span>
                                  </p>
                                  <p>
                                    <b>Location:</b>
                                    <span> {expense.location}</span>
                                  </p>
                                  <p>
                                    <b>Account / Bank Name:</b>
                                    <span> {expense.bank_acct_name}</span>
                                  </p>
                                </div>
                              )}
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;