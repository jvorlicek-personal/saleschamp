import SourceReal from "./SourceReal";
import SourceFake from "./SourceFake";

export function whatDataToUse(fakeData) {
  return(fakeData ? SourceFake : SourceReal)
    .get("emojiList.json", {
      headers: {
        Authorization: "Bearer some authorization",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
    .then((response) => {
      return response
    })
    .catch((error) => {
      console.log("api call error " + error);
      // some error behaviour  popups etc
    });
}

export default whatDataToUse; 
