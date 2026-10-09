import "server-only"

import { cacheLife, cacheTag } from "next/cache"

import { githubGet, type RepoRef } from "./client"

export type ReleaseAsset = { id: number; name: string; size: number }

export type Release = {
  tag: string
  version: string
  name: string
  notes: string
  prerelease: boolean
  publishedAt: string | null
  url: string
  assets: ReleaseAsset[]
}

export type Milestone = {
  title: string
  description: string
  state: "open" | "closed"
  open: number
  closed: number
  dueOn: string | null
  url: string
}

type GhRelease = {
  tag_name: string
  name: string | null
  body: string | null
  draft: boolean
  prerelease: boolean
  published_at: string | null
  html_url: string
  assets: { id: number; name: string; size: number; state: string }[]
}

type GhMilestone = {
  title: string
  description: string | null
  state: "open" | "closed"
  open_issues: number
  closed_issues: number
  due_on: string | null
  html_url: string
}

type GhUser = {
  login: string
  name: string | null
  bio: string | null
  location: string | null
  avatar_url: string
  html_url: string
}

export type Profile = { login: string; name: string; bio: string | null; location: string | null; avatarUrl: string; url: string }

export const repoTag = (repo: RepoRef) => `github:${repo.owner}/${repo.name}`

/**
 * Published releases, newest first. `null` when GitHub can't be reached (no
 * token, network, rate limit): callers fall back to the content files, and the
 * failure is only cached for minutes so the site recovers on its own.
 */
export async function getReleases(repo: RepoRef): Promise<Release[] | null> {
  "use cache"
  cacheTag(repoTag(repo))
  try {
    const list = await githubGet<GhRelease[]>(`/repos/${repo.owner}/${repo.name}/releases?per_page=20`)
    cacheLife("hours")
    return list
      .filter((r) => !r.draft)
      .map((r) => ({
        tag: r.tag_name,
        version: r.tag_name.replace(/^v/, ""),
        name: r.name || r.tag_name,
        notes: r.body ?? "",
        prerelease: r.prerelease,
        publishedAt: r.published_at,
        url: r.html_url,
        assets: r.assets.filter((a) => a.state === "uploaded").map(({ id, name, size }) => ({ id, name, size })),
      }))
  } catch (error) {
    console.warn(`[github] releases for ${repo.owner}/${repo.name}:`, (error as Error).message)
    cacheLife("minutes")
    return null
  }
}

/** All milestones (open and closed). `null` when GitHub can't be reached. */
export async function getMilestones(repo: RepoRef): Promise<Milestone[] | null> {
  "use cache"
  cacheTag(repoTag(repo))
  try {
    const list = await githubGet<GhMilestone[]>(
      `/repos/${repo.owner}/${repo.name}/milestones?state=all&sort=due_on&direction=asc&per_page=50`
    )
    cacheLife("hours")
    return list.map((m) => ({
      title: m.title,
      description: m.description ?? "",
      state: m.state,
      open: m.open_issues,
      closed: m.closed_issues,
      dueOn: m.due_on,
      url: m.html_url,
    }))
  } catch (error) {
    console.warn(`[github] milestones for ${repo.owner}/${repo.name}:`, (error as Error).message)
    cacheLife("minutes")
    return null
  }
}

/** Public GitHub profile (name, bio, location, avatar). `null` when GitHub can't be reached. */
export async function getProfile(login: string): Promise<Profile | null> {
  "use cache"
  cacheTag(`github:user:${login}`)
  try {
    const u = await githubGet<GhUser>(`/users/${login}`)
    cacheLife("hours")
    return {
      login: u.login,
      name: u.name?.trim() || u.login,
      bio: u.bio?.trim() || null,
      location: u.location?.trim() || null,
      avatarUrl: u.avatar_url,
      url: u.html_url,
    }
  } catch (error) {
    console.warn(`[github] profile ${login}:`, (error as Error).message)
    cacheLife("minutes")
    return null
  }
}
