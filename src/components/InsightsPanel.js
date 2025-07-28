import "./Insights.css";
import Modal from "react-modal";
import { useState } from "react";

Modal.setAppElement("#root");

export default function InsightsPanel({ insights, jumpToPage }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [activeInsight, setActiveInsight] = useState(null);

  const openModal = (insight) => {
    setActiveInsight(insight);
    setModalIsOpen(true);
  };

  return (
    <div className="insight-panel">
      <h3>🔍 Key Insights</h3>
      {insights.map((item, i) => (
        <div key={i} className="insight" onClick={() => openModal(item)}>
          <h4>{item.section_title}</h4>
          <p>{item.refined_text.slice(0, 100)}...</p>
          <small>📄 Page {item.page_number}</small>
        </div>
      ))}

      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} className="modal">
        <button onClick={() => setModalIsOpen(false)} className="close-btn">✖</button>
        {activeInsight && (
          <div>
            <h2>{activeInsight.section_title}</h2>
            <p>{activeInsight.refined_text}</p>
            <button onClick={() => {
              jumpToPage(activeInsight.page_number);
              setModalIsOpen(false);
            }}>Go to Page {activeInsight.page_number}</button>
          </div>
        )}
      </Modal>
    </div>
  );
}
