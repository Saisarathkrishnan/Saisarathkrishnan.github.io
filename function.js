
function isAlphabet(string) {
    return /^[A-Za-z]+$/.test(string);
}
function isDigit(character) {
    return /^\d$/.test(character);
}

function FENLoad(FEN) {
    let some = false;
    let piece = '';
    let x = 0;
    let y = 0;
    for (let i = 0; i < FEN.length; i++) {
        let piece = FEN[i];
        if (piece == ' ') {
            break;
        }
        else if (piece == '/') {
            y += 1;
            x = -1;
        }
        else if (x > 7) {
            y += 1;
            x = 0;
        }
        else {
            if (isAlphabet(piece)) {

                switch (piece) {
                    case 'K':
                        boxMem[y][x] = 11;
                        break;
                    case 'Q':
                        boxMem[y][x] = 12;
                        break;
                    case 'B':
                        boxMem[y][x] = 13;
                        break;
                    case 'N':
                        boxMem[y][x] = 14;
                        break;
                    case 'R':
                        boxMem[y][x] = 15;
                        break;
                    case 'P':
                        boxMem[y][x] = 16;
                        break;
                    case 'k':
                        boxMem[y][x] = 21;
                        break;
                    case 'q':
                        boxMem[y][x] = 22;
                        break;
                    case 'b':
                        boxMem[y][x] = 23;
                        break;
                    case 'n':
                        boxMem[y][x] = 24;
                        break;
                    case 'r':
                        boxMem[y][x] = 25;
                        break;
                    case 'p':
                        boxMem[y][x] = 26;
                        break;

                }
            }
            else if (isDigit(piece)) {
                x = x + (Number(piece));
                some = true;
                x -= 1;
            }

        }
        x += 1;


    }

}

function drawpiece(Mem) {
    document.querySelectorAll('.js-box-elem').forEach((item1) => {
        item1.innerHTML = '';
    });
    document.querySelectorAll('.js-box-elem').forEach((item) => {
        const x = item.dataset.idX;
        const y = item.dataset.idY;
        let img_src = '';

        switch (Mem[y][x]) {
            case (11):
                img_src = '<img class="piece"  src="Assets/piece_images/White_King.png">';
                break;
            case (12):
                img_src = '<img class="piece" src="Assets/piece_images/White_Queen.png">';
                break;
            case (13):
                img_src = '<img class="piece" src="Assets/piece_images/White_Bishop.png">';
                break;
            case (14):
                img_src = '<img class="piece" src="Assets/piece_images/White_Knight.png">';
                break;
            case (15):
                img_src = '<img class="piece" src="Assets/piece_images/White_Rook.png">';
                break;
            case (16):
                img_src = '<img class="piece" src="Assets/piece_images/White_Pawn.png">';
                break;
            //
            case (21):
                img_src = '<img class="piece" src="Assets/piece_images/Black_King.png">';
                break;
            case (22):
                img_src = '<img class="piece" src="Assets/piece_images/Black_Queen.png">';
                break;
            case (23):
                img_src = '<img class="piece" src="Assets/piece_images/Black_Bishop.png">';
                break;
            case (24):
                img_src = '<img class="piece" src="Assets/piece_images/Black_Knight.png">';
                break;
            case (25):
                img_src = '<img class="piece" src="Assets/piece_images/Black_Rook.png">';
                break;
            case (26):
                img_src = '<img class="piece" src="Assets/piece_images/Black_Pawn.png">';
                break;

        }
        item.innerHTML = img_src;

    });
}
function debug() {
    //DEBUG
    let something = '';
    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
            something += ` ${boxMem[y][x]} `
        }
        console.log(something);
        something = '';
    }
    //debug END
}
/*
11 ->white King
12 ->white queen
13 ->white bishop
14 ->white knight
15 ->white rook
16 ->white pawn

21 ->black King
22 ->black queen
23 ->black bishop
24 ->black knight
25 ->black rook
26 ->black pawn
*/
function logpseudolegals(x, y, item, item_x, item_y) {
    LegalMoves.push({
        x, y, item, item_x, item_y
    });
}
function boxreshader(obj) {
    document.querySelectorAll('.js-box-elem').forEach((item) => {
        const x = Number(item.dataset.idX);
        const y = Number(item.dataset.idY);

        if ((x == obj.x) && (y == obj.y)) {
            console.log(`${x}:${y}`);
            if ((x + y) % 2 == 0) {
                item.style.backgroundColor = "rgb(240, 216, 180)";
            } else {
                item.style.backgroundColor = "rgb(181, 137, 98)";
            }
        }

    });
}
let LegalMoves = [];
function calculateLegal(item, x, y) {
    console.log(item);
    let is_white = item > 20 ? false : true;
    debug();
    console.log(is_white);
    x = Number(x);
    y = Number(y);
    //Rook
    if (item == 15 || item == 25) {
        //right
        p_x = x + 1;
        p_y = y;
        while (p_x < 8) {
            if (boxMem[p_y][p_x] == 0) {

                logpseudolegals(p_x, p_y, item, x, y);
                p_x += 1;
            } else {
                if (is_white && boxMem[p_y][p_x] > 20) {
                    logpseudolegals(p_x, p_y, item, x, y);
                    p_x += 1;

                } else if (!is_white && boxMem[p_y][p_x] < 17) {
                    logpseudolegals(p_x, p_y, item, x, y);
                    p_x += 1;
                }
                break;
            }
        }
        //left
        p_x = x - 1;
        p_y = y;
        while (p_x >= 0) {
            if (boxMem[p_y][p_x] == 0) {
                logpseudolegals(p_x, p_y, item, x, y);
                p_x -= 1;
            } else {
                if (is_white && boxMem[p_y][p_x] > 20) {
                    logpseudolegals(p_x, p_y, item, x, y);
                    p_x -= 1;

                } else if (!is_white && boxMem[p_y][p_x] < 17) {
                    logpseudolegals(p_x, p_y, item, x, y);
                    p_x -= 1;
                }
                break;
            }
        }
        //up
        p_x = x;
        p_y = y - 1;
        console.log(`${p_x}:${p_y}`);
        while (p_y >= 0) {
            if (boxMem[p_y][p_x] == 0) {
                logpseudolegals(p_x, p_y, item, x, y);
                p_y -= 1;
            } else {
                if (is_white && boxMem[p_y][p_x] > 20) {
                    logpseudolegals(p_x, p_y, item, x, y);
                } else if (!is_white && boxMem[p_y][p_x] < 17) {
                    logpseudolegals(p_x, p_y, item, x, y);
                }
                break;
            }
        }
        //down
        p_x = x;
        p_y = y + 1;
        console.log(`${p_x}:${p_y}`);
        while (p_y < 8) {
            if (boxMem[p_y][p_x] == 0) {
                logpseudolegals(p_x, p_y, item, x, y);
                p_y += 1;
            } else {
                if (is_white && boxMem[p_y][p_x] > 20) {
                    logpseudolegals(p_x, p_y, item, x, y);
                } else if (!is_white && boxMem[p_y][p_x] < 17) {
                    logpseudolegals(p_x, p_y, item, x, y);
                }
                break;
            }
        }



    }
    //bishop
    if (item == 13 || item == 23) {
        //bottom right
        p_x = x + 1;
        p_y = y + 1;
        while (p_x < 8 && p_y < 8) {
            if (boxMem[p_y][p_x] == 0) {
                logpseudolegals(p_x, p_y, item, x, y);
                p_x += 1;
                p_y += 1;
            } else {
                if (is_white && boxMem[p_y][p_x] > 20) {
                    logpseudolegals(p_x, p_y, item, x, y);

                } else if (!is_white && boxMem[p_y][p_x] < 17) {
                    logpseudolegals(p_x, p_y, item, x, y);
                }
                break;
            }
        }
        //top left
        p_x = x - 1;
        p_y = y - 1;
        while (p_x >= 0 && p_y >= 0) {
            if (boxMem[p_y][p_x] == 0) {
                logpseudolegals(p_x, p_y, item, x, y);
                p_x -= 1;
                p_y -= 1;
            } else {
                if (is_white && boxMem[p_y][p_x] > 20) {
                    logpseudolegals(p_x, p_y, item, x, y);

                } else if (!is_white && boxMem[p_y][p_x] < 17) {
                    logpseudolegals(p_x, p_y, item, x, y);
                }
                break;
            }
        }

        //top right
        p_x = x + 1;
        p_y = y - 1;
        while (p_x < 8 && p_y >= 0) {
            if (boxMem[p_y][p_x] == 0) {
                logpseudolegals(p_x, p_y, item, x, y);
                p_x += 1;
                p_y -= 1;
            } else {
                if (is_white && boxMem[p_y][p_x] > 20) {
                    logpseudolegals(p_x, p_y, item, x, y);

                } else if (!is_white && boxMem[p_y][p_x] < 17) {
                    logpseudolegals(p_x, p_y, item, x, y);
                }
                break;
            }
        }
        //bottom left
        p_x = x - 1;
        p_y = y + 1;
        while (p_x >= 0 && p_y < 8) {
            if (boxMem[p_y][p_x] == 0) {
                logpseudolegals(p_x, p_y, item, x, y);
                p_x -= 1;
                p_y += 1;
            } else {
                if (is_white && boxMem[p_y][p_x] > 20) {
                    logpseudolegals(p_x, p_y, item, x, y);

                } else if (!is_white && boxMem[p_y][p_x] < 17) {
                    logpseudolegals(p_x, p_y, item, x, y);
                }
                break;
            }
        }
    }
    //knight
    if (item == 14 || item == 24) {
        p_x = x + 1;
        p_y = y + 2;
        if (p_x < 8 && p_y < 8) {
            if (boxMem[p_y][p_x] == 0) {
                logpseudolegals(p_x, p_y, item, x, y);
            } else {
                if (is_white && boxMem[p_y][p_x] > 20) {
                    logpseudolegals(p_x, p_y, item, x, y);

                } else if (!is_white && boxMem[p_y][p_x] < 17) {
                    logpseudolegals(p_x, p_y, item, x, y);
                }
            }
        }
        p_x = x + 1;
        p_y = y - 2;
        if (p_x < 8 && p_y >= 0) {
            if (boxMem[p_y][p_x] == 0) {
                logpseudolegals(p_x, p_y, item, x, y);
            } else {
                if (is_white && boxMem[p_y][p_x] > 20) {
                    logpseudolegals(p_x, p_y, item, x, y);

                } else if (!is_white && boxMem[p_y][p_x] < 17) {
                    logpseudolegals(p_x, p_y, item, x, y);
                }
            }
        }
        p_x = x - 1;
        p_y = y + 2;
        if (p_x >= 0 && p_y < 8) {
            if (boxMem[p_y][p_x] == 0) {
                logpseudolegals(p_x, p_y, item, x, y);
            } else {
                if (is_white && boxMem[p_y][p_x] > 20) {
                    logpseudolegals(p_x, p_y, item, x, y);

                } else if (!is_white && boxMem[p_y][p_x] < 17) {
                    logpseudolegals(p_x, p_y, item, x, y);
                }
            }
        }
        p_x = x - 1;
        p_y = y - 2;
        if (p_x >= 0 && p_y >= 0) {
            if (boxMem[p_y][p_x] == 0) {
                logpseudolegals(p_x, p_y, item, x, y);
            } else {
                if (is_white && boxMem[p_y][p_x] > 20) {
                    logpseudolegals(p_x, p_y, item, x, y);

                } else if (!is_white && boxMem[p_y][p_x] < 17) {
                    logpseudolegals(p_x, p_y, item, x, y);
                }
            }
        }
        //
        p_x = x + 2;
        p_y = y + 1;
        if (p_x < 8 && p_y < 8) {
            if (boxMem[p_y][p_x] == 0) {
                logpseudolegals(p_x, p_y, item, x, y);
            } else {
                if (is_white && boxMem[p_y][p_x] > 20) {
                    logpseudolegals(p_x, p_y, item, x, y);

                } else if (!is_white && boxMem[p_y][p_x] < 17) {
                    logpseudolegals(p_x, p_y, item, x, y);
                }
            }
        }
        p_x = x + 2;
        p_y = y - 1;
        if (p_x < 8 && p_y >= 0) {
            if (boxMem[p_y][p_x] == 0) {
                logpseudolegals(p_x, p_y, item, x, y);
            } else {
                if (is_white && boxMem[p_y][p_x] > 20) {
                    logpseudolegals(p_x, p_y, item, x, y);

                } else if (!is_white && boxMem[p_y][p_x] < 17) {
                    logpseudolegals(p_x, p_y, item, x, y);
                }
            }
        }
        //
        p_x = x - 2;
        p_y = y + 1;
        if (p_x >= 0 && p_y < 8) {
            if (boxMem[p_y][p_x] == 0) {
                logpseudolegals(p_x, p_y, item, x, y);
            } else {
                if (is_white && boxMem[p_y][p_x] > 20) {
                    logpseudolegals(p_x, p_y, item, x, y);

                } else if (!is_white && boxMem[p_y][p_x] < 17) {
                    logpseudolegals(p_x, p_y, item, x, y);
                }
            }
        }
        p_x = x - 2;
        p_y = y - 1;
        if (p_x >= 0 && p_y >= 0) {
            if (boxMem[p_y][p_x] == 0) {
                logpseudolegals(p_x, p_y, item, x, y);
            } else {
                if (is_white && boxMem[p_y][p_x] > 20) {
                    logpseudolegals(p_x, p_y, item, x, y);

                } else if (!is_white && boxMem[p_y][p_x] < 17) {
                    logpseudolegals(p_x, p_y, item, x, y);
                }
            }
        }




    }
    //queen
    if (item == 12 || item == 22) {
        //rook
        //right
        p_x = x + 1;
        p_y = y;
        while (p_x < 8) {
            if (boxMem[p_y][p_x] == 0) {
                logpseudolegals(p_x, p_y, item, x, y);
                p_x += 1;
            } else {
                if (is_white && boxMem[p_y][p_x] > 20) {
                    logpseudolegals(p_x, p_y, item, x, y);
                    p_x += 1;

                } else if (!is_white && boxMem[p_y][p_x] < 17) {
                    logpseudolegals(p_x, p_y, item, x, y);
                    p_x += 1;
                }
                break;
            }
        }
        //left
        p_x = x - 1;
        p_y = y;
        while (p_x >= 0) {
            if (boxMem[p_y][p_x] == 0) {
                logpseudolegals(p_x, p_y, item, x, y);
                p_x -= 1;
            } else {
                if (is_white && boxMem[p_y][p_x] > 20) {
                    logpseudolegals(p_x, p_y, item, x, y);
                    p_x -= 1;

                } else if (!is_white && boxMem[p_y][p_x] < 17) {
                    logpseudolegals(p_x, p_y, item, x, y);
                    p_x -= 1;
                }
                break;
            }
        }
        //up
        p_x = x;
        p_y = y - 1;
        console.log(`${p_x}:${p_y}`);
        while (p_y >= 0) {
            if (boxMem[p_y][p_x] == 0) {
                logpseudolegals(p_x, p_y, item, x, y);
                p_y -= 1;
            } else {
                if (is_white && boxMem[p_y][p_x] > 20) {
                    logpseudolegals(p_x, p_y, item, x, y);
                } else if (!is_white && boxMem[p_y][p_x] < 17) {
                    logpseudolegals(p_x, p_y, item, x, y);
                }
                break;
            }
        }
        //down
        p_x = x;
        p_y = y + 1;
        console.log(`${p_x}:${p_y}`);
        while (p_y < 8) {
            if (boxMem[p_y][p_x] == 0) {
                logpseudolegals(p_x, p_y, item, x, y);
                p_y += 1;
            } else {
                if (is_white && boxMem[p_y][p_x] > 20) {
                    logpseudolegals(p_x, p_y, item, x, y);
                } else if (!is_white && boxMem[p_y][p_x] < 17) {
                    logpseudolegals(p_x, p_y, item, x, y);
                }
                break;
            }
        }




        //bishop

        //bottom right
        p_x = x + 1;
        p_y = y + 1;
        while (p_x < 8 && p_y < 8) {
            if (boxMem[p_y][p_x] == 0) {
                logpseudolegals(p_x, p_y, item, x, y);
                p_x += 1;
                p_y += 1;
            } else {
                if (is_white && boxMem[p_y][p_x] > 20) {
                    logpseudolegals(p_x, p_y, item, x, y);

                } else if (!is_white && boxMem[p_y][p_x] < 17) {
                    logpseudolegals(p_x, p_y, item, x, y);
                }
                break;
            }
        }
        //top left
        p_x = x - 1;
        p_y = y - 1;
        while (p_x >= 0 && p_y >= 0) {
            if (boxMem[p_y][p_x] == 0) {
                logpseudolegals(p_x, p_y, item, x, y);
                p_x -= 1;
                p_y -= 1;
            } else {
                if (is_white && boxMem[p_y][p_x] > 20) {
                    logpseudolegals(p_x, p_y, item, x, y);

                } else if (!is_white && boxMem[p_y][p_x] < 17) {
                    logpseudolegals(p_x, p_y, item, x, y);
                }
                break;
            }
        }

        //top right
        p_x = x + 1;
        p_y = y - 1;
        while (p_x < 8 && p_y >= 0) {
            if (boxMem[p_y][p_x] == 0) {
                logpseudolegals(p_x, p_y, item, x, y);
                p_x += 1;
                p_y -= 1;
            } else {
                if (is_white && boxMem[p_y][p_x] > 20) {
                    logpseudolegals(p_x, p_y, item, x, y);

                } else if (!is_white && boxMem[p_y][p_x] < 17) {
                    logpseudolegals(p_x, p_y, item, x, y);
                }
                break;
            }
        }
        //bottom left
        p_x = x - 1;
        p_y = y + 1;
        while (p_x >= 0 && p_y < 8) {
            if (boxMem[p_y][p_x] == 0) {
                logpseudolegals(p_x, p_y, item, x, y);
                p_x -= 1;
                p_y += 1;
            } else {
                if (is_white && boxMem[p_y][p_x] > 20) {
                    logpseudolegals(p_x, p_y, item, x, y);

                } else if (!is_white && boxMem[p_y][p_x] < 17) {
                    logpseudolegals(p_x, p_y, item, x, y);
                }
                break;
            }
        }

    }
    //pawn
    //white
    if (item == 16 || item == 26) {
        if (is_white) {
            p_x = x;
            p_y = y;
            if (p_y == 6) {
                if (boxMem[p_y - 1][p_x] == 0) {
                    logpseudolegals(p_x, p_y - 1, item, x, y);

                    if (boxMem[p_y - 2][p_x] == 0) {
                        logpseudolegals(p_x, p_y - 2, item, x, y);
                    }

                }


            } else if (boxMem[p_y - 1][p_x] == 0) {
                logpseudolegals(p_x, p_y - 1, item, x, y);;
            }
            p_x -= 1;
            p_y -= 1;
            if (boxMem[p_y][p_x] > 20) {
                logpseudolegals(p_x, p_y, item, x, y);
            }
            p_x = x + 1;
            p_y = y - 1;
            if (boxMem[p_y][p_x] > 20) {
                logpseudolegals(p_x, p_y, item, x, y);
            }
        } else if (!is_white) {
            p_x = x;
            p_y = y;
            if (p_y == 1) {
                if (boxMem[p_y + 1][p_x] == 0) {
                    logpseudolegals(p_x, p_y + 1, item, x, y);
                    if (boxMem[p_y + 2][p_x] == 0) {
                        logpseudolegals(p_x, p_y + 2, item, x, y);
                    }
                }

            } else if (boxMem[p_y + 1][p_x] == 0) {
                logpseudolegals(p_x, p_y + 1, item, x, y);
            }
            p_x += 1;
            p_y += 1;
            if (boxMem[p_y][p_x] < 20 && boxMem[p_y][p_x] > 10) {
                logpseudolegals(p_x, p_y, item, x, y);
            }
            p_x = x - 1;
            p_y = y + 1;
            if (boxMem[p_y][p_x] < 20 && boxMem[p_y][p_x] > 10) {
                logpseudolegals(p_x, p_y, item, x, y);
            }
        }
    }
    //king
    if (item == 11 || item == 21) {

        let movesArray = [1, -1, 0];
        movesArray.forEach((num_x) => {
            movesArray.forEach((num_y) => {
                if (!(num_x == 0 && num_y == 0)) {
                    p_x = x + num_x;
                    p_y = y +num_y ;
                    console.log(p_x, ':', p_y, "log1");
                    if (is_white) {

                        if (checkInRange(p_x, p_y)) {
                            if (boxMem[p_y][p_x] == 0) {
                                logpseudolegals(p_x, p_y, item, x, y);
                            } else if (boxMem[p_y][p_x] > 20) {
                                logpseudolegals(p_x, p_y, item, x, y);
                            }
                        }

                    } else if (!is_white) {
                        if (checkInRange(p_x, p_y)) {
                            if (boxMem[p_y][p_x] == 0) {
                                logpseudolegals(p_x, p_y, item, x, y);
                            } else if (boxMem[p_y][p_x] <= 16 && boxMem[p_y][p_x] >= 11) {
                                logpseudolegals(p_x, p_y, item, x, y);
                            }
                        }
                    }
                }
            });
        });




    }
    //debug
    console.log(LegalMoves);
}
function checkInRange(x, y) {
    if (x < 8 && x >= 0 && y < 8 && y >= 0) {
        return true;
    } else {
        return false;
    }
}


function shade() {
    let i = 0;

    LegalMoves.forEach((obj1) => {
        let x = obj1.x;
        let y = obj1.y;

        document.querySelectorAll('.js-box-elem').forEach((item) => {
            let HTML_1 = '';
            let idX = item.dataset.idX;
            let idY = item.dataset.idY;
            if (x == idX && y == idY) {
                item.innerHTML += `<div id='selection${i}'class='shade white' data-id-x=${x} data-id-y=${y}></div`;
                i += 1;
            }
        });
    });

    document.querySelectorAll('.shade').forEach((item) => {
        let width = document.getElementById('box').offsetHeight;

        let x = item.dataset.idX;
        let y = item.dataset.idY;
        width -= 10;
        if (boxMem[y][x] == 0) {
            width -= 30;
            item.style.borderRadius = '50' + '%';
            item.style.width = width + "px";
            item.style.height = width + 'px';
        } else {
            item.style.width = width + "px";
            item.style.height = width + 'px';
        }
        item.style.backgroundColor = 'rgb(255,0,0)';

    })
}
function refresh(feninp) {
    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
            boxMem[y][x] = 0;
        }
    }
    FENLoad(feninp);
    drawpiece();
}
