import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const Token = createParamDecorator(
    (data: string, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();
        const tok = request.headers.authorization.split(' ')[1];
        return tok || null;
    },
);