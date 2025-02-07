
const ConcentricCircles = () => {
  return (
    <div className="concentric-circles">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="circle animate-circle-expand"
          style={{
            width: `${(i + 1) * 200}px`,
            height: `${(i + 1) * 200}px`,
            animationDelay: `${i * 0.5}s`,
          }}
        />
      ))}
    </div>
  );
};

export default ConcentricCircles;
