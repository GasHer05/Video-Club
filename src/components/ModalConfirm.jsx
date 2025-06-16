import "./ModalConfirm.css";

function ModalConfirm({ open, message, onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <p>{message}</p>
        <div className="modal-actions">
          <button className="modal-btn confirm" onClick={onConfirm}>
            Sí, eliminar
          </button>
          <button className="modal-btn cancel" onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalConfirm;
