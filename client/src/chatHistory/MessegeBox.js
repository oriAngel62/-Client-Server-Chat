import "./MessegeBox.css";

/*
type:
text -0
video -1
image -2
audio -3
*/


function MessegeBox({ messege }) {
    if (messege.Type === "text") {
        if (messege.Sent)
            return (
                <div>
                    <p
                        className="small p-2 ms-3 mb-1 rounded-3"
                        style={{
                            backgroundColor: "#f5f6f7",
                            fontSize: "20px",
                        }}
                    >
                        {messege.Content}
                    </p>

                    <p className="small ms-3 mb-3 rounded-3 text-muted">
                        {messege.Created}
                    </p>
                </div>
            );
        else
            return (
                <div className="d-flex flex-row justify-content-end mb-4 pt-1">
                    <div>
                        <p
                            className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary"
                            style={{
                                backgroundColor: "#f5f6f7",
                                fontSize: "20px",
                            }}
                        >
                            {messege.Content}
                        </p>

                        <p className="small me-3 mb-3 rounded-3 text-muted d-flex justify-content-end">
                            {messege.Created}
                        </p>
                    </div>
                </div>
            );
    }
    else
    return null;
    // if (messege.type == 2) {
    //     if (messege.sender == "me")
    //         return (
    //             <div className="line-in-chat">
    //                 <div className="msg_box_send">
    //                     <p
    //                         className="small p-2 ms-3 mb-1 rounded-3"
    //                         style={{
    //                             backgroundColor: "#f5f6f7",
    //                             fontSize: "20px",
    //                         }}
    //                     >
    //                         <img
    //                             alt="not found"
    //                             width={"200px"}
    //                             src={messege.context}
    //                         ></img>
    //                     </p>
    //                     <p className="small ms-3 mb-3 rounded-3 text-muted">
    //                         {messege.time} {messege.date}
    //                     </p>
    //                 </div>
    //             </div>
    //         );
    //     else
    //         return (
    //             <div className="d-flex flex-row justify-content-end mb-4 pt-1">
    //                 <div>
    //                     <p
    //                         className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary"
    //                         style={{
    //                             backgroundColor: "#f5f6f7",
    //                             fontSize: "20px",
    //                         }}
    //                     >
    //                         <img
    //                             alt="not fount"
    //                             width={"200px"}
    //                             src={messege.context}
    //                         ></img>
    //                     </p>

    //                     <p className="small me-3 mb-3 rounded-3 text-muted d-flex justify-content-end">
    //                         {messege.time} {messege.date}
    //                     </p>
    //                 </div>
    //             </div>
    //         );
    // }
    // if (messege.type == 1) {
    //     if (messege.sender == "me")
    //         return (
    //             <div className="line-in-chat">
    //                 <div className="msg_box_send">
    //                     <p
    //                         className="small p-2 ms-3 mb-1 rounded-3"
    //                         style={{
    //                             backgroundColor: "#f5f6f7",
    //                             fontSize: "20px",
    //                         }}
    //                     >
    //                         <video width={"250px"} height={"150px"} controls>
    //                             <source
    //                                 src={messege.context[0]}
    //                                 type={messege.context[1]}
    //                             ></source>
    //                         </video>
    //                     </p>
    //                     <p className="small ms-3 mb-3 rounded-3 text-muted">
    //                         {messege.time} {messege.date}
    //                     </p>
    //                 </div>
    //             </div>
    //         );
    //     else
    //         return (
    //             <div className="d-flex flex-row justify-content-end mb-4 pt-1">
    //                 <div>
    //                     <p
    //                         className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary"
    //                         style={{
    //                             backgroundColor: "#f5f6f7",
    //                             fontSize: "20px",
    //                         }}
    //                     >
    //                         <video width={"250px"} height={"150px"} controls>
    //                             <source
    //                                 src={messege.context[0]}
    //                                 type={messege.context[1]}
    //                             ></source>
    //                         </video>
    //                     </p>

    //                     <p className="small me-3 mb-3 rounded-3 text-muted d-flex justify-content-end">
    //                         {messege.time} {messege.date}
    //                     </p>
    //                 </div>
    //             </div>
    //         );
    // }
    // if (messege.type == 3) {
    //     if (messege.sender == "me")
    //         return (
    //             <div className="line-in-chat">
    //                 <div className="msg_box_send">
    //                     <p
    //                         className="small p-2 ms-3 mb-1 rounded-3"
    //                         style={{
    //                             backgroundColor: "#f5f6f7",
    //                             fontSize: "20px",
    //                         }}
    //                     >
    //                         <audio
    //                             className="audio"
    //                             controls
    //                             src={messege.context}
    //                             type="audio/mpeg"
    //                         ></audio>
    //                     </p>
    //                     <p className="small ms-3 mb-3 rounded-3 text-muted">
    //                         {messege.time} {messege.date}
    //                     </p>
    //                 </div>
    //             </div>
    //         );
    //     else
    //         return (
    //             <div className="d-flex flex-row justify-content-end mb-4 pt-1">
    //                 <div>
    //                     <p
    //                         className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary"
    //                         style={{
    //                             backgroundColor: "#f5f6f7",
    //                             fontSize: "20px",
    //                         }}
    //                     >
    //                         <audio
    //                             className="audio"
    //                             controls
    //                             src={messege.context}
    //                             type="audio/mpeg"
    //                         ></audio>
    //                     </p>

    //                     <p className="small me-3 mb-3 rounded-3 text-muted d-flex justify-content-end">
    //                         {messege.time} {messege.date}
    //                     </p>
    //                 </div>
    //             </div>
    //         );
    // }
}

export default MessegeBox;
