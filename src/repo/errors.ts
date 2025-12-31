export class RepoError extends Error {
  constructor(
    message: string,
    public readonly code?: "DUPLICATE" | "NOT_FOUND" | "UNKNOWN"
  ) {
    super(message);
  }
}
