import express from "express";
import bodyParser from "body-parser";
import { Routes } from "../routes/teamRoutes";


class App {

    public app: express.Application = express();
    public routePrv: Routes = new Routes();

    constructor() {
        this.config();
        this.routePrv.routes(this.app);
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        // serving static files 
        this.app.use(express.static('public'));
    }

}

export default new App().app;