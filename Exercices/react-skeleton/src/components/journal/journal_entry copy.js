import React from "react";

export const JournalEntry = props => {
  return (
    // styling directly without .scss file
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr"
    }}>
      <div>
        <h2>{props.title}</h2>
      </div>
      <div>
        <p>{props.content}</p>
      </div>
    </div>
  );
};