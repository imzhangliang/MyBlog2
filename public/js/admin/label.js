
require(['/js/libs/require.config.js'], function(){
    
    require(['jquery', 'bootstrap','bootstrap-table', 'bootstrap-table-zh-CN', 'layer'], function($){
        layer.config({
            path: '/js/libs/layer/'
          })

        $(function(){
            var $labelAdminTable = $('#labelAdminTable');
            var editRowIndex = -1;  //当前编辑行
        
        
            //新增标签
            $(".addLabel").click(function(){
                let name = $(this).parent().find("input").val();
                
                $.post('/api/label/addLabel', {name}, function(data){
                    if (data.status == 0) {
                        console.log("OK")
                        refreshTable();
                        editRowIndex = -1;
                    } else {
                        console.log("NO");
                        refreshTable();
                        editRowIndex = -1;
                    }
                })
            })
        
        
            // 还原某一行成原始状态
            function restoreRow(rowIndex) {
                let rows = $labelAdminTable.bootstrapTable('getData', {useCurrentPage:true});
                console.log('restoring', rows[rowIndex]);
                rows[rowIndex].name = $(rows[rowIndex].name).val() || rows[rowIndex].name;
                rows[rowIndex].op = null;
                $labelAdminTable.bootstrapTable('updateRow', {index:rowIndex, row:rows[rowIndex]});
                if (editRowIndex == rowIndex) {
                    editRowIndex = -1;  //当前编辑行也还原
                }
            }
        
            //rowIndex行进入编辑模式
            function editRow(rowIndex) {
                let rows = $labelAdminTable.bootstrapTable('getData', {useCurrentPage:true});
        
                if (rowIndex != editRowIndex) {
                    if (editRowIndex >= 0 && editRowIndex < rows.length) {
                        restoreRow(editRowIndex);
                    }
        
                    if (rowIndex >= 0 && rowIndex < rows.length) {
                        rows[rowIndex].name = `<input type="text" name="name" value="${rows[rowIndex].name}" />`;
                        rows[rowIndex].op = "edit";
                        $labelAdminTable.bootstrapTable('updateRow', {index:rowIndex, row:rows[rowIndex]});
            
                        editRowIndex = rowIndex;
                    }
                }
        
            }
        
        
        
            //刷新表格
            function refreshTable() {
                $labelAdminTable.bootstrapTable("refresh");
            }
            
        
            $('#labelAdminTable').bootstrapTable({
                url: '/api/label/labelList',        //ajax数据url
                method: 'POST',
                pagination: true,       //是否分页
                paginationLoop: false,      //分页是否循环，即:最后1页下一页是第1页；第一页上一页是最后1页。
                height: 480,        //列表高度
                striped: true,  //条纹格子
                clickToSelect: true,    //点击行的时候自动选择radio或checkbox
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
                    field: 'id',
                    title: 'ID',
                    sortable: true,      //添加列排序功能
                    width: '100px'
                }, 
                {
                    field: 'name',
                    title: '标签名称',
                    class: 'labelName',
                    width: '300px',
                    formatter: function (value, row, index) {   //自定义表格格式
                        return value;
                        return `<input type="text" name="name" value="${value}" />`;
                        return value;
                    },
                    rowStyle: function (row, index) {
                        return {
                          classes: '',
                          css: {}
                        };
                    },
                    sortable: true
                }, 
                {
                    field: 'op',
                    title: '操作',
                    formatter: function (value, row, index) {   //自定义表格格式
                        if (value == 'edit') {
                            return `<a class="editFinish" href="#"><i class="fa fa-check-square" aria-hidden="true"></i></a> <a class="cancelEdit" href="#"><i class="fa fa-redo-alt" aria-hidden="true"></i></a>`;
                        } else {
                            return `<a class="edit" href="#"><i class="fa fa-edit" aria-hidden="true"></i></a> <a class="delete" href="#"><i class="fa fa-trash-alt" aria-hidden="true"></i></a>`;
                        }
                    },
                    events: {
                        'click .edit': function (e, value, row, index){     //进入编辑模式
                            editRow(index);
                        },
                        'click .editFinish': function(e, value, row, index){    //完成编辑
                            let id = row.id;
                            let name = $(this).parent().parent().find(".labelName input").val();
                            $.post('/api/label/editLabel', {id, name}, function(data){
                                if (data.status == 0) {
                                    console.log("OK")
                                    refreshTable();
                                    editRowIndex = -1;
                                } else {
                                    console.log("NO");
                                    refreshTable();
                                    editRowIndex = -1;
                                }
                            })
                        },
                        'click .cancelEdit': function(e, value, row, index){    //撤销编辑\
                            restoreRow(index);
                        },
                        'click .delete': function(e, value, row, index){    //删除文章分类


                            let message = `你准备删除以下条目吗:<br> ${row.name}`;
            
                            layer.confirm(message, {icon: 3}, function(){

                                $.post(`/api/label/deleteLabel/${row.id}`, {}, function(data){
                                    layer.msg(data.message);
                                    refreshTable();
                                });
                            })

                        }
                    }
                }],
            });
        
        })
    })
})


