
type ReturnInnerFuction = (relativeUrl: string, params?: Record<string, unknown>) => string

export default function urlFactory(baseUrl?: string, baseParams?: Record<string, unknown>): ReturnInnerFuction;
