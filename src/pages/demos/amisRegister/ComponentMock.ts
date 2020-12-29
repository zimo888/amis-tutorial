export  const comp = {
    view:{
        "type": "form",
        "name": "form1",
        "api": "",
        "controls": [
          {
            "type": "text",
            "name": "name",
            "label": "姓名：",
            "onChange":"controller.onNameChange"
          },
          {
            "name": "email",
            "type": "email",
            "label": "邮箱："
          }
        ]
    },
    controller:{
        getName:()=>{
            return "name";
        },
        onNameChange:(data)=>{
            console.log('data==',data)
        }
    }

}

