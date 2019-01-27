import React from "react";

const askModal = ({ children, title, active, mutation, handleAskFunction }) => (
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

      {children}

      <footer className="modal-card-foot">
        <button
          type="button"
          className="button is-success"
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
