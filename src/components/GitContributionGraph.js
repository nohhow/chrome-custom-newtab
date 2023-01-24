import React, { useState } from "react";

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
    <div className="w-96 p-6 bg-white rounded shadow-sm m-4">
      <div className="flex justify-between mb-2">
        <h1 className="mb-3">Git Contirubtion Graph</h1>
        <button className="p-2 text-white bg-red-200 hover:bg-red-400 shadow-md rounded" onClick={handleDelete}>
          X
        </button>
      </div>
      {gitUserName === "" ? (
        <div>
          <form onSubmit={handleSubmit} className="flex pt-2">
            <input
              type="text"
              name="value"
              className="w-full px-3 py-2 mr-4 text-gray-500 border rounded shadow"
              placeholder="github id를 입력하세요."
              value={value}
              onChange={handleChange}
            />
            <input
              className="p-2 text-blue-400 border-2 border-blue-400 rounded hover:text-white hover:bg-blue-200"
              type="submit"
              value="입력"
            />
          </form>
        </div>
      ) : (
        <div>
        <a href={githubProfileURL}>
        <img src={graphSrc} alt="git-contirbution-graph" />
        </a>
      </div>
      )}
    </div>
  );
}

export default GitContributionGraph;
