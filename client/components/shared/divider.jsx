import React from "react";

const divider = () => (
  <>
    <style jsx>{`
      .divider {
        display: block;
        position: relative;
        border-top: 0.1rem solid #dbdbdb;
        height: 0.1rem;
        margin: 2rem 0;
        text-align: center;
      }
    `}</style>
    <div className="divider" />
  </>
);

export default divider;
