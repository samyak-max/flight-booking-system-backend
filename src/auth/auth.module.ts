import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './guards/jwt.auth.guard';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './auth.controller';
import { RolesGuard } from './guards/roles.guard';
import { AuthService } from './auth.service';
import { SupabaseModule } from '../supabase/supabase.module';

@Module({
    imports: [
        PassportModule,
        ConfigModule,
        SupabaseModule,
        JwtModule.registerAsync({
            useFactory: (configService: ConfigService) => {
              return {
                global: true,
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: { expiresIn: 3600 },
              }
            },
            inject: [ConfigService],
          }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtAuthGuard, JwtStrategy, RolesGuard],
    exports: [AuthService, JwtAuthGuard, JwtModule]
})
export class AuthModule {}