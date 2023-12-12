//1시간강수량

// import { WiRaindrops } from "react-icons/wi";

const RainItem = ({ data }) => {
  const array = data.filter((n) => n.category === "RN1");
  const [{ obsrValue }] = array;

  return (
    <div>
      <div>
        강수량 {obsrValue}mm
      </div>
    </div>
  );
};
export default RainItem;
