import { Request, Response, Router } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as lowdb from 'lowdb';
import * as FileAsync from "lowdb/adapters/FileAsync";

export class ConfigRouter {

    router: Router
    adapter;
    db;
    filePath;
    constructor() {
        this.router = Router();
        this.filePath = path.resolve("config.json");
        this.init();
    }

    public async getConfig(req: Request, res: Response, next) {
        const data = await this.db.get('Config').value();
        res.status(200).send(data);
    }

    public async updateConfig(req: Request, res: Response, next) {
        const values = req.body["config"];
        const data = await this.db.get('Config')
            .set("data",values)
            .write();
        this.getConfig(req, res, next);
    }

    async init() {

        this.adapter = new FileAsync(this.filePath);
        this.db = await lowdb(this.adapter);
        this.db.defaults({ Config: { data: {} } })
            .write();
        this.router.get('/', this.getConfig.bind(this));
        this.router.put('/', this.updateConfig.bind(this));
    }

}

const configRoutes = new ConfigRouter();
const router = configRoutes.router;

export default router;