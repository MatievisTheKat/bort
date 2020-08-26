import React from "react";
import qs from "querystring";
import axios from "axios";
import Layout from "../../components/Layout";
import SEO from "../../components/SEO";
import { oauth } from "../../config";

interface Props {}
interface State {
  error: string;
  user: User;
  refreshToken: string;
}
interface User {
  avatar: string;
  discriminator: string;
  flags: number;
  id: string;
  locale: string;
  premium_type: number;
  public_flags: number;
  username: string;
}

export default class Callback extends React.Component<Props, State> {
  constructor(props: Readonly<Props>) {
    super(props);

    this.state = {
      error: null,
      user: null,
      refreshToken: null,
    };
  }

  public async componentDidMount() {
    const { code } = qs.parse(window.location.href.split("?")[1]);
    if (!code) return (window.location.href = "/login");

    let error = null;
    const secret = process.env.CLIENT_SECRET;
    const id = process.env.CLIENT_ID;
    const url = "https://discord.com/api/oauth2/token";
    const res = await axios
      .post(
        url,
        qs.stringify({
          client_id: id,
          client_secret: secret,
          grant_type: "authorization_code",
          code,
          redirect_uri: oauth.callbackURL,
          scope: oauth.scope.join(" "),
        })
      )
      .catch((err) => (error = err));
    if (error) {
      console.error(error);
    } else {
      const data = res.data;
      const accessToken = data.access_token;
      const refreshToken = data.refresh_token;
      const uRes = await axios.get(`https://discord.com/api/users/@me`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const user = uRes.data;
      this.setState({ user, refreshToken });
      window.location.href = window.localStorage.getItem("postLoginURL") || "/";
    }

    this.setState({ error: error?.message });
  }

  public render() {
    if (this.state.user) {
    }

    return (
      <Layout path="/login/callback">
        <SEO title="Login" description="You probably shouldn't be here..." />
        {this.state.error ? (
          <div className="container text-danger text-center">
            An unexpected error occured: {this.state.error}
            <br />
            Please <a href="/login">try again</a>
          </div>
        ) : (
          <div className="container text-primary text-center">Please wait while you are redirected...</div>
        )}
      </Layout>
    );
  }
}