import { X } from "lucide-react";
import "./Modal.css";

function Modal({ open, onClose, title, children }) {
  if (!open) return null;

  return (
    <div className="modal">
      <div className="modal__backdrop" onClick={onClose} />
      <div className="modal__panel" role="dialog" aria-modal="true">
        <div className="modal__header">
          <h2>{title}</h2>
          <button type="button" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>
        <div className="modal__body">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
