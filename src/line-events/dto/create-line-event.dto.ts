// src/line-event/dto/create-line-event.dto.ts

import { IsNotEmpty, IsString, IsEmail, IsEnum } from '@nestjs/class-validator';

export enum EventType {
    Message = 'message',
    Follow = 'follow',
    // Add more event types as needed
}

export class CreateLineEventDto {
    @IsNotEmpty()
    @IsEnum(EventType)
    type: EventType;

    @IsNotEmpty()
    @IsString()
    userId: string;

    @IsEmail()
    email: string; // Added email field
}
