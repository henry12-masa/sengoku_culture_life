// script.js

window.quizData = window.quizData || {};

const params = new URLSearchParams(location.search);
const type = params.get("type") || "food";

const quizInfo = {

  food:{
    title:"戦国飯クイズ",
    desc:"戦国時代の食事クイズ"
  },

  weapon:{
    title:"当時の武器、値段いくら？",
    desc:"武器価格クイズ"
  },

  black:{
    title:"武士のブラック労働クイズ",
    desc:"過酷労働クイズ"
  },

  torture:{
    title:"実在した拷問クイズ",
    desc:"軽め歴史クイズ"
  },

  armor:{
    title:"この鎧、重さどれくらい？",
    desc:"鎧重量クイズ"
  },

  life:{
    title:"戦国時代の平均寿命クイズ",
    desc:"寿命クイズ"
  },

  money:{
    title:"当時の貨幣価値クイズ",
    desc:"昔のお金クイズ"
  },

  tea:{
    title:"この茶器、誰が愛した？",
    desc:"茶道具クイズ"
  }

};

const menu = document.getElementById("menu");

Object.keys(quizInfo).forEach(key=>{

  const btn = document.createElement("button");

  btn.textContent = quizInfo[key].title;

  btn.onclick=()=>{
    location.href=`?type=${key}`;
  };

  menu.appendChild(btn);

});

document.getElementById("title").textContent =
quizInfo[type].title;

document.getElementById("desc").textContent =
quizInfo[type].desc;

const allQuestions =
window.quizData[type] || [];

const quiz =
[...allQuestions]
.sort(()=>Math.random()-0.5)
.slice(0,50);

let current = 0;
let score = 0;

const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const resultEl = document.getElementById("result");

function updateBar(){

  const per = (current / quiz.length) * 100;

  document.getElementById("bar").style.width =
  per + "%";

}

function showQuestion(){

  if(current >= quiz.length){

    questionEl.textContent =
    `終了！ ${score} / ${quiz.length}問正解！`;

    choicesEl.innerHTML = "";

    resultEl.textContent = "";

    document.getElementById("bar").style.width =
    "100%";

    return;
  }

  const q = quiz[current];

  document.getElementById("count").textContent =
  `${current+1} / ${quiz.length}`;

  questionEl.textContent = q.question;

  choicesEl.innerHTML = "";

  q.choices.forEach(choice=>{

    const btn = document.createElement("button");

    btn.className = "choice";

    btn.textContent = choice;

    btn.onclick = ()=>{

      if(choice === q.answer){

        score++;
        resultEl.textContent = "⭕ 正解";

      }else{

        resultEl.textContent =
        `❌ 正解: ${q.answer}`;

      }

      document.getElementById("score").textContent =
      `スコア:${score}`;

      current++;

      updateBar();

      setTimeout(showQuestion,800);

    };

    choicesEl.appendChild(btn);

  });

}

updateBar();
showQuestion();