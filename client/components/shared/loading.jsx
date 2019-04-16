import React from "react";

const loading = () => (
  <>
    <style jsx>{`
      .loading {
        margin: 40px auto;
        width: auto;
        text-align: center;
      }

      .loading .dot {
        width: 40px;
        height: 40px;
        margin: 0 5px;
        display: inline-block;
        border-radius: 50%;
        animation: blink 1.5s ease-in-out infinite alternate;
      }

      .loading .c1 {
        background: #ff0267;
      }

      .loading .c2 {
        background: #fae603;
        animation-delay: 0.2s;
      }

      .loading .c3 {
        background: #007fff;
        animation-delay: 0.4s;
      }

      @keyframes blink {
        0% {
          transform: scale(1);
          opacity: 1;
        }
        50% {
          transform: scale(0.8);
          opacity: 0;
        }
        100% {
          transform: scale(1);
          opacity: 1;
        }
      }
    `}</style>

    <div className="loading animated bounceIn">
      <div className="dot c1" />
      <div className="dot c2" />
      <div className="dot c3" />
    </div>
  </>
);

export default loading;
