// Zero Atlas — util 0
export interface Result<T,E=Error> { ok: boolean; value?: T; error?: E; }
export const ok  = <T,>(v:T): Result<T> => ({ ok:true, value:v });
export const err = <E,>(e:E): Result<never,E> => ({ ok:false, error:e });

export async function retry<T>(fn: () => Promise<T>, attempts = 3, delay = 250): Promise<T> {
  let lastErr: unknown;
  for (let i = 0; i < attempts; i++) {
    try { return await fn(); }
    catch (e) { lastErr = e; await new Promise(r => setTimeout(r, delay * (i + 1))); }
  }
  throw lastErr;
}
export function debounce<A extends unknown[]>(fn:(...a:A)=>void, ms=200){
  let t: ReturnType<typeof setTimeout> | null = null;
  return (...a:A) => { if(t) clearTimeout(t); t = setTimeout(()=>fn(...a), ms); };
}