/*global chrome*/
import React, { useEffect, useState } from "react";

function TopSite() {
  const [sites, setSites] = useState([]);

  useEffect(() => {
    chrome.topSites.get((data) => {
      setSites(data);
    });
  }, []);

  return (
    <div className="w-96 p-6 bg-white rounded shadow-sm m-4">
      <h1 className="mb-3">자주 방문한 사이트</h1>
      {sites.map((data, index) =>(
        <div key={index}>
            <a href={data.url}><span className="highlight">{data.title}</span></a>
        </div>
      ))}
    </div>
  );
}

export default TopSite;
