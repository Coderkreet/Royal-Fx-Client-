import { useState } from "react";
import SwapConversion from "./SwapConversion";
import SwapConversionReverse from "./SwapConversionReverse";

const SwapConversionMain = () => {
  const [active, setActive] = useState(0);
  const swapHandler = () => {
    setActive(!active);
  };
  return (
    <>
      {/* {active == 0 ? ( */}
        <SwapConversion swapHandler={swapHandler} />
      {/* ) : active == 1 ? (
        <SwapConversionReverse swapHandler={swapHandler} />
      ) : (
        "No Data"
      )} */}
    </>
  );
};

export default SwapConversionMain;
