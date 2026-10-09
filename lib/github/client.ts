import "server-only"

const API = "https://api.github.com"

export type RepoRef = { owner: string; name: string }

export function githubToken(): string | undefined {
  return process.env.GITHUB_TOKEN || undefined
}

function headers(accept = "application/vnd.github+json"): HeadersInit {
  const token = githubToken()
  return {
    Accept: accept,
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "rs-ecosystem-website",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

/**
 * GETs a GitHub REST path; throws on a non-2xx reply. Without a token the
 * request is made anonymously: public repos still work, private ones 404.
 */
export async function githubGet<T>(path: string): Promise<T> {
  const res = await fetch(`${API}${path}`, { headers: headers() })
  if (!res.ok) throw new Error(`GitHub ${path}: ${res.status} ${res.statusText}`)
  return (await res.json()) as T
}

/**
 * Asks GitHub for a release asset's short-lived download URL (it answers the
 * octet-stream request with a redirect to signed storage). The file itself
 * never passes through this server, and the URL carries no token.
 */
export async function signedAssetUrl(repo: RepoRef, assetId: number): Promise<string> {
  const res = await fetch(`${API}/repos/${repo.owner}/${repo.name}/releases/assets/${assetId}`, {
    headers: headers("application/octet-stream"),
    redirect: "manual",
    cache: "no-store",
  })
  const location = res.headers.get("location")
  if (res.status >= 300 && res.status < 400 && location) return location
  throw new Error(`GitHub asset ${assetId}: ${res.status} ${res.statusText}`)
}
