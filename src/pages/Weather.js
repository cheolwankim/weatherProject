import axios from "axios";
import { useEffect, useState } from "react";
import "../css/Weather.css";
import Rain from "../module/Rain";
import Wind from "../module/Wind";
import Humidity from "../module/Humidity";
import RainType from "../module/RainType";
import Temperature from "../module/Temperature";
import RainProb from "../module2/RainProb";
import TempChart from "../module2/TempChart";
import TomTemp from "../module2/TomTemp";
import "bootstrap/dist/css/bootstrap.min.css";
// import { Button } from "react-bootstrap";

const Weather = () => {
  const API_KEY = process.env.REACT_APP_API_KEY_MY;

  const [data, setData] = useState("");
  const [dataTwo, setDataTwo] = useState("");

  //nx ny 설정 (기본값: 서울)
  const [nx, setNx] = useState("60");
  const [ny, setNy] = useState("127");

  const info = [
    { id: "서울", nx: 60, ny: 127 },
    { id: "부산", nx: 98, ny: 76 },
    { id: "대구", nx: 89, ny: 90 },
    { id: "인천", nx: "55", ny: "124" },
    { id: "광주", nx: "58", ny: "74" },
    { id: "대전", nx: "67", ny: "100" },
    { id: "울산", nx: "102", ny: "84" },
  ];

  const today = new Date();

  //하루전 날짜값
  let yesterdayValue = new Date(today.setDate(today.getDate() - 1));
  let yesterdayYear = yesterdayValue.getFullYear();
  let yesterdayMonth = ("0" + (1 + yesterdayValue.getMonth())).slice(-2);
  let yesterdayDate = ("0" + yesterdayValue.getDate()).slice(-2);

  //오늘
  let todayDateValue = new Date(today.setDate(today.getDate() + 1));
  let todayYear = todayDateValue.getFullYear();
  let todayMonth = ("0" + (1 + todayDateValue.getMonth())).slice(-2);
  let todayDate = ("0" + todayDateValue.getDate()).slice(-2);

  //내일
  let tomorrowValue = new Date(today.setDate(today.getDate() + 1)); //하루후
  let tomorrowYear = tomorrowValue.getFullYear();
  let tomorrowYearMonth = ("0" + (1 + tomorrowValue.getMonth())).slice(-2);
  let tomorrowDate = ("0" + tomorrowValue.getDate()).slice(-2);

  //한시간 전 시간 값구하기
  //이렇게하는이유가 나중이 31 +1 이나 01-1 같은 숫자가왔을때 오류 방지하기 위해서
  let yestHour = new Date();
  yestHour.setHours(yestHour.getHours() - 1);
  let yestHourValue = ("0" + yestHour.getHours() + "00").slice(-4); //하루전 시간값
  let newHour = yestHourValue.toString();

  let todayValue = todayYear + todayMonth + todayDate; //오늘 날짜값 (6자리)
  let yesterdayDateValue = yesterdayYear + yesterdayMonth + yesterdayDate; //하루 전 날짜값(6자리)
  let tomorrowDateValue = tomorrowYear + tomorrowYearMonth + tomorrowDate; ///어제 날짜값 (6자리)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          //현재기온
          //초단기실황
          //기본적으로 한시간전값가져와서 보여주게 설정함(현재값못가져올것 대비해서)
          //todayValue(오늘날짜값)
          `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=${API_KEY}&numOfRows=10&pageNo=1&base_date=${todayValue}&base_time=${newHour}&nx=${nx}&ny=${ny}&dataType=json`
        );
        const responseTwo = await axios.get(
          //단기예보
          //하루전 날짜+ basetime : 0200 ,
          //fcstTime 0200 + fcstDate yesterdayDateValue +1(Today) +1(Tomorrow)
          //내일값 보여주기 하는중
          //yesterdayDateValue(하루전날짜값)
          `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${API_KEY}&numOfRows=1000&pageNo=1&base_date=${yesterdayDateValue}&base_time=0200&nx=${nx}&ny=${ny}&dataType=json`
        );

        setData(response.data.response.body.items.item);
        setDataTwo(responseTwo.data.response.body.items.item);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [API_KEY, yesterdayDateValue, newHour, todayValue, nx, ny]);

  const onClickEventTwo = (x, y) => {
    setNx(x);
    setNy(y);
  };

  return (
    <div className="weatherPageImage">
      <div className="weatherContent">
        <div>
          {data ? (
            <div className="all_content">
              {/*내일기온*/}
              <div className="fourth_content">
                <div className="tomTemp">
                  <div className="tom_text">다음날</div>
                  <TomTemp tomorrow={tomorrowDateValue} data={dataTwo} />
                  {/* 강수확률 */}
                  <div className="tomRain">
                    <RainProb value={tomorrowDateValue} data={dataTwo} />
                  </div>
                </div>
              </div>
              <div className="first_second_content">
                <div className="first_content">
                  <div className="rain_main">
                    <div className="rainyType">
                      <RainType data={data} />
                    </div>
                    <div className="temp">
                      <Temperature data={data} />
                    </div>
                  </div>
                  <div className="rain_else">
                    <div className="humnid">
                      <Humidity data={data} />
                    </div>
                    <div className="rainAmmount">
                      <Rain data={data} />
                    </div>
                    <div className="wind">
                      <Wind data={data} />
                    </div>
                  </div>
                </div>
                <div className="second_content">
                  <div className="myChart">
                    {/* 차트 */}
                    {/* 오늘날짜값 */}
                    <TempChart today={todayValue} data={dataTwo} />
                  </div>
                  <div className="button_content">
                    {/* 서울 부산 등 지역 버튼 */}
                    {info.map((n) => {
                      return (
                        <button
                          className="myButton"
                          key={n.id}
                          onClick={() => onClickEventTwo(n.nx, n.ny)}
                        >
                          {n.id}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="loading">WeatherPage is onLoading . . . </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Weather;
