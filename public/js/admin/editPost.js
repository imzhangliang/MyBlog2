$(function(){
    $("#submit").click(function(e){
        e.preventDefault();
        let data = $("#addPostForm").serialize();

        console.log(data);

        $.post('/api/post/editPost', data, function(result){
            console.log(result);
            if (result.status == 0) {
                parent.layer.msg(result.message, {icon: 1}, function(){
                    console.log(parent.window.location);
                    let $table = $(parent).find("#postAdminTable");
                });
                //刷新表格
                parent.$("#postAdminTable").bootstrapTable("refresh");
                //关闭编辑窗
                let index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
                parent.layer.close(index); //再执行关闭
            }
            else {
                layer.msg(result.message, {icon: 2});
            }
            
        })
    })
});