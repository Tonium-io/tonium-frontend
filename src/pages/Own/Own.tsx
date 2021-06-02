import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Loader from '../../Components/Loader';
import { ContextApp, setUserAllTokens } from '../../store/reducer';

import cls from './Own.module.scss';

const Own = () => {
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
          marked: true,
        },
        {
          name: 'Test2',
          address: '0:x12312332425532535',
          img: 'https://pobedarf.ru/wp-content/uploads/2020/11/depositphotos_98492334_l-2015-pic4_zoom-1500x1500-71566.jpg',
          marked: true,
        },
        {
          name: 'Test22',
          address: '0:x12312332425532535',
          img: 'https://pobedarf.ru/wp-content/uploads/2020/11/depositphotos_98492334_l-2015-pic4_zoom-1500x1500-71566.jpg',
          bided: true,
        },
        {
          name: 'Test21',
          address: '0:x12312332425532535',
          img: 'https://pobedarf.ru/wp-content/uploads/2020/11/depositphotos_98492334_l-2015-pic4_zoom-1500x1500-71566.jpg',
          my: true,
        },
      ];
      setUserAllTokens(dispatch, payload);
      setLoad(false);
      toast.success('Success', {
        position: 'bottom-right',
        autoClose: 4000,
      });
    }
  }, []);

  if (load) {
    return <Loader />;
  }
  // eslint-disable-next-line no-console

  return <div className={cls.own}>Own page</div>;
};

export default Own;
