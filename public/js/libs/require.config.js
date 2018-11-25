require.config({
    baseUrl: "/js/libs/", 
    paths: {
        "jquery" : "jquery.min",
        "popper" : "popper.min",
        "bootstrap": "bootstrap.min",
        "bootstrap-table": "bootstrap-table",
        "bootstrap-table-zh-CN": "bootstrap-table-zh-CN",
        "layer": "layer/layer"
    },
    shim: {
        'bootstrap': {
            deps: ['jquery', 'popper'],
            exports: 'bootstrap'
        },
        'bootstrap-table': {
            deps: ['bootstrap'],
            exports: 'bootstrap-table'
        },
        'bootstrap-table-zh-CN': {
            deps: ['bootstrap-table'],
            exports: 'bootstrap-table-zh-CN'
        },
        'layer': {
            deps: ['jquery'],
            exports: 'layer'
        }
    }
})

