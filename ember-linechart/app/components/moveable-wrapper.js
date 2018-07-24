import Component from '@ember/component';

export default Component.extend({
  // Remember previous coordinates and time.
  max_left: null,
  max_top: null,
  min_left: null,
  min_top: null,
  ypos: null,
  xpos: null,
  height:null,
  width:null,
  itop:null,
  ileft:null,
 
  
  init() {
    
      this._super(...arguments);
     
  } ,
 
  mouseDown(event) {
  
    
  
    var dr = this.$('#moveable-wrapper').addClass("drag").css("cursor","move");
    this.height = dr.outerHeight();
    this.width = dr.outerWidth();
    this.max_left = dr.parent().offset().left + dr.parent().width() - dr.width();
    this.max_top = dr.parent().offset().top + dr.parent().height() - dr.height();
    this.min_left = dr.parent().offset().left;
    this.min_top = dr.parent().offset().top;

    this.ypos = dr.offset().top + this.height - event.pageY,
    this.xpos = dr.offset().left + this.width - event.pageX;

    },
    mouseUp()   {
       var dr=this.$('#moveable-wrapper');
        if(dr.hasClass("drag")&&dr.is(":hover")){
        var elementLastPostion={top:0,left:0,height:0,width:0};
        elementLastPostion.top=this.itop;
        elementLastPostion.left=this.ileft;
        elementLastPostion.height=this.height;
        elementLastPostion.width=this.width;
        localStorage.setItem('elementLastPostion',JSON.stringify(elementLastPostion));  
        }
      this.$('#moveable-wrapper').removeClass("drag");
     
     },
    mouseMove(event) {
      
         this.itop = event.pageY + this.ypos - this.height;
         this.ileft = event.pageX + this.xpos - this.width;
        var dr=  this.$('#moveable-wrapper');
         
        if(dr.hasClass("drag")&&this.$('#moveable-wrapper').is(":hover")){
            if(this.itop <= this.min_top ) { this.itop = this.min_top; }
            if(this.ileft <= this.min_left ) { this.ileft = this.min_left; }
            if(this.itop >= this.max_top ) { this.itop = this.max_top; }
            if(this.ileft >= this.max_left ) { this.ileft = this.max_left; }
            dr.offset({ top: this.itop,left: this.ileft});
  }

},
didInsertElement() {
    this._super(...arguments);
    var  elementLastPostion=JSON.parse(localStorage.getItem('elementLastPostion'));  
    if(elementLastPostion)
    {
        this.$('#moveable-wrapper').css({
            'height':  elementLastPostion.height+'px',
            'width':  elementLastPostion.width+'px',
        })
        this.$('#moveable-wrapper').offset({top:elementLastPostion.top,left:elementLastPostion.left})
    }
}
});
	