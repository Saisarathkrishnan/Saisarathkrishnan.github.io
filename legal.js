let pseudoLegals = [];
let ignore = [];
let calculated_Legals_IsLegal = [];
function loglegals(x, y, item, item_x, item_y, z) {
    if (z) {
        pseudoLegals.push({
            x, y, item, item_x, item_y
        });
    } else {
        ignore.push({
            x, y, item, item_x, item_y
        });
    }

}
function calculatePseudoLegalAll(item, x, y, pseudobox_Memory, z) {
    //console.log(item);
    let is_white = item > 20 ? false : true;
    x = Number(x);
    y = Number(y);
    //Rook
    if (item == 15 || item == 25) {
        //right
        p_x = x + 1;
        p_y = y;
        while (p_x < 8) {
            if (pseudobox_Memory[p_y][p_x] == 0) {
                loglegals(p_x, p_y, item, x, y, z);
                p_x += 1;
            } else {
                if (is_white && pseudobox_Memory[p_y][p_x] > 20) {
                    loglegals(p_x, p_y, item, x, y, z);
                    p_x += 1;

                } else if (!is_white && pseudobox_Memory[p_y][p_x] < 17) {
                    loglegals(p_x, p_y, item, x, y, z);
                    p_x += 1;
                }
                break;
            }
        }
        //left
        p_x = x - 1;
        p_y = y;
        while (p_x >= 0) {
            if (pseudobox_Memory[p_y][p_x] == 0) {
                loglegals(p_x, p_y, item, x, y, z);
                p_x -= 1;
            } else {
                if (is_white && pseudobox_Memory[p_y][p_x] > 20) {
                    loglegals(p_x, p_y, item, x, y, z);
                    p_x -= 1;

                } else if (!is_white && pseudobox_Memory[p_y][p_x] < 17) {
                    loglegals(p_x, p_y, item, x, y, z);
                    p_x -= 1;
                }
                break;
            }
        }
        //up
        p_x = x;
        p_y = y - 1;
        //console.log(`${p_x}:${p_y}`);
        while (p_y >= 0) {
            if (pseudobox_Memory[p_y][p_x] == 0) {
                loglegals(p_x, p_y, item, x, y, z);
                p_y -= 1;
            } else {
                if (is_white && pseudobox_Memory[p_y][p_x] > 20) {
                    loglegals(p_x, p_y, item, x, y, z);
                } else if (!is_white && pseudobox_Memory[p_y][p_x] < 17) {
                    loglegals(p_x, p_y, item, x, y, z);
                }
                break;
            }
        }
        //down
        p_x = x;
        p_y = y + 1;
        //console.log(`${p_x}:${p_y}`);
        while (p_y < 8) {
            if (pseudobox_Memory[p_y][p_x] == 0) {
                loglegals(p_x, p_y, item, x, y, z);
                p_y += 1;
            } else {
                if (is_white && pseudobox_Memory[p_y][p_x] > 20) {
                    loglegals(p_x, p_y, item, x, y, z);
                } else if (!is_white && pseudobox_Memory[p_y][p_x] < 17) {
                    loglegals(p_x, p_y, item, x, y, z);
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
            if (pseudobox_Memory[p_y][p_x] == 0) {
                loglegals(p_x, p_y, item, x, y, z);
                p_x += 1;
                p_y += 1;
            } else {
                if (is_white && pseudobox_Memory[p_y][p_x] > 20) {
                    loglegals(p_x, p_y, item, x, y, z);

                } else if (!is_white && pseudobox_Memory[p_y][p_x] < 17) {
                    loglegals(p_x, p_y, item, x, y, z);
                }
                break;
            }
        }
        //top left
        p_x = x - 1;
        p_y = y - 1;
        while (p_x >= 0 && p_y >= 0) {
            if (pseudobox_Memory[p_y][p_x] == 0) {
                loglegals(p_x, p_y, item, x, y, z);
                p_x -= 1;
                p_y -= 1;
            } else {
                if (is_white && pseudobox_Memory[p_y][p_x] > 20) {
                    loglegals(p_x, p_y, item, x, y, z);

                } else if (!is_white && pseudobox_Memory[p_y][p_x] < 17) {
                    loglegals(p_x, p_y, item, x, y, z);
                }
                break;
            }
        }

        //top right
        p_x = x + 1;
        p_y = y - 1;
        while (p_x < 8 && p_y >= 0) {
            if (pseudobox_Memory[p_y][p_x] == 0) {
                loglegals(p_x, p_y, item, x, y, z);
                p_x += 1;
                p_y -= 1;
            } else {
                if (is_white && pseudobox_Memory[p_y][p_x] > 20) {
                    loglegals(p_x, p_y, item, x, y, z);

                } else if (!is_white && pseudobox_Memory[p_y][p_x] < 17) {
                    loglegals(p_x, p_y, item, x, y, z);
                }
                break;
            }
        }
        //bottom left
        p_x = x - 1;
        p_y = y + 1;
        while (p_x >= 0 && p_y < 8) {
            if (pseudobox_Memory[p_y][p_x] == 0) {
                loglegals(p_x, p_y, item, x, y, z);
                p_x -= 1;
                p_y += 1;
            } else {
                if (is_white && pseudobox_Memory[p_y][p_x] > 20) {
                    loglegals(p_x, p_y, item, x, y, z);

                } else if (!is_white && pseudobox_Memory[p_y][p_x] < 17) {
                    loglegals(p_x, p_y, item, x, y, z);
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
            if (pseudobox_Memory[p_y][p_x] == 0) {
                loglegals(p_x, p_y, item, x, y, z);
            } else {
                if (is_white && pseudobox_Memory[p_y][p_x] > 20) {
                    loglegals(p_x, p_y, item, x, y, z);

                } else if (!is_white && pseudobox_Memory[p_y][p_x] < 17) {
                    loglegals(p_x, p_y, item, x, y, z);
                }
            }
        }
        p_x = x + 1;
        p_y = y - 2;
        if (p_x < 8 && p_y >= 0) {
            if (pseudobox_Memory[p_y][p_x] == 0) {
                loglegals(p_x, p_y, item, x, y, z);
            } else {
                if (is_white && pseudobox_Memory[p_y][p_x] > 20) {
                    loglegals(p_x, p_y, item, x, y, z);

                } else if (!is_white && pseudobox_Memory[p_y][p_x] < 17) {
                    loglegals(p_x, p_y, item, x, y, z);
                }
            }
        }
        p_x = x - 1;
        p_y = y + 2;
        if (p_x >= 0 && p_y < 8) {
            if (pseudobox_Memory[p_y][p_x] == 0) {
                loglegals(p_x, p_y, item, x, y, z);
            } else {
                if (is_white && pseudobox_Memory[p_y][p_x] > 20) {
                    loglegals(p_x, p_y, item, x, y, z);

                } else if (!is_white && pseudobox_Memory[p_y][p_x] < 17) {
                    loglegals(p_x, p_y, item, x, y, z);
                }
            }
        }
        p_x = x - 1;
        p_y = y - 2;
        if (p_x >= 0 && p_y >= 0) {
            if (pseudobox_Memory[p_y][p_x] == 0) {
                loglegals(p_x, p_y, item, x, y, z);
            } else {
                if (is_white && pseudobox_Memory[p_y][p_x] > 20) {
                    loglegals(p_x, p_y, item, x, y, z);

                } else if (!is_white && pseudobox_Memory[p_y][p_x] < 17) {
                    loglegals(p_x, p_y, item, x, y, z);
                }
            }
        }
        //
        p_x = x + 2;
        p_y = y + 1;
        if (p_x < 8 && p_y < 8) {
            if (pseudobox_Memory[p_y][p_x] == 0) {
                loglegals(p_x, p_y, item, x, y, z);
            } else {
                if (is_white && pseudobox_Memory[p_y][p_x] > 20) {
                    loglegals(p_x, p_y, item, x, y, z);

                } else if (!is_white && pseudobox_Memory[p_y][p_x] < 17) {
                    loglegals(p_x, p_y, item, x, y, z);
                }
            }
        }
        p_x = x + 2;
        p_y = y - 1;
        if (p_x < 8 && p_y >= 0) {
            if (pseudobox_Memory[p_y][p_x] == 0) {
                loglegals(p_x, p_y, item, x, y, z);
            } else {
                if (is_white && pseudobox_Memory[p_y][p_x] > 20) {
                    loglegals(p_x, p_y, item, x, y, z);

                } else if (!is_white && pseudobox_Memory[p_y][p_x] < 17) {
                    loglegals(p_x, p_y, item, x, y, z);
                }
            }
        }
        //
        p_x = x - 2;
        p_y = y + 1;
        if (p_x >= 0 && p_y < 8) {
            if (pseudobox_Memory[p_y][p_x] == 0) {
                loglegals(p_x, p_y, item, x, y, z);
            } else {
                if (is_white && pseudobox_Memory[p_y][p_x] > 20) {
                    loglegals(p_x, p_y, item, x, y, z);

                } else if (!is_white && pseudobox_Memory[p_y][p_x] < 17) {
                    loglegals(p_x, p_y, item, x, y, z);
                }
            }
        }
        p_x = x - 2;
        p_y = y - 1;
        if (p_x >= 0 && p_y >= 0) {
            if (pseudobox_Memory[p_y][p_x] == 0) {
                loglegals(p_x, p_y, item, x, y, z);
            } else {
                if (is_white && pseudobox_Memory[p_y][p_x] > 20) {
                    loglegals(p_x, p_y, item, x, y, z);

                } else if (!is_white && pseudobox_Memory[p_y][p_x] < 17) {
                    loglegals(p_x, p_y, item, x, y, z);
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
            if (pseudobox_Memory[p_y][p_x] == 0) {
                loglegals(p_x, p_y, item, x, y, z);
                p_x += 1;
            } else {
                if (is_white && pseudobox_Memory[p_y][p_x] > 20) {
                    loglegals(p_x, p_y, item, x, y, z);
                    p_x += 1;

                } else if (!is_white && pseudobox_Memory[p_y][p_x] < 17) {
                    loglegals(p_x, p_y, item, x, y, z);
                    p_x += 1;
                }
                break;
            }
        }
        //left
        p_x = x - 1;
        p_y = y;
        while (p_x >= 0) {
            if (pseudobox_Memory[p_y][p_x] == 0) {
                loglegals(p_x, p_y, item, x, y, z);
                p_x -= 1;
            } else {
                if (is_white && pseudobox_Memory[p_y][p_x] > 20) {
                    loglegals(p_x, p_y, item, x, y, z);
                    p_x -= 1;

                } else if (!is_white && pseudobox_Memory[p_y][p_x] < 17) {
                    loglegals(p_x, p_y, item, x, y, z);
                    p_x -= 1;
                }
                break;
            }
        }
        //up
        p_x = x;
        p_y = y - 1;
        //console.log(`${p_x}:${p_y}`);
        while (p_y >= 0) {
            if (pseudobox_Memory[p_y][p_x] == 0) {
                loglegals(p_x, p_y, item, x, y, z);
                p_y -= 1;
            } else {
                if (is_white && pseudobox_Memory[p_y][p_x] > 20) {
                    loglegals(p_x, p_y, item, x, y, z);
                } else if (!is_white && pseudobox_Memory[p_y][p_x] < 17) {
                    loglegals(p_x, p_y, item, x, y, z);
                }
                break;
            }
        }
        //down
        p_x = x;
        p_y = y + 1;
        //console.log(`${p_x}:${p_y}`);
        while (p_y < 8) {
            if (pseudobox_Memory[p_y][p_x] == 0) {
                loglegals(p_x, p_y, item, x, y, z);
                p_y += 1;
            } else {
                if (is_white && pseudobox_Memory[p_y][p_x] > 20) {
                    loglegals(p_x, p_y, item, x, y, z);
                } else if (!is_white && pseudobox_Memory[p_y][p_x] < 17) {
                    loglegals(p_x, p_y, item, x, y, z);
                }
                break;
            }
        }




        //bishop

        //bottom right
        p_x = x + 1;
        p_y = y + 1;
        while (p_x < 8 && p_y < 8) {
            if (pseudobox_Memory[p_y][p_x] == 0) {
                loglegals(p_x, p_y, item, x, y, z);
                p_x += 1;
                p_y += 1;
            } else {
                if (is_white && pseudobox_Memory[p_y][p_x] > 20) {
                    loglegals(p_x, p_y, item, x, y, z);

                } else if (!is_white && pseudobox_Memory[p_y][p_x] < 17) {
                    loglegals(p_x, p_y, item, x, y, z);
                }
                break;
            }
        }
        //top left
        p_x = x - 1;
        p_y = y - 1;
        while (p_x >= 0 && p_y >= 0) {
            if (pseudobox_Memory[p_y][p_x] == 0) {
                loglegals(p_x, p_y, item, x, y, z);
                p_x -= 1;
                p_y -= 1;
            } else {
                if (is_white && pseudobox_Memory[p_y][p_x] > 20) {
                    loglegals(p_x, p_y, item, x, y, z);

                } else if (!is_white && pseudobox_Memory[p_y][p_x] < 17) {
                    loglegals(p_x, p_y, item, x, y, z);
                }
                break;
            }
        }

        //top right
        p_x = x + 1;
        p_y = y - 1;
        while (p_x < 8 && p_y >= 0) {
            if (pseudobox_Memory[p_y][p_x] == 0) {
                loglegals(p_x, p_y, item, x, y, z);
                p_x += 1;
                p_y -= 1;
            } else {
                if (is_white && pseudobox_Memory[p_y][p_x] > 20) {
                    loglegals(p_x, p_y, item, x, y, z);

                } else if (!is_white && pseudobox_Memory[p_y][p_x] < 17) {
                    loglegals(p_x, p_y, item, x, y, z);
                }
                break;
            }
        }
        //bottom left
        p_x = x - 1;
        p_y = y + 1;
        while (p_x >= 0 && p_y < 8) {
            if (pseudobox_Memory[p_y][p_x] == 0) {
                loglegals(p_x, p_y, item, x, y, z);
                p_x -= 1;
                p_y += 1;
            } else {
                if (is_white && pseudobox_Memory[p_y][p_x] > 20) {
                    loglegals(p_x, p_y, item, x, y, z);

                } else if (!is_white && pseudobox_Memory[p_y][p_x] < 17) {
                    loglegals(p_x, p_y, item, x, y, z);
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
                if (pseudobox_Memory[p_y - 1][p_x] == 0) {
                    loglegals(p_x, p_y - 1, item, x, y, z);
                    if (pseudobox_Memory[p_y - 2][p_x] == 0) {
                        loglegals(p_x, p_y - 2, item, x, y, z);
                    }

                }


            } else if (pseudobox_Memory[p_y - 1][p_x] == 0) {
                loglegals(p_x, p_y - 1, item, x, y, z);
            }
            p_x -= 1;
            p_y -= 1;
            if (pseudobox_Memory[p_y][p_x] > 20) {
                loglegals(p_x, p_y, item, x, y, z);
            }
            p_x = x + 1;
            p_y = y - 1;
            if (pseudobox_Memory[p_y][p_x] > 20) {
                loglegals(p_x, p_y, item, x, y, z);
            }
        } else if (!is_white) {
            p_x = x;
            p_y = y;
            if (p_y == 1) {
                if (pseudobox_Memory[p_y + 1][p_x] == 0) {
                    loglegals(p_x, p_y + 1, item, x, y, z);
                    if (pseudobox_Memory[p_y + 2][p_x] == 0) {
                        loglegals(p_x, p_y + 2, item, x, y, z);
                    }
                }
            } else if (pseudobox_Memory[p_y + 1][p_x] == 0) {
                loglegals(p_x, p_y + 1, item, x, y, z);
            }
            p_x += 1;
            p_y += 1;
            if (pseudobox_Memory[p_y][p_x] < 20 && pseudobox_Memory[p_y][p_x] > 10) {
                loglegals(p_x, p_y, item, x, y, z);
            }
            p_x = x - 1;
            p_y = y + 1;
            if (pseudobox_Memory[p_y][p_x] < 20 && pseudobox_Memory[p_y][p_x] > 10) {
                loglegals(p_x, p_y, item, x, y, z);
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
                    p_y = y + num_y;

                    if (is_white) {

                        if (checkInRange(p_x, p_y)) {
                            if (boxMem[p_y][p_x] == 0) {
                                loglegals(p_x, p_y, item, x, y, z);
                            } else if (boxMem[p_y][p_x] > 20) {
                                loglegals(p_x, p_y, item, x, y, z);
                            }
                        }

                    } else if (!is_white) {
                        if (checkInRange(p_x, p_y)) {
                            if (boxMem[p_y][p_x] == 0) {
                                loglegals(p_x, p_y, item, x, y, z);
                            } else if (boxMem[p_y][p_x] <= 16 && boxMem[p_y][p_x] >= 11) {
                                loglegals(p_x, p_y, item, x, y, z);
                            }
                        }
                    }
                }
            });
        });




    }

}
function legalAll() {
    /*
    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
            let negligible = boxMem[y][x] == 11 || boxMem[y][x] == 21;
            console.log(negligible, 2222);
            if (negligible) {
                continue;
            } else {
                calculatePseudoLegalAll(boxMem[y][x], x, y, boxMem);
            }
        }
    }
    */
    let whiteKingpos = {};
    let blackKingpos = {};
    let LegalMoveObsolute = [];
    LegalMoves.forEach((move, index) => {
        console.log(`--------/////\\\\\\\\\\--------`);
        pseudoLegals = [];
        LegalMoveObsolute = [];
        for (let y = 0; y < 8; y++) {
            let obj = [];
            for (let x = 0; x < 8; x++) {
                obj.push(boxMem[y][x]);
            }
            LegalMoveObsolute.push(obj);
            obj = [];
        }

        //console.log('legals obsolute');
        //console.log(LegalMoveObsolute);

        //console.log(LegalMoveObsolute[move.item_y][move.item_x]);
        LegalMoveObsolute[move.y][move.x] = LegalMoveObsolute[move.item_y][move.item_x];
        LegalMoveObsolute[move.item_y][move.item_x] = 0;



        //
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                let negligible;
                if (selection_IsWhite) {
                    negligible = LegalMoveObsolute[y][x] == 0 || LegalMoveObsolute[y][x] <= 16 && LegalMoveObsolute[y][x] >= 11;
                } else {
                    negligible = LegalMoveObsolute[y][x] == 0 || LegalMoveObsolute[y][x] >= 21;
                }

                if (!negligible) {
                    calculatePseudoLegalAll(LegalMoveObsolute[y][x], x, y, LegalMoveObsolute, true);
                }
            }
        }
        //console.log(pseudoLegals);
        console.log(pseudoLegals.length, 'length');
        //console.log(move);
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {

                if (LegalMoveObsolute[y][x] == 11) {
                    whiteKingpos = { x, y };
                }
                if (LegalMoveObsolute[y][x] == 21) {
                    blackKingpos = { x, y };
                }
            }
        }
        //console.log(pseudoLegals);
        let kingundatt = false;
        pseudoLegals.forEach((item1) => {
            if (selection_IsWhite) {
                if ((item1.x == whiteKingpos.x && item1.y == whiteKingpos.y)) {
                    console.log('king is under attack');
                    kingundatt = true;
                }
            } else {
                if ((item1.x == blackKingpos.x && item1.y == blackKingpos.y)) {
                    console.log('king is under attack');
                    kingundatt = true;
                }
            }
        });
        if (!kingundatt) {
            console.log('hi')
            console.log(move);
            calculated_Legals_IsLegal.push(move);
        }
        console.log(whiteKingpos, blackKingpos);
        //drawpiece(LegalMoveObsolute);
        
    });
    

}


function KingIsAttacked(is_White) {
    let whiteKingpos = {};
    let blackKingpos = {};
    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
            if (boxMem[y][x] == 11) {
                whiteKingpos = { x, y };
            }
            if (boxMem[y][x] == 21) {
                blackKingpos = { x, y };
            }
        }
    }
    ignore=[];
    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
            let negligible;
            if (!is_White) {
                negligible = boxMem[y][x] == 0 || boxMem[y][x] <= 16 && boxMem[y][x] >= 11;
            } else {
                negligible = boxMem[y][x] == 0 || boxMem[y][x] >= 21;
            }

            if (!negligible) {
                calculatePseudoLegalAll(boxMem[y][x], x, y, boxMem, false);
            }
        }
    }
    let kingundatt = false;
    ignore.forEach((item1) => {
        if (is_White) {
            if ((item1.x == blackKingpos.x && item1.y == blackKingpos.y)) {
                kingundatt = true;
                console.log('black',"lol");
            }
        } else {
            if ((item1.x == whiteKingpos.x && item1.y == whiteKingpos.y)) {
                kingundatt = true;
                console.log('black',"lol");
            }
        }

    });
    if(kingundatt){
        console.log('king is under attack', 'lol');
        console.log(whiteKingpos, 'lol');
        console.log(blackKingpos,'lol');
    }else{
        console.log('king is not under attack', 'lol');
        console.log(whiteKingpos, 'lol');
        console.log(blackKingpos,'lol');
    }
    /*
    ignore=[];
    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
            let negligible;
            if (is_White) {
                negligible = boxMem[y][x] == 0 || boxMem[y][x] <= 16 && boxMem[y][x] >= 11;
            } else {
                negligible = boxMem[y][x] == 0 || boxMem[y][x] >= 21;
            }

            if (!negligible) {
                calculatePseudoLegalAll(boxMem[y][x], x, y, boxMem, false);
            }
        }
    }*/
    console.log(ignore,"lol");
    shade3();
    if(ignore.length==0){
        console.log('no legal move',"lol");
    }
}
function shade2() {
    let i = 0;

    calculated_Legals_IsLegal.forEach((obj1) => {
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

    })
}
function shade3() {
    let i = 0;

    ignore.forEach((obj1) => {
        let x = obj1.x;
        let y = obj1.y;

        document.querySelectorAll('.js-box-elem').forEach((item) => {
            let HTML_1 = '';
            let idX = item.dataset.idX;
            let idY = item.dataset.idY;
            if (x == idX && y == idY) {
                item.innerHTML += `<div id='selection${i}'class='shade2 white' data-id-x=${x} data-id-y=${y}></div`;
                i += 1;
            }
        });
    });

    document.querySelectorAll('.shade2').forEach((item) => {
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

    })
}