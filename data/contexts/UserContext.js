import { createContext } from 'react';
import { transaction } from '../store';

export const UserContext = createContext({});

const initialGiftBasket = [];
const initialGivingInfo = {};

export const initialState = typeof window !== 'undefined' &&
JSON.parse(window.localStorage.getItem('user'))
  ? JSON.parse(window.localStorage.getItem('user'))
  : {
    giftBasket: initialGiftBasket,
    giftBasketCopy: [],
    givingInfo: initialGivingInfo,
    authToken: '',
    transaction: transaction,
  };

const AUTH_TOKEN_ADD = 'add_auth_token';

const GIFT_BASKET_ADD = 'add_to_gift_basket';
const GIFT_BASKET_REMOVE = 'remove_from_gift_basket';
const GIFT_BASKET_RESET = 'reset_gift_basket';

const GIVING_INFO_ADD = 'add_giving_info';

const TRANSACTION_SET = 'set_transaction';

let data = {};
let newGiftBasket = [];

export function userReducer(state, action) {
  switch (action.type) {
    case AUTH_TOKEN_ADD:
      data = {
        ...state,
        authToken: action.payload,
      };
      window.localStorage.setItem('user', JSON.stringify(data));
      return data;
    case GIFT_BASKET_ADD:
      data = {
        ...state,
        giftBasket: [...state.giftBasket, action.payload],
      };
      window.localStorage.setItem('user', JSON.stringify(data));
      return data;
    case GIFT_BASKET_REMOVE:
      newGiftBasket = state.giftBasket.filter((item) => {
        return item.allocation_code !== action.payload.allocation_code;
      });
      data = {
        ...state,
        giftBasket: newGiftBasket,
      };
      window.localStorage.setItem('user', JSON.stringify(data));
      return data;
    case GIFT_BASKET_RESET:
      data = {
        ...state,
        giftBasket: [],
        giftBasketCopy: state.giftBasket,
      };
      window.localStorage.setItem('user', JSON.stringify(data));
      return data;
    case GIVING_INFO_ADD:
      data = {
        ...state,
        givingInfo: action.payload,
      };
      window.localStorage.setItem('user', JSON.stringify(data));
      return data;
    case TRANSACTION_SET:
      data = {
        ...state,
        transaction: action.payload,
      };
      window.localStorage.setItem('user', JSON.stringify(data));
      return data;
    default:
      return state;
  }
}
