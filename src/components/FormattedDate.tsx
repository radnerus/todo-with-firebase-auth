import React from 'react';

const FormattedDate = ({ timestamp }: { timestamp: string }) => {
  return <span className="date">{new Date(timestamp).toLocaleString()}</span>;
};

export default FormattedDate;
