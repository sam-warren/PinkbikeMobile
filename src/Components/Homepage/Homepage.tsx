import React from "react";
import { View } from "react-native";
import RSSService from "./../../Services/RSS-Service";

export class Homepage extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      RSSFeed: undefined
    }
  }

  componentDidMount() {
    this.setState({ RSSFeed: this._getRSSFeed() });
  }

  private _getRSSFeed(): void {
    RSSService.getRSSFeed();
  }

  render() {
    return (
      <View>
        {this.state.RSSFeed}
      </View>
    )
  }
}