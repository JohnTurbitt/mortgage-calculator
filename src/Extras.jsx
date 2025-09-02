import React, { useEffect, useRef } from "react";
import CookieConsent from "react-cookie-consent";

const AdBanner = ({ adSlot, className = "" }) => {
  const adRef = useRef(null);

   useEffect(() => {
    try {
      if (window.adsbygoogle && adRef.current) {
        // Only push if the <ins> hasn’t been used already
        if (!adRef.current.hasAttribute("data-adsbygoogle-status")) {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      }
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  return (
    <div className={`extras__ad-banner ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-5228307980468300"
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
        ref={adRef}
        data-adtest="on"
      />
    </div>
  );
};

const Extras = () => {
  return (
    <div className="extras">
      {/* Cookie Consent */}
      <CookieConsent
        location="bottom"
        buttonText="Accept"
        cookieName="siteCookiesAccepted"
        className="extras__cookie-consent"
        buttonClassName="extras__cookie-consent-button"
        expires={150}
      >
        We use cookies for analytics and ads. By using this site, you agree to
        our cookie policy.
      </CookieConsent>

      {/* Ad Banner */}
      <AdBanner
        adSlot="8556747793" // Replace with actual AdSense ad slot ID
        className="extras__ad-banner--main"
      />

      {/* Buy Me a Coffee */}
      <div className="extras__coffee">
        <a
          href="https://www.buymeacoffee.com/johnturbitt"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://cdn.buymeacoffee.com/buttons/v2/default-blue.png"
            alt="Buy Me A Coffee"
            className="extras__coffee-image"
          />
        </a>
      </div>
    </div>
  );
};

export default Extras;
