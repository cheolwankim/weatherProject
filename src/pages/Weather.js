// `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=${API_KEY}&numOfRows=10&pageNo=1&base_date=20231109&base_time=0200&nx=60&ny=127&dataType=json`

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

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";

const Weather = () => {
  const API_KEY = process.env.REACT_APP_API_KEY_MY;

  const [data, setData] = useState("");
  const [dataTwo, setDataTwo] = useState("");
  // const [word, setWord] = useState("");
  // const [sec, setSec] = useState(""); //원하는 시간

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

  //하루전
  let yesterdayValue = new Date(today.setDate(today.getDate() - 1));
  let yesterdayYear = yesterdayValue.getFullYear();
  let yesterdayMonth = ("0" + (1 + yesterdayValue.getMonth())).slice(-2);
  let yesterdayDate = ("0" + yesterdayValue.getDate()).slice(-2);

  //오늘
  let todayDateValue = new Date(today.setDate(today.getDate() + 1));
  let todayYear = todayDateValue.getFullYear();
  let todayMonth = ("0" + (1 + todayDateValue.getMonth())).slice(-2);
  let todayDate = ("0" + todayDateValue.getDate()).slice(-2);

  //내일날짜값
  let tomorrowValue = new Date(today.setDate(today.getDate() + 1)); //하루후
  let tomorrowYear = tomorrowValue.getFullYear();
  let tomorrowYearMonth = ("0" + (1 + tomorrowValue.getMonth())).slice(-2);
  let tomorrowDate = ("0" + tomorrowValue.getDate()).slice(-2);

  //한시간 전 시간 값구하기
  //이렇게하는이유가 나중이 31 +1 이나 01-1 같은 숫자가왔을때 오류 방지하기 위해서
  let yestHour = new Date();
  yestHour.setHours(yestHour.getHours() - 1);
  let yestHourValue = yestHour.getHours(); //하루전 시간값

  // let hour = (today.getHours() * 100).toString(); //지금시간값
  let newHour = 0 + (yestHourValue * 100).toString(); //한시간전시간값

  let todayValue = todayYear + todayMonth + todayDate; //오늘 날짜값
  let yesterdayDateValue = yesterdayYear + yesterdayMonth + yesterdayDate; //하루 전 날짜값
  let tomorrowDateValue = tomorrowYear + tomorrowYearMonth + tomorrowDate;


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
      <div className="head">MY WEATHER</div>
      <div className="weatherContent">
        <div>
          {data ? (
            <div>
              <div className="todayContent">
                <Container>
                  <Row>
                    <Col xs={6} md={2}>
                      <div className="rainyType">
                        <RainType data={data} />
                      </div>
                    </Col>
                    <Col xs={6} md={7}>
                      <div className="temp">
                        <Temperature data={data} />
                      </div>
                      <div className="humnid">
                        <Humidity data={data} />
                      </div>
                      <div className="rainAmmount">
                        <Rain data={data} />
                      </div>
                      <div className="wind">
                        <Wind data={data} />
                      </div>
                    </Col>
                    <Col xs={6} md={3}>
                      {/*내일기온*/}
                      <div className="tommorow">
                        NEXTDAY
                        <div className="tomTemp">
                          <TomTemp
                            tomorrow={tomorrowDateValue}
                            data={dataTwo}
                          />
                          {/* 강수확률 */}
                          <div className="tomRain">
                            <RainProb
                              value={tomorrowDateValue}
                              data={dataTwo}
                            />
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Container>
              </div>
              <div className="myChart">
                {/* 차트 */}
                {/* 오늘날짜값 */}
                <TempChart today={todayValue} data={dataTwo} />
              </div>
            </div>
          ) : (
            <div>NOW LOADING</div>
          )}
          <div>
            <div>
              {/* 서울 부산 등 지역 버튼 */}
              {info.map((n) => {
                return (
                  <Button
                    variant="danger"
                    className="myButton"
                    key={n.id}
                    onClick={() => onClickEventTwo(n.nx, n.ny)}
                  >
                    {n.id}
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Weather;
