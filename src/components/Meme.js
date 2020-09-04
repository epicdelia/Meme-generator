import React from "react";

const Meme = (meme) => {
  if (!meme) {
    return <div>Please select a meme to get started.</div>;
  }
  return <img alt={"temp"} className="ui large image" src={meme.meme.url} />;
};

export default Meme;

// <Switch>
//   <Route path="/">
//     <Meme meme={selectedMeme} />
//   </Route>
//   <Route path="/generated">
//     <Meme meme={selectedMeme} />
//   </Route>
// </Switch>
