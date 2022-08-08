import React from "react";

function GitContributionGraph() {
  const gitUserName = "nohhow";
  const graphSrc = "https://ghchart.rshah.org/" + gitUserName;

  return (
    <div className="w-96 p-6 bg-white rounded shadow-sm m-4">
      <div className="flex justify-between mb-3 items-center">
        <h1>Git Contirubtion Graph</h1>
      </div>
      <div>
        <img src={graphSrc} alt="git-contirbution-graph" />
      </div>
    </div>
  );
}

export default GitContributionGraph;
