import * as React from 'react';
import ReactFlowPlayer from "react-flow-player";
import config from '../../config';
import ReactHLS from 'react-hls';
import ReactPlayer from 'react-player';

export class Flowplayer extends React.Component<any, any>{
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    return <ReactPlayer
      url={`${config.restUrl}/api/video/${this.props.match.params.folder}`} playing controls width="100%" height="100%" />
    // <ReactHLS url={`${config.restUrl}/api/video/ts/neseli_gunler.mp4`} autoplay={true} constrols={true} width="100%" height="100%" />
    //   <ReactFlowPlayer
    //   playerInitScript="https://cdnjs.cloudflare.com/ajax/libs/flowplayer/7.2.7/flowplayer.min.js"
    //   playerId="reactFlowPlayer"
    //   sources={[
    //     {
    //       type: "video/webm",
    //       // src: "https://localhost:8443/neseli_Gunler.flv"
    //       src: `${config.restUrl}/api/video/neseli_gunler.avi`
    //     }
    //   ]}
    // />;;
  }
}

export default Flowplayer;