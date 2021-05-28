import React, { useContext, useEffect, useState } from 'react';
import Loader from '../../Components/Loader';
import { ContextApp, setNftAuctions } from '../../store/reducer';

import cls from './Auction.module.scss';

const Auction = () => {
  const { state, dispatch } = useContext(ContextApp);

  const [load, setLoad] = useState(false);
  useEffect(() => {
    if (state.auth) {
      setLoad(true);
      // to do ajax
      const payload = [
        {
          name: 'Test1',
          address: '0:x12312312432534453',
          img: 'https://pobedarf.ru/wp-content/uploads/2020/11/depositphotos_98492334_l-2015-pic4_zoom-1500x1500-71566.jpg',
          minted: true,
        },
        {
          name: 'Test2',
          address: '0:x12312332425532535',
          img: 'https://pobedarf.ru/wp-content/uploads/2020/11/depositphotos_98492334_l-2015-pic4_zoom-1500x1500-71566.jpg',
          minted: true,
        },
        {
          name: 'Test22',
          address: '0:x12312332425532535',
          img: 'https://pobedarf.ru/wp-content/uploads/2020/11/depositphotos_98492334_l-2015-pic4_zoom-1500x1500-71566.jpg',
          auctions: true,
        },
        {
          name: 'Test21',
          address: '0:x12312332425532535',
          img: 'https://pobedarf.ru/wp-content/uploads/2020/11/depositphotos_98492334_l-2015-pic4_zoom-1500x1500-71566.jpg',
          auctions: true,
        },
      ];
      setNftAuctions(dispatch, payload);
      setLoad(false);
    }
  }, []);
  console.log(state.nftAuctions, 'AUCTIONS');
  if (load) {
    return <Loader />;
  }
  // eslint-disable-next-line no-console
  console.log('Auction');
  return <div className={cls.auction}> this is Auction page</div>;
};

export default Auction;
