import { useEffect } from 'react';

const ComponentA = ({ children }) => {
  useEffect(() => {
    console.log(children, '我来了');

    return () =>
      setTimeout(() => {
        console.log(children, '我销毁了');
      });
  }, []);
  return <div style={{ fontSize: '18px' }}>{children}</div>;
};

export default ComponentA;
