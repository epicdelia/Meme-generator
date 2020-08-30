import React, {useEffect, useState} from "react";
import axios from 'axios';

const Meme = () => {

  const [memes, setMemes] = useState(null);

  useEffect(()=>{
    (async() => {
      await axios.get('https://api.imgflip.com/get_memes', {
      });
    })();
  },[])


  return(<h1>Hello there you
  </h1>);
};

export default Meme;
