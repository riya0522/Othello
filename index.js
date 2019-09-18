var board = new Array(8);    //arrray declataion
var count = 1;
var player1;
var player2;
for (var i = 0; i < 8; i++)     //2-D arrray declataion
{
    board[i] = new Array(8);
}

for (var i = 0; i < 8; i++)   //array initialization
{
    for (var j = 0; j < 8; j++)
    {
        board[i][j] = 0;
    }
}


var cp1 = 2;                //counter player1
var cp2 = 2;                //counter player2

board[3][3] = 1;
board[3][4] = 2;
board[4][3] = 2;
board[4][4] = 1;

function fly()
{
    window.location.href="rules.html";
}
// function callp1()
// {
//   document.getElementById()
// }
function play()
{
     player1 = document.getElementById("p1").value;
     player2 = document.getElementById("p2").value;

    if(player1===""&&player1.length===0)
    {
        alert("Please enter a valid name for Player 1");

    }
    if(player2===""&&player2.length===0)
    {

        alert("Please enter a valid name for Player 2");


    }
    else
    {
        alert("TEAM BLACK : "+player1+"   "+"TEAM WHITE : "+player2);
        window.location.href = "index1.html";
    }


}


function move(x, y)
{
    var status1=false;
    var status2=false;

    if (board[x][y] !== 0)
    {

        alert("Wrong move");

    }

    else
    {

        var symbol = count % 2;
        if (symbol === 0)
            symbol = 2;


        var xDirec = [-1, -1, 0, 1, 1, 1, 0, -1];

        var yDirec = [0, 1, 1, 1, 0, -1, -1, -1];

        var ans = false;

        for (var k = 0; k < 8; ++k)
        {


            var xsteps = xDirec[k];

            var ysteps = yDirec[k];
            // alert(xsteps+" "+ysteps);
            var i = 0,j = 0;

            for (i = x + xsteps, j = y + ysteps; i < 8 && i >= 0 && j < 8 && j >= 0;)
            {
                // alert(i+" "+j);

                if (board[i][j] === 0)
                {

                    ans = ans || false;

                    break;

                }

                if (board[i][j] == symbol)
                {

                    if (i - xsteps == x && j - ysteps == y)
                    {

                        ans = ans || false;

                        break;

                    }
                    else
                    {
                        // alert(i+" "+j+" "+k);
                        ans = change(symbol, x, y, xsteps, ysteps, i, j);
                        break;
                    }
                }

                j += ysteps;

                i += xsteps;

            }

        }

        if(k==8&&ans==false)
        {
            alert("wrong move");
            // setTimeout(alert("wrong move"),10000);
//       setTimeout(function () {
//     alert("wrong move");
// }, 1000);
// setTimeout(function() { alert("Death"); }, 1000);
// window.setInterval(alert("wrong move"),3000);


        }
        else if (ans == true)
        {

            board[x][y] = parseInt(symbol);

            if (symbol == 1)
            {

                cp1++;

            } else
            {

                cp2++;

            }
            if(cp1+cp2==64)
            {
                gameover();
                return;
            }

            for(var n=0;n<8;n++)
            {
                for(var m=0;m<8;m++)
                {
                    if(board[n][m]==0)
                    {

                        status2=possiblemove((symbol%2)+1,n,m);
                        if(status2==true)
                        {
                            count++;
                            break;
                        }
                    }
                }
                if(status2==true)
                    break;
            }
            if(status2==false)
            {
                alert("No more moves possible for player ");
                for(var n=0;n<8;n++)
                {
                    for(var m=0;m<8;m++)
                    {
                        if(board[n][m]==0)
                        {
                            status1=possiblemove(symbol,n,m);
                            if(status1==true)
                                break;
                        }
                    }
                    if(status1==true)
                    {
                        break;
                    }


                }
                if(status1==false)
                {
                    alert("No more moves possible for player");
                    gameover();
                }

            }



        }
        document.getElementById("score1").innerHTML= cp1;
        document.getElementById("score2").innerHTML=cp2;



    }
}

function change(symbol, x, y, xsteps, ysteps, i, j)
{

    var a = x + xsteps;

    var b = y + ysteps;
    // alert(xsteps+" "+i+" "+ysteps+" "+j);
// if(a==i&&j==b)
// {
// return false;
//
// }
    while (a != i || b != j)
    {



        board[a][b] = symbol;


        if (symbol == 1)
        {

            cp1++;

            cp2--;

            var c=parseInt(a)+1;
            var d=parseInt(b)+1;
            var v =  "r"+c+d;

            document.getElementById(v).style.background = "black";

        }
        else
        {

            cp2++;

            cp1--;
            var c=parseInt(a)+1;
            var d=parseInt(b)+1;
            var v =  "r"+c+d;
            document.getElementById(v).style.background = "white";

        }

        a = a + xsteps;

        b += ysteps;

    }
    var c=parseInt(x)+1;
    var d=parseInt(y)+1;
    var v =  "r"+c+d;
    if(symbol==1)
        document.getElementById(v).style.background = "black";
    else
        document.getElementById(v).style.background = "white";


    return true;


}

function possiblemove(symbol,x,y)
{
    var xDirec = [-1, -1, 0, 1, 1, 1, 0, -1];

    var yDirec = [0, 1, 1, 1, 0, -1, -1, -1];

    var ans = false;

    for (var k = 0; k < 8; ++k)
    {


        var xsteps = xDirec[k];

        var ysteps = yDirec[k];
        // alert(xsteps+" "+ysteps);
        var i = 0,j = 0;

        for (i = x + xsteps, j = y + ysteps; i < 8 && i >= 0 && j < 8 && j >= 0;)
        {
            // alert(i+" "+j);

            if (board[i][j] == 0)
            {

                ans = ans || false;

                break;

            }

            if (board[i][j] == symbol)
            {

                if (i - xsteps == x && j - ysteps == y)
                {

                    ans = ans || false;

                    break;

                }
                else
                {
                    // alert(i+" "+j+" "+k);
                    ans=true;
                    return true;
                }
            }

            j += ysteps;

            i += xsteps;

        }

    }
    return false;
}


function gameover()
{
    if(cp1>cp2)
    {
        // setTimeout(function(){ alert("Hello"); }, 3000);
        // function(){ alert("Hello"); }
        window.setTimeout(func(),7000);
        // alert("Winner is : TEAM RED ");
        // myFunction();
    }

    else if(cp2>cp1)
        alert("Winner is : TEAM WHITE");
    else
        alert("It's a tie!!");

    window.location.href="winner.html";
}
function func()
{
    alert("Winner is : TEAM BLACK ");
}