"use server";

import { execSync } from "child_process";
import path from "path";

export async function publishToGitHub(): Promise<{ ok: boolean; message: string }> {
  try {
    const cwd = path.resolve(process.cwd());
    execSync('git add -A', { cwd });
    try {
      execSync('git commit -m "Content update via admin"', { cwd });
    } catch {
      // Nothing new to commit — that's fine
    }
    execSync('git push origin main', { cwd });
    return { ok: true, message: "Pushed to GitHub." };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return { ok: false, message: msg };
  }
}
