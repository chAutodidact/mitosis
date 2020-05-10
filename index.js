(() => {
    const canvas = document.getElementById('my-canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');

    function random(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function Cell(x, y, r){
        this.pos = { x : 0, y : 0};
        if(x && y){
            this.pos.x = x;
            this.pos.y = y;
        }else{
            this.pos = {
                x: random(0,canvas.width),
                y: random(0,canvas.height)
            };
        }
        
        this.r = r || 50;
        this.c = '#'+ Math.floor(Math.random()*16777215).toString(16);

        this.move = function(){
            this.pos.x += random(-2,2);
            this.pos.y += random(-2,2);
        }

        this.clicked = function(x,y){
            let a = this.pos.x-x, b = this.pos.y-y;
            let d = Math.hypot(a,b);

            if (d < this.r) return true;
            else return false;
        }

        this.mitosis = function(){
            return new Cell(this.pos.x+random(-10,10), this.pos.y+random(-10,10), this.r / 1.414);
        }

        this.draw = function(){
            ctx.beginPath();
            ctx.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI);
            ctx.fillStyle = this.c;
            ctx.fill();
        }
    }

    function main(){
        let cells = new Array();
        cells.push(new Cell());
        cells.push(new Cell());

        const bodyElem = document.querySelector('body');
        mousePressed = function({pageX, pageY}) {
            for(i=0;i<cells.length;i++){
                if(cells[i].clicked(pageX, pageY)) {
                    cells.push(cells[i].mitosis());
                    cells.push(cells[i].mitosis());
                    cells.splice(i, 1);
                    break;
                }
            }
        }

        canvas.addEventListener('click', mousePressed);

        setInterval(()=>{
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            cells.forEach((cell)=>{
                cell.move();
                cell.draw();
            });
        },5);
    }

    main();
})();
