import React, { useEffect, useRef, memo } from "react";

function TradingViewWidget() {
  const container = useRef();

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
        {
            "width": "980",
            "height": "610",
          "symbol": "NASDAQ:AAPL",
          "interval": "D",
          "timezone": "Etc/UTC",
          "theme": "light",
          "style": "1",
          "locale": "en",
          "enable_publishing": false,
          "allow_symbol_change": true,
          "support_host": "https://www.tradingview.com"
        }`;
    container.current.appendChild(script);
  }, []);

  return (
    <>
      <div className="p-10 flex items-center justify-center">
        <div
          className="tradingview-widget-container"
          ref={container}
          style={{ height: "100%", width: "100%" }}
        >
          <div
            className="tradingview-widget-container__widget"
            style={{ height: "calc(100% - 32px)", width: "70%" }}
          ></div>
        </div>
      </div>
    </>
  );
}

export default TradingViewWidget;
