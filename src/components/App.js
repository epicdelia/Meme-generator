import React from "react";
import Meme from "./Meme";
import { TextArea, Grid, Segment, Container, Button } from "semantic-ui-react";
import "../styles/Styles.css";
import MemeList from "./MemeList";

export default () => {
  console.log(process.env);

  return (
    <Container className="app" textAlign="center">
      <HeaderSection />
      <Grid columns="equal">
        <Grid.Column>
          <Segment>
            <Meme />
          </Segment>
        </Grid.Column>
        <Grid.Column width={5}>
          <Segment>
            <p className="same-line">Please choose a meme or </p>{" "}
            <Button className="same-line"> Upload One</Button>
            <MemeList />
            <CaptionSection />
          </Segment>
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

function CaptionSection() {
  return (
    <div className="ui text container segment">
      <Segment>
        <input type="text" name="topText" placeholder="Top Text" />
      </Segment>
      <Segment>
        <input type="text" name="bottomText" placeholder="Bottom Text" />
      </Segment>
      <Button onClick={() => console.log("clicked")} className="same-line">
        Generate Meme
      </Button>
    </div>
  );
}
