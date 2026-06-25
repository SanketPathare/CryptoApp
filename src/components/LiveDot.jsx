const LiveDot = ({ active = true }) => {
  return (
    <span className={`live-dot ${active ? "active" : "inactive"}`} />
  );
};

export default LiveDot;
