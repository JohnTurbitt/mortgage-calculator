import React, { useEffect } from "react";
import CookieConsent from "react-cookie-consent";

// Placeholder ad component (replace with AdSense or affiliate code)
const AdBanner = () => {
  useEffect(() => {
    // Example for dynamically loading AdSense (optional)
    if (window.adsbygoogle) {
      window.adsbygoogle.push({});
    }
  }, []);

  return (
    <div style={{ width: "100%", textAlign: "center", margin: "2rem 0" }}>
      {/* Replace below div with actual ad code */}
      <div
        style={{
          width: "100%",
          maxWidth: "728px",
          height: "90px",
          background: "#e5e7eb",
          display: "inline-flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "8px",
          color: "#374151",
          fontWeight: "bold",
        }}
      >
        AD PLACEHOLDER
      </div>
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

      {/* Ad Banner */}
      <AdBanner />

      {/* Buy Me a Coffee Button */}
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <a
          href="https://www.buymeacoffee.com/yourusername"
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
