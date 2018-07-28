import React, { ReactElement } from "react";
import { View, Text, ActivityIndicator, Image, Linking, FlatList, StyleSheet, Dimensions } from "react-native";
// import  FullWidthImage  from "./../../Assets/Components/FullWidthImage";
import RSSService from "./../../Services/RSS-Service";
import { FeedItem } from "./../../Models/Feed-Item";
import Icon from "react-native-vector-icons/MaterialIcons";
const htmlParser = require("react-native-html-parser").DOMParser;


let index = 0;

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
      let publishedDate = new Date(item.published);
      let formattedDate = publishedDate.getDate() + "/" + (publishedDate.getMonth() + 1) + "/" + publishedDate.getFullYear()
      processedFeedItem.Title = item.title;
      processedFeedItem.DatePublished = formattedDate;
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
      <View style={ styles.feedItem }>
        <View style={styles.feedItemData}>
          <View style={styles.leftFeedItemContainer}>
            <Image style={styles.feedItemPictureContainer} source={{ uri: item.ThumbnailLink }} resizeMode="contain"/>
          </View>
          <View style={styles.rightFeedItemContainer}>
            <Text>{ item.DatePublished }</Text>
            <Text style={styles.feedItemTitle}>{ item.Title.replace(/&amp;/g, "&") }</Text>
            <Text>{ item.Description }</Text>
            <Text>{ item.Comments } Comments</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Icon.Button name="link" backgroundColor="#D61D29" onPress={() => { this.openArticle(item.URL) }}>
            <Text style={styles.buttonText}>SHOW ARTICLE</Text>
          </Icon.Button>
        </View>
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
        <View style={ styles.activityIndicatorContainer }>
          <ActivityIndicator size="large" color="#D61D29"/>
        </View>
      )
    } else {
      return (
        <View style={styles.listContainer}>
          <FlatList
            style={styles.flatlist}
            data={ this.state.RSSFeed }
            renderItem={ this._renderItem }
            keyExtractor={ () => (index++).toString() }
            refreshing={ this.state.isRefreshing }
            onRefresh={ () => this._refreshFeed() }
            showsVerticalScrollIndicator={false}
          />
        </View>
      )
    }
  }

  openArticle(link: string) {
    Linking.openURL(link);
  }
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1
  },
  buttonText: {
    alignContent: "center",
    color: "#FFFFFF"
  },
  feedItemTitle: {
    fontWeight: "bold"
  },
  activityIndicatorContainer: {
    flex: 1,
    justifyContent: "center"
  },
  feedItem: {
    flex: 1
  },
  feedItemPictureContainer: {
    width: (Dimensions.get("window").width / 3),
    height: (Dimensions.get("window").height / 8),
  },
  leftFeedItemContainer: {
    flex: 3
  },
  rightFeedItemContainer: {
    flex: 5
  },
  buttonContainer: {
    margin: 5
  },
  feedItemData: {
    flex: 1,
    margin: 5,
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  flatlist: {
    backgroundColor: "#FFFFFF"
  }
});