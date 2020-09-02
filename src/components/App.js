import React, { useEffect, useState } from "react";
import Meme from "./Meme";
import { TextArea, Grid, Segment, Container, Button } from "semantic-ui-react";
import "../styles/Styles.css";
import MemeList from "./MemeList";
import axios from "axios";

export default () => {
  const [memes, setMemes] = useState([]);
  const [captions, setCaptions] = useState([]);
  const [selectedMeme, setSelectedMeme] = useState({
    url: "https://i.imgflip.com/ljk.jpg",
  });

  useEffect(() => {
    setCaptions(Array(selectedMeme.box_count).fill(" "));
  }, [memes, selectedMeme]);

  useEffect(() => {
    (async () => {
      await axios
        .get("https://api.imgflip.com/get_memes", {})
        .then(function (response) {
          // handle success
          const memes = response.data.data.memes;
          setMemes(memes);
          // setShuffledMemes(renderedList);
        })
        .catch(function (error) {
          // handle error
          console.log("There was an error getting memes");
        });
    })();
  }, []);

  function onMemeSelect(meme) {
    setSelectedMeme(meme);
    console.log(`I selected this and captions are ${meme.box_count}`);
  }

  return (
    <Container className="app" textAlign="center">
      <HeaderSection />
      <Grid columns="equal">
        <Grid.Column>
          <Segment>
            <Meme meme={selectedMeme} />
          </Segment>
        </Grid.Column>
        <Grid.Column width={5}>
          <Segment>
            <p className="same-line">Please choose a meme or </p>{" "}
            <Button className="same-line"> Upload One</Button>
            <MemeList onMemeSelect={onMemeSelect} memes={memes} />
          </Segment>
          <div className="ui text container segment">
            {captions.map((caption, index) => (
              <Segment>
                <input
                  key={index}
                  type="text"
                  name="topText"
                  placeholder="Top Text"
                />
              </Segment>
            ))}
            <Button
              onClick={() => console.log("clicked")}
              className="same-line"
            >
              Generate Meme
            </Button>
          </div>
        </Grid.Column>
      </Grid>
    </Container>
  );
};

function HeaderSection() {
  return (
    <div className="ui raised very padded text container segment">
      <h2 className="ui header">Meme Generator</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </div>
  );
}
