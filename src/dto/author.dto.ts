import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class AuthorDTO {
  @ApiProperty({
    description: 'Nome do autor do livro',
    example: "Júlio" 
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  readonly name: string;

  @ApiProperty({
    description: 'Sobrenome do autor do livro',
    example: "Verne"
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  readonly surname: string;
}
