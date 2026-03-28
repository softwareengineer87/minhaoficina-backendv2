import Elysia from "elysia";

export const authMiddleware = new Elysia()
  .group('/dashboard', (app) => app
    .onBeforeHandle(({ headers, set }) => {
      const authCookie = headers.cookie ? headers.cookie.split('=')[1] : null;
      const cookieName = headers.cookie ? headers.cookie.split('=')[0] : null;
      console.log(headers.cookie);
      if (!authCookie) {
        set.status = 401;
        return {
          message: 'Sessao expirada'
        }
      } if (cookieName !== 'oficina-token') {
        set.status = 401;
        return {
          message: 'Sessao expirada'
        }
      }
    },
    )
    .get('/profile', () => 'profile')
    .get('/config', () => 'config')
  )

