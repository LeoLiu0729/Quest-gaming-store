document.getElementById('searchBtn').addEventListener('click', fetchRepos);

// Fetch repositories when the page loads
window.onload = () => {
    fetchRepos('LeoLiu0729');
};

async function fetchRepos(username) {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = ''; 

    const user = username || document.getElementById('username').value || 'LeoLiu0729'; // Default username

    try {
        // Fetch the repositories from the GitHub API
        const response = await fetch(`https://api.github.com/users/${user}/repos`);
        const repos = await response.json();

        if (repos.length === 0) {
            gallery.innerHTML = '<p>No repositories found for this user.</p>';
            return;
        }

        // Loop through the repositories and fetch details
        repos.forEach(async repo => {
            const commitCount = await fetchCommits(user, repo.name);
            const languages = await fetchLanguages(user, repo.name);

            gallery.innerHTML += `
                <div class="repo-card">
                    <h2>${repo.name}</h2>
                    <p>${repo.description ? repo.description : 'No description available'}</p>
                    <p><strong>Created:</strong> ${new Date(repo.created_at).toDateString()}</p>
                    <p><strong>Updated:</strong> ${new Date(repo.updated_at).toDateString()}</p>
                    <p><strong>Commits:</strong> ${commitCount}</p>
                    <p><strong>Languages:</strong> ${languages.length > 0 ? languages.join(', ') : 'Not available'}</p>
                    <p><strong>Watchers:</strong> ${repo.watchers_count}</p>
                    <a href="${repo.html_url}" target="_blank">View on GitHub <i class="fab fa-github"></i></a>
                </div>
            `;
        });

    } catch (error) {
        gallery.innerHTML = `<p>Failed to load repositories for user '${user}'. Please try again.</p>`;
        console.error(error); // Log error for debugging purposes
    }
}

// Function to fetch the number of commits for a specific repository
async function fetchCommits(username, repoName) {
    try {
        const response = await fetch(`https://api.github.com/repos/${username}/${repoName}/commits`);
        const commits = await response.json();
        return commits.length; // Return the count of commits
    } catch (error) {
        console.error(`Error fetching commits for ${repoName}:`, error);
        return 'Unavailable'; // Fallback in case of an error
    }
}

// Function to fetch the programming languages for a specific repository
async function fetchLanguages(username, repoName) {
    try {
        const response = await fetch(`https://api.github.com/repos/${username}/${repoName}/languages`);
        const languages = await response.json();
        return Object.keys(languages); // Return an array of language names
    } catch (error) {
        console.error(`Error fetching languages for ${repoName}:`, error);
        return []; // Fallback in case of an error
    }
}
