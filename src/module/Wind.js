//풍속
// import { WiStrongWind } from "react-icons/wi";

const Wind = ({ data }) => {
  const array = data.filter((n) => n.category === "WSD");
  const [{ obsrValue }] = array;

  return (
    <div>
      <div>
        풍속 {obsrValue}m/s
      </div>
    </div>
  );
};
export default Wind;
