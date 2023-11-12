const Centered: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  height: "100%",
  width: "100%",
};
export const ThankYouPage: React.FC = () => {
  return (
    <div style={Centered}>
      <div>
        <h1>Thank You</h1>
        <p>Thank you for taking the time and answer this survey.</p>
      </div>
    </div>
  );
};
