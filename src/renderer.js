const img = [
  'images/steroidtocat.png',
  'images/megacat-2.png',
  'images/dodgetocat_v2.png',
  'images/mcefeeline.jpg',
  'images/ironcat.jpg',
  'images/gracehoppertocat.jpg',
  'images/spidertocat.png',
  'images/octocat-de-los-muertos.jpg',
  'images/saritocat.png',
  'images/plumber.jpg',
  'images/linktocat.jpg',
  'images/kimonotocat.png'
];

let total = 0;
let move = 0;
let count = 1;

let stopFa = false;
let stopFc = true;
let stopTime = true;

const board = document.querySelector('.board');
const start = document.querySelector('.start');
const again = document.querySelector('.again');
const room = document.querySelector('.room');

const pad = (val) => (val > 9 ? val : `0${val}`);

// 4*6 card group;
let cardId = 0;
for (let i = 0; i < 4; i++) {
  for (let j = 0; j < 6; j++) {
    const div = document.createElement('div');
    div.classList.add('card');
    div.dataset.id = cardId;
    room.appendChild(div);
    const front = document.createElement('div');
    front.classList.add('front');
    front.classList.add('face');

    const back = document.createElement('div');
    back.classList.add('back');
    back.classList.add('face');
    back.dataset.bid = 0;

    div.appendChild(front);
    div.appendChild(back);
    cardId++;
  }

  const br = document.createElement('br');
  room.appendChild(br);
}

start.addEventListener('click', () => {
  total = 0;
  stopFa = true;
  stopFc = false;
  stopTime = false;

  const cards = document.querySelectorAll('.card');
  Array.from(cards).forEach(card => card.classList.remove('flip'));
  start.style.display = 'none';
  randomIMG();
});

again.addEventListener('click', () => {
  stopFa = false;
  stopFc = true;
  start.style.display = 'inline-block';
  board.style.display = 'none';
  const cards = document.querySelectorAll('.card');
  Array.from(cards).forEach(card => card.classList.remove('fliped'));
  randomIMG();
  flipAuto();
  flipAuto();
});

board.style.display = 'none';
randomIMG();
flipAuto();
flipAuto();
flipAuto();
flipClick();

function randomIMG() {
  const cArray = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12];
  let cLength = cArray.length;
  const cards = document.querySelectorAll('.card');

  Array.from(cards).forEach((card) => {
    const rId = Math.floor(Math.random() * (cLength - 1));
    const temp = cArray[rId];
    cArray[rId] = cArray[cLength - 1];
    cArray[cLength - 1] = temp;
    cLength--;

    const cardBack = card.querySelector('.back');
    cardBack.style.backgroundImage = `url('${img[temp - 1]}')`;
    cardBack.style.backgroundRepeat = 'no-repeat';
    cardBack.style.backgroundSize = '100%';
    cardBack.dataset.bid = temp;
  });

  return 0;
}

function flipClick() {
  total = 0;
  move = 0;
  count = 1;
  let firstCard = null;
  let secondCard = null;
  const cards = document.querySelectorAll('.card');
  Array.from(cards).forEach((card, i, arr) => {
    const front = card.querySelector('.front');
    front.addEventListener('click', () => {
      if (stopFc) {
        return 0;
      }

      front.parentElement.classList.toggle('flip');

      move++;
      document.querySelector('.c_move').innerHTML = move;

      if (count === 1) {
        firstCard = card.querySelector('.back').dataset.bid;
      } else if (count === 2) {
        secondCard = card.querySelector('.back').dataset.bid;
      }

      if (firstCard === secondCard) {
        const wonCards = document.querySelectorAll(`[data-bid="${firstCard}"]`);
        Array.from(wonCards).forEach((el) => el.parentElement.classList.add('fliped'));
        total++;

        if (total === 12) {
          stopTime = true;
          const secF = pad(++sec % 60);
          const minF = pad(parseInt(sec / 60, 10));
          stopFc = reset(secF, minF);
          stopFc = true;
          move = 0;
        }
      }

      if (stopFc) return;

      count++;
      if (count > 2) {
        firstCard = null;
        secondCard = null;
        count = 1;
        setTimeout(() => {
          arr.forEach(c => c.classList.remove('flip'));
        }, 400);
      }
    });
  });

  let sec = 0;
  setInterval(() => {
    if (stopTime) {
      sec = 0;
      return;
    }
    document.querySelector('.sec').innerHTML = pad(++sec % 60);
    document.querySelector('.min').innerHTML = pad(parseInt(sec / 60, 10));
  }, 1000);
}

const randomNum = (min, max) => Math.floor(Math.random() * ((max - min) + 1) + min);

function flipAuto(time) {
  setTimeout(() => {
    if (stopFa) return;

    const rRan = randomNum(1, 24);
    const rEl = document.querySelector(`[data-id="${rRan}"]`);
    if (rEl) rEl.classList.toggle('flip');

    const newTime = randomNum(500, 1000);
    flipAuto(newTime);
  }, time);
}

function reset(sec, min) {
  board.style.display = 'block';
  board.querySelector('.scr_moves').innerHTML = 0;
  board.querySelector('.scr_sec').innerHTML = sec;
  board.querySelector('.scr_min').innerHTML = min;
  return true;
}
