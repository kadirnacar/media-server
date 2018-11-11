import { Request, Response, Router } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as lowdb from 'lowdb';
import * as FileAsync from "lowdb/adapters/FileAsync";
import * as ffmpeg from 'fluent-ffmpeg';
import * as ffmpegPath from '@ffmpeg-installer/ffmpeg';
import { VideoStreamRouter } from "./stream";


export class FoldersRouter {


    router: Router
    adapter;
    configAdapter;
    db;
    configDb;
    filePath;
    configFilePath;
    constructor() {
        this.router = Router();
        ffmpeg.setFfmpegPath(ffmpegPath.path)

        this.filePath = path.resolve("folders.json");
        this.configFilePath = path.resolve("config.json");
        this.init();
    }

    walk = async (dir, source, target, filelist = []) => {
        const files = await fs.readdirSync(dir);

        for (const file of files) {
            const filepath = path.join(dir, file);
            const stat = await fs.statSync(filepath);

            if (stat.isDirectory()) {
                filelist.push({
                    data: { name: file, type: "Folder" },
                    label: file,
                    children: []//await this.walk(filepath, source, target)
                });
            } else {
                const nameExt = file.split('.').pop();
                if (nameExt == "avi" || nameExt == "mpg" || nameExt == "mkv") {
                    const tempFilePath = filepath.replace(source, target);
                    const name = tempFilePath.split('.').slice(0, -1).join('.');
                    const procName = filepath.replace(source + "\\", "");
                    const process = VideoStreamRouter.procs[procName];
                    const isTempExists = fs.existsSync(name + ".mp4");
                    filelist.push({ label: file, data: { process: process, name: file, hasTemp: isTempExists, type: "Document" } });
                }
            }
        }

        return filelist;
    }
    public async getFolders(req: Request, res: Response, next) {
        const config = await this.configDb.get('Config').value().data;
        const folder = path.join(req.params.folders ? req.params.folders : "", Object.getOwnPropertyNames(req.params).map((item) => {
            return item != "folders" ? req.params[item] : null;
        }).filter((item) => { return item != null }).join('/'));
        var list = { data: await this.walk(path.join(config.sourceFolder, folder ? folder : ""), config.sourceFolder, config.tempFolder) };
        res.status(200).send(list);
    }

    public async updateFolders(req: Request, res: Response, next) {
        const values = req.body["config"];
        const data = await this.db.get('Config')
            .set("data", values)
            .write();
        this.getFolders(req, res, next);
    }

    public async getFolderImage(req: Request, res: Response, next) {
        const config = await this.configDb.get('Config').value().data;
        const folder = path.join(req.params.folders ? req.params.folders : "", Object.getOwnPropertyNames(req.params).map((item) => {
            return item != "folders" ? req.params[item] : null;
        }).filter((item) => { return item != null }).join('/'));
        const file = path.join(config.sourceFolder, folder);

        if (fs.existsSync(file)) {
            const stat = fs.statSync(file);
            if (stat.isFile()) {
                const nameExt = file.split('.').pop();
                if (nameExt == "avi" || nameExt == "mpg" || nameExt == "mkv") {
                    const name = folder.split('.').slice(0, -1).join('.');
                    if (fs.existsSync(path.join(config.sourceFolder, name + '.png'))) {
                        res.status(200).sendFile(path.join(config.sourceFolder, name + '.png'));

                    } else {
                        ffmpeg(file)
                            .on('end', function () {
                                res.status(200).sendFile(path.join(config.sourceFolder, name + '.png'));
                            })
                            .screenshots({
                                // Will take screens at 20%, 40%, 60% and 80% of the video
                                count: 1,
                                size: '180x140',
                                filename: name + '.png',
                                folder: config.sourceFolder
                            });
                    }
                }
            } else {
                res.status(200).sendFile(path.join(config.sourceFolder, 'folder.png'));
            }
        } else {
            res.status(200).sendFile(path.join(config.sourceFolder, 'folder.png'));
        }
    }

    async init() {

        this.adapter = new FileAsync(this.filePath);
        this.configAdapter = new FileAsync(this.configFilePath);
        this.db = await lowdb(this.adapter);
        this.configDb = await lowdb(this.configAdapter);
        this.db.defaults({ folders: [] })
            .write();
        this.router.get('/path/:folders?', this.getFolders.bind(this));
        this.router.get('/path/:folders*', this.getFolders.bind(this));
        this.router.get('/img/:folders?', this.getFolderImage.bind(this));
        this.router.get('/img/:folders*', this.getFolderImage.bind(this));
        // this.router.put('/', this.updateFolders.bind(this));
    }

}

const foldersRoutes = new FoldersRouter();
const router = foldersRoutes.router;

export default router;