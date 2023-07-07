import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";

const CustomModal = (props) => {
  return (
    <Modal show={props.show} onHide={props.onHide} centered>
      {props.header && (
        <Modal.Header closeButton={props.closeButton}>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
      )}
      <Modal.Body>{props.children}</Modal.Body>
      {props.footer && <Modal.Footer></Modal.Footer>}
    </Modal>
  );
};

CustomModal.propTypes = {
  onHide: PropTypes.func,
  show: PropTypes.bool,
  closeButton: PropTypes.bool,
  header: PropTypes.bool,
  footer: PropTypes.bool,
  children: PropTypes.element,
};

export default CustomModal;
