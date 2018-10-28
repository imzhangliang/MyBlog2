
function addPost() {
    let postTemplate = `
    <article id="id" class="post">

    <div class="post-head">
        <h1 class="post-title"><a href="/ghost-1-0-rc1/">Ghost 1.0 RC1 发布，可用于生产环境</a></h1>
        <div class="post-meta">
            <span class="author">作者：<a href="/author/wangsai/">王赛</a></span> &bull;
            <time class="post-date" datetime="2017年7月13日星期四中午12点12分" title="2017年7月13日星期四中午12点12分">2017年7月13日</time>
        </div>
    </div>
    <div class="post-content">
        <p>今天，我们正式发布了首个 Ghost 1.0 RC 版本，希望这是到达最终版本的最后一步。你可以通过 Ghost-CLI 安装此最新版本，并且可以使用到 生产环境中！！！如果你需要从 LTS (0.11) 版本迁移到 1.0 版本，请阅读迁移指南。 同时，下面列出从上一个 bet</p>
    </div>
    <div class="post-permalink">
        <a href="/ghost-1-0-rc1/" class="btn btn-default">阅读全文</a>
    </div>

    <footer class="post-footer clearfix">
        <div class="pull-left tag-list">
            <i class="fa fa-folder-open-o"></i>
            
        </div>
        <div class="pull-right share">
        </div>
    </footer>
</article>`;

    $.get("/api/post/1", {}, function(result){
        let $postObj = $(`
        <article id="${result.data.id}" class="post">
    
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
        </footer>
    </article>`);
        console.log(result);

        $(".main-content").prepend($postObj);
    });
    
}

//获取文章分类
function getCates() {
    let cateTemp = 
    $.post('/api/category/categoryList',{}, function(result){
        let html = '';

        for (let i = 0; i < result.data.length; i++) {
            let cate = result.data[i];
            html += `<p><a href="#" title="${cate.name}" target="_blank" onclick="_hmt.push(['_trackEvent', 'big-button', 'click', '问答社区'])"><i class="fa fa-comments"></i> ${cate.name}（${cate.postCount}）</a></p>`
        }

        $("#category .content").html(html);
    })
}

$(function(){
    getCates();
    addPost();
    
})