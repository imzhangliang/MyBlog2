$(function(){
    $("#submit").click(function(){
        let data = $("#addPostForm").serializeArray();
        console.log(data);
        data.push({name:'date', value:'2018-09-11'})
        console.log(JSON.stringify(data))

        $.post('/api/post/addPost', data, function(data){
            console.log(data);
        })
    })
});