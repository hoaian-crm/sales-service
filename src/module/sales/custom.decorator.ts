import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const DefaultResourceTags = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.params[data];
  },
);
