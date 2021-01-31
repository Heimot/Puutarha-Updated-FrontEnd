import { Button } from 'reactstrap';
import './dialog.css';

function Dialog(props) {

    let dialog = (
        <div>
            <div className="dialogDisabler">
            </div>
            <div className="dialogStyles">
                {!props.onLoad ? <Button className="dialogCloseButtonStyles" onClick={props.onClose}>x</Button> : undefined}
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