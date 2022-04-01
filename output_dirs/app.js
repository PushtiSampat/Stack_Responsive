var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
window.onresize = () => {
    canvas.resizeCanvas();
    basicoperation();
    //stack.myStack('red');
};
const canvasElement = document.getElementById('canvas');
const canvas = new CanvasComponent(canvasElement);
var ele = document.getElementById("pushbutton");
var ele2 = document.getElementById("popbutton");
var topbtn = document.getElementById("topbutton");
var isemptybtn = document.getElementById("isemptybutton");
var isfullbtn = document.getElementById("isfullbutton");
var restartbtn = document.getElementById("restartbutton");
var nextbtn = document.getElementById("nextbutton");
var stack = new Stack();
var insdiv = document.getElementById("instructions");
// const ctx = canvas.getContext('2d');
const ctx = canvas.getContext();
var arrElmnts = new Array();
var arrNum = new Array();
var popElmnt = new Array();
var Top = -1;
ctx.lineWidth = 5;
ctx.strokeStyle = 'orange';
let temp, flag = 0;
for (let p = 0; p < 10; p++) {
    flag = 0;
    while (flag != 1) {
        temp = Math.floor((Math.random() * 99) + 1);
        if (arrNum.indexOf(temp) == -1) {
            arrNum[p] = temp;
            flag = 1;
        }
    }
}
var elementWidth;
var elementHight;
var arrayStartX;
var arrayStartY;
function writeInstructionsStack(string, highlight) {
    insdiv.innerHTML = string;
    if (highlight) {
        insdiv.style.color = "#000dff";
    }
    else {
        insdiv.style.color = "black";
    }
}
let limit = 10;
function myArray(count) {
    arrayStartX = Math.floor(canvas.width() * 0.1);
    // console.warn(canvas.width());
    arrayStartY = Math.floor(120);
    let i;
    // console.warn(arrayStartX+" =====")
    let arrayXIndex = arrayStartX;
    elementWidth = Math.floor(stack.width * 0.85);
    elementHight = Math.floor(stack.height / 4.5);
    ctx.font = "15px Georgia";
    // ctx.clearRect(100,120,300,40);
    if (canvas.width() < 449)
        limit = 5;
    else if (canvas.width() < 550)
        limit = 6;
    else if (canvas.width() < 650)
        limit = 7;
    else if (canvas.width() < 750)
        limit = 8;
    else if (canvas.width() < 850)
        limit = 9;
    for (i = 0; i < limit; i++) {
        arrElmnts[i] = new element(ctx, canvas, arrayXIndex, arrayStartY, elementWidth, elementHight, arrNum[i]);
        arrElmnts[i].drawArrayElement();
        if (count == undefined || count < i) {
            arrElmnts[i].writeData();
        }
        arrayXIndex += elementWidth;
    }
}
function demoRestart() {
    ctx.clearRect(1, 0, canvas.width(), canvas.height());
    stack.myStack('red');
    poppedElements();
    ctx.font = "30px Georgia";
    //  observation()
    ctx.fillText("Click on the Push Button", 320, 60);
    ctx.fillText("to Insert an Element in Stack", 300, 80);
    myArray();
    topValueIndex();
    ele.disabled = false;
    topbtn.disabled = false;
    isemptybtn.disabled = false;
    isfullbtn.disabled = false;
    restartbtn.disabled = false;
    nextbtn.disabled = true;
    ele2.disabled = false;
    height = 30;
    Top = -1;
    stckElmnt = [];
    stp = 390;
    cnt = -1;
    ele.disabled = false;
}
function demoIsEmpty() {
    stopBlinkStack();
    ctx.clearRect(635, 250, canvas.width(), 120);
    ctx.clearRect(100, 0, 740, 115);
    /* ctx.fillStyle = "rgba(0,0,0,0.1)";
    ctx.fillRect(240, 25, 510, 80); */
    // ctx.fillRect(900,80,150,70)
    /* Top==-1?ctx.fillText("Top Index is -1",340,50):ctx.fillText("Top Index is not -1",340,50)
     Top==-1?ctx.fillText("So Stack is Empty",330,80):ctx.fillText("So Stack is not Empty",330,80)*/
    //  observation();
    ctx.font = "15px Georgia";
    ctx.fillStyle = "#000dff";
    //ctx.fillText("isEmpty returns True if stack is empty else False.",250,40)
    instruction = "isEmpty returns True if stack is empty else False.<br>" +
        "If stack is empty then top index will -1.<br>" +
        "Current Top index:" + Top + ",so stack is not empty.<br>";
    if (Top > -1) {
        ctx.lineWidth = 5;
        ctx.strokeStyle = 'purple';
        ctx.strokeRect(stckElmnt[Top].X - 90, stckElmnt[Top].Y, stckElmnt[Top].width * 6, stckElmnt[Top].height);
        /*  ctx.fillText("If stack is empty then top index is -1.",250,60)
         ctx.fillText("Current Top index:"+Top+",so stack is not empty.",250,80);
         ctx.fillText("isEmpty:False",250,100) */
        instruction += "isEmpty:False.";
    }
    else if (Top == -1) {
        ///observation();
        ctx.font = "15px Georgia";
        ctx.fillStyle = "#000dff";
        //ctx.fillText("isEmpty returns True if stack is empty else False.",250,30)
        /* ctx.fillText("If stack is empty then top index will be -1.",250,60)
        ctx.fillText("Current Top index:"+Top+",so stack is empty.",250,80);
        ctx.fillText("isEmpty:True",250,100); */
        instruction += "isEmpty:True.";
        blinkStack();
    }
    writeInstructionsStack(instruction, true);
    ctx.fillStyle = "black";
}
function demoIsFull() {
    stopBlinkStack();
    ctx.clearRect(635, 250, canvas.width(), 120);
    ctx.clearRect(100, 0, 740, 115);
    //ctx.fillStyle = "rgba(0,0,0,0.1)";
    // ctx.fillRect(240, 25, 510, 80);
    // observation();
    /*  ctx.font="15px Georgia";
     ctx.fillStyle = "#000dff";
     ctx.fillText("isFull returns True if stack is full else False.",250,40) */
    instruction = "isFull returns True if stack is full else False.<br>";
    if (Top >= 0 && Top <= 3) {
        ctx.lineWidth = 5;
        ctx.strokeStyle = 'purple';
        if (Top != 3) {
            ctx.strokeRect(stckElmnt[Top].X - 90, stckElmnt[Top].Y, stckElmnt[Top].width * 6, stckElmnt[Top].height);
        }
        //ctx.strokeRect(stckElmnt[Top].X-90,stckElmnt[Top].Y,stckElmnt[Top].width+260,stckElmnt[Top].height);
        else if (Top == 3)
            blinkStack();
        ctx.font = "15px Georgia";
        // ctx.fillText("Here stack will be full when Top Index will be 3.",250,60);
        //ctx.fillText("Current Top Index is "+Top+".So",250,80)   
        instruction += "Here stack will be full when Top Index will be 3.<br>" +
            "Current Top Index is " + Top + ".So<br>";
    }
    else if (Top == -1) {
        /*  ctx.fillText("Here stack will be full when Top Index will be 3.",250,60);
         ctx.fillText("Current Top Index is "+Top+". So",250,80) */
        // blinkStack();
        instruction += "Here stack will be full when Top Index will be 3.<br>" +
            "Current Top Index is " + Top + ".So<br>";
    }
    ctx.font = "15px Georgia";
    ctx.fillStyle = "#000dff";
    Top == 3 ? instruction += "isFull:True" : instruction += "isFull:False";
    writeInstructionsStack(instruction, true);
    ctx.fillStyle = "black";
}
function demoTop() {
    //   ctx.fillStyle = "rgba(0,0,0,0.1)";
    //  ctx.fillRect(900,80,150,70)
    stopBlinkStack();
    ctx.clearRect(635, 250, canvas.width(), 120);
    ctx.clearRect(100, 0, 740, 115);
    // observation();
    /*  ctx.font="15px Georgia";
     ctx.fillStyle = "#000dff";
     ctx.fillText("Top operation allows to see Top of Stack.",250,40)
     ctx.fillStyle = "rgba(0,0,0,0.1)";
     ctx.fillRect(240, 25, 510, 80);
     ctx.fillStyle = "#000dff"; */
    instruction = "Top operation allows to see Top of Stack.<br>";
    if (Top > -1) {
        ctx.strokeStyle = 'purple';
        ctx.lineWidth = 5;
        ctx.strokeRect(stckElmnt[Top].X - 90, stckElmnt[Top].Y, stckElmnt[Top].width * 6, stckElmnt[Top].height); //ctx.fillText("Current Top index:"+Top+".",250,60)
        //ctx.fillText("Current Top index element:"+stckElmnt[Top].data+".",250,80);
        instruction += "Current Top index:" + Top + ".<br>" +
            "Current Top index element:" + stckElmnt[Top].data + ".<br>";
    }
    else {
        // ctx.fillText("Stack is Empty.",250,60)
        // ctx.fillText("So current Top index:"+Top+".",250,80);
        instruction += "Stack is Empty.<br>" +
            "So current Top index:" + Top + ".";
        blinkStack();
    }
    writeInstructionsStack(instruction, true);
    ctx.fillStyle = "black";
}
let popArrIndex = -1;
let gap = 90;
function singleElementDeleteStack(stckElmnt, cnt) {
    return __awaiter(this, void 0, void 0, function* () {
        var myreq;
        let popvalue;
        // console.warn("333");
        // await delayAnimation();
        stckElmnt[Top].drawStackElement();
        // await delayAnimation();
        // console.warn("555");
        stckElmnt[Top].writeData();
        // console.warn("444");
        stack.myStack('red');
        //  console.log("== "+ stckElmnt[Top].Y);
        /* for(let i=0;i<=popArrIndex;i++){
            popElmnt[i].drawPrevElementStack()
            popElmnt[i].writeData()
        } */
        for (let i = Top; i >= 0; i--) {
            stckElmnt[i].drawPrevElementStack();
            stckElmnt[i].writeData();
        }
        if ((stckElmnt[Top].X == Math.floor(canvas.width() * 0.70)) || stckElmnt[Top].X == Math.floor(canvas.width() * 0.70 + 1) && stckElmnt[Top].Y >= 184) {
            //  console.log("1");
            stckElmnt[Top].incrementY(2);
        }
        else if (stckElmnt[Top].Y > 184) {
            // console.log("2");
            stckElmnt[Top].decrementY(2);
        }
        else if (stckElmnt[Top].X < Math.floor(canvas.width() * 0.70)) {
            //  console.log("3 ");
            stckElmnt[Top].incrementX(2);
        }
        if ((stckElmnt[Top].X == Math.floor(canvas.width() * 0.70) || stckElmnt[Top].X == Math.floor(canvas.width() * 0.70) + 1) && stckElmnt[Top].Y == 330) {
            //  console.log("4");
            popElmnt[++popArrIndex] = new element(ctx, canvas, gap, canvas.height() * 0.88, 50, 30, stckElmnt[Top].data);
            if (canvas.width() > 550)
                gap += 80;
            else
                gap += 50;
            popvalue = stckElmnt[Top].data;
            Top--;
            if (Top > -1) {
                // console.warn("5");
                // ctx.clearRect(100,0,740,115);
                //   observation();
                ctx.font = "13px Georgia";
                /*  ctx.fillStyle = "rgba(0,0,0,0.1)";
                 ctx.fillRect(240, 25, 450, 80);
                 ctx.fillStyle = "#000dff";
                 ctx.fillText("After popping element from Stack,Top index will be decreased by 1.",250,50) */
                //  ctx.fillText("Top index will be decreased by 1.",250,60);
                /*  ctx.fillText("Current Top index:"+Top,250,70)
                 ctx.fillText("Current Top index element:"+stckElmnt[Top].data,250,90); */
                instruction = "After popping element from Stack,Top index will be decreased by 1.<br>" +
                    "Top index will be decreased by 1.<br>" +
                    "Current Top index element:" + stckElmnt[Top].data + ".";
                writeInstructionsStack(instruction, true);
                canvas_arrow(ctx, 522, stckElmnt[Top].Y + (30 / 2), 600, stckElmnt[Top].Y + (30 / 2));
                ctx.stroke();
                ctx.font = "15px Georgia";
                ctx.fillStyle = "black";
                ctx.fillText("Top", 605, stckElmnt[Top].Y + (30 / 2) + 5);
                // ctx.fillText("Popped Element",720,310);   
            }
            else {
                //  console.warn("6");
                // ctx.clearRect(100,0,740,115);
                //observation();
                //  ctx.font="13px Georgia";
                // ctx.fillStyle = "rgba(0,0,0,0.1)";
                // ctx.fillRect(240, 25, 450, 80);
                // ctx.fillStyle = "#000dff";
                //ctx.fillText("After popping element from Stack,Top index will be decreased by 1.",250,50)
                // ctx.fillText("Top index will be decreased by 1",250,60);
                //ctx.fillText("Current Top index:"+Top+".",250,70)
                //  ctx.fillText("Stack is Empty.",250,90)
                instruction = "After popping element from Stack,Top index will be decreased by 1.<br>" +
                    "Current Top index:" + Top + ".<br>" +
                    "Stack is Empty.";
                writeInstructionsStack(instruction, true);
            }
            ele2.disabled = false;
            topbtn.disabled = false;
            ele.disabled = false;
            isemptybtn.disabled = false;
            isfullbtn.disabled = false;
            topValueIndex();
            /*  for(let i=0;i<=popArrIndex;i++){
                 popElmnt[i].drawPrevElementStack()
                 popElmnt[i].writeData()
             } */
            ctx.font = "13px Georgia";
            ctx.fillText("Popped Element", canvas.width() * 0.7, 310);
            return;
        }
        myreq = window.requestAnimationFrame(() => { this.singleElementDeleteStack(stckElmnt, cnt); });
    });
}
function demoPop() {
    return __awaiter(this, void 0, void 0, function* () {
        stopBlinkStack();
        ctx.fillStyle = "black";
        ele2.disabled = true;
        ele.disabled = true;
        topbtn.disabled = true;
        isemptybtn.disabled = true;
        isfullbtn.disabled = true;
        // console.log("1");
        ctx.clearRect(arrayStartX, arrayStartY + elementHight, canvas.width(), canvas.height());
        /*  ctx.font="bold 15px Georgia";
         ctx.fillText("Stack",463,375)
         
         ctx.font="bold 15px Georgia";
         ctx.fillText("Stack",463,375) */
        stack.myStack('red');
        for (let i = Top; i >= 0; i--) {
            stckElmnt[i].drawPrevElementStack();
            stckElmnt[i].writeData();
        }
        if (Top == -1) {
            //ctx.clearRect(100,0,740,115);
            //  observation();
            /*  ctx.fillStyle = "rgba(0,0,0,0.1)";
             ctx.fillRect(240, 25, 550, 80);
             ctx.fillStyle = "#000dff";
             ctx.fillText("Current Top index is "+Top+".So Stack is Empty.",250,40);
             ctx.fillText("When a stack is empty(TOP = -1) and an element is tried to popped",250,60)
             ctx.fillText("from stack is called Stack underflow.",250,80);
             ctx.fillStyle = "#150485";
             ctx.font="bold 13px Georgia";
             ctx.fillText("Push an element in stack to pop an element from Stack.",250,100) */
            instruction = "Current Top index is " + Top + ".So Stack is Empty.<br/>" +
                "When a stack is empty(TOP = -1) and an element is tried to popped <br/>" +
                "from stack is called Stack underflow.<br>" +
                "Push an element in stack to pop an element from Stack.";
            writeInstructionsStack(instruction, true);
            blinkStack();
            ctx.fillStyle = "black";
            ele2.disabled = false;
            ele.disabled = false;
            topbtn.disabled = false;
            isemptybtn.disabled = false;
            isfullbtn.disabled = false;
            return;
        }
        //canvas_arrow(ctx,522,stckElmnt[Top].Y+(30/2),600,stckElmnt[Top].Y+(30/2));
        canvas_arrow(ctx, 522, stckElmnt[Top].Y + (30 / 2), 600, stckElmnt[Top].Y + (30 / 2));
        ctx.stroke();
        ctx.font = "15px Georgia";
        ctx.fillText("Top", 605, stckElmnt[Top].Y + (30 / 2) + 5);
        //canvas_arrow(ctx,stack.rightX+5,stp+(30/2),stack.rightX+78,stp+(30/2));
        // canvas_arrow1(ctx,stack.rightX+5,stp+(30/2),stack.rightX+78,stp+(30/2));
        /*   ctx.stroke();
          ctx.font="15px Georgia";
          ctx.fillText("Top",stack.rightX+80,stckElmnt[Top].Y+(30/2)+5);  */
        //ctx.clearRect(250,0,350,93);
        // ctx.clearRect(100,0,740,115);
        // observation();
        // ctx.fillStyle = "rgba(0,0,0,0.1)";
        //  ctx.fillRect(240, 25, 450, 80);
        // ctx.fillStyle = "#000dff";
        //  ctx.fillText("Current Top index is "+Top+" which will be used for Pop.",270,50); 
        //  ctx.fillText("So index "+(Top)+" value will be popped from stack",270,70); 
        instruction = "Current Top index is " + Top + " which will be used for Pop. <br/>" +
            "So index " + (Top) + " value will be popped from stack <br/>";
        writeInstructionsStack(instruction, true);
        yield delayAnimation();
        //console.log("222");
        // await delayAnimation();
        ctx.fillStyle = "black";
        // ctx.clearRect(100,0,740,115);
        // observation();
        //  ctx.fillText("Current Top index is "+Top+" which will be used for Pop.",270,50); 
        //  ctx.fillText("So index "+(Top)+" value will be popped from stack",270,70); 
        writeInstructionsStack(instruction);
        singleElementDeleteStack(stckElmnt, cnt);
    });
}
let height = 30;
function singleElementInsertStack(stckElmnt, stp, cnt) {
    let leftxfloor = Math.floor(stack.leftX) + Math.floor(stack.width * 0.10);
    // leftxfloor%2==0?leftxfloor+=6:leftxfloor+=7
    let stop = stp;
    var myreq;
    stckElmnt[Top].drawStackElement();
    stckElmnt[Top].writeData();
    // ctx.clearRect(stckElmnt[Top].x,stckElmnt[Top].y,stckElmnt[Top].width,stckElmnt[Top].height);
    canvas_arrow1(ctx, stack.rightX + 5, stp + (30 / 2), stack.rightX + 78, stp + (30 / 2));
    ctx.font = "15px Georgia";
    ctx.fillText("Top", stack.rightX + 80, stp + (30 / 2) + 5);
    myArray(cnt);
    /*
    ctx.font="bold 15px Georgia";
    ctx.fillText("Stack",463,375) */
    stack.myStack('red');
    let count = cnt;
    /*  for(let i=0;i<=popArrIndex;i++){
         popElmnt[i].drawPrevElementStack()
         popElmnt[i].writeData()
     } */
    for (let i = 0; i < Top; i++) {
        stckElmnt[i].drawPrevElementStack();
        stckElmnt[i].writeData();
    }
    if ((stckElmnt[Top].X >= leftxfloor) && (stckElmnt[Top].Y >= stp)) {
        ele.disabled = false;
        ele2.disabled = false;
        topbtn.disabled = false;
        isemptybtn.disabled = false;
        isfullbtn.disabled = false;
        return;
    }
    // console.log(stckElmnt[Top].X+":"+stckElmnt[Top].Y+":"+leftxfloor)
    //console.log(stckElmnt[Top].X+":"+stckElmnt[Top].Y+":"+leftxfloor)
    if (stckElmnt[Top].Y < 181)
        stckElmnt[Top].incrementY(2);
    else if (stckElmnt[Top].X < leftxfloor)
        stckElmnt[Top].incrementX(2);
    else if ((stckElmnt[Top].X == leftxfloor || stckElmnt[Top].X == leftxfloor + 1) && stckElmnt[Top].Y >= 137)
        stckElmnt[Top].incrementY(2);
    else if (stckElmnt[Top].X > leftxfloor)
        stckElmnt[Top].decrementX(2);
    //topValueIndex(); 
    myreq = window.requestAnimationFrame(() => { this.singleElementInsertStack(stckElmnt, stp, cnt); });
}
/*  function stack.myStack(color){
     let h=350;
     var startX=canvas.width()/2-canvas.width()/10
     var startY=canvas.height()/2
     var leftX=startX;
     var leftY=startY+(canvas.height()/3.5);
     console.warn(canvas.width());
     if(canvas.width()<400)
         var rightX=startX+(canvas.width()/5);
     else if(canvas.width()<800)
         var rightX=startX+(canvas.width()/8);
     else
         var rightX=startX+(canvas.width()/13);

     var rightY=leftY;
     var toprightX=rightX;
     var toprightY=startY
     ctx.strokeStyle =color;
     ctx.lineWidth = 4;
     ctx.beginPath();
    /* ctx.moveTo(440,220);
     ctx.lineTo(440,360);
     ctx.lineTo(522,360);
     ctx.lineTo(522,220);
      ctx.moveTo(startX,startY);
     ctx.lineTo(leftX,leftY);
     ctx.lineTo(rightX,rightY);
     ctx.lineTo(toprightX,toprightY);
     ctx.stroke();
   
     ctx.font="15px Georgia";
     for(let i=0;i<4;i++){
         ctx.fillText(i+"",420,h)
         h-=33;
     }
     ctx.font="20px Georgia";
 } */
function poppedElements() {
    ctx.clearRect(0, canvas.height() * 0.85, canvas.width(), canvas.height());
    ctx.font = "bold 15px Georgia";
    /* ctx.fillText("Stack",463,375) */
    ctx.fillText("Popped", 2, canvas.height() * 0.90);
    ctx.fillText("Elements", 1, canvas.height() * 0.94);
    for (let i = 0; i <= popArrIndex; i++) {
        popElmnt[i].drawPrevElementStack();
        popElmnt[i].writeData();
    }
}
function canvas_arrow1(context, fromx, fromy, tox, toy) {
    context.strokeStyle = "red";
    var headlen = 10; // length of head in pixels
    var dx = tox - fromx;
    var dy = toy - fromy;
    var angle = Math.atan2(dy, dx);
    context.beginPath();
    context.moveTo(fromx, fromy);
    context.lineTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
    context.moveTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
    ctx.stroke();
}
function canvas_arrow(context, fromx, fromy, tox, toy) {
    var headlen = 10; // length of head in pixels
    var dx = tox - fromx;
    var dy = toy - fromy;
    var angle = Math.atan2(dy, dx);
    context.moveTo(fromx, fromy);
    context.lineTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
    context.moveTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
}
/*  function topValueElement(){
     ctx.fillStyle = "black";
     ctx.lineWidth=2
     ctx.font="bold 15px Georgia";
     ctx.fillText("Top Index",arrayStartX+(limit*elementWidth)+elementWidth*0.80,arrayStartY-elementHight);
     ctx.fillText(Top+"",arrayStartX+(limit*elementWidth)+elementWidth,arrayStartY);
    // console.warn(arrayStartX)
     ctx.strokeRect(arrayStartX+(limit*elementWidth)+elementWidth*0.9,arrayStartY-elementHight*0.75,50,35);
 } */
let blinkIntervalID;
function blinkStack() {
    stack.myStack('blue');
    blinkElement();
    blinkIntervalID = setInterval(() => {
        //blue
        stack.myStack('blue');
        blinkElement();
        setTimeout(() => {
            //normal orange
            stack.myStack('red');
            //  blinkElement();
            stopBlinkElement();
        }, 300);
    }, 700);
}
function stopBlinkStack() {
    stack.myStack("red");
    stopBlinkElement();
    clearInterval(blinkIntervalID);
}
function blinkElement() {
    for (let i = 0; i <= Top; i++) {
        stckElmnt[i].drawPrevElementStack("blue");
        stckElmnt[i].writeData();
    }
}
function stopBlinkElement() {
    for (let i = 0; i <= Top; i++) {
        stckElmnt[i].drawPrevElementStack();
        stckElmnt[i].writeData();
    }
}
function topValueIndex() {
    let pointX = canvas.width() * 0.4;
    // console.warn(canvas.width())
    let pointY = arrayStartY - arrayStartY * 0.55;
    ///  console.warn("2");
    ctx.clearRect(pointX, 70, canvas.width(), pointY - 20);
    ctx.fillStyle = "black";
    if (canvas.width() > 550)
        ctx.font = "bold 15px Georgia";
    else
        ctx.font = "bold 12px Georgia";
    ctx.strokeStyle = 'purple';
    ctx.lineWidth = 2;
    ctx.fillText("Top Index", pointX, pointY);
    ctx.fillText(Top + "", pointX + 10, pointY + 30);
    // console.warn(arrayStartX)
    ctx.strokeRect(pointX, pointY + 10, 50, 35);
}
var stckElmnt = new Array();
let stp = stack.startX - 50;
let cnt = -1;
/*  function observation(){
      ctx.font="bold 15px Georgia";
      ctx.fillStyle="black"
      ctx.fillText("Observation",canvas.width()/2-canvas.width()*0.1,canvas.height()*0.05);
      ctx.font="13px Georgia";
 } */
function delayAnimation() {
    return new Promise((resolve) => setTimeout(resolve, 1000));
}
function delayAnimationStack() {
    return new Promise((resolve) => setTimeout(resolve, 1000));
}
function demoPush() {
    return __awaiter(this, void 0, void 0, function* () {
        stopBlinkStack();
        ele.disabled = true;
        ele2.disabled = true;
        topbtn.disabled = true;
        isemptybtn.disabled = true;
        isfullbtn.disabled = true;
        if (cnt >= 9) {
            // console.warn("3");
            ctx.clearRect(100, 0, 740, 115);
            //   observation(); 
            ctx.fillStyle = "rgba(0,0,0,0.1)";
            ctx.fillRect(240, 25, 450, 80);
            ctx.fillStyle = "#000dff";
            ctx.fillText("All the elements of Array are pushed in Stack.", 250, 50);
            ctx.fillStyle = "#150485";
            ctx.font = "bold 13px Georgia";
            ctx.fillText("Click Restart Button to Restart demonstration.", 250, 70);
            ctx.fillStyle = "black";
            ele.disabled = false;
            ele2.disabled = false;
            topbtn.disabled = false;
            isemptybtn.disabled = false;
            isfullbtn.disabled = false;
            return;
        }
        else if (Top == 3) {
            // console.warn ("2");
            ctx.clearRect(100, 0, 740, 115);
            //observation(); 
            //ctx.fillStyle = "rgba(0,0,0,0.1)";
            //ctx.fillRect(240, 25, 510, 80);
            //ctx.fillStyle = "#000dff";
            //ctx.fillText("Current Top index is "+Top+".",250,40);
            //ctx.fillText("So Stack is Full.",250,60); 
            // ctx.fillText("When stack is full and element is tried to be inserted in stack is called Stack Overflow.",250,80)
            instruction = "Current Top index is " + Top + ".<br/>" +
                "So Stack is Full.<br/>" +
                "When stack is full and element is tried to be inserted in stack is called Stack Overflow." + Top + "<br>" +
                "Pop an element from stack to push an element in Stack.";
            writeInstructionsStack(instruction, true);
            // ctx.fillStyle = "#150485";
            // ctx.font="bold 13px Georgia";
            // ctx.fillText("Pop an element from stack to push an element in Stack.",250,100); 
            ctx.fillStyle = "black";
            ctx.font = "13px Georgia";
            blinkStack();
            ele.disabled = false;
            ele2.disabled = false;
            topbtn.disabled = false;
            isemptybtn.disabled = false;
            isfullbtn.disabled = false;
            return;
        }
        ++cnt;
        ++Top;
        stp -= 30;
        // console.warn("4");
        ctx.clearRect(arrayStartX, (arrayStartY + elementWidth + 10), canvas.width(), canvas.height());
        /* ctx.font="bold 15px Georgia";
        ctx.fillText("Stack",463,375) */
        stack.myStack('red');
        /*  for(let i=0;i<=popArrIndex;i++){
           popElmnt[i].drawPrevElementStack()
           popElmnt[i].writeData()
       } */
        for (let i = 0; i < Top; i++) {
            stckElmnt[i].drawPrevElementStack();
            stckElmnt[i].writeData();
        }
        // console.warn("5");
        ctx.clearRect(100, 0, 740, 115);
        //  observation();
        //ctx.fillStyle = "rgba(0,0,0,0.1)";
        // ctx.fillRect(240, 25, 450, 80);
        // ctx.fillStyle = "#000dff";
        instruction = "For pushing an element increase top index by 1.<br/>" +
            "Previous top index:" + (Top - 1) + "<br/>" +
            "After incrementing top index:" + Top;
        writeInstructionsStack(instruction, true);
        // ctx.fillText("For pushing an element increase top index by 1",instructionXPoint,40); 
        // ctx.fillText("Previous top index:"+(Top-1)+"",300,60); 
        // ctx.fillText("After incrementing top index:"+Top+"",300,80);
        ctx.fillStyle = "black";
        height += 30;
        stckElmnt[Top] = new element(ctx, canvas, arrElmnts[cnt].X, arrElmnts[cnt].Y, stack.width * 0.85, stack.height / 4.5, arrNum[cnt]);
        Top > 0 ? stp = stckElmnt[Top - 1].Y - stckElmnt[Top - 1].height : stp = stack.leftY - stckElmnt[Top].height - 3;
        ctx.lineWidth = 2;
        canvas_arrow1(ctx, stack.rightX + 5, stp + (30 / 2), stack.rightX + 78, stp + (30 / 2));
        ctx.font = "15px Georgia";
        ctx.fillText("Top", stack.rightX + 80, stp + (30 / 2) + 5);
        topValueIndex();
        yield delayAnimationStack();
        ctx.font = "13px Georgia";
        // ctx.fillStyle = "#000dff";
        // ctx.fillText("Now element "+arrNum[cnt]+" will be pushed at top index "+Top,300,100);
        yield delayAnimationStack();
        ctx.fillStyle = "black";
        // ctx.clearRect(100,0,740,115);
        //  observation();
        //ctx.fillStyle = "#000dff";
        // ctx.fillText("For pushing an element increase top index by 1",300,40); 
        // ctx.fillText("Previous top index:"+(Top-1)+"",300,60); 
        // ctx.fillText("After incrementing top index:"+Top+"",300,80);
        //  ctx.fillText("Now element "+arrNum[cnt]+" will be pushed at top index "+Top,300,100);
        //console.warn("h= "+stack.height/4.3);
        instruction += "<br>Now element " + arrNum[cnt] + " will be pushed at top index " + Top + ".";
        writeInstructionsStack(instruction);
        singleElementInsertStack(stckElmnt, stp, cnt);
    });
}
//skip intro set 11 to skip
let next = 0;
let pointX;
let pointY;
function StackExplanation() {
    ctx.clearRect(1, 1, canvas.width(), canvas.height());
    ctx.lineWidth = 2;
    ctx.font = "30px Georgia";
    ctx.fillStyle = "brown";
    ctx.fillText("Stack", canvas.width() / 2 - 50, 50);
    if (canvas.width() > 550)
        ctx.font = "20px Georgia";
    else
        ctx.font = "16px Georgia";
    ctx.fillStyle = "black";
    if (canvas.width() > 550) {
        ctx.fillRect(50, 80, 8, 8);
        pointX = 100;
        pointY = 90;
        ctx.fillText("A Stack is a linear data structure that follows the principle of ", pointX, pointY);
        ctx.font = "small-caps bold 20px Georgia";
        ctx.fillText("Last In First Out(LIFO).", 643, 90);
        ctx.font = "20px Georgia";
        ctx.fillRect(50, 110, 8, 8);
        ctx.fillText("This means the last element inserted inside the stack is removed first.", 100, 120);
    }
    else {
        ctx.fillRect(10, 80, 8, 8);
        pointX = 25;
        pointY = 90;
        ctx.fillText("A Stack is a linear data structure that follows", pointX, pointY);
        ctx.fillText("the principle of ", pointX, pointY + 20);
        ctx.font = "small-caps bold 16px Georgia";
        ctx.fillText("Last In First Out(LIFO).", pointX, pointY + 40);
        ctx.font = "16px Georgia";
        ctx.fillRect(10, 150, 8, 8);
        ctx.fillText("This means the last element inserted", pointX, pointY + 70);
        ctx.fillText("inside the stack is removed first.", pointX, pointY + 90);
    }
    //++next;
}
function imagine() {
    if (canvas.width() > 550) {
        ctx.fillStyle = "brown";
        ctx.font = "30px Georgia";
        ctx.fillText("Let's Imagine Stack", canvas.width() / 2 - 140, 180);
    }
    else {
        ctx.fillStyle = "brown";
        ctx.font = "22px Georgia";
        ctx.fillText("Let's Imagine Stack", canvas.width() / 2 - 100, pointY + 140);
    }
}
function Stack1() {
    let h = 337;
    pointX = canvas.width() / 4;
    if (canvas.width() < 550) {
        h = 400;
        pointX = canvas.width() / 6;
    }
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(pointX, h - 100);
    ctx.lineTo(pointX, h + 40);
    ctx.lineTo(pointX + 100, h + 40);
    ctx.lineTo(pointX + 100, h - 100);
    ctx.stroke();
    for (let i = 0; i < 3; i++) {
        ctx.fillStyle = "#ffff66";
        ctx.fillRect(pointX + 5, h, 90, 40);
        ctx.fillStyle = "Black";
        ctx.font = "20px Georgia";
        ctx.fillText("Book " + (i + 1), pointX + 15, h + 33);
        h -= 45;
    }
    if (canvas.width() > 550) {
        ctx.font = "15px Georgia";
        ctx.fillStyle = "brown";
        ctx.fillText("Stack representation similar to a pile of books", 150, 400);
    }
    else {
        ctx.font = "14px Georgia";
        ctx.fillStyle = "brown";
        ctx.fillText("Stack representation ", canvas.width() * 0.15, 460);
        ctx.fillText("similar to a pile of books", canvas.width() * 0.13, 480);
    }
}
function Stack2() {
    let h = 360;
    pointX = canvas.width() / 2 + 150;
    if (canvas.width() < 550) {
        h = 430;
        pointX = canvas.width() / 3 + 100;
    }
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(pointX, h - 130);
    ctx.lineTo(pointX, h + 10);
    ctx.lineTo(pointX + 100, h + 10);
    ctx.lineTo(pointX + 100, h - 130);
    ctx.stroke();
    for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        //ctx.lineWidth=0
        ctx.strokeStyle = "#ffff66";
        ctx.fillStyle = "#ffff66";
        ctx.ellipse(pointX + 50, h - 10, 50, 20, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.font = "20px Georgia";
        ctx.fillStyle = "Black";
        ctx.fillText("Plate " + (i + 1), pointX + 25, h);
        h -= 40;
    }
    if (canvas.width() > 550) {
        ctx.font = "15px Georgia";
        ctx.fillStyle = "brown";
        ctx.fillText("Stack representation similar to a pile of plates", 600, 400);
    }
    else {
        ctx.font = "14px Georgia";
        ctx.fillStyle = "brown";
        ctx.fillText("Stack representation ", pointX, 460);
        ctx.fillText("similar to a ", pointX, 480);
        ctx.fillText("pile of plates", pointX, 500);
    }
}
function Stack3() {
    ctx.beginPath();
    if (canvas.width() > 550) {
        ctx.moveTo((canvas.width() / 10) + 100, 150);
        ctx.lineTo((canvas.width() / 10) + 150, 150);
        ctx.stroke();
        canvas_arrow1(ctx, (canvas.width() / 10) + 150, 150, (canvas.width() / 10) + 150, 210);
        let h = 247;
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(canvas.width() / 10 + 100, 190);
        ctx.lineTo(canvas.width() / 10 + 100, 380);
        ctx.lineTo((canvas.width() / 10) + 200, 380);
        ctx.lineTo((canvas.width() / 10) + 200, 190);
        ctx.stroke();
        ctx.fillStyle = "#ffff66";
        ctx.fillRect((canvas.width() / 10) + 105, 247, 90, 40);
        ctx.fillStyle = "Black";
        ctx.font = "20px Georgia";
        ctx.fillText(1 + "", 190 + (190 / 3) + 5, h + 23);
        ctx.font = "15px Georgia";
        ctx.fillStyle = "brown";
        ctx.fillText("Push 1", 240, 400); //canvaswidth=800
    }
    else {
        ctx.moveTo((canvas.width() / 20) - 50, 200);
        ctx.lineTo((canvas.width() / 20) + 50, 200);
        ctx.stroke();
        canvas_arrow1(ctx, (canvas.width() / 20) + 50, 200, (canvas.width() / 20) + 50, 230);
        let h = 247;
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(canvas.width() / 20, 220);
        ctx.lineTo(canvas.width() / 20, 350);
        ctx.lineTo((canvas.width() / 20) + 100, 350);
        ctx.lineTo((canvas.width() / 20) + 100, 220);
        ctx.stroke();
        ctx.fillStyle = "#ffff66";
        ctx.fillRect((canvas.width() / 20) + 5, 247, 90, 40);
        ctx.fillStyle = "Black";
        ctx.font = "18px Georgia";
        ctx.fillText(1 + "", (canvas.width() / 20) + 20, h + 23);
        ctx.font = "15px Georgia";
        ctx.fillStyle = "brown";
        ctx.fillText("Push 1", (canvas.width() / 20) + 25, h + 120);
    }
}
function Stack4() {
    ctx.beginPath();
    if (canvas.width() > 550) {
        ctx.moveTo((canvas.width() / 10) + 300, 150);
        ctx.lineTo((canvas.width() / 10) + 350, 150);
        ctx.stroke();
        canvas_arrow1(ctx, (canvas.width() / 10) + 350, 150, (canvas.width() / 10) + 350, 210);
        let h = 337;
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo((canvas.width() / 10) + 300, 190);
        ctx.lineTo((canvas.width() / 10) + 300, 380);
        ctx.lineTo((canvas.width() / 10) + 400, 380);
        ctx.lineTo((canvas.width() / 10) + 400, 190);
        ctx.stroke();
        for (let i = 0; i < 2; i++) {
            ctx.fillStyle = "#ffff66";
            ctx.fillRect((canvas.width() / 10) + 305, h, 90, 40);
            ctx.fillStyle = "Black";
            ctx.font = "20px Georgia";
            ctx.fillText((i + 1) + "", 454, h + 23);
            h -= 45;
        }
        ctx.font = "15px Georgia";
        ctx.fillStyle = "brown";
        ctx.fillText("Push 2", (canvas.width() / 10) + 335, 400);
    }
    else {
        ctx.moveTo((canvas.width() / 20) + 180, 200);
        ctx.lineTo((canvas.width() / 20) + 230, 200);
        ctx.stroke();
        canvas_arrow1(ctx, (canvas.width() / 20) + 230, 200, (canvas.width() / 20) + 230, 230);
        let h = 247 + 45;
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo((canvas.width() / 20) + 180, 220);
        ctx.lineTo((canvas.width() / 20) + 180, 350);
        ctx.lineTo((canvas.width() / 20) + 280, 350);
        ctx.lineTo((canvas.width() / 20) + 280, 220);
        ctx.stroke();
        for (let i = 0; i < 2; i++) {
            ctx.fillStyle = "#ffff66";
            ctx.fillRect((canvas.width() / 20) + 185, h, 90, 40);
            ctx.fillStyle = "Black";
            ctx.font = "20px Georgia";
            ctx.fillText((i + 1) + "", (canvas.width() / 20) + 200, h + 23);
            h -= 45;
        }
        ctx.font = "15px Georgia";
        ctx.fillStyle = "brown";
        ctx.fillText("Push 2", (canvas.width() / 20) + 205, h + 123 + 45);
    }
}
function Stack5() {
    ctx.beginPath();
    if (canvas.width() > 550) {
        ctx.moveTo((canvas.width() / 10) + 500, 150);
        ctx.lineTo((canvas.width() / 10) + 550, 150);
        ctx.stroke();
        canvas_arrow1(ctx, (canvas.width() / 10) + 550, 150, (canvas.width() / 10) + 550, 210);
        let h = 337;
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo((canvas.width() / 10) + 500, 190);
        ctx.lineTo((canvas.width() / 10) + 500, 380);
        ctx.lineTo((canvas.width() / 10) + 600, 380);
        ctx.lineTo((canvas.width() / 10) + 600, 190);
        ctx.stroke();
        for (let i = 0; i < 3; i++) {
            ctx.fillStyle = "#ffff66";
            ctx.fillRect((canvas.width() / 10) + 505, h, 90, 40);
            ctx.fillStyle = "Black";
            ctx.font = "20px Georgia";
            ctx.fillText((i + 1) + "", 654, h + 23);
            h -= 45;
        }
        ctx.font = "15px Georgia";
        ctx.fillStyle = "brown";
        ctx.fillText("Push 3", (canvas.width() / 10) + 535, 400);
    }
    else {
        ctx.moveTo((canvas.width() / 20) - 50, 400);
        ctx.lineTo((canvas.width() / 20) + 50, 400);
        ctx.stroke();
        canvas_arrow1(ctx, (canvas.width() / 20) + 50, 400, (canvas.width() / 20) + 50, 430);
        let h = 390 + 3 * 45;
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(canvas.width() / 20, 420);
        ctx.lineTo(canvas.width() / 20, 570);
        ctx.lineTo((canvas.width() / 20) + 100, 570);
        ctx.lineTo((canvas.width() / 20) + 100, 420);
        ctx.stroke();
        for (let i = 0; i < 3; i++) {
            ctx.fillStyle = "#ffff66";
            ctx.fillRect(canvas.width() / 20 + 5, h, 90, 40);
            ctx.fillStyle = "Black";
            ctx.font = "20px Georgia";
            ctx.fillText((i + 1) + "", canvas.width() / 20 + 20, h + 23);
            h -= 45;
        }
        ctx.font = "15px Georgia";
        ctx.fillStyle = "brown";
        ctx.fillText("Push 3", canvas.width() / 20 + 25, 585);
    }
}
function Stack6() {
    ctx.beginPath();
    if (canvas.width() > 550) {
        ctx.moveTo(850, 175);
        ctx.lineTo(850, 150);
        ctx.stroke();
        canvas_arrow1(ctx, 850, 150, 920, 150);
        let h = 337;
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo((canvas.width() / 10) + 700, 190);
        ctx.lineTo((canvas.width() / 10) + 700, 380);
        ctx.lineTo((canvas.width() / 10) + 800, 380);
        ctx.lineTo((canvas.width() / 10) + 800, 190);
        ctx.stroke();
        for (let i = 0; i < 2; i++) {
            ctx.fillStyle = "#ffff66";
            ctx.fillRect((canvas.width() / 10) + 705, h, 90, 40);
            ctx.fillStyle = "Black";
            ctx.font = "20px Georgia";
            ctx.fillText((i + 1) + "", 854, h + 23);
            h -= 45;
        }
        ctx.fillStyle = "#ffff66";
        ctx.fillRect((canvas.width() / 10) + 705, 180, 90, 40);
        ctx.font = "20px Georgia";
        ctx.fillStyle = "Black";
        ctx.fillText(3 + "", 854, 203);
        ctx.font = "15px Georgia";
        ctx.fillStyle = "brown";
        ctx.fillText("Pop 3", (canvas.width() / 10) + 735, 400);
    }
    else {
        ctx.moveTo((canvas.width() / 20) + 230, 430);
        ctx.lineTo((canvas.width() / 20) + 230, 400);
        ctx.stroke();
        canvas_arrow1(ctx, (canvas.width() / 20) + 230, 400, (canvas.width() / 20) + 260, 400);
        let h = 390 + 3 * 45;
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo((canvas.width() / 20) + 180, 420);
        ctx.lineTo((canvas.width() / 20) + 180, 570);
        ctx.lineTo((canvas.width() / 20) + 280, 570);
        ctx.lineTo((canvas.width() / 20) + 280, 420);
        ctx.stroke();
        for (let i = 0; i < 2; i++) {
            ctx.fillStyle = "#ffff66";
            ctx.fillRect((canvas.width() / 20) + 185, h, 90, 40);
            ctx.fillStyle = "Black";
            ctx.font = "20px Georgia";
            ctx.fillText((i + 1) + "", (canvas.width() / 20) + 200, h + 23);
            h -= 45;
        }
        ctx.fillStyle = "#ffff66";
        ctx.fillRect((canvas.width() / 20) + 185, h - 15, 90, 40);
        ctx.font = "20px Georgia";
        ctx.fillStyle = "Black";
        ctx.fillText(3 + "", (canvas.width() / 20) + 200, h + 13);
        ctx.font = "15px Georgia";
        ctx.fillStyle = "brown";
        ctx.fillText("Pop 4", canvas.width() / 20 + 205, 585);
    }
}
function Stacktop() {
    if (canvas.width() > 550) {
        ctx.fillStyle = "Black";
        ctx.font = "20px Georgia";
        ctx.fillRect(50, 430, 8, 8);
        ctx.fillText("New book/plate can be added from top and top book/plate can be removed.", 100, 440);
        canvas_arrow1(ctx, 400, 270, 460, 270);
        canvas_arrow1(ctx, 860, 270, 940, 270);
        ctx.font = "17px Georgia";
        ctx.fillText("Top", 460, 275);
        ctx.fillText("Top", 940, 275);
    }
    else {
        ctx.fillStyle = "Black";
        ctx.font = "16px Georgia";
        ctx.fillRect(10, 530, 8, 8);
        ctx.fillText("New book/plate can be added from top ", 25, 540);
        ctx.fillText("and top book/plate can be removed.", 25, 560);
        canvas_arrow1(ctx, 140, 330, 170, 330);
        canvas_arrow1(ctx, 280, 330, 300, 330);
        ctx.font = "14px Georgia";
        ctx.fillText("Top", 170, 335);
        ctx.fillText("Top", 300, 335);
    }
}
function lifoprinciple() {
    if (canvas.width() > 550) {
        ctx.font = "20px Georgia";
        ctx.fillStyle = "black";
        ctx.fillRect(50, 420, 8, 8);
        ctx.fillText("Here item3 was kept last,it was removed first.This is how the LIFO", 90, 430);
        ctx.fillText("(Last In First Out) Principle works.", 676, 430);
        ctx.lineWidth = 5;
        ctx.strokeStyle = 'purple';
        ctx.strokeRect((canvas.width() / 10) + 505, 250, 90, 40);
        ctx.strokeRect((canvas.width() / 10) + 705, 180, 90, 40);
    }
    else {
        ctx.font = "14px Georgia";
        ctx.fillStyle = "black";
        ctx.fillRect(10, 610, 8, 8);
        ctx.fillText("Here item3 was kept last,it was removed first", 25, 610);
        ctx.fillText("This is how the LIFO Principle works.", 25, 630);
        ctx.lineWidth = 5;
        ctx.strokeStyle = 'purple';
        ctx.strokeRect(canvas.width() / 20 + 5, 390 + 45, 90, 40);
        ctx.strokeRect((canvas.width() / 20) + 185, 390 + 33, 90, 40);
    }
}
function principle() {
    ctx.clearRect(1, 1, canvas.width(), canvas.height());
    if (canvas.width() > 550) {
        ctx.font = "30px Georgia";
        ctx.fillStyle = "brown";
        ctx.fillText("LIFO Principle of Stack", canvas.width() / 3, 50);
        ctx.font = "20px Georgia";
        ctx.fillStyle = "black";
        ctx.fillRect(50, 80, 8, 8);
        ctx.fillText("Putting an item on top of stack is called ", 90, 90);
        ctx.font = "bold 21px Georgia";
        ctx.fillText("push", 441, 90);
        ctx.font = "20px Georgia";
        ctx.fillText("and removing an item is called", 500, 90);
        ctx.font = "bold 21px Georgia";
        ctx.fillText("pop.", 775, 90);
        ctx.font = "20px Georgia";
        ctx.fillText("Let's Push and Pop in Stack.", 90, 120);
    }
    else {
        ctx.font = "20px Georgia";
        ctx.fillStyle = "brown";
        ctx.fillText("LIFO Principle of Stack", 30, 50);
        ctx.font = "16px Georgia";
        ctx.fillStyle = "black";
        ctx.fillRect(10, 80, 8, 8);
        ctx.fillText("Putting an item on top of stack is called ", 25, 90);
        ctx.font = "bold 17px Georgia";
        ctx.fillText("push", 25, 110);
        ctx.font = "16px Georgia";
        ctx.fillText("and removing an item is called", 25, 130);
        ctx.font = "bold 17px Georgia";
        ctx.fillText("pop.", 25, 150);
        ctx.font = "16px Georgia";
        ctx.fillText("Let's Push and Pop in Stack.", 25, 180);
    }
}
let instructionXPoint;
let instruction;
function basicoperation() {
    instructionXPoint = Math.floor(canvas.width() * 0.1);
    ;
    //  console.warn("startArrayx= "+arrayStartX);
    ctx.clearRect(1, 1, canvas.width(), canvas.height());
    // blinkStack();
    poppedElements();
    ctx.font = "30px Georgia";
    ctx.
        font = "13px Georgia";
    instruction = "Array and Stack are given.Elements from Array can be inserted inside Stack.";
    if (canvas.width() > 550)
        instruction += "<br>";
    instruction += "Basic Stack operations can be performed";
    if (canvas.width() > 550)
        instruction += "<br>";
    instruction += "Click on the Push Button to Insert an Element in Stack";
    writeInstructionsStack(instruction);
    // observation()
    // insdiv.innerHTML="Array and Stack are given.Elements from Array can be inserted inside Stack.<br/>" +
    //"Basic Stack operations can be performed.<br/>" + 
    // "Click on the Push Button to Insert an Element in Stack";
    // insdiv.style.border="2px #ffe53b solid";
    // ctx.fillStyle = "#000dff";
    //  insdiv.style.backgroundColor="rgba(0,0,0,0.1)"
    // insdiv.style.color="#000dff";
    /*ctx.fillStyle = "rgba(0,0,0,0.1)";*/
    ctx.fillStyle = "black";
    stack.myStack('red');
    myArray();
    topValueIndex();
    ele.disabled = false;
    ele2.disabled = false;
    topbtn.disabled = false;
    isemptybtn.disabled = false;
    isfullbtn.disabled = false;
    restartbtn.disabled = false;
    nextbtn.disabled = true;
}
function demoNext() {
    switch (next) {
        case 1:
            StackExplanation();
            nextbtn.value = "Next";
            ++next;
            break;
        case 2:
            imagine();
            ++next;
            break;
        case 3:
            Stack1();
            ++next;
            break;
        case 4:
            Stack2();
            ++next;
            break;
        case 5:
            Stacktop();
            ++next;
            break;
        case 6:
            principle();
            ++next;
            break;
        case 7:
            Stack3();
            ++next;
            break;
        case 8:
            Stack4();
            ++next;
            break;
        /*case 7: Stack4();
            ++next;
            break;*/
        case 9:
            Stack5();
            ++next;
            break;
        case 10:
            Stack6();
            ++next;
            break;
        case 11:
            lifoprinciple();
            ++next;
            break;
        case 12:
            basicoperation();
            ++next;
            break;
    }
}
ele.disabled = true;
ele2.disabled = true;
topbtn.disabled = true;
isemptybtn.disabled = true;
isfullbtn.disabled = true;
restartbtn.disabled = true;
if (canvas.width() > 550) {
    ctx.font = "20px Georgia";
    ctx.fillText("Click on Start button to start the demonstration", canvas.width() / 3, 50);
}
else {
    ctx.font = "15px Georgia";
    ctx.fillText("Click on Start button to start the demonstration", 10, 50);
}
++next;
/* stack.myStack();
 ctx.font="40px Georgia";
 ctx.fillText("Array=>",50,130)
 ctx.fillText("Stack=>",50,350)
 ctx.font="20px Georgia";
 ctx.fillText("Click on the Push Button",280,50);
 ctx.fillText("for Inserting an Element in Stack",250,80);
 myArray();
 topValueElement()
 topValueIndex(-1)
 ele2.disabled = true;*/
//# sourceMappingURL=app.js.map