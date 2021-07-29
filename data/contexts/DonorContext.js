import React, { createContext, useContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { transaction } from '../store';

export const DonorContext = createContext({});

const defaultState = {
  giftBasket: [],
  giftBasketCopy: [],
  givingInfo: {},
  giftBasketInitialized: false,
  authToken: '',
  transaction: transaction,
}

export const initialState = () => {
  const state = typeof window !== 'undefined' &&
    window.localStorage.getItem('donor')
    ? JSON.parse(window.localStorage.getItem('donor'))
    : defaultState;
  if (typeof window !== 'undefined' && state === defaultState)
    window.localStorage.setItem('donor', JSON.stringify(defaultState));
  return state;
};

const AUTH_TOKEN_ADD = 'add_auth_token';

const RELOAD_FROM_LOCAL_STORAGE = "RELOAD_FROM_LOCAL_STORAGE";
const REQUESTED_MESSAGE = 'requested_message';
const RECEIVED_MESSAGE = 'received_message';
const GIFT_BASKET_ADD = 'add_to_gift_basket';
const GIFT_BASKET_REMOVE = 'remove_from_gift_basket';
const GIFT_BASKET_RESET = 'reset_gift_basket';
const GIFT_BASKET_INITIALIZE = 'initialize_gift_basket';

const GIVING_INFO_ADD = 'add_giving_info';

const TRANSACTION_SET = 'set_transaction';

const withLocalStorage = (reducerFn, key = 'donor') => (state, action) => {
  const updatedState = (function(){
    switch (action.type) {
      case RELOAD_FROM_LOCAL_STORAGE:
        return typeof window !== undefined ?
          JSON.parse(window.localStorage.getItem(key))
          : state;
      default:
        return reducerFn(state, action);
    }
  })()
  window.localStorage.setItem(key, JSON.stringify(updatedState));
  return updatedState;
}

export const donorReducer = withLocalStorage(function (state, action) {
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
        externalGiftBasket: action.payload
      };
    case GIFT_BASKET_ADD:
      console.log('adding to basket');
      return {
        ...state,
        giftBasket: [...state.giftBasket, action.payload],
        loading: false
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

export const useDonor = () => useContext(DonorContext);

const fetchGiftBasket = async () => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        {
          getGiftBasket {
            fundCode
            designationName
            amount
          }
        }
      `,
      variables: {}
    })
  }
  try {
      const response = await fetch("/api/graphql", requestOptions)
        .then( res => res.json());
      const data = response.data;
      return data?.getGiftBasket ?? [{fundCode: "FAKE", designationName: "NOTREAL", amount: 56.00 }];
  } catch (e) {
      console.log(e)
      return { errorMessage: e.message };
  }
}

const useProvideDonor = () => {
  const [donorState, donorDispatch] = useReducer(donorReducer, initialState());
  useEffect(() => {
    const initializeGiftBasket = async () => {
      const existingBasket = await fetchGiftBasket();
      donorDispatch({type: GIFT_BASKET_INITIALIZE, payload: existingBasket});
    };
    initializeGiftBasket();
  }, []);

  const sendMessageRequest = async () => {
    donorDispatch({ type: REQUESTED_MESSAGE })
    const response = await fetch("/api/confirmation");
    const data = await response.json();
    donorDispatch({ type: RECEIVED_MESSAGE, payload: data.data})
    console.log(data);
  }

  const addToGiftBasket = (item) => {
    donorDispatch({ type: GIFT_BASKET_ADD, payload: item })
  }

  const removeFromGiftBasket = (item) => {
    donorDispatch({ type: GIFT_BASKET_REMOVE, payload: item });
  }

  return {
    ...donorState,
    sendMessageRequest,
    addToGiftBasket,
    removeFromGiftBasket
  }
}


export const DonorProvider = ({ children }) => {
  const user = useProvideDonor()
  return (
    <DonorContext.Provider value={user} >
      { children }
    </DonorContext.Provider>
  )
}

DonorProvider.propTypes = {
  children: PropTypes.node
}