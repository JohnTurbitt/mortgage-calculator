import React, { useEffect, useRef } from "react";
import CookieConsent from "react-cookie-consent";

// AdSense Banner Component
const AdBanner = ({ adSlot, style = {} }) => {
  const adRef = useRef(null);

  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  return (
    <div style={{ textAlign: "center", margin: "2rem 0" }}>
      <ins
        className="adsbygoogle"
        style={{ display: "block", ...style }}
        data-ad-client="ca-pub-5228307980468300" // Your AdSense Publisher ID
        data-ad-slot={adSlot} // Replace with your ad slot ID
        data-ad-format="auto"
        data-full-width-responsive="true"
        ref={adRef}
      />
    </div>
  );
};

const Extras = () => {
  return (
    <>
      <CookieConsent
        location="bottom"
        buttonText="Accept"
        cookieName="siteCookiesAccepted"
        style={{ background: "#2B373B" }}
        buttonStyle={{
          color: "#fff",
          background: "#1e3a8a",
          fontSize: "13px",
          borderRadius: "6px",
          padding: "6px 12px",
        }}
        expires={150}
      >
        We use cookies for analytics and ads. By using this site, you agree to
        our cookie policy.
      </CookieConsent>

      <AdBanner
        adSlot="1234567890" // Replace with your actual AdSense ad slot ID
        style={{ width: "100%", maxWidth: "728px", height: "90px" }}
      />

      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <a
          href="https://www.buymeacoffee.com/johnturbitt"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://cdn.buymeacoffee.com/buttons/v2/default-blue.png"
            alt="Buy Me A Coffee"
            style={{ height: "60px" }}
          />
        </a>
      </div>
    </>
  );
};

export default Extras;
