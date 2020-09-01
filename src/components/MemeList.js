import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Grid, Image, Segment } from "semantic-ui-react";
import "../styles/Styles.css";
import Meme from "./Meme";

const MemeList = ({ onMemeSelect }) => {
  const [memes, setMemes] = useState([]);
  const [shuffledMemes, setShuffledMemes] = useState([]);

  function shuffleArray(array) {
    let i = array.length - 1;
    for (; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    setShuffledMemes([...array]);
  }

  useEffect(() => {
    (async () => {
      await axios
        .get("https://api.imgflip.com/get_memes", {})
        .then(function (response) {
          // handle success
          const memes = response.data.data.memes;
          setMemes(memes);
          shuffleArray(memes);
          // setShuffledMemes(renderedList);
        })
        .catch(function (error) {
          // handle error
          console.log("There was an error getting memes");
        });
    })();
  }, []);

  // useEffect(() => {
  //   (async () => {
  //     await axios
  //       .get(
  //         "https://api.imgflip.com/caption_image",
  //         {
  //           params: {
  //             username: "epicdelia",
  //             password: "memegenerator2020",
  //           },
  //         },
  //         {}
  //       )
  //       .then(function (response) {
  //         // handle success
  //         const memes = response.data.data.memes;
  //         setMemes(memes);
  //       })
  //       .catch(function (error) {
  //         // handle error
  //       });
  //   })();
  // }, []);

  const renderedList = () => {
    return shuffledMemes.slice(0, 6).map((meme, index) => {
      // return (
      //   <Meme key={meme.id.memeId} onMemeSelect={onMemeSelect} meme={meme} />
      // );
      return (
        <Grid.Column key={memes[index].id}>
          {/*<Meme meme={memes[index]} />*/}
          <MemeItem meme={memes[index]} />
        </Grid.Column>
      );
    });
  };

  return (
    <div className="ui relaxed divided list">
      <Image.Group size="small">
        <Grid columns={3} divided>
          <Grid.Row>{renderedList()}</Grid.Row>
        </Grid>{" "}
      </Image.Group>
      <Grid.Column textAlign="center">
        <Button
          onClick={() => shuffleArray(memes)}
          className="padding-top"
          size="huge"
        >
          {" "}
          Show me more Memes{" "}
        </Button>
      </Grid.Column>
    </div>
  );
};

const MemeItem = ({ meme }) => {
  return <Image src={meme.url} />;
};

export default MemeList;
