require(['/js/libs/require.config.js'], function(){
    require(['jquery'], function($){
        $("#menu-toggle").click(function(e) {
            e.preventDefault();
            $("#wrapper").toggleClass("toggled");
        });
    });
});

