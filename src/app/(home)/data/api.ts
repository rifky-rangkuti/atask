// octokit lib that recommended by github docs
import { request } from "@octokit/request";

export async function searchUsers(username: string, token?: string) {
  return await request("GET /search/users?q={username}&per_page=5", {
    username,
    headers: {
      authorization: `token ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
}

export async function getUserRepos(username: string, token?: string) {
  return await request("GET /users/{username}/repos", {
    username,
    headers: {
      authorization: `token ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
}
