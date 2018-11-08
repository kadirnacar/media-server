import { Request, Response, Router } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as lowdb from 'lowdb';
import * as FileAsync from "lowdb/adapters/FileAsync";

export class DemoRouter {

    router: Router
    adapter;
    db;
    filePath;
    constructor() {
        this.router = Router();
        this.filePath = path.resolve("db.json");
        this.init();
    }

    public async getList(req: Request, res: Response, next) {
        const data = await this.db.get('DataList').value();
        res.status(200).send(data);
    }

    public async getItem(req: Request, res: Response, next) {
        const id = parseFloat(req.params["id"]);
        const data = await this.db.get('DataList')
            .find({ id: id }).value()
        res.status(200).send(data);
    }

    public async deleteItem(req: Request, res: Response, next) {
        const id = parseFloat(req.params["id"]);
        const d = await this.db.get('DataList')
            .remove({ id: id })
            .write();
        this.getList(req, res, next);
    }

    public async updateItem(req: Request, res: Response, next) {
        const id = parseFloat(req.params["id"]);
        const values = req.body["values"];
        const data = await this.db.get('DataList')
            .find({ id: id })
            .assign(values)
            .write();
        this.getList(req, res, next);
    }

    public async createItem(req: Request, res: Response, next) {
        const values = req.body["values"];
        const data = await this.db.get('DataList')
            .push(values).write();
        this.getList(req, res, next);
    }

    async init() {

        this.adapter = new FileAsync(this.filePath);
        this.db = await lowdb(this.adapter);
        this.router.get('/list', this.getList.bind(this));
        this.router.get('/item/:id', this.getItem.bind(this));
        this.router.delete('/:id', this.deleteItem.bind(this));
        this.router.put('/:id', this.updateItem.bind(this));
        this.router.post('/', this.createItem.bind(this));
    }

}

const demoRoutes = new DemoRouter();
const router = demoRoutes.router;

export default router;