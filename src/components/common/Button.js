import {Button} from "react-bootstrap";
const AppButton = props => {
    return (
        <Button variant="primary" onClick={props.onClick}>{props.children}</Button>
    )
}
export default AppButton;