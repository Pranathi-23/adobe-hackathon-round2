import { useEffect, useState } from "react";
import OutlineSidebar from "./components/OutlineSidebar";
import InsightsPanel from "./components/InsightsPanel";
import outlineData from "./data/outline.json";
import insightsData from "./data/insights.json";
import "./App.css";

function App() {
  const [adobeView, setAdobeView] = useState(null);

  useEffect(() => {
    document.addEventListener("adobe_dc_view_sdk.ready", function () {
      const view = new window.AdobeDC.View({
        clientId: "YOUR_ADOBE_CLIENT_ID", // Replace this with your Adobe PDF Embed API key
        divId: "adobe-dc-view",
      });

      setAdobeView(view);

      view.previewFile(
        {
          content: { location: { url: "/sample.pdf" } },
          metaData: { fileName: "sample.pdf" },
        },
        { embedMode: "SIZED_CONTAINER" }
      );
    });
  }, []);

  const jumpToPage = (pageNumber) => {
    if (!adobeView) return;
    adobeView.getAPIs().then((apis) => {
      apis.gotoLocation({ pageNumber });
    });
  };

  return (
    <div className="container">
      <OutlineSidebar outline={outlineData.outline} jumpToPage={jumpToPage} />
      <div id="adobe-dc-view" className="pdf-viewer" />
      <InsightsPanel insights={insightsData} jumpToPage={jumpToPage} />
    </div>
  );
}

export default App;
