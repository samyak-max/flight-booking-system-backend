import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiOperation({ summary: 'Register a new user' })
    @ApiBody({ type: AuthDto })
    @ApiResponse({ 
        status: 201, 
        description: 'User has been successfully registered',
        schema: {
            type: 'object',
            properties: {
                user: { type: 'object' },
                session: { type: 'object' }
            }
        }
    })
    @ApiResponse({ status: 400, description: 'Bad request - invalid credentials' })
    @Post('signup')
    async signup(@Body() authDto: AuthDto) {
        return this.authService.signup(authDto);
    }

    @ApiOperation({ summary: 'Log in with email and password' })
    @ApiBody({ type: AuthDto })
    @ApiResponse({ 
        status: 200, 
        description: 'User has been successfully authenticated',
        schema: {
            type: 'object',
            properties: {
                user: { type: 'object' },
                session: { type: 'object' }
            }
        }
    })
    @ApiResponse({ status: 401, description: 'Unauthorized - invalid credentials' })
    @Post('login')
    async login(@Body() authDto: AuthDto) {
        return this.authService.login(authDto);
    }
}
