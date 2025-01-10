export interface IJwtService {
  generateToken(payload: Record<string, unknown>, expiresIn: string): string;
  verify(token: string): Record<string, unknown> | null;
}
