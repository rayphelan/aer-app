import { ASYNC_WAIT } from '../../app/constants';
import { nanoid } from '@reduxjs/toolkit';

export const savePortfolio = (portfolio) => {
  return new Promise((resolve) => {
    portfolio.id = nanoid();
    setTimeout(() => {
      return resolve({
        data: portfolio,
      });
    }, ASYNC_WAIT);
  });
};
