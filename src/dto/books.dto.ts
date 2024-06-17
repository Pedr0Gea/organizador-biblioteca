import {
  ArrayMinSize,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { AuthorDTO } from '../dto/author.dto';
import { afterEach } from 'node:test';
import { ApiProperty } from '@nestjs/swagger';

export class BookDTO {

  @ApiProperty({
    description: 'Nome do livro',
    example: 'Viagem ao centro da Terra'
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  readonly name: string;

  @ApiProperty({
    description: 'Nome do autor do livro',
    example: '[{ "name": "Júlio", "surname": "Verne"  }]'
  })
  @IsNotEmpty()
  @Type(() => AuthorDTO)
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  readonly author: AuthorDTO[];

  @ApiProperty({
    description: 'Linguagem utilizada no livro',
    example: 'Português'
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  readonly language: string;

  @ApiProperty({
    description: 'Ano de lançamento do livro',
    example: '2024'
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly releaseYear: number;

  @ApiProperty({
    description: 'Nome da editora do livro',
    example: 'Ariel'
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  readonly publisher: string;

  @ApiProperty({
    description: 'Número de páginas do livro',
    example: '300'
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly pages: number;
}
