import { ASYNC_WAIT } from '../../app/constants';
export const savePortfolio = (portfolio) => {
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve({
          data: portfolio,
        }),
      ASYNC_WAIT
    );
  });
};
