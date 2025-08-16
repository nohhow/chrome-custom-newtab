import React, { useState } from "react";
import WidgetWrapper from "./WidgetWrapper";

function GitContributionGraph() {
  const [gitUserName, setGitUserName] = useState(() => {
    const localData = localStorage.getItem("gitUserName");
    const initialData = JSON.parse(localData);
    return initialData ? initialData : "";
  });

  const graphSrc = "https://ghchart.rshah.org/" + gitUserName;
  const githubProfileURL = "https://www.github.com/"+ gitUserName;

  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setGitUserName(value);
    localStorage.setItem("gitUserName", JSON.stringify(value));
  };
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleDelete = () => {
    setGitUserName("");
    setValue("");
    localStorage.removeItem("gitUserName");
  };


  return (
    <WidgetWrapper 
      title="Git 기여 그래프"
      headerActions={
        gitUserName && (
          <button 
            className="
              group px-3 py-1.5 rounded-lg text-sm font-medium
              bg-red-100/50 hover:bg-red-200/50 text-red-700
              transition-all duration-200 ease-out
              hover:scale-105 active:scale-95
            " 
            onClick={handleDelete}
          >
            제거
          </button>
        )
      }
    >
      {gitUserName === "" ? (
        <div className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              name="value"
              className="w-full px-3 py-2 text-gray-700 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 transition-colors duration-200"
              placeholder="GitHub ID를 입력하세요..."
              value={value}
              onChange={handleChange}
            />
            <button
              className="w-full px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors duration-200 font-medium"
              type="submit"
            >
              그래프 로드
            </button>
          </form>
        </div>
      ) : (
        <div className="text-center">
          <a href={githubProfileURL} target="_blank" rel="noopener noreferrer" className="block hover:scale-105 transition-transform duration-300">
            <img 
              src={graphSrc} 
              alt="GitHub 기여 그래프" 
              className="w-full rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            />
          </a>
        </div>
      )}
    </WidgetWrapper>
  );
}

export default GitContributionGraph;
