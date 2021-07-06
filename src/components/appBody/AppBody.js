import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import EmojiSearch from "../emojiSearch/EmojiSearch";

class AppBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Typography variant="subtitle1" gutterBottom>
          Test app for emoji list module
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper>
              <EmojiSearch fakeData={this.props.fakeData} />
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default AppBody;