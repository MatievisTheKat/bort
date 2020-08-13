import React from "react";
import NavbarIcons from "./Icons";
import NavBarTabs from "./Tabs";

interface Props {
  tabName?: string;
}
interface State {}

export default class NavBar extends React.Component<Props, State> {
  private tabName?: string;

  constructor(props: Readonly<Props>) {
    super(props);

    this.tabName = this.props.tabName ? this.props.tabName.toLowerCase() : "<none>";
  }

  public render() {
    return (
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark indigo lighten-2 scrolling-navbar">
        <a className="navbar-brand" href="/">
          <strong>bort </strong>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <NavBarTabs name={this.tabName} />
          <NavbarIcons />
        </div>
      </nav>
    );
  }
}