function ShowAlert() {
  alert("Hello world!!");
}
// 文字を分割する
function splitStringIntoChunks(inputString, chunkSize = 5) {
  const result = [];
  for (let i = 0; i < inputString.length; i += chunkSize) {
    result.push(inputString.slice(i, i + chunkSize));
  }
  return result;
}

// 分割した文字列からHTML要素を作成して追加
function createElementsFromChunks(chunks) {
  const container = document.getElementById("Genkou");

  chunks.forEach(chunk => {
    const newElement = document.createElement("span"); // 新しいHTML要素（段落）を作成
    newElement.textContent = chunk; // 分割された文字列を設定
    container.appendChild(newElement); // コンテナに追加
  });
}
let tId;
// 10秒ごとにハイライト
async function logSpanTagsWithDelay() {
  // 対象の要素を取得
  const targetElement = document.getElementById('Genkou');

  if (targetElement) {
    let timeoutID;

    // 対象要素内のすべての<span>タグを取得
    const spanTags = targetElement.getElementsByTagName("span");
    startTime = Date.now();
    displayTime();
    
    // 非同期で1つずつ処理
    for (let i = 0; i < spanTags.length; i++) {
      console.log(spanTags[i].textContent); // spanタグのテキストを出力
      spanTags[i].classList.add('mark');
      await new Promise(resolve => tId = setTimeout(resolve, 1000)); // 10秒待機
      spanTags[i].classList.remove('mark');
    }

    console.log("全ての<span>タグの処理が完了しました。");
  } else {
    console.warn(`ID の要素が見つかりません。`);
  }
  clearTimeout(timeoutID);
}

// 時間を表示する関数
function displayTime() {
  const currentTime = new Date(Date.now() - startTime);
  const m = String(currentTime.getMinutes()).padStart(2, '0');
  const s = String(currentTime.getSeconds()).padStart(2, '0');
  const ms = String(currentTime.getMilliseconds()).padStart(3, '0');

  time.textContent = `${m}:${s}.${ms}`;
  timeoutID = setTimeout(displayTime, 10);
}

function start() {
  let Textarea = document.getElementById('textarea');
  let texttext = Textarea.value.trim();
  let Genkou = document.getElementById('Genkou');
  Textarea.style.display = "none";
  Genkou.style.display = "";
  while(Genkou.firstChild){
    Genkou.removeChild(Genkou.firstChild)
  }

  // 文字列を分割
  const chunks = splitStringIntoChunks(texttext);
  createElementsFromChunks(chunks);
  logSpanTagsWithDelay();
  Textarea.style.display = "null";
}

function resetting() {
  document.getElementById('Genkou').style.display = "none";
  document.getElementById('textarea').style.display = "";
  clearTimeout(timeoutID);
}