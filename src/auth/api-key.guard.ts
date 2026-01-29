import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly config: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<{ headers: Record<string, any> }>();

    const apiKey = request.headers['x-api-key'] as string | undefined;
    const expected = this.config.get('INTERNAL_API_KEY');

    if (!expected) {
      throw new UnauthorizedException('Server missing INTERNAL_API_KEY');
    }

    if (!apiKey || apiKey !== expected) {
      throw new UnauthorizedException('Invalid API key');
    }

    return true;
  }
}
