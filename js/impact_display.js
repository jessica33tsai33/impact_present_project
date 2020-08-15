var factory_data = document.getElementById("factory_data");
var panel_heading = document.getElementById("panel-heading");
var tab_content = document.getElementById("tab-content");

//show factory's main data
function showFactoryMainData(jsonObj) {

    factory_data.innerHTML = "";

    var factory_name = '廠區名稱：' + jsonObj.廠區 + '<br>';
    var factory_address = '廠區地址：' + jsonObj.地址 + '<br>';
    var impact_chose = '危害選擇：';
    factory_data.innerHTML = factory_name + factory_address + impact_chose;
}

//show factory's impact
function showFactoryImpact(jsonObj) {

    panel_heading.innerHTML = "";
    tab_content.innerHTML = "";

    var ul = document.createElement('ul');
    ul.setAttribute('class', 'nav nav-tabs');
    ul.setAttribute('role', 'tablist');
    var i, x;

    var impact_name = creatImpactName();
    var impact_action = creatImpactAction();

    for (i = 0; i < impact_name.length; i++) {
        //impact name
        var li = document.createElement('li');
        li.setAttribute('role', 'presentation');
        li.setAttribute('class', 'nav-item');
        var a = document.createElement('a');
        var href = '#' + impact_name[i];
        a.setAttribute('href', href);
        a.setAttribute('aria-controls', impact_name[i]);
        a.setAttribute('role', 'tab');
        a.setAttribute('data-toggle', 'tab');
        a.setAttribute('class', 'nav-link');
        a.innerHTML = impact_name[i];
        li.appendChild(a);
        ul.appendChild(li);

        //impact value
        var div1 = document.createElement('div');
        div1.setAttribute('role', 'tabpanel');
        div1.setAttribute('class', 'tab-pane');
        div1.setAttribute('id', impact_name[i]);

        var div2 = document.createElement('div');
        div2.setAttribute('class', 'row');
        var div3 = document.createElement('div'); // gauges div
        var id = impact_name[i] + "_g";
        div3.setAttribute('id', id);
        div3.setAttribute('class', 'col-sm-6');
        var div4 = document.createElement('div'); // activity div
        div4.setAttribute('class', 'col-sm-6 impact_action');
        div4.innerHTML = jsonObj[impact_action[i]];
        div2.appendChild(div3);
        div2.appendChild(div4);
        div1.appendChild(div2);
        tab_content.appendChild(div1);
        var impact = jsonObj[impact_name[i]];
        drawGauges(id, impact);
    }

    panel_heading.appendChild(ul);
}

//creat impact name list
function creatImpactName(){
	var json_keys = Object.keys(jsonObj[0]);
    var impact_name = [];
    for (x of json_keys) {
        if (x.includes("風險") == true) {
            impact_name.push(x);
        }
    }
    return impact_name;
}

//creat impact action list
function creatImpactAction(){
	var json_keys = Object.keys(jsonObj[0]);
	var impact_action = [];
    for (x of json_keys) {
        if (x.includes("行動") == true) {
            impact_action.push(x);
        }
    }
    return impact_action;
}