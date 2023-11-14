//강수형태
// 강수형태(PTY) 코드 :
//없음(0), 비(1), 비/눈(2), 눈(3), 빗방울(5),
//빗방울눈날림(6), 눈날림(7)
// 해 0
// 비 1 2 5 6
// 눈 3 7

// =>3개
import { BsCloudRain, BsSnow2, BsSun } from "react-icons/bs";
const RainType = ({ data }) => {
  const array = data.filter((n) => n.category === "PTY");
  const [{ obsrValue }] = array; //obsrValue = 강수형태

  return (
    <div>      
      {obsrValue === "0" && <BsSun className="sun" />}
      {(obsrValue === "1" ||
        obsrValue === "2" ||
        obsrValue === "5" ||
        obsrValue === "6") && <BsCloudRain className="rain" />}
      {obsrValue === "3" || (obsrValue === "7" && <BsSnow2 className="snow" />)}
    </div>
  );
};
export default RainType;
