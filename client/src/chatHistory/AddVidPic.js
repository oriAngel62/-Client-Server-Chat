import React from "react"

function AddVidPic({vidOrPic, selected, Type}) {
    if(vidOrPic == "pic")
    {
    return(
    <div>
    <img width={"150px"} src={selected}></img>
    </div>
    );
    }
    if(vidOrPic == "video")
    {
    return(
        <div>
        <video width={"200px"} height={"200px"} controls >
            <source src={selected} type={Type}></source>
        </video>
        </div>
    );
    }


}

export default AddVidPic;