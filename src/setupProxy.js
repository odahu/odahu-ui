const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(  // kubectl port-forward svc/odahu-flow-api 5000:5000 -n odahu-flow
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:5000',
            changeOrigin: true,
        })
    );
    app.use(  // kubectl port-forward svc/odahu-flow-service-catalog 5001:5000 -n odahu-flow
        '/service-catalog',
        createProxyMiddleware({
            target: 'http://localhost:5001',
            changeOrigin: true,
        })
    );
    // app.use(  // kubectl port-forward svc/istio-ingressgateway 5002:80 -n istio-system
    //     'https://localhost:3000/model',
    //     createProxyMiddleware({
    //         target: 'http://localhost:5002',
    //         changeOrigin: true,
    //     })
    // );
};