import React, { useEffect, useState } from "react";
import axios from "axios";

const Meme = (meme) => {
  if (!meme) {
    return <div>Please select a meme to get started.</div>;
  }
  return <img alt={"temp"} className="ui large image" src={meme.meme.url} />;
};

export default Meme;
