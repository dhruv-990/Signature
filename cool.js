const colorpicker = document.getElementById("colorpicker");
const canvascolor = document.getElementById("canvascolor");
const clearButton = document.getElementById("clearButton");
const fontsize = document.getElementById("fontSize");
const save = document.getElementById("saveButton");
const retreive = document.getElementById("retrieveButton");

window.onload = function() {
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');

    if (!canvas || !ctx) {
        console.error('Canvas or context not found');
        return;
    }

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    

    colorpicker.addEventListener('change' , (e)=>{
       ctx.strokeStyle = e.target.value;
       ctx.fillStyle= e.target.value;


    })

    

    
    canvas.addEventListener('mousedown', (e) => {
        isDrawing = true;
        lastX = e.offsetX;
        lastY = e.offsetY;
    });

    
    canvas.addEventListener('mousemove', (e) => {
        if (isDrawing) {
            ctx.beginPath();
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
            lastX = e.offsetX;
            lastY = e.offsetY;
        }
    });

    
    canvas.addEventListener('mouseup', () => {
        isDrawing = false;
    });

    
    canvas.addEventListener('mouseout', () => {
        isDrawing = false;
    });

    
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;

    
    const canvascolor = document.getElementById('canvascolor');
    if (canvascolor) {
        canvascolor.addEventListener('change', (e) => {
            ctx.fillStyle = e.target.value;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        });
    } else {
        console.error('Color picker not found');
    }

    clearButton.addEventListener('click', (e)=>{
        ctx.clearRect(0,0,canvas.width,canvas.height);
    })

    fontsize.addEventListener('change',(e)=>{
        ctx.lineWidth = e.target.value;



    })
    save.addEventListener('click',(e)=>{
        localStorage.setItem('canvasContent', canvas.toDataURL());
        let link = document.createElement('a');
        link.download = 'my-canvas.png';
        link.href = canvas.toDataURL();
            link.click();

    })

    retreive.addEventListener('click' , (e)=>{
        let savedCanvas= localStorage.getItem('canvasContent');
        if(savedCanvas){
            let img = new Image();
            img.src=savedCanvas;
            ctx.drawImage(img,0,0);

        }
    })
    

    
};
