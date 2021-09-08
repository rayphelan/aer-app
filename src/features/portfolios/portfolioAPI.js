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

export const updatePortfolio = (portfolio) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve({
        data: portfolio,
      });
    }, ASYNC_WAIT);
  });
};

export const removePortfolio = (portfolio) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve({
        data: portfolio,
      });
    }, ASYNC_WAIT);
  });
};
