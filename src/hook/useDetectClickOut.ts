import { useEffect, useRef, useState, useContext } from 'react';

import { setOpenLeftMenu, ContextApp } from '../store/reducer';

const useDetectClickOut = function useDetectClickOut() {
  const { state, dispatch } = useContext(ContextApp);
  const triggerRef = useRef<any>(null);
  const nodeRef = useRef<any>(null);
  const [show, setShow] = useState(true);

  const handleClickOutside = (e: any) => {
    if (triggerRef.current?.contains(e.target)) {
      return setOpenLeftMenu(dispatch, state.openLeftMenu);
    }

    if (!nodeRef.current?.contains(e.target)) {
      return setOpenLeftMenu(dispatch, false);
    }
    return null;
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  return {
    triggerRef,
    nodeRef,
    show,
    setShow,
  };
};

export default useDetectClickOut;
