import { jsx as _jsx } from "react/jsx-runtime";

function Test() {
  const handleClick = () => {
    console.log(11212);
  };

  return /*#__PURE__*/_jsx("div", {
    onClick: handleClick,
    children: "hello world2323"
  });
}
