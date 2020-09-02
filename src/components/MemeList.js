import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Grid, Image, Segment } from "semantic-ui-react";
import "../styles/Styles.css";
import Meme from "./Meme";

const MemeList = ({ memes, onMemeSelect }) => {
  const [shuffledMemes, setShuffledMemes] = useState([memes]);

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
    shuffleArray(memes);
  }, [memes]);

  const renderedList = () => {
    return shuffledMemes.slice(0, 6).map((meme, index) => {
      // return (
      //   <Meme key={meme.id.memeId} onMemeSelect={onMemeSelect} meme={meme} />
      // );
      return (
        <Grid.Column key={memes[index].id}>
          {/*<Meme meme={memes[index]} />*/}
          <MemeItem onMemeSelect={onMemeSelect} meme={memes[index]} />
        </Grid.Column>
      );
    });
  };

  if (memes.length) {
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
  }
  return <div></div>;
};

const MemeItem = ({ meme, onMemeSelect }) => {
  return (
    <Image
      onClick={() => onMemeSelect(meme)}
      className="clickable-meme"
      src={meme.url}
    />
  );
};

export default MemeList;
