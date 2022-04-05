import "./MessegeBox.css";

function MessegeBox({messege}){
    if(messege.sender=="me")
    return(
        <div>
        <div className="msg_box_send">
            {messege.context}
        </div>
        <div className="msg_time_send">
            {messege.time} {messege.date}
        </div>
        </div>
    );
    else
    return(
        <div>
        <div className="msg_box_receive">
            {messege.context}
        </div>
        <div className="msg_time_receive">
            {messege.time} {messege.date}
        </div>
        </div>
    );

}


export default MessegeBox;