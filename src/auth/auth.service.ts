import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { AuthDto } from './dto/auth.dto';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class AuthService {
    private supabase: SupabaseClient;
    constructor(
        private readonly configService: ConfigService,
        private readonly supabaseService: SupabaseService
    ) {
        this.supabase = supabaseService.getClient();
    }   

    async signup(authDto: AuthDto) {
        const { email, password } = authDto;
        const { data, error } = await this.supabase.auth.signUp({
            email,
            password,
        });
        if (error) {
            if (error.message === 'User already registered') {
                throw new BadRequestException('User already exists. Please login.');
            }
            throw new InternalServerErrorException(error.message);
        }
        return data;
    }

    async login(authDto: AuthDto) {
        const { email, password } = authDto;
        const { data, error } = await this.supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) {
            throw error;
        }
        return data;
    }
}
