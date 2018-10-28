$(function(){
    
    let id = $("article.post").attr("id");

    console.log("sdfdf", id);
    $.get(`/api/post/${id}`, {}, function(result){
        let content = `    
        <div class="post-head">
            <h1 class="post-title"><a href="/post/show?id=${result.data.id}">${result.data.title}</a></h1>
            <div class="post-meta">
                <span class="author">作者：<a href="/author/wangsai/">王赛</a></span> &bull;
                <time class="post-date" datetime="2017年7月13日星期四中午12点12分" title="2017年7月13日星期四中午12点12分">${result.data.date}</time>
            </div>
        </div>
        <div class="post-content">
            ${result.data.content}
        </div>
        <div class="post-permalink">
            <a href="/post/show?id=${result.data.id}" class="btn btn-default">阅读全文</a>
        </div>
    
        <footer class="post-footer clearfix">
            <div class="pull-left tag-list">
                <i class="fa fa-folder-open-o"></i>
                
            </div>
            <div class="pull-right share">
            </div>
        </footer>`;
        console.log(result);

        $("#" + id).html(content);

    });
})