import "./MessegeBox.css";

function MessegeBox({ messege }) {
    if (messege.type == "text") {
        if (messege.sender == "me")
            return (
                <div>
                    <p
                        class="small p-2 ms-3 mb-1 rounded-3"
                        style={{
                            backgroundColor: "#f5f6f7",
                            fontSize: "20px",
                        }}
                    >
                        {messege.context}
                    </p>

                    <p class="small ms-3 mb-3 rounded-3 text-muted">
                        {messege.time} {messege.date}
                    </p>
                </div>
            );
        else
            return (
                <div className="d-flex flex-row justify-content-end mb-4 pt-1">
                    <div>
                        <p
                            class="small p-2 me-3 mb-1 text-white rounded-3 bg-primary"
                            style={{
                                backgroundColor: "#f5f6f7;",
                                fontSize: "20px",
                            }}
                        >
                            {messege.context}
                        </p>

                        <p class="small me-3 mb-3 rounded-3 text-muted d-flex justify-content-end">
                            {messege.time} {messege.date}
                        </p>
                    </div>
                </div>
            );
    }
    if (messege.type == "image") {
        if (messege.sender == "me")
            return (
                <div className="line-in-chat">
                    <div className="msg_box_send">
                        <p
                            class="small p-2 ms-3 mb-1 rounded-3"
                            style={{
                                backgroundColor: "#f5f6f7",
                                fontSize: "20px",
                            }}
                        >
                            <img
                                alt="not found"
                                width={"200px"}
                                src={messege.context}
                            ></img>
                        </p>
                        <p class="small ms-3 mb-3 rounded-3 text-muted">
                            {messege.time} {messege.date}
                        </p>
                    </div>
                </div>
            );
        else
            return (
                <div className="d-flex flex-row justify-content-end mb-4 pt-1">
                    <div>
                        <p
                            class="small p-2 me-3 mb-1 text-white rounded-3 bg-primary"
                            style={{
                                backgroundColor: "#f5f6f7;",
                                fontSize: "20px",
                            }}
                        >
                            <img
                                alt="not fount"
                                width={"200px"}
                                src={messege.context}
                            ></img>
                        </p>

                        <p class="small me-3 mb-3 rounded-3 text-muted d-flex justify-content-end">
                            {messege.time} {messege.date}
                        </p>
                    </div>
                </div>
            );
    }
    if (messege.type == "video") {
        if (messege.sender == "me")
            return (
                <div className="line-in-chat">
                    <div className="msg_box_send">
                        <p
                            class="small p-2 ms-3 mb-1 rounded-3"
                            style={{
                                backgroundColor: "#f5f6f7",
                                fontSize: "20px",
                            }}
                        >
                            <video width={"250px"} height={"150px"} controls>
                                <source
                                    src={messege.context[0]}
                                    type={messege.context[1]}
                                ></source>
                            </video>
                        </p>
                        <p class="small ms-3 mb-3 rounded-3 text-muted">
                            {messege.time} {messege.date}
                        </p>
                    </div>
                </div>
            );
        else
            return (
                <div className="d-flex flex-row justify-content-end mb-4 pt-1">
                    <div>
                        <p
                            class="small p-2 me-3 mb-1 text-white rounded-3 bg-primary"
                            style={{
                                backgroundColor: "#f5f6f7;",
                                fontSize: "20px",
                            }}
                        >
                            <video width={"250px"} height={"150px"} controls>
                                <source
                                    src={messege.context[0]}
                                    type={messege.context[1]}
                                ></source>
                            </video>
                        </p>

                        <p class="small me-3 mb-3 rounded-3 text-muted d-flex justify-content-end">
                            {messege.time} {messege.date}
                        </p>
                    </div>
                </div>
            );
    }
    if (messege.type == "audio") {
        if (messege.sender == "me")
            return (
                <div className="line-in-chat">
                    <div className="msg_box_send">
                        <p
                            class="small p-2 ms-3 mb-1 rounded-3"
                            style={{
                                backgroundColor: "#f5f6f7",
                                fontSize: "20px",
                            }}
                        >
                            <audio
                                className="audio"
                                controls
                                src={messege.context}
                                type="audio/mpeg"
                            ></audio>
                        </p>
                        <p class="small ms-3 mb-3 rounded-3 text-muted">
                            {messege.time} {messege.date}
                        </p>
                    </div>
                </div>
            );
        else
            return (
                <div className="d-flex flex-row justify-content-end mb-4 pt-1">
                    <div>
                        <p
                            class="small p-2 me-3 mb-1 text-white rounded-3 bg-primary"
                            style={{
                                backgroundColor: "#f5f6f7;",
                                fontSize: "20px",
                            }}
                        >
                            <audio
                                className="audio"
                                controls
                                src={messege.context}
                                type="audio/mpeg"
                            ></audio>
                        </p>

                        <p class="small me-3 mb-3 rounded-3 text-muted d-flex justify-content-end">
                            {messege.time} {messege.date}
                        </p>
                    </div>
                </div>
            );
    }
}

export default MessegeBox;
