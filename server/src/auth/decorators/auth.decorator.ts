import { ExecutionContext, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Role } from "@prisma/client";

export const Auth = (role: Role) => UseGuards(AuthGuard("jwt"));

// export const Auth = (role: Role) =>
// 	UseGuards(AuthGuard("jwt"), (_, ctx: ExecutionContext) => {
// 		const request = ctx.switchToHttp().getRequest();
// 		const user = request.user;

// 		return user.role === role || user.role === Role.Admin;
// 	});
