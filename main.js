async function getRepos() {
  const response = await fetch("https://api.github.com/users/Oluwatomiyosilorun/repos");
  const repos = await response.json();
  repos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  const projectList = document.getElementById("project-list");

  const limitedRepos = repos.slice(0, 10);

  limitedRepos.forEach((repo) => {
    const listItem = document.createElement("li");
    listItem.classList.add("project-item");

    const repoLink = document.createElement("a");
    repoLink.href = repo.html_url;
    repoLink.textContent = repo.name;
    repoLink.target = "_blank"; 

    const createdAt = new Date(repo.created_at).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });

    const description = repo.description ? repo.description : "No description";
    listItem.innerHTML = `
      <h4>${repoLink.outerHTML}</h4>
      <p>${description}</p>
      <p>Created on ${createdAt}</p>
    `;

    projectList.appendChild(listItem);
  });
}
