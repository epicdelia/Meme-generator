import React, { useEffect, useState } from "react";
import { Grid, Segment, Container, Button, Input } from "semantic-ui-react";
import "../styles/Styles.css";
import Meme from "./Meme";
import MemeList from "./MemeList";
import { GeneratedMeme } from "./GeneratedMeme";
import axios from "axios";
import "../styles/Styles.css";

import { useHistory, Switch, Route } from "react-router-dom";

const App = () => {
  const [memes, setMemes] = useState([]);
  const [captions, setCaptions] = useState([]);

  const [selectedMeme, setSelectedMeme] = useState({
    url: "https://i.imgflip.com/ljk.jpg",
  });

  useEffect(() => {
    let arr = Array(selectedMeme.box_count)
      .fill(" ")
      .map((e, i) => {
        if (captions && captions[i]) {
          return captions[i];
        }
        return e;
      });
    setCaptions(arr);
  }, [memes, selectedMeme]);
  const history = useHistory();

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

  const generateMeme = () => {
    const formData = new FormData();
    console.log("getting GENERATING");
    formData.append("username", process.env.REACT_APP_USERNAME);
    formData.append("password", process.env.REACT_APP_PASSWORD);
    formData.append("template_id", selectedMeme.id);
    captions.forEach((caption, index) => {
      formData.append(`boxes[${index}][text]`, caption);
      console.log(formData);
    });
    axios({
      method: "post",
      url: "https://api.imgflip.com/caption_image",
      data: formData,
    })
      .then((response) => {
        history.push(`generated?url=${response.data.data.url}`);
      })
      .catch(function (error) {
        console.log("There was an error captioning your meme");
      });
  };

  function onMemeSelect(meme) {
    history.push(`/`);
    setSelectedMeme(meme);
  }

  function updateCaption(e, index) {
    const text = e.target.value || "";
    setCaptions(
      captions.map((c, i) => {
        if (index === i) {
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
            <Switch>
              <Route exact path="/">
                <Meme meme={selectedMeme} />
                <Segment vertical>
                  <Button className="padding-top" size="huge">
                    {" "}
                    Download Meme
                  </Button>
                </Segment>
              </Route>
              <Route path="/generated">
                <GeneratedMeme />
              </Route>
            </Switch>
          </Segment>
        </Grid.Column>
        <Grid.Column width={5}>
          <Segment vertical>
            <p className="same-line">
              Please choose a meme before writing the captions and clicking
              generate.{" "}
            </p>{" "}
            <MemeList onMemeSelect={onMemeSelect} memes={memes} />
          </Segment>
          <div className="ui text container segment">
            {captions.map((caption, index) => (
              <Segment key={index}>
                <Input
                  onChange={(e) => updateCaption(e, index)}
                  key={index}
                  type="text"
                  name="topText"
                  placeholder="Meme text"
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

export default App;
