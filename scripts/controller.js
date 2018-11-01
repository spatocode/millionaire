let welcome = $('.welcome')
let game = $('#game')
let question = $('.question')
let options = $('.options')
let warning = $('.warning')
let yes = $(".yes")
let no = $(".no")
let right_wrapper = $('.right-wrapper')
let right = $('#right')
let wrong_wrapper = $('.wrong-wrapper')
let wrong = $('#wrong')
let chat = $('#chat')
let chat_wrapper = $('.chat-wrapper')
let stageLen = 1;
let selected
let taken = [];
let c = 2
let gameLength = $(".stages button").length
let pLen = gameLength
let amount = $(".stages button").eq(pLen-1).html();
let rand = Math.floor(Math.random()*3)
let audience = true
let call_a_friend = true
let fifty_fifty = true
let play = true

function random(){
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
}

let app = {
    start_game: function start_game(){
        rand = random()
    
            welcome.fadeOut(500, function() {
                game.fadeIn(500)
            });
    
            setTimeout(
                function(){
                if(stageLen < 5) {
                    question.html(stages.stage1.que[rand])
                    options.html(stages.stage1.op[rand])
                }else if(stageLen < 10) {
                    question.html(stages.stage2.que[rand])
                    options.html(stages.stage2.op[rand]) 
                }else{
                    question.html(stages.stage3.que[rand])
                    options.html(stages.stage3.op[rand])
                }
            },
            500)
    },
    check: function check(clicked){
        if(play){
            call_a_friend = false, audience = false, fifty_fifty = false, play = false;
            warning.fadeIn(500, function() {
                game.css("opacity","0.8")
            });
            selected = clicked
        }
    },
    won: function won(){
        if(stageLen <= 15) {
            stageLen++
            taken = stageLen%3 == 0 ? [] : taken;
            amount = $(".stages button").eq(pLen-1).html();
    
            right_wrapper.fadeIn(800);
            setTimeout(function(){right.html("You are right!!!")},500)
            setTimeout(function(){right.html("Congratulations!!! You just won " + amount)},1800)
            setTimeout(function(){right.html("Get ready for the next question")},3800)
            setTimeout(function(){
                right_wrapper.fadeOut(800, function() {
                    right.html("")
                })}, 4500)
    
            pLen--;
            $(".current").removeClass("current");
            $(".stages button").eq(pLen-1).addClass("current");
            $(".score").html("Score: " + amount)
            gameLength++;
    
            setTimeout(() => {
                this.start_game()
                call_a_friend = true, audience = true, fifty_fifty = true, play = true
            },
            4500)
        }
        else{
            setTimeout(function(){right.html("You are right!!!")},500)
            setTimeout(function(){right.html("Congratulations!!! You are now a millionaire")},1800)
            setTimeout(
                () => {
                    right_wrapper.fadeOut(800, () => {
                        right.html("")
                        this.reset()
                    })
                },
                 2300)
        }
    },
    loose: function loose(){
        wrong_wrapper.fadeIn(800);

        setTimeout(
            function(){wrong.html(`Sorry, you are wrong!!!<br>You are leaving with ${amount}`)}
        ,100)

        setTimeout(
            function(){
                wrong_wrapper.fadeOut(function(){wrong.html("")})
            }
        ,1500)
        
        setTimeout(() => { this.reset() }, 1500) 
    },
    fifty: function fifty(){
        if(fifty_fifty){
            $(".fifty").attr({"src":"../images/fifty2.png","onclick":""}).css("cursor","default")
            $(".fifty:hover").css("background-color","rgb(17, 17, 138)")
            $(".del").html("&nbsp;&nbsp;&nbsp;").attr("onclick","")
        }
    },
    call: function call(){
        if(call_a_friend){
            play = false, audience = false, fifty_fifty = false
            let friend = ["Ogochukwu","Ekene","Emeka","Chimobi","Chidera","Chisom","Iweka"]
            randFriend = Math.floor(Math.random()*7);
            let randOpt = ["A","B","C","D"]
            randAns = Math.floor(Math.random()*4);
            let sure = ["100%","80%","60%","50%"]
            let resp = ["It\'s certainly","I think it\'s","Am sure it\'s","It\'s definitely","Am not sure to choose"]
            let randResp = Math.floor(Math.random()*5)
    
            $(".call").attr({"src":"../images/call2.png","onclick":""}).css("cursor","default")
            $(".call:hover").css("background-color","rgb(17, 17, 138)")
            chat_wrapper.fadeIn(500,function(){game.css("opacity","0.8")});
    
            setTimeout(() => {
                chat.html("Calling...")
            },100)

            setTimeout(() => {
                chat.html("Connected")
            },2000)

            setTimeout(
                function(){
                chat.html(`ME: Hello ${friend[randFriend]}. Am in a hot seat now and i need the answer to this question.<br>${question.html()}`)
            }
            ,3800)
            
            setTimeout(
                function(){chat.html(`${friend[randFriend]}: Thinking...`)
            }
            ,7000)

            setTimeout(
                function(){chat.html(`${friend[randFriend]} ${resp[randResp]}, ${randOpt[randAns]}.`)}
            ,10000)

            setTimeout(
                function(){chat.html("ME: How sure are you?")}
            ,13000)

            setTimeout(
                function(){chat.html(`${friend[randFriend]}: ${sure[randAns]} sure.`)}
            ,16000)
            
            setTimeout(
                function(){
                    chat_wrapper.fadeOut(800, function() {
                        chat.html("")
                        game.css("opacity", "1")
                        play = true
                        audience = true
                        fifty_fifty = true
                    })
            }
                , 18000)
            }
    },
    audience: function aud(){
        if(audience){
            play = false, call_a_friend = false, fifty_fifty = false
    
            $(".aud").attr({"src":"../images/aud2.png","onclick":""}).css("cursor","default")
            $(".aud:hover").css("background-color","rgb(17, 17, 138)")
            $(".chat_wrapper").fadeIn(500,function(){$("#game").css("opacity","0.8")})
            
            setTimeout(
                function(){chat.html("Throwing question to audience...")}
            ,100)

            setTimeout(
                function(){chat.html("Audience thinking...")}
            ,1200)

            setTimeout(
                function(){
                audience_wrapper.fadeIn()
                play = true, call_a_friend = true, fifty_fifty = true
                }
            ,2700)
        }
    },
    reset: function reset(){
        $("#game").fadeOut()

        setTimeout(
            function(){$(".welcome").fadeIn(600)}
        ,1000)
    
        call_a_friend = true, audience = true, fifty_fifty = true, play = true
        window.stageLen = 1;
        taken = [];
        c = 2

        gameLength = $(".stages button").length
        pLen = gameLength
        amount = $(".stages button").eq(pLen-1).html();
        
        $("img:hover").css("background-color","rgb(250, 121, 0) !important")
        $(".fifty").attr({"src":"../img/fifty.png","onClick":"game.fifty()"}).css("cursor","pointer")
        $(".call_a_friend").attr({"src":"../img/call_a_friend.png","onClick":"game.call_a_friend()"}).css("cursor","pointer")
    }
}

no.click(function() {
    call_a_friend = true, audience = true, fifty_fifty = true, play = true
    warning.fadeOut(
        function(){
            game.css("opacity", "1")
        }
    )
});

yes.click(function(){
    warning.fadeOut(500,
        function(){
            game.css("opacity", "1")
            let correct = 2;
            (selected == correct) ? app.won() : app.loose()
        }
    )
})

const stages = {
        stage1: {
            que: ["Who is a software engineer?", "What is hacking?", "What is software?"],
            op: [`<span onclick="app.check(c)" class="A">A: maintains computer softwares</span> 
                <span onclick="app.check(4)" class="B del">B: dev maint</span> <span onclick="app.check(1)" class="C">C: softcfvb</span> <span onclick="app.check(3)" class="D del">D: bvccujhbfgv</span>`,
                `<span onclick="app.check(4)" class="A del">A: A perso computer softwares</span> <span onclick="app.check(c)" class="B">B: tinker</span>
                 <span class="C" onclick="app.check(4)">C: etggfbjm</span> <span onclick="app.check(3)" class="D del">D: assdcujhbfgv</span>`, 
                 `<span onclick="app.check(3)" class="A del">A: A person who develops and </span> <span class="B" onclick="app.check(1)">B: A comp</span>
                 <span onclick="app.check(1)" class="C del">C: etggfbjm</span> <span onclick="app.check(c)" class="D">D: inner</span>`
            ]
        },
        stage2: {
            que: ["Who is a software developer?", "What is computer?", "What is hardware"],
        op:     [`<span onclick="app.check(c)" class="A">A: develops computer softwares</span> 
                <span onclick="app.check(1)" class="B del">B: dev maint</span> <span onclick="app.check(3)" class="C del">C: softcfvb</span> <span onclick="app.check(4)" class="D">D: bvccujhbfgv</span>`,
                `<span onclick="app.check(c)" class="A">A: idiot machine</span> <span onclick="app.check(1)" class="B del">B: A comp</span>
                <span onclick="app.check(1)" class="C">C: etggfbjm</span> <span class="D del">D: assdcujhbfgv</span>`, 
                `<span onclick="app.check(4)" class="A del">A: n who develops and maier softwares</span> <span class="B del">B: A comp</span>
                <span onclick="app.check(3)" class="C">C: etggfbjm</span> <span onclick="app.check(c)" class="D">D: Hardware<span>`
            ]
        },
        stage3: {
            que: ["Where is motherboard located?", "What is the full meaning of G.P.U?", "What is the full meaning of HTTP?"],
            op: [`<span onclick="app.check(c)" class="A">A: CPU</span> <span onclick="app.check(3)" class="B">B: dev maint</span> 
                <span onclick="app.check(4)" class="C del">C: softcfvb</span> <span onclick="app.check(1)" class="D del">D: bvccujhbfgv</span>`,
                `<span onclick="app.check(3)" class="A del">A: A person who develops and maintains computer softwares</span> 
                <span onclick="app.check(4)" class="B">B: A comp</span> <span onclick="app.check(c)" class="C">C: GPU</span> <span onclick="app.check(3)" class="D del">D: assdcujhbfgv</span>`, 
                `<span onclick="app.check(1)" class="A">A:  person who develops and</span> <span class="B del">B: A comp</span>
                <span onclick="app.check(4)" class="C del">C: etggfbjm</span> <span onclick="app.check(c)" class="D">D: HTTPS`
            ]
        }
    }

$(".about-btn").click(function(){
    $('.about').fadeIn(1000);
})

$(".fifty").click(function(){
    app.fifty()
})

$(".call").click(function(){
    app.call()
})

$(".aud").click(function(){
    app.audience()
})

$(".start-btn").click(function(){
    app.start_game()
})