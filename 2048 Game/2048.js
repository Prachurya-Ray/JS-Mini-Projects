var board;
var score=0;
var rows=4;
var cols=4;

window.onload=function(){
    setGame();
}

function setGame(){
    board=[
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
    ]

    

    for(let r=0; r<rows; r++){
        for(let c=0; c<cols; c++){
            //<div id='0-0'></div>
            let tile = document.createElement('div');
            tile.id=r.toString()+'-'+c.toString();
            let num= board[r][c];
            updateTile(tile,num);
            document.getElementById("board").append(tile);
        }
    }

    setTwo();
}

function hasEmptyTile(){
    for(let r=0; r<rows; r++){
        for(let c=0; c<cols; c++){
            if(board[r][c]==0){
                return true;
            }
        }
    }
    return false;
}

function setTwo(){
    //if not empty tile no need to do all the process
    if(!hasEmptyTile()){
        return;
    }

    let found=false;
    while(!found){
        let r=Math.floor(Math.random() * rows);
        let c=Math.floor(Math.random() * cols);

        if(board[r][c]==0){
            board[r][c]=2;
            let tile=document.getElementById(r.toString()+'-'+c.toString());
            tile.innerText='2';
            tile.classList.add('x2');
            found=true;
        }
    }
}

function updateTile(tile, num){
    tile.innerText="";
    tile.classList.value=""; //clear the classList
    tile.classList.add('tile');
    if(num>0){
        tile.innerText=num;
        if(num<=4096){
            tile.classList.add('x'+num.toString());
        }
        else{
            tile.classList.add('x8192');
        }
    }
}

document.addEventListener('keyup',(e)=>{
    if(e.code=="ArrowLeft"){
        slideLeft();
        setTwo();
    }
    else if(e.code=="ArrowRight"){
        slideRight();
        setTwo();
    }
    else if(e.code=="ArrowUp"){
        slideUp();
        setTwo();
    }
    else if(e.code=="ArrowDown"){
        slideDown();
        setTwo();
    }
})

function rowFilter(row){
    return row.filter(n => n!=0);
}

function slide(row){
    //get rid of zeros
    row = rowFilter(row);
    
    //slide
    for(let i=0; i<row.length-1; i++){
        if(row[i]==row[i+1]){
            row[i]*=2;
            row[i+1]=0;
            score+=row[i];
        }
    }
    
    row = rowFilter(row);

    while(row.length<cols){
        row.push(0);
    }

    return row;
}

function slideLeft(){
    for (let r=0; r<rows; r++){
        let row = board[r];
        row = slide(row);
        board[r]=row;

        for(let c=0; c<cols; c++){
            let tile=document.getElementById(r.toString()+"-"+c.toString());
            let num=board[r][c];
            updateTile(tile, num);
        }
    }
    document.getElementById('score').innerHTML = score;
}

function slideRight(){
    for (let r=0; r<rows; r++){
        let row = board[r];
        row.reverse();
        row = slide(row);
        row.reverse();
        board[r]=row;

        for(let c=0; c<cols; c++){
            let tile=document.getElementById(r.toString()+"-"+c.toString());
            let num=board[r][c];
            updateTile(tile, num);
        }
    }
    document.getElementById('score').innerHTML = score;
}

function slideUp(){
    for(let c=0; c<cols; c++){
        let row =[board[0][c], board[1][c], board[2][c], board[3][c]];
        row=slide(row);
        // for(let i=0; i<4; i++){
        //     board[i][c]=row[i];
        // }

        for(let r=0; r<rows; r++){
            board[r][c]=row[r];
            let tile=document.getElementById(r.toString()+"-"+c.toString());
            let num=board[r][c];
            updateTile(tile, num);
        }
    }
    document.getElementById('score').innerHTML = score;
}

function slideDown(){
    for(let c=0; c<cols; c++){
        let row =[board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        row=slide(row);
        row.reverse();

        for(let r=0; r<rows; r++){
            board[r][c]=row[r];
            let tile=document.getElementById(r.toString()+"-"+c.toString());
            let num=board[r][c];
            updateTile(tile, num);
        }
    }
    document.getElementById('score').innerHTML = score;
}