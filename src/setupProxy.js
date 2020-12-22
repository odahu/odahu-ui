const { createProxyMiddleware } = require('http-proxy-middleware');

let apiServerURL = process.env.API_SERVER_URL ?? 'http://localhost:5000'
let serviceCatalogURL = process.env.SERVICE_CATALOG_URL ?? 'http://localhost:5001'
let modelProxyURL = process.env.MODEL_PROXY_URL ?? 'http://localhost:5002'
let token = process.env.AUTHORIZATION_TOKEN ?? ''
let host = process.env.HOST_HEADER ?? 'localhost'


let onProxyReqAuthorizationSetter = (proxyReq, req, res) => {
    proxyReq.setHeader('Authorization', 'Bearer ' + token);
    proxyReq.setHeader('Host', host);
}

console.log(modelProxyURL)
module.exports = function(app) {
    app.use(  // kubectl port-forward svc/odahu-flow-api 5000:5000 -n odahu-flow
        '/api',
        createProxyMiddleware({
            target: apiServerURL,
            changeOrigin: true,
            onProxyReq: onProxyReqAuthorizationSetter,
        })
    );
    app.use(  // kubectl port-forward svc/odahu-flow-service-catalog 5001:5000 -n odahu-flow
        '/service-catalog',
        createProxyMiddleware({
            target: serviceCatalogURL,
            changeOrigin: true,
            onProxyReq: onProxyReqAuthorizationSetter,
        })
    );
    app.use(  // kubectl port-forward svc/istio-ingressgateway 5002:80 -n istio-system
        '/model',
        createProxyMiddleware({
            target: modelProxyURL,
            changeOrigin: true,
            onProxyReq: onProxyReqAuthorizationSetter,
        })
    );
};