window.onload = function (e) {
    liff.init(function (data) {
        initializeApp(data);
    });
};



function initializeApp(data) {

//  下面語法對tb有效
    document.getElementById('languagefield').textContent = data.language;
    document.getElementById('viewtypefield').textContent = data.context.viewType;
    document.getElementById('useridfield').textContent = data.context.userId;
    document.getElementById('utouidfield').textContent = data.context.utouId;
    document.getElementById('roomidfield').textContent = data.context.roomId;
    document.getElementById('groupidfield').textContent = data.context.groupId;


//    get profile call
//    document.getElementById('getprofilebutton').addEventListener('click', function () {
        liff.getProfile().then(function (profile) {
//            document.getElementById('useridprofilefield').textContent = profile.userId;
//            document.getElementById('displaynamefield').textContent = profile.displayName;

//  下面語法對input有效
            $("#useridprofilefield").val(profile.userId);
            $("#displaynamefield").val(profile.displayName);
            
            const profilePictureDiv = document.getElementById('profilepicturediv');
            if (profilePictureDiv.firstElementChild) {
                profilePictureDiv.removeChild(profilePictureDiv.firstElementChild);
            }
            const img = document.createElement('img');
            img.src = profile.pictureUrl;
            img.alt = "Profile Picture";
            profilePictureDiv.appendChild(img);
            
            $("#picsrc").val(profile.pictureUrl);
            
//            document.getElementById('statusmessagefield').textContent = profile.statusMessage;
            $("#statusmessagefield").val(profile.statusMessage);

        }).catch(function (error) {
            window.alert("Error getting profile: " + error);
        });
//    });
}



    $(function(){
        // 監聽 送出訂單 按鈕點擊
        // 下面這段主要在組合資料，還有擋使用者不填資料不能送出
        $('#sendOrder').click(function(e){
        var status = true;
        // 姓名
        var name = $('#mb_name').val();
        // 電話
        var phone = $('#mb_Cellphone').val(); 
        // 住址
        var address = $('#mb_address').val(); 
        // 電話
        var agree = $('#mb_agree').val(); 
        // 電話
        var agree = $('#mb_agree').val();   
        // 電話
        var LineUserID = $('#useridprofilefield').val(); 
        // 暱稱
        var LineNickName = $('#displaynamefield').val(); 
        // 狀態
        var LineStatus = $('#statusmessagefield').val(); 
        // 圖片 下面語法對input有效
        var LinePic = $('#picsrc').val();
        // 下面語法對tb有效
//        var Other = document.getElementById('picsrc').textContent;
        var Other = document.getElementById('useridfield').textContent;
        
        
   var usernameInput=document.getElementById("mb_name");
   var Cellphone1Input=document.getElementById("mb_Cellphone");
   var addressInput=document.getElementById("mb_address");
   var agreeInput=document.getElementById("mb_agree");


        // 擋住不填資料邏輯
        if(usernameInput.value.length<2 || usernameInput.value.length>5){
          alert("名字不符規格");
          status = false;
        }

        if(Cellphone1Input.value.length<10){
          alert("電話不符規格");
          status = false;
        }
        
        if(addressInput.value.length<5){
          alert("地址不符規格");
          status = false;
        }        
        var check=$("input[name='mb_agree_n']:checked").length;//判斷有多少個方框被勾選
        if(check==0){
          alert("您尚未勾選同意個資蒐集前告知函");
          status = false;
        }

        // 如果 �必填欄位都過了 才會到這邊
        if(status){
          // 打包 要的資料
          var mb_data = {
            'name' : name,
            'phone':phone,
            'address': address,
            'agree': agree,
            
            'lineuserid': LineUserID,
            'linenickname': LineNickName,
            'linestatus': LineStatus,
            
            'linePic': LinePic,
            'other': Other
          }
          // 呼叫 send ajax function
          send(mb_data);
        }
      });
    });
    

    function send(mb_data){
      $.ajax({
        // 這邊用get type
        type: "get",
        // api url - google appscript 產出的 url
        url: "https://script.google.com/macros/s/AKfycbyWHEuhQNlsQHzH11CFbLDa9vK2GpfTgiFfLpZ-pzXCuuGwByQ/exec",
        // 剛剛整理好的資料帶入
        data: mb_data,
        // 資料格式是JSON 
        dataType: "JSON",
        // 成功送出 會回頭觸發下面這塊感謝
        success: function (response) {
          console.log(response);
          alert('資料送出');
          window.close();
          window.history.back();
          liff.closeWindow();

        }
      });
      
}