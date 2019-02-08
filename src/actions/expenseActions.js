import axios from 'axios';
import { serverUrl } from '../global/Environment';
import moment from 'moment';
import { isValidDate } from '../global/Helpers';

const baseUrl = serverUrl();

/**
 * @desc Get Users Expense List
 */
export const getExpenseList = (obj, callback) => {
  axios
    .post(`${baseUrl}getJanExpenses`, obj)
    .then(response => response.data)
    .then(res => {
      const expenses = _filterExpense(res);

      expenses.sort(function compare(a, b) {
        var dateA = new Date(a.date);
        var dateB = new Date(b.date);
        return dateB - dateA;
      });
      const time = expenses.map(data => data.date);

      /**
       * Create Dates Array
       */
      let dateArr = [];
      /**
       * Only Take expense which has valid date
       */
      const validExpenses = expenses.filter(data => isValidDate(new Date(data.date)));
      for (let i = 0; i < validExpenses.length; i++) {
        const expDate = validExpenses[i].date;
        // let tempDate = moment(expDate).add(1, 'd').format('YYYY-MM-DD');
        let tempDate = moment(expDate).format('YYYY-MM-DD');
        if (dateArr.indexOf(tempDate) === -1) {
          dateArr.push(tempDate);
        }
      }

      /**
       * Distribute expenses in particular dates object
       */
      const distExpenses = [];
      for (let i = 0; i < dateArr.length; i++) {
        // const filteredExpeses = expenses.filter(
        //   data => moment(data.date).add(1, 'd').format('YYYY-MM-DD') === dateArr[i]
        // );
        const filteredExpeses = expenses.filter(data => moment(data.date).format('YYYY-MM-DD') === dateArr[i]);
        distExpenses.push({
          date: dateArr[i],
          expenses: filteredExpeses
        });
      }
      callback(distExpenses);
    })
    .catch(error => {
      console.log(error);
    });
};

/**
 * @desc Get Users Expense List
 */
export const getExpenseCategoryList = callback => {
  axios
    .post(`${baseUrl}loadCatMap`, {})
    .then(response => response.data)
    .then(res => {
      const categories = res;
      callback(categories);
    })
    .catch(error => {
      console.log(error);
    });
};

/**
 * @desc Filter Expenses
 */
const _filterExpense = expenseList => {
  const expenses = expenseList.map((data, index) => {
    let retObj = {};
    retObj['id'] = index;
    retObj['phone'] = data.phone;
    retObj['account_id'] = data.account_id;
    retObj['account_owner'] = data.account_owner;
    retObj['amount'] = data.amount % 1 !== 0 ? data.amount.toFixed(2) : data.amount;
    retObj['category'] = data.category;
    retObj['category_id'] = data.category_id;
    retObj['date'] = data.date;
    retObj['iso_currency_code'] = data.iso_currency_code;
    retObj['location'] = data.location;
    retObj['name'] = data.name;
    retObj['payment_meta'] = data.payment_meta;
    retObj['pending'] = data.pending;
    retObj['pending_transaction_id'] = data.pending_transaction_id;
    retObj['transaction_id'] = data.transaction_id;
    retObj['transaction_type'] = data.transaction_type;
    retObj['unofficial_currency_code'] = data.unofficial_currency_code;
    retObj['balances'] = data.balances;
    retObj['mask'] = data.mask;
    retObj['acct_name'] = data.acct_name;
    retObj['bank_acct_name'] = data.bank_acct_name;
    retObj['subtype'] = data.subtype;
    retObj['type'] = data.type;
    retObj['sms_sent'] = data.sms_sent;
    retObj['write_off'] = data.write_off;
    retObj['likely_dup'] = data.likely_dup;
    retObj['clean_name'] = data.clean_name;
    retObj['keeper_pending_id'] = data.keeper_pending_id;
    retObj['status'] = data.status;
    retObj['keeper_category'] = data.keeper_category;
    retObj['keeper_category_id'] = data.keeper_category_id;
    retObj['collapsed'] = false;
    retObj['changed'] = false;
    return retObj;
  });
  return expenses;
};
