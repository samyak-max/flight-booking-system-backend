import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { AuthDto } from './dto/auth.dto';
import { SupabaseService } from '../supabase/supabase.service';
import e from 'express';

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
        if (data.user) {
            await this.createUserProfile(data.user.id);
        }

        return {
        user: data.user,
        session: data.session,
        };
    }

    async login(authDto: AuthDto) {
        const { email, password } = authDto;
        const { data, error } = await this.supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) {
            throw new UnauthorizedException('Invalid credentials' + error.message);
        }
        if (data.user) {
            await this.ensureUserProfile(data.user.id);
        }

        return {
            user: data.user,
            session: data.session,
        };
    }

    private async createUserProfile(userId: string): Promise<void> {
        const { error } = await this.supabase
        .from('profiles')
        .insert({ id: userId, preferences: {} });
        
        if (error) {
            console.error('Failed to create user profile:', error);
        }
    }

    private async ensureUserProfile(userId: string): Promise<void> {
        const { data, error } = await this.supabase
        .from('profiles')
        .select('id')
        .eq('id', userId)
        .single();
        
        if (error || !data) {
            await this.createUserProfile(userId);
        }
  }
}
