function Dialog(){
    this.createDialog();
    this.bindEvent();
}
Dialog.prototype = {
    defaultConfig: {
        title: '',
        message: '',
        confirmBtn: true,
        closeBtn: false,
        onClose: function(){},
        onConfirm: function(){}
    },
    open: function(obj){
        this.setObj(obj);
        this.setDiago();
        this.showDiago();
    },
    setObj: function(obj){
        if(typeof obj == "string"){
            this.obj = $.extend({}, this.defaultConfig,{message:obj});
        }else if(typeof obj == "object"){
            this.obj = $.extend({},this.defaultConfig,obj);
        }
    },
    setDiago: function(){
        var $dialog = this.$dialog;
        if(!this.obj.title){
            $dialog.find('.modal-title').hide();
        }else{
            $dialog.find("h3").text(this.obj.title);
        }
        if(!this.obj.message){
            $dialog.find(".modal-body").hide();
        }else{
            $dialog.find(".modal-body").html(this.obj.message);
        }
        if(!this.obj.confirmBtn){
            $dialog.find(".confirm.btn").hide();
        }
        if(!this.obj.closeBtn){
            $dialog.find(".cancel.btn").hide();
        }
    },
    createDialog: function(){
        var tpl = '<div class="modalCt" id="modal">'+'<div class="modal-title">'+
                '<h3></h3><a class="close">×</a></div> <div class="modal-body">'+
                '</div><div class="btns"><button class="cancel btn">取消</button>'+
                '<button class="confirm btn">确定</button></div></div></div>';
        this.$dialog = $(tpl);
        $("body").append(this.$dialog)
    },
    bindEvent: function(){
        var self = this;
        this.$dialog.find('.cancel,.close').on('click', function(e){
            // console.log(this);
            e.preventDefault();
            self.obj.onClose();
            self.hideDiago();
        });
        self.$dialog.find(".confirm").on("click",function(e){
             e.preventDefault();
             self.obj.onConfirm();
             self.hideDiago();
         });
        self.$dialog.on('mousedown', function(e) {
            //e.pageX: 鼠标在页面上的绝对位置
            var $dialog = $(this),
                evtX = e.pageX - $dialog.offset().left, //鼠标到dialog左边缘距离，每次点击后，不随鼠标拖动改变
                evtY = e.pageY - $dialog.offset().top;
                console.log($(this).offset());
                console.log(e.pageX,e.pageY);
            $dialog.addClass('draggable').data('evtPos', {
                x: evtX,
                y: evtY
            });
        });
        $('body').on('mousemove', function(e) {
            $('.draggable').length && $('.draggable').offset({
                top: e.pageY - $('.draggable').data('evtPos').y, //计算 dialog 的绝对位置
                left: e.pageX - $('.draggable').data('evtPos').x
            });
        });

        $('body').on('mouseup', function() {
            $('.draggable').length && $('.draggable').removeClass('draggable').removeData('pos');
        })
    },
    showDiago: function(){
        this.$dialog.show();
    },
    hideDiago: function(){
        this.$dialog.hide();
    }
};
$('#modal1').on("click",function(){
    var dialog1 = new Dialog();
    dialog1.open({
        title:'静夜思',
        message: '低头思故乡',
        closeBtn: true,
        onConfirm: function(){
            alert('确定');
        }
    })
});
$('#modal2').on('click', function() {
    var dialog2 = new Dialog();
    dialog2.open('<a href="http://jirengu.com">在线简历</a>');
});

$('#modal3').on('click', function() {
    var dialog3 = new Dialog();
    dialog3.open({
        title: '欢迎来到美丽家园',
        message: 'Welcome',
        confirmBtn: false,
        closeBtn: true,
    });
});

var tpl = '<ul><li>HTML5</li><li>CSS3</li><li>JavaScript</li><li>NodeJS</li></ul>';
$('#modal4').on('click', function() {
    var dialog4 = new Dialog();
    dialog4.open({
        title: '欢迎来到游戏世界',
        message: tpl,
        confirmBtn: true,
        closeBtn: true,
        onClose: function() {
            alert('不学一会儿再走么')
        },
    });
});
$('#modal5').on('click', function() {
    var dialog5 = new Dialog();
    dialog5.open({
        title: '欢迎下次再来',
        message: '真切希望能有一次面试机会',
        confirmBtn: true,
        closeBtn: false,
        onConfirm: function() {
            alert('灰常感谢您，我会努力的！');
        },
        onClose: function() {
            alert('真的不考虑一下麽^_^')
        },
    });
});
