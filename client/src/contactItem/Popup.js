import React, { useState } from "react";
function Popup({ sendDataToParent, users, contactMap }) {
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
                                                sendDataToParent({ name });
                                            }
                                        }
                                        if (exist == false) {
                                            alert("username is not exist");
                                            return;
                                        }
                                        var exist = false;
                                        for (let x in contactMap) {
                                            if (x.name === name) {
                                                exist = true;
                                                sendDataToParent({ name });
                                            }
                                        }
                                        if (exist == false)
                                            alert(
                                                "username is already in contact list"
                                            );
                                        return;
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
