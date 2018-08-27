window.stageLen = 1;
var taken = [];
var c = 2
window.gameLen = $(".stages button").length
window.pLen = gameLen
var amount = $(".stages button").eq(pLen-1).html();
window.rand = Math.floor(Math.random()*3)
var aud = true
var call = true
var fifty = true
var play = true

var game = {
    stages: {
        stage1: {
            que: ["Who is a software engineer?", "What is hacking?", "What is software?"],
            op: [`<span onclick="game.check(c)" class="A">A: maintains computer softwares</span> 
                <span onclick="game.check(4)" class="B del">B: dev maint</span> <span onclick="game.check(1)" class="C">C: softcfvb</span> <span onclick="game.check(3)" class="D del">D: bvccujhbfgv</span>`,
                `<span onclick="game.check(4)" class="A del">A: A perso computer softwares</span> <span onclick="game.check(c)" class="B">B: tinker</span>
                 <span class="C" onclick="game.check(4)">C: etggfbjm</span> <span onclick="game.check(3)" class="D del">D: assdcujhbfgv</span>`, 
                 `<span onclick="game.check(3)" class="A del">A: A person who develops and </span> <span class="B" onclick="game.check(1)">B: A comp</span>
                 <span onclick="game.check(1)" class="C del">C: etggfbjm</span> <span onclick="game.check(c)" class="D">D: inner</span>`
            ]
        },
        stage2: {
            que: ["Who is a software developer?", "What is computer?", "What is hardware"],
        op:     [`<span onclick="game.check(c)" class="A">A: develops computer softwares</span> 
                <span onclick="game.check(1)" class="B del">B: dev maint</span> <span onclick="game.check(3)" class="C del">C: softcfvb</span> <span onclick="game.check(4)" class="D">D: bvccujhbfgv</span>`,
                `<span onclick="game.check(c)" class="A">A: idiot machine</span> <span onclick="game.check(1)" class="B del">B: A comp</span>
                <span onclick="game.check(1)" class="C">C: etggfbjm</span> <span class="D del">D: assdcujhbfgv</span>`, 
                `<span onclick="game.check(4)" class="A del">A: n who develops and maier softwares</span> <span class="B del">B: A comp</span>
                <span onclick="game.check(3)" class="C">C: etggfbjm</span> <span onclick="game.check(c)" class="D">D: Hardware<span>`
            ]
        },
        stage3: {
            que: ["Where is motherboard located?", "What is the full meaning of G.P.U?", "What is the full meaning of HTTP?"],
            op: [`<span onclick="game.check(c)" class="A">A: CPU</span> <span onclick="game.check(3)" class="B">B: dev maint</span> 
                <span onclick="game.check(4)" class="C del">C: softcfvb</span> <span onclick="game.check(1)" class="D del">D: bvccujhbfgv</span>`,
                `<span onclick="game.check(3)" class="A del">A: A person who develops and maintains computer softwares</span> 
                <span onclick="game.check(4)" class="B">B: A comp</span> <span onclick="game.check(c)" class="C">C: GPU</span> <span onclick="game.check(3)" class="D del">D: assdcujhbfgv</span>`, 
                `<span onclick="game.check(1)" class="A">A:  person who develops and</span> <span class="B del">B: A comp</span>
                <span onclick="game.check(4)" class="C del">C: etggfbjm</span> <span onclick="game.check(c)" class="D">D: HTTPS`
            ]
        }
    },
    start: () => {
        rand = game.random()
        $(".welcome").fadeOut(500, function() {
            $("#game").fadeIn(2000)
        });
        setTimeout(function(){
        if(stageLen < 5) {
            $('.quesCon').html(game.stages.stage1.que[rand])
            $('.options').html(game.stages.stage1.op[rand])
        }else if(stageLen < 10) {
            $('.quesCon').html(game.stages.stage2.que[rand])
            $('.options').html(game.stages.stage2.op[rand]) 
        }else{
            $('.quesCon').html(game.stages.stage3.que[rand])
            $('.options').html(game.stages.stage3.op[rand])
        }},500)
    },
    check: (clicked) => {
        if(play){
            call = false, aud = false, fifty = false, play = false
            $(".warning").fadeIn(500, function() {
                $("#game").css("opacity","0.8")
            });
            $(".no").click(function() {
                call = true, aud = true, fifty = true, play = true
                $(".warning").fadeOut(function(){
                    $("#game").css("opacity", "1")
                })
            });
            $(".yes").click(function(){
                $(".warning").fadeOut(500,function(){
                    $("#game").css("opacity", "1")
                    var correct = 2;
                    (clicked == correct) ? game.won() : game.loose()
                })
            })
        }
    },
    random: () => {
        try{
            rand = Math.floor(Math.random()*3);
            while(taken.toString().match(rand)){
                rand = Math.floor(Math.random()*3);
            }
            taken.push(rand);
            return rand;
        }
        catch(e){
            alert(e);
        }
    },
    won: () => {
        if(stageLen <= 15) {
            stageLen++
            taken = stageLen%3 == 0 ? [] : taken;
            amount = $(".stages button").eq(pLen-1).html();
            $(".right").fadeIn(800);
            setTimeout(function(){$("#right").html("You are right!!!")},500)
            setTimeout(function(){$("#right").html("Congratulations!!! You just won " + amount)},1800)
            setTimeout(function(){$("#right").html("Get ready for the next question")},3800)
            setTimeout(function(){
                $(".right").fadeOut(800, function() {
                    $("#right").html("")
                })}, 4500)
            pLen--;
            $(".current").removeClass("current");
            $(".stages button").eq(pLen-1).addClass("current");
            $(".score").html("Score: " + amount)
            gameLen++;
            setTimeout(function(){
                game.start()
                call = true, aud = true, fifty = true, play = true
            },4500)
        }else{
            setTimeout(function(){$("#right").html("You are right!!!")},500)
            setTimeout(function(){$("#right").html("Congratulations!!! You are now a millionaire")},1800)
            setTimeout(function(){
                $(".right").fadeOut(800, function() {
                    $("#right").html("")
                    game.reset()
                })}, 2300)
        }
    },
    loose: () => {
        $(".wrong").fadeIn(800);
        setTimeout(function(){$("#wrong").html("Sorry, you are wrong!!!<br>You are leaving with " + amount)},100)
        setTimeout(function(){$(".wrong").fadeOut(function(){$("#wrong").html("")})}, 1500)
        setTimeout(function(){game.reset()},1500)   
    },
    fifty: () => {
        if(fifty){
            $(".fifty").attr({"src":"../img/fifty2.png","onclick":""}).css("cursor","default")
            $(".fifty:hover").css("background-color","rgb(17, 17, 138)")
            $(".del").html("&nbsp;&nbsp;&nbsp;").attr("onclick","")
        }
    },
    call: () => {
        if(call){
            play = false, aud = false, fifty = false
            var friend = ["Ogochukwu","Ekene","Emeka","Chimobi","Chidera","Chisom","Iweka"]
            randFriend = Math.floor(Math.random()*7);
            var randOpt = ["A","B","C","D"]
            randAns = Math.floor(Math.random()*4);
            var sure = ["100%","80%","60%","50%"]
            var resp = ["It\'s certainly","I think it\'s","Am sure it\'s","It\'s definitely","Am not sure to choose"]
            var randResp = Math.floor(Math.random()*5)
            $(".call").attr({"src":"../img/call2.png","onclick":""}).css("cursor","default")
            $(".call:hover").css("background-color","rgb(17, 17, 138)")
            $(".chatCon").fadeIn(500,function(){$("#game").css("opacity","0.8")});
            setTimeout(function(){$("#chat").html("Calling...")},100)
            setTimeout(function(){$("#chat").html("Connected")},2000)
            setTimeout(function(){$("#chat").html("ME: Hello "+friend[randFriend] +". Am in a hot seat now and i need the answer to this question.<br>"+$(".quesCon").html())},3800)
            setTimeout(function(){$("#chat").html(friend[randFriend]+": Thinking...")},7000)
            setTimeout(function(){$("#chat").html(friend[randFriend]+": "+resp[randResp]+", "+randOpt[randAns]+".")},10000)
            setTimeout(function(){$("#chat").html("ME: How sure are you?")},13000)
            setTimeout(function(){$("#chat").html(friend[randFriend]+": "+sure[randAns]+" sure.")},16000)
            setTimeout(function(){
                $(".chatCon").fadeOut(800, function() {
                    $("#chat").html("")
                    $("#game").css("opacity", "1")
                    play = true
                    aud = true
                    fifty = true
                })}, 18000)
            }
    },
    aud: () => {
        if(aud){
            play = false, call = false, fifty = false
            $(".aud").attr({"src":"../img/aud2.png","onclick":""}).css("cursor","default")
            $(".aud:hover").css("background-color","rgb(17, 17, 138)")
            $(".chatCon").fadeIn(500,function(){$("#game").css("opacity","0.8")})
            setTimeout(function(){$("#chat").html("Throwing question to audience...")},100)
            setTimeout(function(){$("#chat").html("Audience thinking...")},1200)
            setTimeout(function(){
                $(".audCon").fadeIn()
                play = true, call = true, fifty = true},2700)

        }
    },
    reset: () => {
        $("#game").fadeOut()
        setTimeout(function(){$(".welcome").fadeIn(600)},1000)
        call = true, aud = true, fifty = true, play = true
        window.stageLen = 1;
        taken = [];
        c = 2
        window.gameLen = $(".stages button").length
        window.pLen = gameLen
        amount = $(".stages button").eq(pLen-1).html();
        $("img:hover").css("background-color","rgb(250, 121, 0) !important")
        $(".fifty").attr({"src":"../img/fifty.png","onClick":"game.fifty()"}).css("cursor","pointer")
        $(".call").attr({"src":"../img/call.png","onClick":"game.call()"}).css("cursor","pointer")
    },
    about: () => {
        $('.about').fadeIn(1000);
    }
}