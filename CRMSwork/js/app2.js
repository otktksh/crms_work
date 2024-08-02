//input動作で入力を逐一チェック。
document.getElementById("search-form").addEventListener("input", function(event) {
  validateForm(false);  //ValidateForm関数で定義したcheckEmptyのブール値がfalseになって関数内の
                        //checkEmptyのif文はfalseの条件を設定していないから空白バリデーションは行われない
});

document.getElementById("search-form").addEventListener("submit", function(event) {
  let errorFlag = validateForm(true); //このsubmitイベントでsubmitした際にvalidateForm関数の引数をtrueにした
                                      //空白バリ用if文も含めた処理がされる。そして関数内の最後にerrorFlagの
                                      //ブール値がreturnされて、それがここのerrorFlag変数に格納される。
  if (errorFlag) {
    event.preventDefault(); //上のreturnでerrorFlagにtrueが格納されていたら、この処理でフォームの挙動は行わない
  }                         //もしfalseだったら何も処理を書かれてないのでhtmlに書いてあるactionが行われる                          

});
                    //↓これはブール値だけど変数ではない、ただ上のtrueとfalseを受け取る箱。引数
function validateForm(checkEmpty) {
  let inputName = document.getElementById("name").value;
  let nameKana = document.getElementById("name-kana").value;
  let gender = document.getElementsByName("choice");
  let calendarStart = document.getElementById("calendar-start").value;
  let calendarEnd= document.getElementById("calendar-end").value;
  let company = document.getElementById("company-select").value;

  let errorMessageName = document.getElementById("error-message-name");
  let errorMessageNameKana = document.getElementById("error-message-name-kana");
  let errorMessageGen = document.getElementById("error-message-gender");
  let errorMessageDate = document.getElementById("error-message-date");
  let errorMessageCom = document.getElementById("error-message-company");

  errorMessageName.innerHTML = "";
  errorMessageNameKana.innerHTML = "";
  errorMessageGen.innerHTML = "";
  errorMessageDate.innerHTML = "";
  errorMessageCom.innerHTML = "";

  let errorFlag = false;

  console.log("k")

  //checkEmptyがtrueの時はこのif文のバリデーションが行われる
  //falseだったらこの空白用のバリデーションは無視されて下の入力内容のバリデーションが行われる
  if (checkEmpty) {
    if (inputName === "") {
      errorMessageName.innerHTML += "<p>※名前を入力してください</p>";
      errorFlag = true;
    }

    if (nameKana === "") {
      errorMessageNameKana.innerHTML += "<p>※カナ名を入力してください</p>";
      errorFlag = true;
    }

    let genderSelected = false;
    gender.forEach(choiceEl => {
      if (choiceEl.checked) {
        genderSelected = true;
      }
    });

    if (!genderSelected) {
      errorMessageGen.innerHTML += "<p>※性別を選択してください</p>";
      errorFlag = true;
    }

    if (calendarStart === "" || calendarEnd === "") {
      errorMessageDate.innerHTML += "<p>※生年月日を入力してください</p>";
      errorFlag = true;
    }

    if (company === "") {
      errorMessageCom.innerHTML += "<p>※所属会社を選択してください</p>";
      errorFlag = true;
    }
  }

  if (inputName.length > 0 && inputName.length < 3) {
    errorMessageName.innerHTML += "<p>※名前は3文字以上入力してください</p>";
    errorFlag = true;
  }

  if (nameKana.length > 0 && nameKana.length < 3) {
    errorMessageNameKana.innerHTML += "<p>※カナ名は3文字以上入力してください</p>";
    errorFlag = true;
  }

  // if (calendarStart > calendarEnd || calendarEnd < calendarStart) {
  //   errorMessageDate.innerHTML += "<p>※開始日より前の日付は選べません</p>";
  //   errorFlag = true;
  // }

  //↑までの処理でerrorFlagがtrueだとhtmlのsubmitボタンがdisabledされる
  let button = document.getElementById("submit");
  button.disabled = errorFlag;

  //関数を呼び出した奴にerrorFlagのブール値を投げる、このプログラムだとsubmit時DOM操作のerrorFlag変数
  return errorFlag;
}

