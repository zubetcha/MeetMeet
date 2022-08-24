import type { NextPage } from "next";
import { Reservation, Layout } from "components";
import { Text } from "ui/src/pages";

const Home: NextPage = () => {
  const onChange = (e: any) => {
    console.log(e);
  };

  return (
    <Layout>
      <div
        style={{
          position: "absolute",
          top: "50px",
          right: "40px",
          bottom: "24px",
          left: "24px",
          display: "grid",
        }}
      >
        <Text type="headline-large" color="primary" weight="bold">
          젠틀에너지 회의실 예약 현황
        </Text>
        {/* <div style={{ width: "100%" }}> */}
        <Reservation />
        {/* </div> */}
      </div>
    </Layout>
  );
};

export default Home;
