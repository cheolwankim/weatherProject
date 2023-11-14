//1시간강수량

import { WiRaindrops } from "react-icons/wi";

const RainItem = ({ data }) => {
  const array = data.filter((n) => n.category === "RN1");
  const [{ obsrValue }] = array;

  return (
    <div>
      <div>
        <WiRaindrops />
       {obsrValue}mm
      </div>
    </div>
  );
};
export default RainItem;
