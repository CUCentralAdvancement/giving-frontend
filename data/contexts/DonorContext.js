import React, { createContext, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDonorReducer, DONOR_ACTIONS } from './DonorState';

export const DonorContext = createContext({});

const dev = process.env.NODE_ENV !== 'production';
const GIVING_GATEWAY_URL = dev
  ? process.env.NEXT_PUBLIC_GIVING_GATEWAY_DEV
  : process.env.NEXT_PUBLIC_GIVING_GATEWAY_PROD;

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
      variables: {},
    }),
  };
  try {
    const response = await fetch(GIVING_GATEWAY_URL, requestOptions).then((res) => res.json());
    const data = response.data;
    return data?.getGiftBasket ?? [{ fundCode: 'FAKE', designationName: 'NOTREAL', amount: 56.0 }];
  } catch (e) {
    console.log(e);
    return { errorMessage: e.message };
  }
};

/******************************************************************************
 *
 * Function: `useProvideDonor`
 * Arguments: N/A
 * Description: A Hook that exposes the boundary of the Donor Context.
 *
 * Detailed Description:
 *
 *  This Hook depends upon the following internal design decisions:
 *
 *  - All Donor state is only ever exposed and mutated through a Reducer pattern.
 *  - `useEffect` Hooks at the top level respond to changes in Donor state and
 *    can be used to trigger complex process flows.
 *  - Public interface methods are defined to perform Donor-specific actions,
 *    which may or may not result in changes to the Donor state.
 *  - Donor state is currently exposed directly in lieu of public getter methods.
 *
 ******************************************************************************/

const useProvideDonor = () => {
  const [donorState, donorDispatch] = useDonorReducer();
  useEffect(() => {
    const initializeGiftBasket = async () => {
      const existingBasket = await fetchGiftBasket();
      donorDispatch({ type: DONOR_ACTIONS.GIFT_BASKET_INITIALIZE, payload: existingBasket });
    };
    console.log('Initialization Hook Running');
    initializeGiftBasket();
  }, [donorDispatch]);

  const sendMessageRequest = async () => {
    donorDispatch({ type: DONOR_ACTIONS.REQUESTED_MESSAGE });
    const response = await fetch('/api/confirmation');
    const data = await response.json();
    donorDispatch({ type: DONOR_ACTIONS.RECEIVED_MESSAGE, payload: data.data });
    console.log(data);
  };

  const addToGiftBasket = (item) => {
    donorDispatch({ type: DONOR_ACTIONS.GIFT_BASKET_ADD, payload: item });
  };

  const removeFromGiftBasket = (item) => {
    donorDispatch({ type: DONOR_ACTIONS.GIFT_BASKET_REMOVE, payload: item });
  };

  return {
    ...donorState,
    sendMessageRequest,
    addToGiftBasket,
    removeFromGiftBasket,
  };
};

/******************************************************************************
 *
 * Function Component: `DonorProvider`
 * Description: A function component to wrap the `useProvideDonor` Hook
 *  and the DonorContext.Provider Component.
 *
 ******************************************************************************/

export const DonorProvider = ({ children }) => {
  const user = useProvideDonor();
  return <DonorContext.Provider value={user}>{children}</DonorContext.Provider>;
};

DonorProvider.propTypes = {
  children: PropTypes.node,
};

/******************************************************************************
 *
 * Function: `useDonor`
 * Arguments: N/A
 * Description: A Hook that exposes the boundary of the Donor Context to
 *  Components that need to be aware of or interact with Donor state.
 *
 ******************************************************************************/

export const useDonor = () => useContext(DonorContext);
