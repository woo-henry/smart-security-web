const proxy_enabled = process.env.NODE_ENV === 'development';

let env : any;
if (proxy_enabled) {
   env = Object.assign({}, env, {
     proxy_enabled,
     api_host: process.env.VUE_APP_API_HOST,
   });
   (window as any).config = env;
} else {
  env = (window as any).config;
}
export default env;
