import React from "react"

function AddVidPic({vidOrPic, selected, Type}) {
    console.log("hi");
    console.log({vidOrPic});
    console.log({selected});
    if(vidOrPic == "pic")
    {
        console.log("hi shalom lah");
    return(
    <div>
    <img width={"150px"} src={selected}></img>
    </div>
    );
    }
    if(vidOrPic == "vid")
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

//  need to change from URL to path line 53,59
export default AddVidPic;