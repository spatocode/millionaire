window.stageLen
var taken
var c
window.gameLen
window.pLen
var amount
window.rand
var aud
var call
var fifty
var play

var game = {
    stages: {
        stage1: {
            que: [],
            op: []
        },
        stage2: {
            que: [],
            op:  []
        },
        stage3: {
            que: [],
            op: []
        }
    },
    start: () => {
        $(".welcome").fadeOut(500, function() {
            $("#game").fadeIn(2000)
        })
    }
}