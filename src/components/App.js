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
          const memes = response.data.data.memes;
          setMemes(memes);
        })
        .catch(function (error) {
          console.log("There was an error getting memes");
        });
    })();
  }, []);

  function generate() {
    console.log("generating");
  }

  const generateMeme = () => {
    const formData = new FormData();
    formData.append("username", "epicdelia");
    formData.append("password", "memegenerator2020");
    formData.append("template_id", selectedMeme.id);
    captions.forEach((caption, index) =>
      formData.append(`boxes[${index}][text]`, caption)
    );
    axios({
      method: "post",
      url: "https://api.imgflip.com/caption_image",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        //handle success
        console.log(response);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  };

  function onMemeSelect(meme) {
    setSelectedMeme(meme);
  }

  function updateCaption(e, index) {
    const text = e.target.value || "";
    setCaptions(
      captions.map((c, i) => {
        if (index == i) {
          return text;
        } else {
          return c;
        }
      })
    );
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
                  onChange={(e) => updateCaption(e, index)}
                  key={index}
                  type="text"
                  name="topText"
                  placeholder="Top Text"
                />
              </Segment>
            ))}
            <Button onClick={generateMeme} className="same-line">
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
        {" "}
        Click which meme you want to use and fill in the appropriate captions.
        If you don't like any of them, you can regenerate by clicking the "Show
        me more memes" button. Happy creating!
      </p>
    </div>
  );
}
