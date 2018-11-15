$(function(){
    var $table = $('#postAdminTable');

    //增加
    $(".addPost").click(function(){
        layer.open({
            type: 2,
            content: '/admin/addPost',
            title: '添加文章',
            area: ['80%', '80%']
        })
    })

    //删除
    $(".deletePost").click(function(){
        let rows = $table.bootstrapTable("getSelections");
        
        if (rows.length == 0) {
            layer.msg("未选择任何条目", {icon: 0});
        }
        else if (rows.length == 1) {
            let rowsCount = rows.length;

            let titles = '';
            for(let i = 0; i < rows.length; i++) {
                let item = rows[i];
                titles += item.title + '<br>\n';
                if (i >= 3) {
                    titles += '...<br>';
                    break;
                }
            }
            let message = `你准备删除以下条目吗:<br> ${titles}`;

            layer.confirm(message, {icon: 3}, function(){
                $.post(`/api/post/deletePost/${rows[0].id}`, {}, function(data){
                    layer.msg(data.message);
                    refreshTable();
                })
            })
        }
        else {
            layer.msg("不允许选择多条", {icon: 0});
        }
    })


    // 还原某一行成原始状态
    function restoreRow(rowIndex) {
        let rows = $cateAdminTable.bootstrapTable('getData', {useCurrentPage:true});
        console.log('restoring', rows[rowIndex]);
        rows[rowIndex].name = $(rows[rowIndex].name).val() || rows[rowIndex].name;
        rows[rowIndex].op = null;
        $cateAdminTable.bootstrapTable('updateRow', {index:rowIndex, row:rows[rowIndex]});
        if (editRowIndex == rowIndex) {
            editRowIndex = -1;  //当前编辑行也还原
        }
    }

    //rowIndex行进入编辑模式
    function editRow(rowIndex) {
        let rows = $cateAdminTable.bootstrapTable('getData', {useCurrentPage:true});

        if (rowIndex != editRowIndex) {
            if (editRowIndex >= 0 && editRowIndex < rows.length) {
                restoreRow(editRowIndex);
            }

            if (rowIndex >= 0 && rowIndex < rows.length) {
                rows[rowIndex].name = `<input type="text" name="name" value="${rows[rowIndex].name}" />`;
                rows[rowIndex].op = "edit";
                $cateAdminTable.bootstrapTable('updateRow', {index:rowIndex, row:rows[rowIndex]});
    
                editRowIndex = rowIndex;
            }
        }

    }



    //刷新表格
    function refreshTable() {
        $table.bootstrapTable("refresh");
    }
    

    $table.bootstrapTable({
        url: '/api/post/postList',        //ajax数据url
        method: 'POST',
        pagination: true,       //是否分页
        paginationLoop: false,      //分页是否循环，即:最后1页下一页是第1页；第一页上一页是最后1页。
        height: 480,        //列表高度
        striped: true,  //条纹格子
        clickToSelect: true,    //点击行的时候自动选择radio或checkbox
        singleSelect: true,    //不允许多选
        
        queryParams: function (params) { //请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数
            var unionParams = {};
            $.extend(unionParams, params);
            return JSON.stringify(unionParams);
        },
        responseHandler: function (res) {   //将返回的数据做一些处理
            if (res.status == 0) {
                for (let i = res.data.length - 1; i >= 0; i--) {    //删除“未分类”
                    if (!res.data[i].id) {
                        res.data.splice(i, 1);
                    }
                }

                return res.data;
            } else {
                return "{}";
            }

        },
        columns: [
            {
                filed: 'state',
                checkbox: true,
            },
            {
                field: 'id',
                title: 'ID',
                sortable: true,      //添加列排序功能
                cellStyle: function (row, index) {
                    return {
                        classes: '',
                        css: {width: "50px"}
                    };
                },
            },
            {
                field: 'title',
                title: '标题',
                width: '300px',
                formatter: function (value, row, index) {  
                    return value;
                },
                cellStyle: function (row, index) {
                    return {
                        classes: '',
                        css: {}
                    };
                },
                sortable: true
            },
            {
                field: 'createdAt',
                title: '创建时间',
                sortable: true,      
                cellStyle: function (row, index) {
                    return {
                        classes: '',
                        css: {}
                    };
                },
                sortable: true
            },
            {
                field: 'updatedAt',
                title: '更新时间',
                sortable: true,     
                cellStyle: function (row, index) {
                    return {
                        classes: '',
                        css: {}
                    };
                },
                sortable: true
            },
        ],
    });

})