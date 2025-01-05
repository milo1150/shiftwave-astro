import type { MiddlewareHandler } from 'astro'

export const onRequest: MiddlewareHandler = (context, next) => {
  return next()
}
