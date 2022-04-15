import "./MessegeBox.css";

function MessegeBox({messege}){
    if(messege.sender=="me")
    return(
        <div className="line-in-chat">
        <div className="msg_box_send">
            {messege.context} 
            <br></br>
            <h6>{messege.time} {messege.date}</h6>
        </div>
        </div>
    );
    else
    return(
        <div className="line-in-chat">
        <div className="msg_box_receive">
            {messege.context}
            <h6>{messege.time} {messege.date}</h6>
        </div>
        </div>
        
    );

}


export default MessegeBox;