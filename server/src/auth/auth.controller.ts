import { Body, Controller, HttpCode, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto";
import { RefreshTokensDto } from "./dto/refresh-tokens.dto";
import { Auth } from "./decorators/auth.decorator";
import { Role } from "@prisma/client";

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
	@Post("register")
	register(@Body() dto: AuthDto) {
		return this.authService.register(dto);
	}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
	@Post("login")
	login(@Body() dto: AuthDto) {
		return this.authService.login(dto);
	}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
	@Post("new_tokens")
  @Auth()
	getNewTokens(@Body() dto: RefreshTokensDto) {
		return this.authService.getNewTokens(dto.refreshToken);
	}
}
