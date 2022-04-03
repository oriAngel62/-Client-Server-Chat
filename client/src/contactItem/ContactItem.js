function ContactItem({ name, lastMessage, time }) {
    return (
        <div className="col-3">
            <div className="contact">
                <div className="list-group">
                    <a
                        href="#"
                        className="list-group-item list-group-item-action "
                        aria-current="true"
                    >
                        <div className="d-flex w-100 justify-content-between">
                            <img src="ori.jpeg" width="100px"></img>
                            <h5 className="mb-1">{name}</h5>
                            <small>{time}</small>
                        </div>
                        <p className="mb-1">{lastMessage}</p>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default ContactItem;
