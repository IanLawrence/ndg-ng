window.log=function(){
    log.history=log.history||[];
    log.history.push(arguments);
    if(this.console){
        arguments.callee=arguments.callee.caller;
        var a=[].slice.call(arguments);
        (typeof console.log==="object"?log.apply.call(console.log,console,a):console.log.apply(console,a))
        }
    };
(function(e){
    function h(){}
    for(var g="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,timeStamp,profile,profileEnd,time,timeEnd,trace,warn".split(","),f;f=g.pop();){
        e[f]=e[f]||h
        }
    })((function(){
    try{
        console.log();
        return window.console
        }catch(a){
        return window.console={}
    }
})());
$(document).ready(function(){
    $("#toolsover").hide();
    $("#minimalistover").hide();
    $("#minimalist").mouseover(function(a){
        $("#toolsover").show();
        $("#minimalistover").show()
        });
    $("#minimalist").mouseout(function(a){
        $("#toolsover").hide();
        $("#minimalistover").hide()
        })
    });