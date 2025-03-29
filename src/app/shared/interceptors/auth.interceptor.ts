import { inject } from "@angular/core";
import { HttpContextToken, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { JWTService } from "../services/JWT.service";

export const BYPASS_LOG = new HttpContextToken(() => true);
export function AuthInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const authToken = inject(JWTService).getToken();

  const newReq = req.clone(
    authToken ? {
      setHeaders: {
        Authorization: `Bearer ${authToken}`,
      },
    } : {}
  );
  return next(newReq);
}