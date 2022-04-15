import "./ChatHistory.css";
import MessegeBox from "./MessegeBox";
import React, {useState, useEffect, useRef}   from 'react';
import AddVidPic from "./AddVidPic";
import "./paperclip.png"


function ChatHistory({ contact }) {
    var listMsg = contact.listMessages;
    console.log(listMsg);
    var [list_of_messeges,set_list_of_messeges] = useState(listMsg);
    const [selectedImage, setSelectedImage] = useState();
      
    var chatList = list_of_messeges.map((messege, key) => {
        return <MessegeBox messege={messege} key={key} />;
    });
    const [input, setInput] = useState('');
    const [showMenu,setShowMenu] = useState(false);
    let menuRef = useRef(); 
    let menuButtonRef = useRef(); 
    useEffect(() => {
        document.addEventListener("mousedown",(event) => {
            if(!menuRef.current.contains(event.target) && !menuButtonRef.current.contains(event.target)){
            setShowMenu(false);
            }
        }

        );
    });
   
    
    return (
        <div className="chatPlace">
             <span className="d-block p-2 bg-primary text-white">
                {contact.name}
            </span>
            <div calssName="chatBox" id="box">
                {chatList}
            </div>
            <div className="bottomPart" >
            <div ref={menuRef}>
               { showMenu?<div class="btn-group" role="group" aria-label="Basic example">
               <button type="button" className="btn btn-secondary"
             data-bs-toggle="modal"
             data-bs-target="#exampleModal1">
            <span>
            <i class="bi bi-file-image"></i>
            </span>
            </button>
            <button type="button" className="btn btn-secondary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal1">
            <span>
            <i class="bi bi-camera-video"></i>
            </span></button>

                        <button type="button" className="btn btn-secondary">
                        <span>
                        <i class="bi bi-voicemail"></i>
                        </span></button>
                        <div
                className="modal fade"
                id="exampleModal1"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <input
                                type="file"
                                name="myImage"
                                onChange={(event) => {
                                    var name = event.target.files[0].name;
                                    if(name.endsWith(".png") || name.endsWith(".gif") || name.endsWith(".jpeg") || name.endsWith(".jpg"))
                                    {
                                  console.log((URL.createObjectURL(event.target.files[0])).split('b:').pop());  //to delete after everything
                                  setSelectedImage((URL.createObjectURL(event.target.files[0])).split('b:').pop());
                                  (
                                    <div>
                                    <img width={"250px"} src={selectedImage} ></img> 
                                    </div>);
                                }}}
                            />
                        </div>
                        <div className="modal-footer">
                            <div>
                            <button
                                type="button"
                                className="btn btn-secondary btn-lg"
                                data-bs-dismiss="modal"
                                onClick={()=>
                                    {if(selectedImage!=null)
                                    {
                                        console.log(typeof selectedImage);
                                    // (
                                    //     <div>
                                    //     <img alt="not fount" width={"250px"} src={selectedImage}> </img> 
                                    //     </div>);
                                        const messege = [{sender: "me",
                                        type: "image",
                                        date: "05/04/2022",
                                        time: "12:54",
                                        context: {selectedImage},
                                        lastContextTime: "10 min ago",},];
                                        var newList = [];
                                        newList= list_of_messeges.concat(messege);
                                        set_list_of_messeges(newList);
                                }setSelectedImage(null);}}
                            >
                                Submit
                            </button>
                            </div>       
                        </div>
                    </div>
                </div>
            </div>
                        </div>:null
                        
                }
            </div>
            <div ref={menuButtonRef} className="attachment">
                <button type="button" className="btn btn-primary" aria-label="glyphicon glyphicon-paperclip"
                onClick={() => {
                    if(showMenu)
                    {setShowMenu(false);}
                    else
                    setShowMenu(true);}}>
                <span className="glyphicon glyphicon-paperclip" aria-hidden="true">
                    <i className="bi bi-paperclip"></i>
                </span>
                </button>
            </div>
            <input type="text" placeholder="Write a new message" id="text"
            value={input} onInput={e => setInput(e.target.value) } ></input>
            <button  onClick={() => {
                const messege = [{sender: "me",
                type: "text",
                date: "05/04/2022",
                time: "12:54",
                context: input,
                lastContextTime: "10 min ago",},];
                var newList = [];
                newList= list_of_messeges.concat(messege);
                set_list_of_messeges(newList);
                const textBox = document.getElementById('text');
                setInput('');
            }}>Send</button>
      </div>
                
            
        </div>
    );
}

export default ChatHistory;
