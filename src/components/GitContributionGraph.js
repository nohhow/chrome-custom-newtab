import React from "react";

function GitContributionGraph() {
  const gitUserName = "nohhow";
  const graphSrc = "https://ghchart.rshah.org/" + gitUserName;
  const githubProfileURL = "https://www.github.com/"+ gitUserName;

  return (
    <div className="w-96 p-6 bg-white rounded shadow-sm m-4">
      <div className="flex justify-between mb-3 items-center">
        <h1>Git Contirubtion Graph</h1>
      </div>
      <div>
        <a href={githubProfileURL}>
        <img src={graphSrc} alt="git-contirbution-graph" />
        </a>
      </div>
    </div>
  );
}

export default GitContributionGraph;
