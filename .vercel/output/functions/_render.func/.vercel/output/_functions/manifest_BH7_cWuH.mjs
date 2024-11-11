import 'cookie';
import 'kleur/colors';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_BgUkMjBC.mjs';
import 'es-module-lexer';
import { e as decodeKey } from './chunks/astro/server_BEqEkFUW.mjs';
import 'clsx';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/jt/Downloads/copy-blog-main/","adapterName":"@astrojs/vercel/serverless","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.xXnduSrJ.css"}],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.xXnduSrJ.css"}],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/search.json","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/search\\.json\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"search.json","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/search.json.ts","pathname":"/api/search.json","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.xXnduSrJ.css"}],"routeData":{"route":"/articles/search","isIndex":false,"type":"page","pattern":"^\\/articles\\/search\\/?$","segments":[[{"content":"articles","dynamic":false,"spread":false}],[{"content":"search","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/articles/search.astro","pathname":"/articles/search","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.xXnduSrJ.css"}],"routeData":{"route":"/articles/tag/[...tag]","isIndex":false,"type":"page","pattern":"^\\/articles\\/tag(?:\\/(.*?))?\\/?$","segments":[[{"content":"articles","dynamic":false,"spread":false}],[{"content":"tag","dynamic":false,"spread":false}],[{"content":"...tag","dynamic":true,"spread":true}]],"params":["...tag"],"component":"src/pages/articles/tag/[...tag].astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.xXnduSrJ.css"}],"routeData":{"route":"/articles","isIndex":true,"type":"page","pattern":"^\\/articles\\/?$","segments":[[{"content":"articles","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/articles/index.astro","pathname":"/articles","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.xXnduSrJ.css"},{"type":"inline","content":"p{margin:20px 0}h2{margin:20px 0;font-size:1.8rem}\n"}],"routeData":{"route":"/articles/[...slug]","isIndex":false,"type":"page","pattern":"^\\/articles(?:\\/(.*?))?\\/?$","segments":[[{"content":"articles","dynamic":false,"spread":false}],[{"content":"...slug","dynamic":true,"spread":true}]],"params":["...slug"],"component":"src/pages/articles/[...slug].astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.xXnduSrJ.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["/Users/jt/Downloads/copy-blog-main/src/components/Footer.astro",{"propagation":"in-tree","containsHead":false}],["/Users/jt/Downloads/copy-blog-main/src/layouts/MainLayout.astro",{"propagation":"in-tree","containsHead":false}],["/Users/jt/Downloads/copy-blog-main/src/pages/404.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/404@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["/Users/jt/Downloads/copy-blog-main/src/pages/about.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/about@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/jt/Downloads/copy-blog-main/src/pages/articles/[...slug].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/articles/[...slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/jt/Downloads/copy-blog-main/src/pages/articles/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/articles/index@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/jt/Downloads/copy-blog-main/src/pages/articles/search.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/articles/search@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/jt/Downloads/copy-blog-main/src/pages/articles/tag/[...tag].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/articles/tag/[...tag]@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/jt/Downloads/copy-blog-main/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/jt/Downloads/copy-blog-main/src/pages/api/search.json.ts",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/api/search.json@_@ts",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(o,t)=>{let i=async()=>{await(await o())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:src/pages/api/search.json@_@ts":"pages/api/search.json.astro.mjs","\u0000@astro-page:src/pages/articles/search@_@astro":"pages/articles/search.astro.mjs","\u0000@astro-page:src/pages/articles/tag/[...tag]@_@astro":"pages/articles/tag/_---tag_.astro.mjs","\u0000@astro-page:src/pages/articles/[...slug]@_@astro":"pages/articles/_---slug_.astro.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/404@_@astro":"pages/404.astro.mjs","\u0000@astro-page:src/pages/about@_@astro":"pages/about.astro.mjs","\u0000@astro-page:src/pages/articles/index@_@astro":"pages/articles.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","/Users/jt/Downloads/copy-blog-main/node_modules/astro/dist/env/setup.js":"chunks/astro/env-setup_Cr6XTFvb.mjs","/Users/jt/Downloads/copy-blog-main/src/content/blog/best-algorithmic-trading-software-for-beginners.md?astroContentCollectionEntry=true":"chunks/best-algorithmic-trading-software-for-beginners_qyKlE6Ao.mjs","/Users/jt/Downloads/copy-blog-main/src/content/blog/best-forex-brokers-for-trading-in-2024.md?astroContentCollectionEntry=true":"chunks/best-forex-brokers-for-trading-in-2024_jNpGxEr6.mjs","/Users/jt/Downloads/copy-blog-main/src/content/blog/best-forex-brokers-in-south-africa.md?astroContentCollectionEntry=true":"chunks/best-forex-brokers-in-south-africa_B2fdHp3q.mjs","/Users/jt/Downloads/copy-blog-main/src/content/blog/best-forex-trading-risk-management-strategies-for-beginners.md?astroContentCollectionEntry=true":"chunks/best-forex-trading-risk-management-strategies-for-beginners_BhjNfoiS.mjs","/Users/jt/Downloads/copy-blog-main/src/content/blog/best-forex-trading-strategies.md?astroContentCollectionEntry=true":"chunks/best-forex-trading-strategies_BICYiY-X.mjs","/Users/jt/Downloads/copy-blog-main/src/content/blog/best-laptops-for-developers-in-2024.md?astroContentCollectionEntry=true":"chunks/best-laptops-for-developers-in-2024_C7SGo7dL.mjs","/Users/jt/Downloads/copy-blog-main/src/content/blog/best-laptops-for-forex-traders-in-2024.md?astroContentCollectionEntry=true":"chunks/best-laptops-for-forex-traders-in-2024_v3MRkh0n.mjs","/Users/jt/Downloads/copy-blog-main/src/content/blog/the-best-forex-books-for-beginners.md?astroContentCollectionEntry=true":"chunks/the-best-forex-books-for-beginners_BC-QYD4d.mjs","/Users/jt/Downloads/copy-blog-main/src/content/blog/best-algorithmic-trading-software-for-beginners.md?astroPropagatedAssets":"chunks/best-algorithmic-trading-software-for-beginners_CXX-762e.mjs","/Users/jt/Downloads/copy-blog-main/src/content/blog/best-forex-brokers-for-trading-in-2024.md?astroPropagatedAssets":"chunks/best-forex-brokers-for-trading-in-2024_5TVB3FYv.mjs","/Users/jt/Downloads/copy-blog-main/src/content/blog/best-forex-brokers-in-south-africa.md?astroPropagatedAssets":"chunks/best-forex-brokers-in-south-africa_CAYjkkMW.mjs","/Users/jt/Downloads/copy-blog-main/src/content/blog/best-forex-trading-risk-management-strategies-for-beginners.md?astroPropagatedAssets":"chunks/best-forex-trading-risk-management-strategies-for-beginners_Cw-PkpKE.mjs","/Users/jt/Downloads/copy-blog-main/src/content/blog/best-forex-trading-strategies.md?astroPropagatedAssets":"chunks/best-forex-trading-strategies_D9_PFmm5.mjs","/Users/jt/Downloads/copy-blog-main/src/content/blog/best-laptops-for-developers-in-2024.md?astroPropagatedAssets":"chunks/best-laptops-for-developers-in-2024_mK0p84i0.mjs","/Users/jt/Downloads/copy-blog-main/src/content/blog/best-laptops-for-forex-traders-in-2024.md?astroPropagatedAssets":"chunks/best-laptops-for-forex-traders-in-2024_DxMS64Sk.mjs","/Users/jt/Downloads/copy-blog-main/src/content/blog/the-best-forex-books-for-beginners.md?astroPropagatedAssets":"chunks/the-best-forex-books-for-beginners_DkS-em2Z.mjs","\u0000astro:asset-imports":"chunks/_astro_asset-imports_D9aVaOQr.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_BcEe_9wP.mjs","/Users/jt/Downloads/copy-blog-main/src/content/blog/best-algorithmic-trading-software-for-beginners.md":"chunks/best-algorithmic-trading-software-for-beginners_3I1OLtyl.mjs","/Users/jt/Downloads/copy-blog-main/src/content/blog/best-forex-brokers-for-trading-in-2024.md":"chunks/best-forex-brokers-for-trading-in-2024_E7zF4g8K.mjs","/Users/jt/Downloads/copy-blog-main/src/content/blog/best-forex-brokers-in-south-africa.md":"chunks/best-forex-brokers-in-south-africa_D9D5uddb.mjs","/Users/jt/Downloads/copy-blog-main/src/content/blog/best-forex-trading-risk-management-strategies-for-beginners.md":"chunks/best-forex-trading-risk-management-strategies-for-beginners_DSB0hE68.mjs","/Users/jt/Downloads/copy-blog-main/src/content/blog/best-forex-trading-strategies.md":"chunks/best-forex-trading-strategies_BOGlgWbQ.mjs","/Users/jt/Downloads/copy-blog-main/src/content/blog/best-laptops-for-developers-in-2024.md":"chunks/best-laptops-for-developers-in-2024_Ddht8m7f.mjs","/Users/jt/Downloads/copy-blog-main/src/content/blog/best-laptops-for-forex-traders-in-2024.md":"chunks/best-laptops-for-forex-traders-in-2024_BD4YUV4o.mjs","/Users/jt/Downloads/copy-blog-main/src/content/blog/the-best-forex-books-for-beginners.md":"chunks/the-best-forex-books-for-beginners_CjpT8MtE.mjs","/Users/jt/Downloads/copy-blog-main/node_modules/@astrojs/vercel/dist/image/build-service.js":"chunks/build-service_D34DuGop.mjs","\u0000@astrojs-manifest":"manifest_BH7_cWuH.mjs","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/error-404.Ox42KQdE.png","/_astro/about.C1FZ3Rbp.jpg","/_astro/ffb-white-b-bg-remove.HThfkC4P.png","/_astro/about.xXnduSrJ.css","/favicon.svg","/images/best-algorithmic-trading-software-for-beginners-in-2024-2.jpg","/images/best-algorithmic-trading-software-for-beginners-in-2024.jpg","/images/best-forex-brokers-for-trading-in-2024.jpg","/images/forex-trading-strategies-for-beginners.jpg","/images/image1.png","/images/image2.png","/images/image3.png","/images/image4.png","/images/image5.png","/images/image6.png","/images/image7.png","/images/screen.png","/images/the-best-forex-books-for-beginners.jpg"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"PzFfa6ulg83UJO+AD6pFLIPAmb3ykQVR2dZ1Cc2czOA=","experimentalEnvGetSecretEnabled":false});

export { manifest };
