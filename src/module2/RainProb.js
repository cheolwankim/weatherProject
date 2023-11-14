//12시값을 평균적인 기온이라 가정함
//강수확률
import { BsCloudRain } from "react-icons/bs";

const RainProb = ({ data, value }) => {
  //value = 오늘날짜 , 예보시각은 무난한 점심인 1200으로 고정,
  //newHour 현재-1 시각
  let yestHour = new Date();
  yestHour.setHours(yestHour.getHours() - 1);
  let yestHourValue = yestHour.getHours(); //하루전 시간값
  let newHour = 0 + (yestHourValue * 100).toString(); //한시간전시간값

  const array = data.filter(
    (n) =>
      n.fcstDate === `${value}` && n.fcstTime === "1200" && n.category === "POP"
  );

  const [{ fcstValue }] = array;

  return (
    <div>
      <div>
        <BsCloudRain /> {fcstValue}%
      </div>
    </div>
  );
};
export default RainProb;
