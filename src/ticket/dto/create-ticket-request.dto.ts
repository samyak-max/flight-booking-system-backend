import { ApiProperty } from '@nestjs/swagger';

export class CreateTicketsRequestDto {
  @ApiProperty({
    description: 'The booking ID associated with the tickets',
    type: 'string',
    format: 'uuid',
    example: '8a13a377-6131-47e5-8822-13f89e0dd898'
  })
  bookingId: string;

  @ApiProperty({
    description: 'List of passenger IDs for ticket creation',
    type: 'array',
    items: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          format: 'uuid',
          example: '5c13a377-6131-47e5-8822-13f89e0dd456'
        }
      }
    },
    example: [
      { id: '5c13a377-6131-47e5-8822-13f89e0dd456' },
      { id: '9d13a377-6131-47e5-8822-13f89e0dd789' }
    ]
  })
  passengers: { id: string }[];
}
