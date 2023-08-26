import { IsNotEmpty, IsString, IsUrl } from "class-validator";

export class CreatePostDto {

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsUrl()
    @IsNotEmpty()
    text: string;

    @IsUrl()
    image: string;
}
