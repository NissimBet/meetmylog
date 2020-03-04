import React from "react";
import { NextPage } from "next";

const Index: NextPage<{ userAgent: string }> = ({ userAgent }) => {
  return <h1>Hello</h1>;
};

export default Index;
