//내일기온
//12시값을 평균적인 기온이라 가정함 - 내일날씨
import { FaTemperatureHalf } from "react-icons/fa6";

const TomTemp = ({ data, tomorrow }) => {
  // 예보시각은 무난한 점심인 1000으로 고정
  //내가원하는건 =>내일날씨(12시값)
  // 하루의 총 값 (시간:기온)

  const myTmp = data.filter(
    (n) =>
      n.fcstDate === `${tomorrow}` &&
      n.fcstTime === "1000" &&
      n.category === "TMP"
  );

  const [{ fcstValue }] = myTmp;

  return (
    <div>
      <span><FaTemperatureHalf />{fcstValue}℃</span>
    </div>
  );
};
export default TomTemp;
