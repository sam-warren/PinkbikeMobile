import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import RSSService from "./../../Services/RSS-Service";
import { FeedItem } from "./../../Models/Feed-Item";
const htmlParser = require("react-native-html-parser").DOMParser;

export class Homepage extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      isLoading: true,
      RSSFeed: []
    }
  }

  componentDidMount() {
    this._getRSSFeed();
  }

  private _getRSSFeed(): void {
    RSSService.getRSSFeed().then((res) => {
      this.setState({ RSSFeed: res.items, isLoading: false });
      this._processRSSItems(res.items).then((res) => {
        console.log(res);
      })
    })
  }

  private _processDescription(description: string, type: string): string {
    let parsedDescription = new htmlParser().parseFromString(description, "text/html");
    if (type == "description") {
      return parsedDescription.getElementsByTagName("br")[1].nextSibling.data;
    } else if (type == "imageSource") {
      return parsedDescription.getElementsByTagName("img")[0].getAttribute("src");
    } else if (type == "comments") {
      let tempDataStorage = parsedDescription.getElementsByTagName("br")[2].nextSibling.data;
      let preProcessed: string = (tempDataStorage.split(", Comments: ")[1]);
      return preProcessed.slice(0, -1);
    }
    return "";
  }

  private async _processRSSItems(items: any[]): Promise<FeedItem[]> {
    let Feed: FeedItem[] = [];
    items.forEach((item: any) => {
      let processedFeedItem = new FeedItem();
      processedFeedItem.Title = item.title;
      processedFeedItem.DatePublished = new Date(item.published);
      processedFeedItem.URL = item.links[0].url;
      processedFeedItem.Comments = this._processDescription(item.description, "comments");
      processedFeedItem.ThumbnailLink = this._processDescription(item.description, "imageSource");
      processedFeedItem.Description = this._processDescription(item.description, "description");
      Feed.push(processedFeedItem);
    });
    return Feed;
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size="large" color="#D61D29"/>
        </View>
      )
    } else {
      return (
        <View>
          <Text>Done</Text>
        </View>
      )
    }
  }
}