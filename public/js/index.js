
//获取文章
function getPosts() {
    let $pages = $("#pages");
    //获取分页信息
    let page = +($("#pages .page-number").data("page"));
    let limit = $("#pages .page-number").data("limit");
    let offset = (page-1)*limit;

    $(".main-content article").remove();

    $.ajax({
            url: "/api/post/postList",
            data:`{"offset": ${offset}, "limit": ${limit}}`,
            contentType : 'application/json',
            type : 'POST',
            success:function(result){
                console.log(result);

                let pageCount = Math.ceil(result.total/limit);
                $("#pages .page-number").data("total", result.total);
                $("#pages .page-number").data("pageCount", pageCount);
                $("#pages .page-number").html(`第 ${page} 页 &frasl; 共 ${pageCount} 页`)

                for (let post of result.data) {
                    let $postObj = $(`
        <article id="${post.id}" class="post">
    
        <div class="post-head">
            <h1 class="post-title"><a href="/post/show?id=${post.id}">${post.title}</a></h1>
            <div class="post-meta">
                <span class="author">作者：<a href="/author/wangsai/">王赛</a></span> &bull;
                <time class="post-date" datetime="2017年7月13日星期四中午12点12分" title="2017年7月13日星期四中午12点12分">${post.date}</time>
            </div>
        </div>
        <div class="post-content">
            ${post.content}
        </div>
        <div class="post-permalink">
            <a href="/post/show?id=${post.id}" class="btn btn-default">阅读全文</a>
        </div>
    
        <footer class="post-footer clearfix">
            <div class="pull-left tag-list">
                <i class="fa fa-folder-open-o"></i>
                
            </div>
            <div class="pull-right share">
            </div>
        </footer>
    </article>`);
                    $postObj.insertBefore(".main-content .pagination");

                    //$(".main-content").append($postObj);
                }
            }
        });
    
}


//获取标签
function getTags() {
    $.post('/api/label/labelList', {}, function(result){
        let html = '';
        for (let i = 0; i < result.data.length; i++) {
            html += `<a href="#">${result.data[i].name}</a>\n`;
        }
        $("#tags .tag-cloud").html(html);
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

function nextPageAction() {
    $("#pages .older-posts").click(function(){
        $pageNumber = $(this).parent().find(".page-number");
        let page = $pageNumber.data("page") + 1;
        console.log(page);
        $pageNumber.data("page", page);
        getPosts();
    })
}

$(function(){
    getCates();
    getPosts();
    getTags();
    nextPageAction();
})