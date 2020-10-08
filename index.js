var teacher = {};
var student = {};
function a() {
    var list = document.getElementById("text").value.split("\n");
    for(var i = 0;i<list.length;i++)
    {
        var str = list[i];
        if(str.includes("导师"))
            {
                var teacher_name = str.substring(str.indexOf("：")+1);
                //console.log(teacher_name);
                teacher[teacher_name] = {};
                //console.log(teacher);
                i += 1;
                while(list[i]!=="")
                    {
                        //"级博士生："，"级硕士生："，"级本科生："
                        var stu_msg = list[i];
                        if(stu_msg.includes("级博士生：")||stu_msg.includes("级硕士生：")||stu_msg.includes("级本科生："))
                            {
                                var type = stu_msg.substring(0,stu_msg.indexOf("："));
                                var stu_list = stu_msg.substring(stu_msg.indexOf("：")+1).split("、");
                                //console.log(type);
                                //console.log(stu_list);
                                teacher[teacher_name][type] = stu_list;
                            }
                        i++;
                    }
            }
        else if(str.length)
            {
                var stu_name = str.substring(0,str.indexOf("："));
                var skill_list = str.substring(str.indexOf("：")+1).split("、");
                student[stu_name] = skill_list;
            }
    }
    console.log(teacher);
    console.log(student);

    //根据获得的数据创建节点
    var tree = document.getElementById("tree");
    for(var item in teacher)
        add_teacher(item,tree);
}

function add_teacher(name, tree){
    var new_teacher_node = document.createElement("div");
    new_teacher_node.innerHTML = name;
    new_teacher_node.setAttribute("name",name);
    new_teacher_node.setAttribute("open","no");
    new_teacher_node.setAttribute("id","teacher");
    new_teacher_node.setAttribute("onclick","b(this)");
    tree.appendChild(new_teacher_node);
}

function b(obj) {
    if(obj.getAttribute("open")==="yes")
        {
            obj.setAttribute("open","no");
            while(obj.childNodes.length>1)
                obj.removeChild(obj.childNodes[1]);
        }

    else
        {
            obj.setAttribute("open","yes");
            var stu_type_list = teacher[obj.innerHTML];
            for(var type in stu_type_list)
            {
                var new_type_node = document.createElement("div");
                new_type_node.innerHTML = type;
                new_type_node.setAttribute("name",type);
                new_type_node.setAttribute("open","no");
                new_type_node.setAttribute("id","type");
                new_type_node.setAttribute("onclick","c(this)");
                obj.appendChild(new_type_node);
            }
        }
    event.stopPropagation();
}

function c(obj){
    if(obj.getAttribute("open")==="yes")
    {
        obj.setAttribute("open","no");
        while(obj.childNodes.length>1)
            obj.removeChild(obj.childNodes[1]);
    }
    else
    {
        obj.setAttribute("open","yes");
        var stu_list = teacher[obj.parentNode.getAttribute("name")][obj.innerHTML];
        console.log(stu_list);
        for(var i=0;i<stu_list.length;i++)
        {
            var stu_name = stu_list[i];
            var new_stu_node = document.createElement("div");
            new_stu_node.innerHTML = stu_name;
            new_stu_node.setAttribute("name",stu_name);
            new_stu_node.setAttribute("open","no");
            new_stu_node.setAttribute("id","stu");
            new_stu_node.setAttribute("onclick","d(this)");
            obj.appendChild(new_stu_node);
        }
    }
    event.stopPropagation();
}

function d(obj) {
    if(obj.getAttribute("open")==="yes")
    {
        obj.setAttribute("open","no");
        while(obj.childNodes.length>1)
            obj.removeChild(obj.childNodes[1]);
    }
    else
    {
        obj.setAttribute("open","yes");
        console.log(obj.innerHTML);
        var skill_list = student[obj.innerHTML];
        console.log(skill_list);
        for(var i=0;i<skill_list.length;i++)
        {
            var skill_name = skill_list[i];
            var new_skill_node = document.createElement("div");
            new_skill_node.innerHTML = skill_name;
            new_skill_node.setAttribute("name",skill_name);
            new_skill_node.setAttribute("open","no");
            new_skill_node.setAttribute("id","skill");
            new_skill_node.setAttribute("onclick","f()");
            obj.appendChild(new_skill_node);
        }
    }
    event.stopPropagation();
}

function f(){event.stopPropagation();}