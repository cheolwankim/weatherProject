//기온
const Temperature = ({ data }) => {
  const array = data.filter((n) => n.category === "T1H");
  const [{ obsrValue }] = array;

  return (
    <div>
      <div>{obsrValue} ℃</div>
    </div>
  );
};
export default Temperature;
