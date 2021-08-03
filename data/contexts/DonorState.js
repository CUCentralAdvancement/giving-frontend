import { useReducer } from 'react';
import { transaction } from '../store';
import { initFromLocalStorage, withLocalStorage } from './utils';

const defaultDonorState = {
  giftBasket: [],
  giftBasketCopy: [],
  givingInfo: {},
  giftBasketInitialized: false,
  authToken: '',
  transaction: transaction,
};

const AUTH_TOKEN_ADD = 'add_auth_token';
const REQUESTED_MESSAGE = 'requested_message';
const RECEIVED_MESSAGE = 'received_message';
const GIFT_BASKET_ADD = 'add_to_gift_basket';
const GIFT_BASKET_REMOVE = 'remove_from_gift_basket';
const GIFT_BASKET_RESET = 'reset_gift_basket';
const GIFT_BASKET_INITIALIZE = 'initialize_gift_basket';
const GIVING_INFO_ADD = 'add_giving_info';
const TRANSACTION_SET = 'set_transaction';

const donorReducer = withLocalStorage(function (state, action) {
  switch (action.type) {
    case AUTH_TOKEN_ADD:
      return {
        ...state,
        authToken: action.payload,
      };
    case REQUESTED_MESSAGE:
      console.log('Requesting a message');
      return {
        ...state,
        msg: 'Loading',
        loading: true,
      };
    case RECEIVED_MESSAGE:
      console.log('Receiving a message');
      return {
        ...state,
        msg: action.payload,
        loading: false,
      };
    case 'no_response':
      console.log('Message failed');
      return {
        ...state,
        msg: 'Error State',
        loading: false,
      };
    case GIFT_BASKET_INITIALIZE:
      return {
        ...state,
        giftBasketInitialized: true,
        externalGiftBasket: action.payload,
      };
    case GIFT_BASKET_ADD:
      console.log('adding to basket');
      return {
        ...state,
        giftBasket: [...state.giftBasket, action.payload],
        loading: false,
      };
    case GIFT_BASKET_REMOVE:
      return {
        ...state,
        giftBasket: state.giftBasket.filter((item) => {
          return item.allocation_code !== action.payload.allocation_code;
        }),
      };
    case GIFT_BASKET_RESET:
      return {
        ...state,
        giftBasket: [],
        giftBasketCopy: state.giftBasket,
      };
    case GIVING_INFO_ADD:
      return {
        ...state,
        givingInfo: action.payload,
      };
    case TRANSACTION_SET:
      return {
        ...state,
        transaction: action.payload,
      };
    default:
      return state;
  }
});

export const useDonorReducer = () => useReducer(donorReducer, defaultDonorState, initFromLocalStorage('donor'));

export const DONOR_ACTIONS = {
  AUTH_TOKEN_ADD,
  REQUESTED_MESSAGE,
  RECEIVED_MESSAGE,
  GIFT_BASKET_ADD,
  GIFT_BASKET_REMOVE,
  GIFT_BASKET_RESET,
  GIFT_BASKET_INITIALIZE,
  GIVING_INFO_ADD,
  TRANSACTION_SET,
};
