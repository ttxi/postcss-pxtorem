function ZYIcon({ type, style }) {
  return (
    <svg
      className="icon svg-icon"
      aria-hidden="true"
      style={{
        color: '#d1d5d9',
        height: '15px',
        width: '13px',
        fill: 'currentcolor',
        ...style,
      }}
    >
      <use xlinkHref={`#${type}`} />
    </svg>
  );
}

export { ZYIcon };
