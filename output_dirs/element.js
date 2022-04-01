class element {
    constructor(context, canvas, x, y, width, height, data) {
        this.width = width;
        this.height = height;
        this.context = context;
        this.canvas = canvas;
        this.x = x;
        this.y = y;
        this.data = data;
    }
    writeData() {
        ctx.font = "bold 13px Georgia";
        ctx.fillStyle = "black";
        this.context.fillText(this.data + "", this.X + (this.width / 3), this.Y + (this.height / 2));
    }
    get Y() {
        return this.y;
    }
    get X() {
        return this.x;
    }
    drawArrayElement() {
        // console.warn("9");
        this.context.clearRect(this.x, this.y, this.width, this.height);
        this.context.lineWidth = 2;
        this.context.strokeStyle = 'orange';
        this.context.strokeRect(this.x, this.y, this.width, this.height);
    }
    drawStackElement() {
        this.context.lineWidth = 2;
        //console.warn("10");
        // this.context.clearRect(99,151,this.canvas.width(),this.canvas.height());
        //this.context.clearRect(this.x,this.y,this.width,this.height);
        this.context.clearRect(0, arrayStartY + elementHight, this.canvas.width(), this.canvas.height());
        this.context.strokeRect(this.x, this.y, this.width, this.height);
    }
    drawPrevElementStack(color) {
        // console.warn("8");
        // this.context.clearRect(this.x,this.y,this.width,this.height);
        this.context.lineWidth = 2;
        if (color == undefined)
            ctx.strokeStyle = 'red';
        else
            ctx.strokeStyle = color;
        this.context.strokeRect(this.x, this.y, this.width, this.height);
    }
    incrementX(n) {
        this.x = this.x + n;
    }
    incrementY(n) {
        this.y = this.y + n;
    }
    decrementX(n) {
        this.x = this.x - n;
    }
    decrementY(n) {
        this.y = this.y - n;
    }
}
//# sourceMappingURL=element.js.map