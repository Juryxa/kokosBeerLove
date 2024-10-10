/* eslint-disable jsx-a11y/iframe-has-title */
import React from 'react';

interface IframeType {
    oid: string; 
    id: string;  
    hd?: number;           
    width?: number;       
    height?: number;
    autoplay?: number;     
}

const CreateVideoFrame: React.FC<IframeType> = ({ oid, id, hd = 2, width = 853, height = 480,autoplay }) => {
    const iframeSrc = `https://vk.com/video_ext.php?oid=${oid}&id=${id}&hd=${hd}&autoplay=${autoplay ? 1 : 0}&js_api=1`;
    

    return (
        <div>
            <iframe
                src={iframeSrc}
                width={width}
                height={height}
                allow="autoplay; encrypted-media; fullscreen; picture-in-picture;"
                frameBorder="0"
                allowFullScreen
                style={{ width:"100%", 
                    maxWidth: "100%",
                    height: "auto" ,
                    display: "block",
                    margin: "0 auto"}}
            ></iframe>
        </div>
    );  
};

export default CreateVideoFrame;
