import 'server-only';

export function getDocsPassword(): string {
  const v = process.env.DOCS_ADMIN_PASSWORD;
  if (!v) {
    // IMPORTANT: never throw during build. Only check when called at runtime.
    // When running in a serverless function without the var, return a sentinel that fails auth.
    return '__UNSET__';
  }
  return v;
}
