import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loader from '../../common/Material/Loader';
import { getExpenseList, getExpenseCategoryList, updateLocalExpenses } from '../../../actions/expenseActions';
import { updateMessageSentence } from '../../../actions/chatActions';

import './expense.css';
import moment from 'moment';

class Expense extends Component {
  constructor() {
    super();
    this.state = {
      expenseList: [],
      expenseCategories: []
    };
  }

  componentDidMount() {
    this.props.getExpenseCategoryList();
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      expenseList: newProps.expense.expenseList,
      expenseCategories: newProps.expense.categoryList
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
    this.setState({ expenseList }, async () => {
      await this.props.updateLocalExpenses(expenseList);
      await this.createMessage();
    });
  }

  /**
   * @dec On Status change event
   * @param {*} e
   * @param {*} listInd
   * @param {*} expInd
   */
  _onStatusChange(e, listInd, expInd) {
    const val = e.target.value;
    let { expenseList } = this.state;
    expenseList[listInd].expenses[expInd].status = val;
    expenseList[listInd].expenses[expInd].changed = true;
    this.setState({ expenseList });

    this.setState({ expenseList }, async () => {
      await this.props.updateLocalExpenses(expenseList);
      await this.createMessage();
    });
  }

  /**
   * @dec On Category change event
   * @param {*} e
   * @param {*} listInd
   * @param {*} expInd
   */
  _onCategoryChange(e, listInd, expInd) {
    const val = e.target.value;
    let { expenseList, expenseCategories } = this.state;
    expenseList[listInd].expenses[expInd].keeper_category = val;
    expenseList[listInd].expenses[expInd].changed = true;
    for (const index in expenseCategories) {
        if (val === expenseCategories[index].display_name) {
            expenseList[listInd].expenses[expInd].keeper_category_id = expenseCategories[index].id
        }
    }
    this.setState({ expenseList }, async () => {
      await this.props.updateLocalExpenses(expenseList);
      await this.createMessage();
    });
  }

  /**
   * @desc Create Custom Message
   */
  async createMessage() {
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
        };
      };
    };

    const sentenceObj = {
      userName: memberInfo.userName,
      categories: expenseCategories,
      maybeArr,
      probArr
    };

    await this.props.updateMessageSentence(sentenceObj);
  }

  /**
   * @desc Change Display Format based on date
   * @param {*} date
   */
  __displayDate(date) {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1)

    const newDateStr = moment(today).format('YYYY-MM-DD');
    const newYestStr = moment(yesterday).format('YYYY-MM-DD')
    
    if (newDateStr === date) {
      return 'Today';
    } else if (newYestStr === date) {
      return `Yesterday, ${moment(newDate).format('M/D')}`;
    } else {
      return moment(newDate).format('M/D');
    }
  }

  render() {
    const { expenseCategories, expenseList } = this.state;
    const { loader } = this.props.expense;

    return (
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
                        <select className='browser-default' name='expenseStatus' value={expense.status} onChange={e => this._onStatusChange(e, listInd, expInd)}>
                          <option value=''>-</option>
                          <option value='prob'>prob</option>
                          <option value='maybe'>maybe</option>
                          <option value='yes'>yes</option>
                          <option value='no'>no</option>
                          <option value='maybe*'>maybe*</option>
                        </select>
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
                      <div className='category'>
                        <select className='browser-default' name='expenseCategory' value={expense.keeper_category} onChange={e => this._onCategoryChange(e, listInd, expInd)}>
                          {expenseCategories.length > 0 &&
                            expenseCategories.map((cat, catInd) => (
                              <option key={`cat${catInd}`} value={cat.display_name}>
                                {cat.display_name}
                              </option>
                            ))}
                        </select>
                      </div>
                      <div className='amount'>
                        <span>${expense.amount}</span>
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
                            <span>{expense.name}</span>
                          </p>
                          <p>
                            <b>Pliad Category:</b>
                            <span>{expense.category}</span>
                          </p>
                          <p>
                            <b>Location:</b>
                            <span>{expense.location}</span>
                          </p>
                          <p>
                            <b>Account / Bank Name:</b>
                            <span>{expense.bank_acct_name}</span>
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          ))}
      </div>
    );
  }
}

Expense.propTypes = {
  getExpenseList: PropTypes.func.isRequired,
  getExpenseCategoryList: PropTypes.func.isRequired,
  updateMessageSentence: PropTypes.func.isRequired,
  updateLocalExpenses: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  expense: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user,
  expense: state.expense
});

export default connect(
  mapStateToProps,
  { getExpenseList, getExpenseCategoryList, updateMessageSentence, updateLocalExpenses }
)(Expense);
