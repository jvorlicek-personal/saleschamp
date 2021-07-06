import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { whatDataToUse } from "../api/GetData";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { renderEmoji } from "./EmojiRender";
import Pagination from "@material-ui/lab/Pagination";

class EmojiSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  get initialState() {
    return {
      emojiData: [],
      filterKeywordsTerm: "",
      titleFiltered: "",
      currentPage: 1,
      limit: 100,
    };
  }

  componentDidMount = () => {
    this.getInitialData();
  };

  getInitialData() {
    whatDataToUse(this.props.fakeData).then((data) => {
      this.setState({
        emojiData: data,
      });
    });
  }

  renderEmojiFilter = () => {
    if (this.state.emojiData.data) {
      let emojiData = this.state.emojiData.data;
      const defaultPropsTitle = {
        options: emojiData,
        getOptionLabel: (option) => option.title,
      };

      return (
        <div>
          <div>
            <Autocomplete
              {...defaultPropsTitle}
              clearOnEscape
              onChange={(event, newValue) => {
                if (newValue === null) {
                  this.setState({ titleFiltered: "" });
                } else {
                  this.setState({ titleFiltered: newValue.title });
                }
              }}
              onInputChange={(e, newInputValue) => {
                this.setState({ titleFiltered: newInputValue });
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Filter by title"
                  margin="normal"
                />
              )}
            />
          </div>
          <div>
            <TextField
              label="Filter by keywords"
              margin="normal"
              onChange={(e) => setTimeout(this.setStateForKeyFilter(e), 3000)}
            />
          </div>
        </div>
      );
    }
  };

  setStateForKeyFilter(e) {
    this.setState({ filterKeywordsTerm: e.target.value });
  }

  //leftover attemtpts for autocomplete listof single words (not working atm - overflows on memory, and this last version is far off)
  /*let emojiData = this.state.emojiData.data;
      emojiData.forEach((data) => {
        console.log(data.keywords.split(" "))
        this.setState((state) => {
          const keywords = state.keywords.concat(
              data.keywords.split(" ")
              );
          return { keywords};
        });*/
  //data.keywords.split(" ").forEach((keyword) => {
  /*if (this.state.keywords.length > 0) {
            if (!this.state.keywords.includes(keyword)) {
              this.setState({ keywords: [... this.state.keywords, keyword] });
            }
          } else {*/
  //this.setState({ keywords: keyword });
  //}
  //});
  /* const defaultPropsKeywords = {
        options: emojiData,
        getOptionLabel: (option) => option.keywords,
      };*/
  /*
<div>
            <Autocomplete
              {...defaultPropsKeywords}
              clearOnEscape
              onChange={(event, newValue) => {
                this.setState({ keywordsFiltered: newValue });
              }}
              onInputChange={(e, newInputValue) => {
                this.setState({ keywordsFiltered: newInputValue });
              }}
              renderInput={(params) => (
                
              )}
            />
          </div>
  */

  renderEmojiResult = () => {
    if (this.state.emojiData.data) {
      let emojiData = this.state.emojiData.data;
      let i = 0;
      let i2 = 0;
      let titleFiltered = this.state.titleFiltered
        ? this.state.titleFiltered
        : "";
      let keywordsTerm = this.state.filterKeywordsTerm
        ? this.state.filterKeywordsTerm
        : "";
      const emojifilter = emojiData.map((data) => {
        i++;
        if (titleFiltered || keywordsTerm) {
          if (
            data.title.includes(titleFiltered) &&
            data.keywords.includes(keywordsTerm)
          )
          {
            const items =
              this.state.limit * this.state.currentPage -
              1 -
              (this.state.currentPage - 1) * this.state.limit;
            if (this.state.pagination !== items) {
              this.setState({ pagination: items });
            }
            if (
              i >= (this.state.currentPage - 1) * this.state.limit &&
              i < this.state.limit * this.state.currentPage - 1
            ) {
              return renderEmoji(
                "ES_symbol_" + i,
                data.title,
                data.symbol,
                data.keywords
              );
            }
          }
        } else if (
          i >= (this.state.currentPage - 1) * this.state.limit &&
          i < this.state.limit * this.state.currentPage - 1
        ) {
          return renderEmoji(
            "ES_symbol_" + i,
            data.title,
            data.symbol,
            data.keywords
          );
        }
        return;
      });
      return emojifilter;
    } else return <div> No data </div>;
  };

  render() {
    return (
      <div>
        <Typography variant="subtitle1" gutterBottom>
          Emoji list module header
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={3}>
            <Paper>
              {this.state.emojiData ? this.renderEmojiFilter() : "loading"}
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className="emoji-list">{this.renderEmojiResult()}</Paper>
          </Grid>
        </Grid>
        {this.state.emojiData.length !== 0 ? (
          <Pagination
            count={
              !this.state.pagination
                ? Math.floor(
                    this.state.emojiData.data.length / this.state.limit
                  ) + 1
                : Math.ceil(this.state.pagination / 100)
            }
            page={this.state.currentPage}
            onChange={(event, value) => this.setState({ currentPage: value })}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default EmojiSearch;
