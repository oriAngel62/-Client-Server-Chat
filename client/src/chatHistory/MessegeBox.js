import "./MessegeBox.css";

function MessegeBox({ messege }) {
    if (messege.type == "text") {
        if (messege.sender == "me")
            return (
                <div
                    id="myMessage"
                    className="flex-shrink-1 bg-light rounded py-2 px-3 mr-3"
                >
                    {messege.context}
                    <br></br>
                    <h6>
                        {messege.time} {messege.date}
                    </h6>
                </div>
            );
        else
            return (
                <div className="line-in-chat">
                    <div className="msg_box_receive">
                        {messege.context}
                        <h6>
                            {messege.time} {messege.date}
                        </h6>
                    </div>
                </div>
            );
    }
    if (messege.type == "image") {
        if (messege.sender == "me")
            return (
                <div className="line-in-chat">
                    <div className="msg_box_send">
                        <img
                            alt="not found"
                            width={"100px"}
                            src={messege.context}
                        ></img>
                        <br></br>
                        <h6>
                            {messege.time} {messege.date}
                        </h6>
                    </div>
                </div>
            );
        else
            return (
                <div className="line-in-chat">
                    <div className="msg_box_receive">
                        <img
                            alt="not fount"
                            width={"100px"}
                            src={messege.context}
                        ></img>
                        <br></br>
                        <h6>
                            {messege.time} {messege.date}
                        </h6>
                    </div>
                </div>
            );
    }
    if (messege.type == "video") {
        if (messege.sender == "me")
            return (
                <div className="line-in-chat">
                    <div className="msg_box_send">
                        <video width={"150px"} height={"150px"} controls>
                            <source
                                src={messege.context[0]}
                                type={messege.context[1]}
                            ></source>
                        </video>
                        <br></br>
                        <h6>
                            {messege.time} {messege.date}
                        </h6>
                    </div>
                </div>
            );
        else
            return (
                <div className="line-in-chat">
                    <div className="msg_box_receive">
                        <video width={"150px"} height={"150px"} controls>
                            <source
                                src={messege.context[0]}
                                type={messege.context[1]}
                            ></source>
                        </video>
                        <br></br>
                        <h6>
                            {messege.time} {messege.date}
                        </h6>
                    </div>
                </div>
            );
    }
    if (messege.type == "audio") {
        if (messege.sender == "me")
            return (
                <div className="line-in-chat">
                    <div className="msg_box_send">
                        <audio
                            className="audio"
                            controls
                            src={messege.context}
                            type="audio/mpeg"
                        ></audio>
                        <br></br>
                        <h6>
                            {messege.time} {messege.date}
                        </h6>
                    </div>
                </div>
            );
        else
            return (
                <div className="line-in-chat">
                    <div className="msg_box_receive">
                        <audio
                            className="audio"
                            controls
                            src={messege.context}
                            type="audio/mpeg"
                        ></audio>
                        <br></br>
                        <h6>
                            {messege.time} {messege.date}
                        </h6>
                    </div>
                </div>
            );
    }
}

export default MessegeBox;
