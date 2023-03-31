import React, { useState } from "react";

interface Props {
  statusCode: string;
}

const Status: React.FC<Props> = ({ statusCode }) => {
  return <div>Server status code here: {statusCode}</div>;
};

export default Status;
