import { EventEmitter } from "events";
import express, { Express } from "express";
import cors from "cors";
import morgan from "morgan";
import { Bot, Util } from "../../lib";
import { Route } from "./Route";

export interface APIOptions {
  port?: number;
  auth: string;
  prod?: boolean;
  routes: string;
}

export class APIClient extends EventEmitter {
  private client: Bot;
  private routes: string;
  public port: number;
  public auth: string;
  public prod: boolean;
  public app: Express;

  constructor(client: Bot, opts: APIOptions) {
    super();

    this.client = client;
    this.prod = opts.prod ?? false;
    this.port = opts.port ?? 3000;
    this.auth = opts.auth;
    this.routes = opts.routes;

    const app = express();
    this.app = app;

    app.use(morgan(this.prod ? "common" : "dev"));
    app.use(cors());

    app.set("json spaces", 2);
  }

  /**
   * @returns {APIManager} This manager
   * @public
   */
  public load(): this {
    this.app.listen(this.port, () => this.emit("ready", this.app));
    this.loadRoutes();
    return this;
  }

  private loadRoutes() {
    const files = Util.findNested(this.routes);
    for (const file of files) {
      const required = require(file);
      if (!required || !required.default || typeof required.default !== "function") continue;

      const route: Route = new required.default(this.client);
      this.app.use(route.path, route.load(route.router));
    }
  }
}
