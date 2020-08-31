import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Grid, Image, Segment } from "semantic-ui-react";
import "../styles/Styles.css";

const MemeList = ({ onMemeSelect }) => {
  const [memes, setMemes] = useState([]);

  function shuffleArray(array) {
    let i = array.length - 1;
    for (; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  useEffect(() => {
    (async () => {
      await axios
        .get("https://api.imgflip.com/get_memes", {})
        .then(function (response) {
          // handle success
          const memes = response.data.data.memes;
          setMemes(memes);
        })
        .catch(function (error) {
          // handle error
          console.log("There was an error getting memes");
        });
    })();
  }, []);

  const renderedList = shuffleArray(memes)
    .slice(0, 6)
    .map((meme, index) => {
      // return (
      //   <Meme key={meme.id.memeId} onMemeSelect={onMemeSelect} meme={meme} />
      // );
      return (
        <Grid.Column>
          <Image src={memes[index].url} />
        </Grid.Column>
      );
    });
  return (
    <div className="ui relaxed divided list">
      <Image.Group size="small">
        <Grid columns={3} divided>
          <Grid.Row>{renderedList}</Grid.Row>
        </Grid>{" "}
      </Image.Group>
      <Grid.Column textAlign="center">
        <Button
          className="padding-top"
          onClick={console.log("generating ")}
          size="huge"
        >
          {" "}
          Generate more Memes{" "}
        </Button>
      </Grid.Column>
    </div>
  );
};

export default MemeList;
