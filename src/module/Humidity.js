//습도

// import { WiHumidity } from "react-icons/wi";
const Humidity = ({ data }) => {
  const array = data.filter((n) => n.category === "REH");
  const [{ obsrValue }] = array;

  return (
    <div>
      <div>
        습도 {obsrValue}%
      </div>
    </div>
  );
};
export default Humidity;
