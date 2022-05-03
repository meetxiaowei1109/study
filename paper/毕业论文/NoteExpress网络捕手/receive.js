/**
  *目录结构构建
  */
function getParents(data,currentId){
    var arr = [];
    for( var i = 0; i < data.length; i++ ){
        if( data[i].id == currentId ){
            arr.push(data[i]);
            arr = arr.concat(getParents(data,data[i].pid))
            break;
        }
    }
    return arr;
}
function getLevelById(data,id) {
    return getParents(data,id).length;
}
function getDefault(){
    if ($('.treeNode-cur').length > 1){
        return $('.treeNode-cur')[0].attr('data-file-id');
    }
    else{
        return $('#DirectoryPath').attr('data-file-id');
    }
}
function hasChilds(data,id){
    return getChildById(data,id).length !== 0;
}

function getChildById(arr,pid){
    var newArr = [];
    for( var i = 0; i < arr.length; i++ ){
        if( arr[i].pid == pid ){
            newArr.push(arr[i]);
        }
    };

    return newArr;
}
function treeHtml(fileData, fileId) {
    var _html = '';
    var children = getChildById(fileData, fileId);
    var hideChild = fileId > 0 ? 'none' : '';

    _html += '<ul class="treelist_pNE ' + hideChild + '">';

    children.forEach(function(item, index) {
        var level = getLevelById(fileData, item.id);
        var hasChild = hasChilds(fileData, item.id);
        var className = hasChild ? '' : 'treeNode-empty';
        // var treeRoot_cls = item.id == tools.getDefault() ? 'treeNode-cur' : '';
        var treeRoot_cls = item.id == getDefault() ? 'treeNode-cur' : '';

        _html += `
                <li>
                  <div class="treeNode_pNE ${className} ${treeRoot_cls}" data-file-id="${item.id}">
                    <i class="treeIcon_pNE"></i>
                    <span class="treeTitle_pNE">${item.title}</span>
                  </div>
                  ${treeHtml(fileData, item.id)}
                </li>`;
    });

    _html += '</ul>';

    return _html;
};
// 目录显示控制按钮
function showHidePathContent(){
    if($('.pathContent_pNE').is(':visible')){
        $('.pathContent_pNE').hide();
        $('.rightTriangle_pNE').hide();
        $('.pathTreeShowwBtn_pNE').html('&lt;&nbsp;展开');
    }else{
        $('.pathContent_pNE').show();
        $('.rightTriangle_pNE').show();
        $('.pathTreeShowwBtn_pNE').html('&gt;&nbsp;收起');
    }
}
// 绘制目录树
function createTreeDOM(){
    if($('#pathRoot').attr('pathFull_Str') != 'empty'){
        // 获取路径数据
        var fileData = eval('(' + $('#pathRoot').attr('pathFull_Str') + ')');
        var pathStr = treeHtml(fileData.files,-2);
        // 重置数据库名称
        $('#titleDBName_pNE').html(fileData.dbname[0]);
        $('#pathBlock_pNE').attr('save_data','-31');
        // 构建路径树DOM
        $('.pathContent_pNE').html(pathStr);

        // 对样式进行调整
        for(var i = 0 ; i < $('.treelist_pNE ').length ; i++){
            if(i == 0){
                $('.treelist_pNE ').eq(i).css('marginLeft','0px');
            }
            if($('.treelist_pNE ').eq(i).html() == ''){
                $('.treelist_pNE ').eq(i).prev().find('.treeIcon_pNE').addClass('treeNoChildre_pNE');
            }else{
                $('.treelist_pNE ').eq(i).prev().find('.treeIcon_pNE').addClass('hasChildNode_pNE');
            }
            if($('.treelist_pNE ').eq(i).hasClass('none')){
                $('.treelist_pNE ').eq(i).hide();
            }
        }

        // 目录树事件绑定
        $('.hasChildNode_pNE').on('click',function(){
            if($(this).parent().next().is(':visible')){
                $(this).removeClass('openTree_pNE');
                $(this).parent().next().hide();
            }else{
                $(this).addClass('openTree_pNE');
                $(this).parent().next().show();
            }
        });
        $('.treeTitle_pNE').on('click',function(){
            $('#pathBlock_pNE').attr('save_data',$(this).parent().attr('data-file-id'));
            $('.pathFileName_pNE').text($(this).text());
            showHidePathContent();
        })
    }else{
        $('#pluginDialogOfNE').hide();
        alert('请在NE客户端中打开数据库');
    }
    
}
// 目录显示按钮事件绑定
function pathContentBtnBindEve(){
    $('.pathTreeShowwBtn_pNE').on('click',function(){
        var fileData = eval('(' + $('#pathRoot').attr('pathFull_Str') + ')');
        if($('#titleDBName_pNE').html() != fileData.dbname[0]){
            createTreeDOM();
        }
        showHidePathContent();
    })
}
// 插件接收器
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ?'from a content script:'+sender.tab.url :'from the extension');
        // 检查点击插件是否NE插件
        if (request.pluginClick == 'NEplugin'){
            chrome.runtime.sendMessage({greeting: 'checkNEOpened'}, function(response) {
                if(response.NEIsOpen){
                    // 检查是否有插件弹框
                    if(document.getElementById('pluginDialogOfNE')){
                        var responseData = response.data.split(' = ')[1];
                        $('#pathRoot').attr('pathFull_Str',responseData);
                        // 检查对话框是否显示
                        if( document.getElementById('pluginDialogOfNE').style.display =='block'){
                            document.getElementById('pluginDialogOfNE').style.display = 'none';
                        }else{
                            document.getElementById('pluginDialogOfNE').style.display = 'block';
                        }
                    }else{
                        // 添加样式表
                        var cssFile = document.createElement('link');
                        cssFile.type = 'text/css';
                        cssFile.rel = 'stylesheet';
                        cssFile.href = 'https://qt.inoteexpress.com/static/css/pluginOfNE.css';
                        document.body.appendChild(cssFile);

                        // 添加对插件对话框区域
                        var pluginDialogEle = document.createElement('div');
                        pluginDialogEle.id = 'pluginDialogOfNE';
                        pluginDialogEle.className ='pluginDialogBackBlock';
                        pluginDialogEle.style = 'display:block';
                        var pluginDialogBack = document.createElement('div');
                        pluginDialogBack.id = 'pluginDialogBlock_NE';
                        pluginDialogBack.className = 'pluginDialogBlock';
                        var pluginPathBlock = document.createElement('div');
                        pluginPathBlock.id = 'pathBlock_pNE';
                        pluginPathBlock.className = 'pathBlock_pNE';
                        var pluginSaveBlock = document.createElement('div');
                        pluginSaveBlock.id = 'saveBlock_pNE';
                        pluginSaveBlock.className = 'saveBlock_pNE';
                        var crossUrlBtn = document.createElement('input');
                        crossUrlBtn.id = 'crossUrlBtn_pNE';
                        crossUrlBtn.className = 'crossUrlBtn_pNE';
                        var crossDataBtn = document.createElement('input');
                        crossDataBtn.id = 'crossDataBtn_pNE';
                        crossDataBtn.className = 'crossDataBtn_pNE';

                        pluginDialogBack.appendChild(pluginPathBlock);
                        pluginDialogBack.appendChild(pluginSaveBlock);
                        pluginDialogEle.appendChild(pluginDialogBack);
                        pluginDialogEle.appendChild(crossDataBtn);
                        pluginDialogEle.appendChild(crossUrlBtn);
                        document.body.appendChild(pluginDialogEle);
                        var responseData = response.data.split(' = ')[1];
                        var eachPathNode = document.createElement('input');
                        eachPathNode.type = 'hidden';
                        eachPathNode.className = 'pathConstructEle';
                        eachPathNode.id = 'pathRoot';
                        document.getElementById('pathBlock_pNE').appendChild(eachPathNode);
                        // 设置默认目录树属性
                        console.log('response:'+responseData);
                        if(responseData != undefined){
                            $('#pathRoot').attr('pathFull_Str',responseData);
                        }else{
                            $('#pathRoot').attr('pathFull_Str','empty');
                        }
                        

                        // 创建目录结构
                        var pathTreeHtmlStr = `
                            <div class="titleBlock_pNE">
                                <img src="https://qt.inoteexpress.com/static/images/NE_LOGO.png" class="logoImg_pNE">
                                <span id="titleDBName_pNE"></span>
                                <img src="https://qt.inoteexpress.com/static/images/refresh.png" class="refreshBtn_pNE">
                                <img src="https://qt.inoteexpress.com/static/images/menu.png" class="availableListBtn_pNE">
                                <img src="https://qt.inoteexpress.com/static/images/close.png" class="closeBtn_pNE">
                            </div>
                            <div class="pathCheck_pNE">
                                <span class="pathTreeShowwBtn_pNE">&lt;&nbsp;展开</span>
                                <span class="pathTitleWord_pNE">保存到：</span>
                                <span class="pathFileName_pNE">My Saved References</span>
                            </div>
                            <div class="rightTriangle_pNE"></div>
                            <div class="pathContent_pNE">
                                
                            </div>
                        `;
                        $('#pluginDialogBlock_NE').append(pathTreeHtmlStr);
                        createTreeDOM();

                        // 添加JS库
                        var libFile = document.createElement('script');
                        libFile.type = 'text/javascript';
                        libFile.src = 'https://qt.inoteexpress.com/static/js/NELib.js';
                        document.body.appendChild(libFile);
                        // 绑定展开收起按钮事件
                        $('.pathTreeShowwBtn_pNE').on('click',function(){
                            chrome.runtime.sendMessage({greeting: 'checkNEOpened'}, function(response2) {
                                if(response2.NEIsOpen){
                                    var responseData = response2.data.split(' = ')[1];
                                    if(responseData != undefined){
                                        $('#pathRoot').attr('pathFull_Str',responseData);
                                    }else{
                                        $('#pathRoot').attr('pathFull_Str','empty');
                                    }
                                    createTreeDOM();
                                    showHidePathContent();
                                }else{
                                    if(document.getElementById('pluginDialogOfNE')){
                                        document.getElementById('pluginDialogOfNE').style = 'display:none';
                                    }
                                    location.href='NoteExpress://openNE';
                                }
                            });
                        });

                        // 添加通信元素事件绑定
                        document.getElementById('saveBlock_pNE').addEventListener('click',function(){
                            
                            chrome.runtime.sendMessage({greeting: 'checkNEOpened'}, function(response2) {

                                
                                if(response2.NEIsOpen){
                                    
                                    var saveType = '';
                                    var pdfPath = '';
                                    // 获取数据
                                    if($('.downloadFullEle_pNE[name="downloadFull_pNE"]').length != 0 && $('.downloadFullEle_pNE[name="downloadFull_pNE"]').is(':checked')){
                                        var data = document.getElementById('saveBlock_pNE').getAttribute('save_fulldata');
                                        pdfPath = document.getElementById('saveBlock_pNE').getAttribute('pdfDownloadPath');
                                        saveType = 'saveFullTextToNE';
                                    }else{
                                        var data = document.getElementById('saveBlock_pNE').getAttribute('save_data');
                                        saveType = 'saveToNE';
                                    }
                                    
                                    // 获取路径id
                                    var dirVal = document.getElementById('pathBlock_pNE').getAttribute('save_data');
                                    if(data != 'empty'){
                                        // if(saveType == 'saveFullTextToNE' && pdfPath == null){
                                        //     alert('请将PDF下载路径保存到属性值中');
                                        // }else{
                                            $('#saveBlock_pNE').hide();
                                            $('#saveBlockDisable_pNE').show();
                                            $('#savingWaitBlock_pNE').prev().hide();
                                            $('#savingWaitBlock_pNE').show();
                                            chrome.runtime.sendMessage({greeting: saveType,data:data,targetdir:dirVal,pdfPath:pdfPath}, function(response3) { 
                                                console.log('response3:'+response3);
                                                if(!response3){
                                                    $('#saveBlock_pNE').show();
                                                    $('#saveBlockDisable_pNE').hide();
                                                    $('#savingWaitBlock_pNE').prev().show();
                                                    $('#savingWaitBlock_pNE').hide();
                                                }
                                                switch(response3.requestType){
                                                    // 保存失败
                                                    case '0':
                                                    alert(response3.msg);
                                                    $('#saveBlock_pNE').show();
                                                    $('#saveBlockDisable_pNE').hide();
                                                    $('#savingWaitBlock_pNE').prev().show();
                                                    $('#savingWaitBlock_pNE').hide();
                                                    break;
                                                    // 保存成功
                                                    case '1':
                                                    if($('input[name="selectItem_pNE"]').length != 0){
                                                        $('input[name="selectItem_pNE"]').prop('checked',false);
                                                        $('input[name="selectAll_pNE"]').prop('checked',false);
                                                        $('#saveBlock_pNE').attr('save_data','empty');
                                                    }
                                                    $('#saveBlock_pNE').show();
                                                    $('#saveBlockDisable_pNE').hide();
                                                    $('#savingWaitBlock_pNE').prev().show();
                                                    $('#savingWaitBlock_pNE').hide();
                                                    break;
                                                    default:
                                                    console.log('wrong saving popup receive!');
                                                    $('#saveBlock_pNE').show();
                                                    $('#saveBlockDisable_pNE').hide();
                                                    $('#savingWaitBlock_pNE').prev().show();
                                                    $('#savingWaitBlock_pNE').hide();
                                                }
                                                
                                            });
                                        // }
                                        
                                    }else{
                                        alert('请勾选要保存的记录');
                                    }
                                }else{
                                    if(document.getElementById('pluginDialogOfNE')){
                                        document.getElementById('pluginDialogOfNE').style = 'display:none';
                                    }
                                    location.href='NoteExpress://openNE';
                                }
                            });
                        });
                        
                        // 绑定跨域通道监听
                        $('#crossUrlBtn_pNE').on('click',function(){
                            chrome.runtime.sendMessage({greeting: 'crossUrl',targetUrl:$('#crossUrlBtn_pNE').attr('save_data')}, function(crossUrlRes) {
                                if(crossUrlRes.type == '1'){
                                    $('#crossDataBtn_pNE').attr('save_data',crossUrlRes.data);
                                    $('#crossDataBtn_pNE').click();
                                }else{
                                    $('#crossDataBtn_pNE').attr('save_data','wrongData');
                                    $('#crossDataBtn_pNE').click();
                                }
                            });
                        });
                    }
                    
                }else{
                    if(document.getElementById('pluginDialogOfNE')){
                        document.getElementById('pluginDialogOfNE').style = 'display:none';
                    }
                    location.href='NoteExpress://openNE';
                }
            });
        }
    }
);