import { Link } from "react-router-dom";

const Main = () => {
  return (
    <div>
      <div>This is Main PAGEa</div>
      <div>
        <Link to="/weather">날씨정보</Link>
      </div>
    </div>
  );
};
export default Main;
