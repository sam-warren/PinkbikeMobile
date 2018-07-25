import * as RSSParser from "react-native-rss-parser";

const RSSURL = "https://www.pinkbike.com/pinkbike_xml_feed.php";

export default {
  getRSSFeed() {
    return fetch(RSSURL)
    .then((response) => response.text())
    .then((responseData) => RSSParser.parse(responseData))
    .then((rss) => {
      console.log(rss);
      return rss;
    })
  }
}