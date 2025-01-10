import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { IJwtService } from '@/libs/jwt/jwt-service.interface';

@Injectable()
export class JwtService implements IJwtService {
  constructor(private readonly jwtService: NestJwtService) {}

  generateToken(payload: Record<string, unknown>, expiresIn: string) {
    return this.jwtService.sign(payload, { expiresIn });
  }

  verify(token: string) {
    return this.jwtService.verify(token);
  }
}
