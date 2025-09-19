import React, { useState, useRef } from 'react';

const LogoComponent = () => {
  const [logoSize, setLogoSize] = useState(280);
  const downloadLogoRef = useRef(null); // Create a ref for the SVG element

  const downloadSVG = () => {
    const svgElement = downloadLogoRef.current; // Access the SVG element directly via ref

    if (svgElement instanceof SVGElement) { // Ensure it's an SVG element before serializing
      const serializer = new XMLSerializer();
      const svgData = serializer.serializeToString(svgElement);
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const svgUrl = URL.createObjectURL(svgBlob);
      const downloadLink = document.createElement('a');
      downloadLink.href = svgUrl;
      downloadLink.download = 'kimelia-soft-logo.svg';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(svgUrl); // Clean up the URL object
    } else {
      console.error("Error: SVG element not found or is not a valid SVGElement.", svgElement);
      // Optionally, provide user feedback here
    }
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '40px',
    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
    minHeight: '100vh',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
  };

  const showcaseStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '30px',
    maxWidth: '1200px',
    width: '100%',
    marginTop: '40px'
  };

  const cardStyle = (bg = '#ffffff') => ({
    background: bg,
    padding: '40px',
    borderRadius: '16px',
    boxShadow: '0 8px 32px rgba(10, 22, 40, 0.1)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '200px',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer'
  });

  const titleStyle = {
    color: '#0A1628',
    fontSize: '2.5rem',
    fontWeight: '700',
    marginBottom: '10px',
    textAlign: 'center'
  };

  const subtitleStyle = {
    color: '#475569',
    fontSize: '1.2rem',
    textAlign: 'center',
    marginBottom: '20px'
  };

  const colorInfoStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '15px',
    justifyContent: 'center',
    marginTop: '30px'
  };

  const colorChipStyle = (color) => ({
    background: color,
    width: '60px',
    height: '60px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '0.8rem',
    fontWeight: '600',
    textShadow: '0 1px 2px rgba(0,0,0,0.3)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
  });

  const downloadButtonStyle = {
    background: 'linear-gradient(135deg, #0A1628 0%, #0891B2 100%)',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '20px',
    transition: 'all 0.3s ease'
  };

  const logoStyle = {
    transition: 'all 0.3s ease'
  };

  // Modified KimeliaLogo to accept a ref
  const KimeliaLogo = ({ width = 280, height = 80, showText = true, isWhite = false, svgRef = null }) => {
    const gradientId = isWhite ? 'logoGradientWhite' : 'logoGradient';
    const textColor = isWhite ? 'white' : '#0A1628';

    return (
      <svg ref={svgRef} width={width} height={height} viewBox="0 0 280 80" fill="none" style={logoStyle}>
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0A1628" />
            <stop offset="100%" stopColor="#0891B2" />
          </linearGradient>
          <linearGradient id="logoGradientWhite" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#0891B2" />
          </linearGradient>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="#0A1628" floodOpacity="0.2"/>
          </filter>
        </defs>

        {/* Logo Symbol - Modular K */}
        <g filter={!isWhite ? "url(#shadow)" : undefined}>
          {/* Left part of K */}
          <path
            d="M10 15 L10 45 L20 45 L20 32 L28 40 L32 36 L24 28 L32 20 L28 16 L20 24 L20 15 Z"
            fill={`url(#${gradientId})`}
          />

          {/* Rising blocks - representing growth and innovation */}
          <rect x="35" y="35" width="8" height="10" fill={`url(#${gradientId})`} rx="2" />
          <rect x="45" y="25" width="8" height="20" fill={`url(#${gradientId})`} rx="2" />
          <rect x="55" y="15" width="8" height="30" fill={`url(#${gradientId})`} rx="2" />

          {/* Connection lines - representing integration */}
          <path
            d="M33 30 Q39 28 39 32 Q45 30 45 34 Q55 28 55 32"
            stroke="#0891B2"
            strokeWidth="2"
            fill="none"
            opacity={isWhite ? "0.8" : "0.6"}
          />
        </g>

        {/* Company Name */}
        {showText && (
          <g fill={textColor}>
            <text x="80" y="30" fontSize="24" fontWeight="700" fontFamily="Inter, sans-serif">
              KIMELIA
            </text>
            <text x="80" y="50" fontSize="16" fontWeight="400" fontFamily="Inter, sans-serif" opacity={isWhite ? "0.8" : "0.8"}>
              SOFT
            </text>
          </g>
        )}
      </svg>
    );
  };

  const MonochromeLogo = ({ width = 280, height = 80 }) => (
    <svg width={width} height={height} viewBox="0 0 280 80" fill="none" style={logoStyle}>
      <g>
        <path
          d="M10 15 L10 45 L20 45 L20 32 L28 40 L32 36 L24 28 L32 20 L28 16 L20 24 L20 15 Z"
          fill="#0A1628"
        />
        <rect x="35" y="35" width="8" height="10" fill="#0A1628" rx="2" />
        <rect x="45" y="25" width="8" height="20" fill="#0A1628" rx="2" />
        <rect x="55" y="15" width="8" height="30" fill="#0A1628" rx="2" />
        <path
          d="M33 30 Q39 28 39 32 Q45 30 45 34 Q55 28 55 32"
          stroke="#475569"
          strokeWidth="2"
          fill="none"
          opacity="0.6"
        />
      </g>
      <g fill="#0A1628">
        <text x="80" y="30" fontSize="24" fontWeight="700" fontFamily="Inter, sans-serif">
          KIMELIA
        </text>
        <text x="80" y="50" fontSize="16" fontWeight="400" fontFamily="Inter, sans-serif" opacity="0.7">
          SOFT
        </text>
      </g>
    </svg>
  );

  const handleCardHover = (e) => {
    e.currentTarget.style.transform = 'translateY(-5px)';
    e.currentTarget.style.boxShadow = '0 16px 48px rgba(10, 22, 40, 0.15)';
  };

  const handleCardLeave = (e) => {
    e.currentTarget.style.transform = 'translateY(0px)';
    e.currentTarget.style.boxShadow = '0 8px 32px rgba(10, 22, 40, 0.1)';
  };

  const handleButtonHover = (e) => {
    e.currentTarget.style.transform = 'translateY(-2px)';
    e.currentTarget.style.boxShadow = '0 8px 24px rgba(8, 145, 178, 0.3)';
  };

  const handleButtonLeave = (e) => {
    e.currentTarget.style.transform = 'translateY(0px)';
    e.currentTarget.style.boxShadow = 'none';
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Kimelia Soft - Logo Design</h1>
      <p style={subtitleStyle}>Where Ideas Become Software</p>

      <div style={showcaseStyle}>
        {/* Main Logo on White */}
        <div
          style={cardStyle('#ffffff')}
          onMouseEnter={handleCardHover}
          onMouseLeave={handleCardLeave}
        >
          <KimeliaLogo width={logoSize} height={logoSize * 0.285} />
        </div>

        {/* Logo on Dark Background */}
        <div
          style={cardStyle('#0A1628')}
          onMouseEnter={handleCardHover}
          onMouseLeave={handleCardLeave}
        >
          <KimeliaLogo width={logoSize} height={logoSize * 0.285} isWhite={true} />
        </div>

        {/* Icon Only Version */}
        <div
          style={cardStyle('#f1f5f9')}
          onMouseEnter={handleCardHover}
          onMouseLeave={handleCardLeave}
        >
          <KimeliaLogo width={80} height={60} showText={false} />
        </div>

        {/* Monochrome Version */}
        <div
          style={cardStyle('#e2e8f0')}
          onMouseEnter={handleCardHover}
          onMouseLeave={handleCardLeave}
        >
          <MonochromeLogo width={logoSize} height={logoSize * 0.285} />
        </div>
      </div>

      {/* Color Palette */}
      <div style={colorInfoStyle}>
        <div style={colorChipStyle('#0A1628')}>Deep Blue</div>
        <div style={colorChipStyle('#0891B2')}>Tech Teal</div>
        <div style={colorChipStyle('#059669')}>Success</div>
        <div style={colorChipStyle('#D97706')}>Innovation</div>
        <div style={colorChipStyle('#475569')}>Neutral</div>
      </div>

      {/* Hidden downloadable version - now using ref */}
      <div style={{ display: 'none' }}>
        <KimeliaLogo width={560} height={160} svgRef={downloadLogoRef} />
      </div>

      <button
        style={downloadButtonStyle}
        onClick={downloadSVG}
        onMouseEnter={handleButtonHover}
        onMouseLeave={handleButtonLeave}
      >
        Download Logo as SVG
      </button>

      <div style={{ marginTop: '20px', textAlign: 'center', color: '#475569' }}>
        <p><strong>Logo Features:</strong></p>
        <p>• Modular "K" symbol representing scalable software solutions</p>
        <p>• Rising blocks symbolizing growth and innovation</p>
        <p>• Connection lines showing integration and collaboration</p>
        <p>• Professional typography for enterprise credibility</p>
      </div>
    </div>
  );
};

export default LogoComponent;