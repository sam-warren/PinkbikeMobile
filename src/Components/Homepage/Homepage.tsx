import React, { ReactElement } from "react";
import { View, Text, ActivityIndicator, Image, Button, Linking, FlatList } from "react-native";
// import  FullWidthImage  from "./../../Assets/Components/FullWidthImage";
import RSSService from "./../../Services/RSS-Service";
import { FeedItem } from "./../../Models/Feed-Item";
const htmlParser = require("react-native-html-parser").DOMParser;

export class Homepage extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      isLoading: true,
      RSSFeed: [],
      isRefreshing: false
    }
  }

  componentDidMount() {
    this._getRSSFeed();
  }

  private _getRSSFeed(): void {
    RSSService.getRSSFeed().then((res) => {
      this._processRSSItems(res.items).then((res) => {
        this.setState({ RSSFeed: res, isLoading: false});
      })
    })
  }

  private _processDescription(description: string, type: string): any {
    let parsedDescription = new htmlParser().parseFromString(description, "text/html");
    if (type == "description") {
      return parsedDescription.getElementsByTagName("br")[1].nextSibling.data;
    } else if (type == "imageSource") {
      return parsedDescription.getElementsByTagName("img")[0].getAttribute("src");
    } else if (type == "comments") {
      let tempDataStorage = parsedDescription.getElementsByTagName("br")[2].nextSibling.data;
      let preProcessed: string = (tempDataStorage.split("Comments: ")[1]);
      return Number(preProcessed.slice(0, -2));
    }
    return "";
  }

  private async _processRSSItems(items: any[]): Promise<FeedItem[]> {
    let Feed: FeedItem[] = [];
    items.forEach((item: any) => {
      let processedFeedItem = new FeedItem();
      processedFeedItem.Title = item.title;
      processedFeedItem.DatePublished = new Date(item.published) == new Date() ? "Today" : new Date(item.published).toUTCString();
      processedFeedItem.URL = item.links[0].url;
      processedFeedItem.Comments = this._processDescription(item.description, "comments");
      processedFeedItem.ThumbnailLink = this._processDescription(item.description, "imageSource");
      processedFeedItem.Description = this._processDescription(item.description, "description");
      Feed.push(processedFeedItem);
    });
    return Feed;
  }

  private _renderItem = ({ item }: any): ReactElement<{}> => {
    return (
      <View>
        <Image style={{ width: 150, height: 100 }} source={{ uri: item.ThumbnailLink }}/>
        <Text>{ item.DatePublished }</Text>
        <Text>{ item.Title }</Text>
        <Text>{ item.Description }</Text>
        <Text>{ item.Comments } Comments</Text>
        <Button color="#D61D29" title="SHOW ARTICLE" onPress={ () => this.openArticle(item.URL) }/>
      </View>
    );
  }

  private _refreshFeed(): void {
    this._getRSSFeed();
    this.setState({ isRefreshing: false });
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
        <FlatList
          data={ this.state.RSSFeed }
          renderItem={ this._renderItem }
          keyExtractor={ (item: any) => item.Comments.toString() }
          refreshing={ this.state.isRefreshing }
          onRefresh={ () => this._refreshFeed() }
        />
        // <View>
        //   <View>
        //     <Image style={{ width: 150, height: 100 }} source={{ uri: this.state.RSSFeed[0].ThumbnailLink }}/>
        //     <Text>{this.state.RSSFeed[0].DatePublished}</Text>
        //     <Text>{this.state.RSSFeed[0].Title}</Text>
        //     <Text>{this.state.RSSFeed[0].Description}</Text>
        //     <Text>{this.state.RSSFeed[0].Comments} Comments</Text>
        //     <Button color="#D61D29" title="SHOW ARTICLE" onPress={() => this.openArticle(this.state.RSSFeed[0].URL) }/>
        //   </View>
        // </View>
      )
    }
  }

  openArticle(link: string) {
    Linking.openURL(link);
  }
}