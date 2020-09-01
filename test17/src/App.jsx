import { useState } from 'react';
import Button from './Button';
import ComponentA from './ComponentA';

function App() {
  const [visible, setVisibel] = useState(false);

  const handleClick = (e) => {
    setVisibel(!visible);
    setTimeout(() => {
      console.log(e.target);
    });
  };
  return (
    <div>
      <button onClick={handleClick}>{!visible ? '显示A' : '显示B'}</button>
      {visible && <ComponentA>我是A</ComponentA>}
      {!visible && <ComponentA>我是B</ComponentA>}
      <Button>demo</Button>
    </div>
  );
}

export default App;
