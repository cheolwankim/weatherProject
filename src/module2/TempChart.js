//차트
import MyChart from "../module/MyChart";

const TempChart = ({ data, today }) => {
  const todayTmp = data.filter(
    (n) => n.fcstDate === `${today}` && n.category === "TMP"
  );

  return (
    <div>
      <div>
        <MyChart myData={todayTmp} />
      </div>
    </div>
  );
};
export default TempChart;
