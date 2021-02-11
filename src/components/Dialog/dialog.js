import { Button } from 'reactstrap';
import './dialog.css';

function Dialog(props) {

    let dialog = (
        <div>
            <div className="dialogDisabler">
            </div>
            <div className="dialogStyles">
                {!props.onLoad ? <button className="dialogCloseButtonStyles" onClick={props.onClose}>x</button> : undefined}
                <div>{props.children}</div>
            </div>
        </div>
    )

    if (!props.isOpen) {
        dialog = null;
    }
    return (
        <div>
            {dialog}
        </div>
    )
}

export default Dialog;