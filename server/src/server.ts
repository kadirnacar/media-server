import * as bodyParser from "body-parser";
import corsPrefetch from 'cors-prefetch-middleware';
import * as express from "express";
import * as path from "path";
import VideoStreamRouter from "./routes/stream";
import ConfigRouter from "./routes/config";
import FoldersRouter from "./routes/folders";


class App {
  /** Ref to Express instance */
  public express;

  /** Run configuration methods on the Express instance. */
  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  /** Configure Express middleware. */
  private middleware(): void {

    // Configure Cors.
    this.express.use(corsPrefetch);

    this.express.use(bodyParser.json({ limit: '50mb' }));
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  /** Configure API endpoints. */
  private routes(): void {
    let router = express.Router();
    this.express.use(express.static("public"));
    this.express.use(express.static("dist"));
    this.express.use(express.static("."));
    this.express.use(express.static("js"));
    this.express.use(express.static("dist/uploads"));
    // this.express.use(/\/((?!api).)*/, function (req, res) {
    //   // res.sendFile('index.html', { root: path.resolve(".") }, function (err) {
    //   //   if (err) {
    //   //     res.status(500).send(err)
    //   //   }
    //   // })
    // })
    this.express.use("/", router);
    this.express.use("/api/video", VideoStreamRouter);
    this.express.use("/api/config", ConfigRouter);
    this.express.use("/api/folders", FoldersRouter);
    
  }
}

export default new App().express;
