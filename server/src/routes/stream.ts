import { Request, Response, Router } from 'express';
import * as ffmpegPath from '@ffmpeg-installer/ffmpeg';
import * as ffmpeg from 'fluent-ffmpeg';
import * as  fs from 'fs';
export class VideoStreamRouter {
    router: Router;
    constructor() {
        this.router = Router();
        ffmpeg.setFfmpegPath(ffmpegPath.path)
        this.init();
    }
    public getVideo(req: Request, res: Response, next) {
        const name = req.params.name;
        const nameExt = name.split('.').slice(0, -1).join('.');
        var pathToMovie = 'F:\\Arsiv\\Filmler\\';
        var tempToMovie = 'F:\\Arsiv\\Temp\\';
        res.contentType('video/mp4');
        res.setHeader("Content-Disposition", "attachment")
        res.attachment('name');
        if (!fs.existsSync(tempToMovie + nameExt + ".mp4")) {
            // Do something
            ffmpeg(pathToMovie + name)
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
                })
                .on('progress', function (progress) {
                    console.log(progress);
                })
                .on('error', function (err, stdout, stdin) {
                    console.log('an error happened: ' + err.message);
                })
                // .pipe(res);
                // save to file
                // .save(tempToMovie + name + ".m3u8")
                .save(tempToMovie + nameExt + ".mp4");
        }

        res.status(200).sendfile(tempToMovie + nameExt + ".mp4");
    }
    getTs(req: Request, res: Response, next) {
        res.setHeader('Access-Control-Allow-Origin', "*");
        res.setHeader('Access-Control-Expose-Headers', 'Content-Length');
        res.contentType('video/mp2t');
        var tempToMovie = 'F:\\Arsiv\\Temp\\';// + req.params.filename;
        const name = req.params.name;
        res.status(200).sendfile(tempToMovie + name);
    }
    
    init() {
        this.router.get('/ts/:name', this.getTs.bind(this));
        this.router.get('/:name', this.getVideo.bind(this));
    }
}

const videoStreamRoutes = new VideoStreamRouter();
const router = videoStreamRoutes.router;

export default router;