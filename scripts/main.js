class Game {
  constructor() {
    this.stageLength = 1
    this.answeredQuestion = []
    this.gameLength = $(".stages button").length
    this.pLen = this.gameLength
    this.amount = $(".stages button").eq(this.pLen-1).html()
    this.enableAskAudienceLifeline = true
    this.enableCallFriendLifeline = true
    this.enableFiftyFiftyLifeline = true
    this.play = true
    this.selected = ''
    this.answer = ''
  }

  getRandomNumber() {
    let random = Math.floor(Math.random()*7)
    try{
      while(this.answeredQuestion.toString().match(random)){
        random = Math.floor(Math.random()*7);
      }
      this.answeredQuestion.push(random);
      return random;
    }
    catch(e){}
  }

  changeQuestionStageData(data) {
    let div
    $(".options").empty()
      $('.question').html(data["question"])
      data["options"].map((option, i) => {
        div = `<div class="${option.slice(0,1)} opt" key="${i}">${option}</div>`
        $(".options").append(div)
      })

      $(".opt").click((e) => {
        this.selected = e.target.textContent.slice(0,1)
        $(".modal").fadeIn(300);
        $(".warning").fadeIn(300)
      })

    this.answer = data["ans"]
  }

  selectQuestion() {
    let randomNumber = this.getRandomNumber()

    // Change stage data at every stage length of 6
    if(this.stageLength < 6) {
      this.changeQuestionStageData(stages.stage1.data[randomNumber])
    }
    else if(this.stageLength < 12) {
      this.changeQuestionStageData(stages.stage2.data[randomNumber])
    }
    else{
      this.changeQuestionStageData(stages.stage3.data[randomNumber])
    }
  }

  start() {
    $('.welcome').fadeOut(500, function() {
      $('#game').fadeIn(500)
    });
    this.selectQuestion()
  }

  displaySuccessMessage() {
    $('.right-wrapper').fadeIn(800);
    setTimeout(function(){$('#right').html("You are right!!!")},500)
    setTimeout(() => {$('#right').html("Congratulations!!! You just won " + this.amount)},1800)
    setTimeout(function(){$('#right').html("Get ready for the next question")},3800)
    setTimeout(function(){
      $('.right-wrapper').fadeOut(800, function() {
        $('#right').html("")
        $(".modal").fadeOut()
      })
    }, 4500)
  }

  rightAnswer() {
    if(this.stageLength < 15) {
      this.stageLength++
      this.answeredQuestion = (this.stageLength % 6 == 0) || (this.stageLength % 11 == 0) ? [] : this.answeredQuestion;
      this.amount = $(".stages button").eq(this.pLen-1).html();

      this.displaySuccessMessage()

      this.pLen--;
      $(".current").removeClass("current");
      $(".stages button").eq(this.pLen).addClass("current");
      $(".score").html("Score: " + this.amount)
      this.gameLength++;

      setTimeout(() => {
        this.selectQuestion()
      }, 4500)
    }
    else{
      this.displayWinnerMessage()
    }
  }

  displayWinnerMessage() {
    $('.right-wrapper').fadeIn(800);
    setTimeout(function(){$('#right').html("You are right!!!")},500)
    setTimeout(function(){$('#right').html("Congratulations!!! You are now a millionaire")}, 1800)
    setTimeout(() => {
      $('.right-wrapper').fadeOut(800, () => {
        $('#right').html("")
        this.resetGame()
      })
    }, 2300)
  }

  wrongAnswer() {
    $('.wrong-wrapper').fadeIn(800);

    setTimeout(() => {
      $('#wrong').html(`Sorry, you are wrong!!!<br>You are leaving with ${this.amount}`)
    },100)

    setTimeout(
      function(){
        $('.wrong-wrapper').fadeOut(function(){
          $('#wrong').html("")
          $(".modal").fadeOut(800)
        })
      }
    ,1500)

    setTimeout(() => { this.resetGame() }, 1500) 
  }

  fiftyFiftyLifeline() {
    var options = ["D", "A", "C", "B"]
    var removedOptions = []
    $(".fifty").attr({"src":"images/fifty2.png"}).css("cursor","default")
    $(".fifty:hover").css("background-color","rgb(17, 17, 138)")
    this.enableFiftyFiftyLifeline = false

    for(var i = 0; i < options.length; i++){
      if(options[i] != this.answer){
        if(removedOptions.length < 2){
          removedOptions.push(options[i])
          for(var i = 0; i < removedOptions.length; i++){
            $(`div.${removedOptions[i]}`).html(`${removedOptions[i]}:`)
          }
        }
      }
    }
  }

  displayGameStatusMessage(message, timeout) {
    if(!timeout) {
      $('#chat').html(message)
      return
    }
    setTimeout(() => {
      $('#chat').html(message)
    }, timeout)
  }

  callFriendLifeline() {
    let friendRandomNumber = Math.floor(Math.random()*7);
    let friendRandomResponse = Math.floor(Math.random()*4)
    let friends = ["Ngozi", "Ekene", "Chioma", "Kenneth", "Bright", "Chisom", "Adaeze"]
    let confidencePercentage = ["100%", "80%", "60%", "50%", "30%"]
    let responseMessage = ["Am sure it's", "It's certainly", "It's definitely", "I think it's", "Am not sure to choose"]

    $(".call").attr({"src":"images/call2.png"}).css("cursor","default")
    $(".call:hover").css("background-color", "rgb(17, 17, 138)")
    $(".modal").fadeIn()
    $('.chat-wrapper').fadeIn(500);

    this.displayGameStatusMessage("Calling... ☎", 100)
    this.displayGameStatusMessage("Connected ✔", 2000)

    setTimeout(() => {
      const playerMessage = `ME: Hello ${friends[friendRandomNumber]}. 😞 Am in a hot seat now and i need the answer to this question.<br>${$('.question').html()}`
      this.displayGameStatusMessage(playerMessage)
    }, 3800)

    setTimeout(() => {
      this.displayGameStatusMessage(`${friends[friendRandomNumber]}: Thinking...`)
    }, 7000)

    setTimeout(() => {
      const message = `${friends[friendRandomNumber]}: ${responseMessage[friendRandomResponse]} ${this.answer}.`
      this.displayGameStatusMessage(message)
    }, 10000)

    setTimeout(() => {
      this.displayGameStatusMessage("ME: How sure are you?")
    }, 13000)

    setTimeout(() => {
      const message = `${friends[friendRandomNumber]}: ${confidencePercentage[friendRandomResponse]} sure.`
      this.displayGameStatusMessage(message)
    }, 16000)

    setTimeout(() => {
      $('.chat-wrapper').fadeOut(800, () => {
        this.displayGameStatusMessage("")
        $(".modal").fadeOut()
        this.enableCallFriendLifeline = false
      })
    }, 18000)
  }

  askAudienceLifeline() {
    $(".aud").attr({"src":"images/aud2.png"}).css("cursor","default")
    $(".aud:hover").css("background-color","rgb(17, 17, 138)")
    $(".modal").fadeIn()
    $(".chat-wrapper").fadeIn(500)
            
    setTimeout(() => {
      this.displayGameStatusMessage("Throwing question to audience...")
    }, 100)

    setTimeout(() => {
      this.displayGameStatusMessage("Audience thinking...")
    }, 1200)

    setTimeout(() => {
      $(".chat-wrapper").fadeOut()
      this.displayGameStatusMessage("")
      $('.audience-wrapper').fadeIn()
      this.enableAskAudienceLifeline = false
    }, 2700)

    var options = ["D", "A", "C", "B"]
    var audiencePercentage = ["15", "32", "48", "54", "60"]

    for(var i = 0; i < options.length; i++){
      if(options[i] != this.answer){
        $(`.bar-${options[i]}`).css("width", `${audiencePercentage[i]}%`)
      }else {
        var highestPercentage = Number(audiencePercentage[4]) + 
                                  Math.floor(Math.random() * (23 -10)) + 10
        $(`.bar-${this.answer}`).css("width", `${highestPercentage}%`)
      }
    }

    $(".closeBtn").click(function(){
      $(".audience-wrapper").fadeOut()
      $(".modal").fadeOut()
    })
  }

  resetGame() {
    $(".modal").fadeOut()
    $("#game").fadeOut()

    setTimeout(
      function(){$(".welcome").fadeIn(600)}
    ,1000)

    this.enableCallFriendLifeline = true
    this.enableAskAudienceLifeline = true
    this.enableFiftyFiftyLifeline = true
    this.stageLength = 1;
    this.answeredQuestion = [];

    this.gameLength = $(".stages button").length
    this.pLen = this.gameLength
    this.amount = $(".stages button").eq(this.pLen-1).html();
        
    $("img:hover").css("background-color","rgb(250, 121, 0) !important")
    $(".fifty").attr({"src":"images/fifty.png","onClick":"game.fifty()"}).css("cursor","pointer")
    $(".callFriend").attr({"src":"images/call.png","onClick":"game.call_a_friend()"}).css("cursor","pointer")
  }
}

/**
 * Mouse event handlers
 */
(function initGame() {
  const game = new Game()
  $(".no").click(function() {
    $(".modal").fadeOut()
  });

  $(".yes").click(function(){
    $('.warning').fadeOut(500,
      function(){
        (game.selected == game.answer) ? game.rightAnswer() : game.wrongAnswer()
      }
    )
  })

  $(".about-btn").click(function(){
    $('.about').fadeIn(1000);
  })

  $(".fifty").click(function(){
    if(game.enableFiftyFiftyLifeline)
      game.fiftyFiftyLifeline()
  })

  $(".call").click(function(){
    if(game.enableCallFriendLifeline)
      game.callFriendLifeline()
  })

  $(".aud").click(function(){
    if(game.enableAskAudienceLifeline)
      game.askAudienceLifeline()
  })

  $(".start-btn").click(function(){
    game.start()
  })
})()
