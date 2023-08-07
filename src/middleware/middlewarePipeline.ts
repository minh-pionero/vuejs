export default function middlewarePipeline(context: any, middleware: any, index: any) {
  const nextMiddleware = middleware[index]

  if (!nextMiddleware) {
    return context.next
  }

  return (params: any) => {
    if (params) {
      return context.next(params)
    }

    nextMiddleware({
      ...context,
      next: middlewarePipeline(context, middleware, index + 1)
    })
  }
}
