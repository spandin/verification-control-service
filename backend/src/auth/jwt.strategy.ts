import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { PrismaService } from 'src/prisma/prisma.service'
import { RequsterTypes } from 'types'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    })
  }

  async validate(payload: { userId: number; email: string }): Promise<RequsterTypes> {
    const user = await this.validateUser(payload.userId)
    if (!user) {
      throw new UnauthorizedException('Unauthorized.')
    }

    return { id: payload.userId, email: payload.email, role: user.role.name }
  }

  private async validateUser(userId: number): Promise<any> {
    return this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, role: { select: { name: true } } },
    })
  }
}
