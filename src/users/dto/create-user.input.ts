import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'Nome do usuário' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field(() => String, { description: 'Email do usuário' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field(() => String, {
    description: 'Senha do usuário (mínimo 6 caracteres)',
  })
  @MinLength(6)
  phone?: string;
}
