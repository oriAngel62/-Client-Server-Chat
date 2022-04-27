import React, { useState } from "react";
function Popup({ sendDataToParent, users, contactList }) {
    const [name, setName] = useState("");
    function handleChange(event) {
        setName(event.target.value);
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
                            <input
                                type="text"
                                value={name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="modal-footer">
                            <div></div>
                            <div>
                                <button
                                    type="button"
                                    className="btn btn-primary btn-lg"
                                    onClick={() => {
                                        var exist = false;
                                        for (let x in users) {
                                            if (users[x].username === name) {
                                                exist = true;
                                            }
                                        }
                                        if (exist == false) {
                                            alert("username is not exist");
                                            return;
                                        }
                                        var exist = false;
                                        for (
                                            var i = 0;
                                            i < contactList.length;
                                            i++
                                        ) {
                                            console.log(contactList[i].name);
                                            if (contactList[i].name === name) {
                                                exist = true;
                                            }
                                        }
                                        if (exist == true) {
                                            alert(
                                                "username is already in contact list"
                                            );
                                            return;
                                        }
                                        sendDataToParent({ name });
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
