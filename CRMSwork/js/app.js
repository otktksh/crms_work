//input動作で入力を逐一チェック。
document.getElementById("registration-form").addEventListener("input", function(event) {
  validateForm(false);  //ValidateForm関数で定義したcheckEmptyのブール値がfalseになって関数内の
                        //checkEmptyのif文はfalseの条件を設定していないから空白バリデーションは行われない
});

document.getElementById("registration-form").addEventListener("submit", function(event) {
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
  let mail = document.getElementById("mail").value;
  let tel = document.getElementById("tel").value;
  let gender = document.getElementsByName("choice");
  let calendar = document.getElementById("calendar").value;
  let company = document.getElementById("company-select").value;

  let errorMessageName = document.getElementById("error-message-name");
  let errorMessageNameKana = document.getElementById("error-message-name-kana");
  let errorMessageMail = document.getElementById("error-message-mail");
  let errorMessageTel = document.getElementById("error-message-tel");
  let errorMessageGen = document.getElementById("error-message-gender");
  let errorMessageDate = document.getElementById("error-message-date");
  let errorMessageCom = document.getElementById("error-message-company");

  errorMessageName.innerHTML = "";
  errorMessageNameKana.innerHTML = "";
  errorMessageMail.innerHTML = "";
  errorMessageTel.innerHTML = "";
  errorMessageGen.innerHTML = "";
  errorMessageDate.innerHTML = "";
  errorMessageCom.innerHTML = "";

  let errorFlag = false;

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

    if (mail === "") {
      errorMessageMail.innerHTML += "<p>※メールアドレスを入力してください</p>";
      errorFlag = true;
    }

    if (tel === "") {
      errorMessageTel.innerHTML += "<p>※電話番号を入力してください</p>";
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

    if (calendar === "") {
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

  if (mail.length > 0 && !mail.match(/.*@.*\..*/)) {
    errorMessageMail.innerHTML += "<p>※xxx@xxx.xxx形式で入力してください</p>";
    errorFlag = true;
  }

  if (tel.length > 0 && (tel.length < 9 || tel.length > 10)) {
    errorMessageTel.innerHTML += "<p>※電話番号は9桁以上、10桁以下で入力してください</p>";
    errorFlag = true;
  } else if (tel.length > 0 && tel.match(/.*\-\.*/)) {
    errorMessageTel.innerHTML += "<p>※電話番号にハイフンを使用しないでください</p>";
    errorFlag = true;
  }


  // ボタンの無効化/有効化
  let button = document.getElementById("submit");
  button.disabled = errorFlag;

  return errorFlag;
}