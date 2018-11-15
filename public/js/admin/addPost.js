$(function(){
    $("#submit").click(function(e){
        e.preventDefault();
        let data = $("#addPostForm").serialize();

        $.post('/api/post/addPost', data, function(result){
            console.log(result);
            if (result.status == 0) {
                layer.msg(result.message, {icon: 1, time: 5000}, function(){
                    console.log(parent.window.location);
                    let $table = $(parent).find("#postAdminTable");
                    // let index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
                    // parent.layer.close(index); //再执行关闭
                });
                //let index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
                //parent.layer.close(index); //再执行关闭
            }
            else {
                layer.msg(result.message, {icon: 2});
            }
            
        })
    })
});