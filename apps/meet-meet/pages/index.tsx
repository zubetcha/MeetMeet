import { useState, useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();
  useEffect(() => {
    router.replace("/home");
  }, []);

  return <></>;
};

export default Home;
