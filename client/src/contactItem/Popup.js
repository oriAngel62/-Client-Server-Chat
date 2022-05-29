import React, { useState } from "react";
import "./Popup.css";
function Popup({ sendDataToParent, users, contactList, userId }) {
    const [name, setName] = useState("");
    const [nickname, setNickname] = useState("");
    const [server, setServer] = useState("");
    // name nick server
    const [contact, setNewContact] = useState("");
    function handleChangeUserName(event) {
        setName(event.target.value);
    }
    function handleChangeNick(event) {
        setNickname(event.target.value);
    }
    function handleChangeServer(event) {
        setServer(event.target.value);
    }
    return (
        <div>
            <button
                type="button"
                className="btn btn-primary"
                //add -bs
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
            >
                Add new contact
            </button>

            <div
                className="modal fade"
                id="exampleModal"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                Add new contact
                            </h5>
                        </div>
                        <div className="modal-body">
                            <label htmlFor="fname">Username: </label>
                            <input
                                type="text"
                                value={name}
                                onChange={handleChangeUserName}
                            />
                            <br></br>
                            <br></br>
                            <label htmlFor="fname">Nickname: </label>
                            <input
                                type="text"
                                value={nickname}
                                onChange={handleChangeNick}
                            />
                            <br></br>
                            <br></br>
                            <label htmlFor="fname">Server: </label>
                            <input
                                type="text"
                                value={server}
                                onChange={handleChangeServer}
                            />
                        </div>
                        <div className="modal-footer">
                            <div></div>
                            <div>
                                <button
                                    type="button"
                                    className="btn btn-primary btn-lg"
                                    onClick={() => {
                                        var newcontact = {
                                        id: parseInt(Math.random() * 1000),
                                        contactName: userId,
                                        userName: userId,
                                        server: server,
                                        nickName: nickname,
                                        last: null,
                                        lastDate: null
                                        }
                                        console.log(newcontact);
                                        var exist = false;
                                        console.log(JSON.stringify(newcontact))
                                        localStorage.setItem('newContact', JSON.stringify(newcontact))
                                        sendDataToParent();
                                    }}
                                >
                                    Add
                                </button>
                            </div>
                            <button
                                type="button"
                                className="btn btn-secondary btn-lg"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Popup;
