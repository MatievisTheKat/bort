import React, { ReactElement } from "react";
import PropTypes from "prop-types";

import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  path?: string;
}

export default class Layout extends React.Component<LayoutProps> {
  public static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor(props: Readonly<LayoutProps>) {
    super(props);
  }

  public render(): ReactElement {
    return (
      <>
        <Header name={this.props.path} />
        <div
          style={{
            margin: "0 auto",
            maxWidth: 960,
            padding: "0 1.0875rem 1.45rem",
          }}
        >
          <main>{this.props.children}</main>
        </div>
        <Footer />
      </>
    );
  }
}
