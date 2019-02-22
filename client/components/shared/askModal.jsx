import React from "react";

const askModal = ({
  children,
  title,
  active,
  mutation,
  handleAskFunction,
  isSubmitting
}) => (
  <div className={`modal ${active ? "is-active" : ""}`}>
    <div className="modal-background" />
    <div className="modal-card">
      <header className="modal-card-head">
        <p className="modal-card-title">{title}</p>
        <button
          type="button"
          className="delete"
          aria-label="close"
          onClick={() => handleAskFunction()}
        />
      </header>

      <section className="modal-card-body">{children}</section>

      <footer className="modal-card-foot">
        <button
          type="button"
          disabled={isSubmitting}
          className={`button is-success ${isSubmitting ? "is-loading" : ""}`}
          onClick={() => mutation()}
        >
          Guardar cambios
        </button>
        <button
          type="button"
          className="button"
          onClick={() => handleAskFunction()}
        >
          Cancel
        </button>
      </footer>
    </div>
  </div>
);

export default askModal;
