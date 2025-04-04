// eslint-disable-next-line react/prop-types
const ArrowIcon = ({ direction }) => {
  const path =
    direction === "left" ? "M30 36 19 25l11-11" : "M19 36 30 25l-11-11";

  return (
    <svg width="40" height="40" viewBox="0 0 49 50" fill="none">
      <rect x="0.5" y="1" width="48" height="48" rx="11.5" stroke="white" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="currentColor"
        strokeWidth="1.5"
        d={path}
        fill="none"
      />
    </svg>
  );
};

export default ArrowIcon;
