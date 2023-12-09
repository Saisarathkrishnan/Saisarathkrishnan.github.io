const board_pos = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';
//let board_pos = '8/8/8/1R6/8/8/k1K5/8';

let HTML = '';
let boxMem = [];
for (let i = 0; i < 8; i++) {
    boxMem.push([0, 0, 0, 0, 0, 0, 0, 0])
}

//board drawn
for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
        if ((x + y) % 2 == 0) {
            HTML += ` <div class="white js-box-elem" id="box" data-id-x=${x} data-id-y=${y}></div>`;
        } else {
            HTML += `<div class="black js-box-elem" id="box"  data-id-x=${x} data-id-y=${y}></div>`;
        }
    }

}

document.querySelector('.board-layout').innerHTML = HTML;
/*
document.querySelectorAll('.js-box-elem').forEach((item) => {
    console.log(`${item.dataset.idX}:${item.dataset.idY}`);
});
*/

FENLoad(board_pos);
//debug();
drawpiece(boxMem);

let selection1 = 0;
let preselected = false;
let lul = {};
let is_white;
let selection_IsWhite = false;
let moveNo = 0;
let rule = false;
//,movement stuff
document.querySelectorAll('.js-box-elem').forEach((item) => {
    const x = item.dataset.idX;
    const y = item.dataset.idY;
    item.addEventListener('click', () => {
        let selectbuf = {};
        if (boxMem[y][x] != 0 && !preselected) {
            lul = { x, y };

            selection1 = boxMem[y][x];
            is_white = (selection1 < 20 && selection1 > 10) ? true : false;
            selection_IsWhite = is_white;
            if ((moveNo % 2) == 0 && is_white) {
                rule = true;

            } else if ((moveNo % 2) != 0 && !is_white) {
                rule = true;
            } else {
                rule = false;
            }
            console.log(rule, 'rule', moveNo);
            if (rule) {
                preselected = true;
                calculateLegal(boxMem[y][x], x, y);
                legalAll();
                //shade();// shades pseudo legal moves// shaded with red background and green boreder
                shade2();//shades actual legal moves//shaded with green border no background
                if(calculated_Legals_IsLegal.length==0){
                    if(selection_IsWhite){
                        alert('White Lost');
                    }else{
                        alert('Black Lost');
                    }
                }
                item.style.backgroundColor = "rgb(131, 0, 0)";
            }

        }
        else if (preselected) {
            let selectionIsWhite = (boxMem[y][x] < 20) ? true : false;
            let moveIsLegal = false;
            //console.log(boxMem[y][x],is_white, 123,selectionIsWhite);
            preselected = false;
            console.log(calculated_Legals_IsLegal, 'rule');
            calculated_Legals_IsLegal.forEach((legal) => {
                if (legal.x == x && legal.y == y) {
                    moveIsLegal = true;
                }
            });


            if (is_white && !selectionIsWhite && moveIsLegal) {
                boxMem[y][x] = selection1;
                moveNo += 1;
                rule = false;
                boxMem[lul.y][lul.x] = 0;
                KingIsAttacked(is_white);
                 
            } else if (!(is_white) && selectionIsWhite && moveIsLegal) {
                boxMem[y][x] = selection1;
                moveNo += 1;
                rule = false;
                boxMem[lul.y][lul.x] = 0;
                KingIsAttacked(is_white);
                
            } else if (boxMem[y][x] == 0 && moveIsLegal) {
                boxMem[y][x] = selection1;
                moveNo += 1;
                rule = false;
                boxMem[lul.y][lul.x] = 0;
                KingIsAttacked(is_white);
                 
            }
            else {
                rule = false;
                console.log('bye');
                boxMem[lul.y][lul.x] = selection1;
                console.log(4, "rule");
            }
            
            drawpiece(boxMem);
            boxreshader(lul);
            LegalMoves = [];
            pseudoLegals = [];
            calculated_Legals_IsLegal = [];
            //document.querySelector('.hi').innerHTML += `<p>${moveNo}</p>`;
        }
    });
});
