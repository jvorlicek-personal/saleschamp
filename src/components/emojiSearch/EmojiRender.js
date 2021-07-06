import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";

// get rid of tooltip or figure out the reason for the error in console

export function renderEmoji(key, title, symbol, keywords ) {
  return (
    <Tooltip key={key} title={title}>
      <Button>{symbol}</Button>
    </Tooltip>
  );
}

export default renderEmoji;
