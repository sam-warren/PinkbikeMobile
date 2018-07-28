import * as RSSParser from "react-native-rss-parser";
const RSSURL = "https://www.pinkbike.com/pinkbike_xml_feed.php";

export default {

  /**
   * getRSSFeed
   * Gets Pinkbike RSS feed and parses it as JSON.
   */
  async getRSSFeed(): Promise<any> {
    try {
      const response = await fetch(RSSURL)
      const responseJson = await response.text();
      const RSS = RSSParser.parse(responseJson);
      return RSS;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }
}