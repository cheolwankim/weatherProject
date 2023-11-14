//습도

import { WiHumidity } from "react-icons/wi";
const Humidity = ({ data }) => {
  const array = data.filter((n) => n.category === "REH");
  const [{ obsrValue }] = array;

  return (
    <div>
      <div>
        <WiHumidity /> {obsrValue}%
      </div>
    </div>
  );
};
export default Humidity;
