import { Request, Response, Router } from 'express';
import * as ffmpegPath from '@ffmpeg-installer/ffmpeg';
import * as ffmpeg from 'fluent-ffmpeg';
import * as  fs from 'fs';
import * as path from 'path';
import * as FileAsync from "lowdb/adapters/FileAsync";
import * as lowdb from 'lowdb';

export class VideoStreamRouter {
    router: Router;
    configDb;
    configFilePath;
    configAdapter;
    constructor() {
        this.router = Router();
        ffmpeg.setFfmpegPath(ffmpegPath.path)
        this.configFilePath = path.resolve("config.json");
        this.init();
    }
    static procs = {};

    public async getVideo(req: Request, res: Response, next) {
        const config = await this.configDb.get('Config').value().data;
        const folder = path.join(req.params.name ? req.params.name : "", Object.getOwnPropertyNames(req.params).map((item) => {
            return item != "name" ? req.params[item] : null;
        }).filter((item) => { return item != null }).join('/'));

        const nameExt = folder.split('.').slice(0, -1).join('.');
        const subFolders = folder.split('\\').slice(0, -1);
        let currentPath = config.tempFolder;
        subFolders.forEach((item, index) => {
            currentPath = path.join(currentPath, item);
            if (!fs.existsSync(currentPath)) {
                fs.mkdirSync(currentPath);
            }
        });

        res.contentType('video/mp4');
        res.setHeader("Content-Disposition", "attachment")
        res.attachment('name');
        if (!fs.existsSync(path.join(config.tempFolder, nameExt + ".mp4"))) {
            // Do something
            ffmpeg(path.join(config.sourceFolder, folder))
                // set video bitrate
                // .videoBitrate(1024)
                // set h264 preset
                // .addOption('preset', 'divx')
                // set target codec
                .videoCodec('libx264')
                // .videoCodec('copy')
                // set audio bitrate
                // .audioBitrate('128k')
                // set audio codec
                // .audioCodec('copy')
                .audioCodec('libmp3lame')
                // .fps(29.7)
                // set number of audio channels
                // .audioChannels(2)
                // set hls segments time
                // .addOption('-hls_time', 10)
                // // include all the segments in the list
                // .addOption('-hls_list_size', 0)
                // .addOption('-hls_base_url', "http://localhost:3005/api/video/ts/")
                // setup event handlers
                .on('end', function () {
                    console.log('file has been converted succesfully');
                    delete VideoStreamRouter.procs[folder];

                })
                .on('progress', (progress) => {
                    console.log(folder, progress.percent, progress);
                    VideoStreamRouter.procs[folder] = progress;
                })
                .on('error', function (err, stdout, stdin) {
                    console.log('an error happened: ' + err.message);
                })
                // .pipe(res);
                // save to file
                // .save(tempToMovie + name + ".m3u8")
                .save(path.join(config.tempFolder, nameExt + ".mp4"));
        }

        res.status(200).sendfile(path.join(config.tempFolder, nameExt + ".mp4"));
    }
    getTs(req: Request, res: Response, next) {
        res.setHeader('Access-Control-Allow-Origin', "*");
        res.setHeader('Access-Control-Expose-Headers', 'Content-Length');
        res.contentType('video/mp2t');
        var tempToMovie = 'F:\\Arsiv\\Temp\\';// + req.params.filename;
        const name = req.params.name;
        res.status(200).sendfile(tempToMovie + name);
    }

    async init() {
        this.configAdapter = new FileAsync(this.configFilePath);
        this.configDb = await lowdb(this.configAdapter);

        this.router.get('/ts/:name', this.getTs.bind(this));
        this.router.get('/:name*', this.getVideo.bind(this));
    }
}

const videoStreamRoutes = new VideoStreamRouter();
const router = videoStreamRoutes.router;

export default router;