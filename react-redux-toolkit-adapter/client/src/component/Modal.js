import './Modal.css';

export function Modal(props) {
    if (!props.show) return null;
    return (
        <div className="modal-overlay">
            <div className="modal">
                <span className="modal-close" onClick={props.onCloseClick}>
                    &times;
                </span>
                {props.children}
            </div>
        </div>
    );
}
