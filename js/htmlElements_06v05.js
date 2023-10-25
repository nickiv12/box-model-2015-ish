$(document).ready(function () {

// ЧЕБОКСЫ - показ блоков слайдеров для ЛЮБОГО БЛОКА СЛАЙДЕРОВ без АНИМАЦИИ т.к. НЕ успеваю отследить высоту прокладки
$('input').click(function(){
  var inp = $(this);  // ССЫЛКА на чекнутый элемент
  var inpNum = inp.attr('id');
  inpNum = inpNum.substr(3);  // НОМЕР - новая строка обрезанная ПО 3-й позицию.
  setWidthHeight();// НАДО ПЕРЕСЧИТЫВАТЬ высоту блока ПРИ ОТКРЫТИИ, т.к.  В СЛАЙДЕРАХ ХРАНЯТСЯ СТАРЫЕ ЗНАЧЕНИЯ
  
  if(inp.is(':checked')) $('.sec-'+inpNum).show(); // ПОКАЗЫВАЕМ блок
  else {
    $('.sec-'+inpNum).hide();// СКРЫВАЕМ блок
    if(inpNum == 2) { 
      $('#'+elem_id).css('width', 'auto');
      $('#'+elem_id).css('height', 'auto');
    }
  }  
  
  heightForFixed()// получаем НОВУЮ ВЫСОТУ ПАНЕЛИ УПРАВЛЕНИЯ
});
// при загрузке
$('input').prop('checked', false);  // ДЕЛАЕМ ВСЕ чебокс НЕчекнутыми 
$('#ch-1').prop('checked', true); // ДЕЛАЕМ 1-й чебокс чекнутым 
$('.sec-2').hide(); // СКРЫВАЕМ 2-ю группу
// КОНЕЦ $('input').click

/*
1. ПОЛУЧЕНИЕ сокращенных записей CSS-свойст в jQuery НЕ ПОДДЕРЖИВАТЕСЯ. ЗАПИСЬ сокращенных свойств ПОДДЕРЖИВАЕТСЯ. 
  Считывание css свойств  - некоторые свойства ПРИЙДЕТСЯ хранить в атрибутах типа data-
  1.1. background-color - jQuery  считывает как rgba(x, x, x, Y). В других свойствах могут быть и другие форматы 
  Также НАДО ОБРАТИТЬ ВНИМАНИЕ на указание свойств. Если свойства с дефисом, то обязательно в кавычки. Вроде
  если использовать camelCase, то можно без кавычек.
2. margin - jQuery  СЧИТЫВАЕТ два значения - 0 auto. РЕШЕНИЕ -  СЧИТЫВАЮ margin-left (т.к. margin в jQuery  
    считывает два значения), а ЗАПИСЫВАЮ margin
3. При записи - удалении текста НАДО отслеживать смещение мыши с кнопки И останавливать процесс Т.К. можно
  много раз НАЧИНАТЬ процесс. 
*/
//alert('OK');

// ==== ФУНКЦИЯ которая одной строкой инициализирует слайдер + можно вызвать функцию
function slide($num, cssValue, $value, $min, $max, func){
	$( "#slider-"+$num ).slider({  // к диву вешаем slider + автоматом стили
    range: "min",
    value: $value,
    min: $min,
    max: $max,
    slide: function( event, ui ) {  // при перемещении ползунка будут:
        $( "#val-"+$num ).html('<s>'+cssValue+': </s><u>'+ui.value +"</u>px");
        $('#'+elem_id).css(cssValue,ui.value); 
		if(func !== undefined) func();// Выполняем передаваемую функцию - Меняем информацию о WIDTH		
      } 
  }); //конец слайдера
};

slide('01', 'padding', 1, 0, 50, setWidthHeight);	// иницализирую slider-01 PADDING
slide('02', 'border-width', 1, 1, 10, setWidthHeight);	// иницализирую slider-02 BORDER-WIDTH
slide('03', 'margin', 1, 1, 40, setWidthHeight);	// иницализирую slider-03 margin
slide('05', 'width', 1, 1, 390, setWidthHeight);	// иницализирую slider-05 width
slide('06', 'height', 1, 5, 400, setWidthHeight);	// иницализирую slider-06 height
slide('07', 'data-red', 1, 0, 255);	// иницализирую slider красный цвет
slide('08', 'data-green', 1, 0, 255);	// иницализирую slider синий  цвет
slide('09', 'data-red', 1, 0, 255);	// иницализирую slider красный цвет
slide('10', 'data-opacity', 1, 0.0, 10);	// иницализирую slider прозрачность

/**
 // --- СЛАЙДЕР для BACKGROUND-COLOR.  
  $( "#slider-04" ).slider({  // к диву вешаем slider + автоматом стили
    range: "min",
    value: 1,
    min: 1,
    max: 255,
    slide: function( event, ui ) {  // при перемещении ползунка будут:
        $( "#val-04" ).html("<s> background-color: </s><u>rgb(220,"+ui.value+",220)</u>");
        $('#'+elem_id).css('background-color','rgb(220,'+ui.value+',220)');
        $('#'+elem_id).attr('data-color',ui.value) // устанавливаю цвет в атрибуте элемента         
      } }); //конец слайдера
/

/* === Установка значений элементов ПРИ ЗАГРУЗКЕ страницы И ВАЖНО !!!ДО ВЕШАНИЯ СОБЫТИЙ на элементы === */
/* ------ объявляю И устанавливаю ГЛОБАЛЬНЫЕ переменные -----  */
// Записываю в переменные ТЕКСТ, который будет показан в элементах
var t_01, t_02, t_03, t_04, t_05, t_06,textInput; // 
t_01 = 'СТРОЧНЫЙ 1. '; $('#el_01').text(t_01);
t_02 = 'БЛОЧНЫЙ 1. '; $('#el_02').text(t_02);
t_03 = 'СТРОЧНО-БЛОЧНЫЙ 1. '; $('#el_03').text(t_03);
t_04 = 'СТРОЧНО-БЛОЧНЫЙ 2. '; $('#el_04').text(t_04);
t_05 = 'СТРОЧНЫЙ 2. '; $('#el_05').text(t_05);
t_06 = 'БЛОЧНЫЙ 2. '; $('#el_06').text(t_06);

var stopInOut = false; // ГЛОБАЛЬНАЯ ПЕРЕМ. с помощью этой переменной будем останавливать запись-удаление текста.
var elem_id; // ГП - идентификатор элемента, куда записывать текст

var textInp = 'Ну уж я-то знаю, как действуют настоящие магические браслеты, – хмыкнула Криста и легким\
 изящным движением поправила волосы. – И точно знаю, когда волшебная вещь чует, \
что говорится&nbsp; что-то о ней или о том, с чем она крепко связана. Браслет теплеет. Ну а если начинает\
 невыносимо жечь руку – о, на сказанные слова стоит обратить особое внимание. ВСЕ КОНЕЦ ТЕКСТА!!!!'; 

/* !!! ПРОБЛЕМА: ЗАВИСАЕТ текст в СТРОЧНОМ 1 на слове "говорится". Это олучается конец строки. Если убрать одну букву, то нормально записывает
  ВОЗМОЖНО из-за пробела после слова. Надо попробовать поставить неразрывный пробел - ПОЛУЧИЛОСЬ.
  То есть, если слово достигает конца строки и за ним пробел, то перестает записываться ВИЗУАЛЬНО  
  !!!! ПРОБЛЕМА НАДО ПЕРЕСЧИТЫВАТЬ ВЫСОТУ ОКНА ДЕМОНСТРАЦИИ ПЕРЕД СКРОЛОМ. ИНАЧЕ не все окно прячется ТАК КАК ЗА ЭТО ВРЕМЯ может увеличиться высота.
*/ 

/* ------ УСТАНАВЛИВАЮ ЗНАЧЕНИЯ В АТРИБУТАХ -----  */
$('.elem').each(function(){$(this).attr('data-color',245)});  // в data-color храню число от 0 до 255 для цвета фона

// ====  ВЕШАЕМ события на ВЫБОР ЭЛЕМЕНТА при КЛИКЕ на элемент ================
$('.elem').click(function() {
  
  // ПЕРЕОПРЕДЕЛЯЮ CSS свойства -у каждого элемента из группы удаляю класс elemClick
  $('.elem').each(function(){$(this).removeClass('elemClick');});
  
  // получаю ТЕКУЩИЙ  элемент
  var a = $(this);  
  a.addClass('elemClick');  // добавляю новый класс кликнутого элемента
  elem_id = a.attr('id'); // Записываю в переменную идентификатор кликнутого элемента

  var num = elem_id.substr(3); // получаю номер кликнутого элемента
  $('#elemName').html('Элемент: <s>"'+eval('t_'+num)+'"</s>');  //
  $('#elemDisplay').html('<s>display: </s>'+'<u>'+$('#'+elem_id).css('display')+'</u>');
  
  // !!!!! ВЫЗЫВАЮ ПЕРЕМЕННУЮ ДИНАМИЧЕСКИ и получаю СОВМЕСТНЫЙ текст для каждого элемента
  textInput = eval('t_'+num) + textInp;  // соединяю два текста - в кликнутом элементе + общий текст
    
  // УСТАНОВКА СЛАЙДЕРОВ и инпутов В СУЩЕСТВУЮЩИЕ ЗНАЧЕНИЯ СВОЙСТВ КЛИКНУТОГО ЭЛЕМЕНТА
  // - для PADDING 
  var padVal = $("#el_"+num).css('padding');  // получаю значение padding в пикселах. ПИКСЕЛЫ НАДО УБРАТЬ.
  var padValue = padVal.slice(0,padVal.length-2); // Убираю пикселы - получаю ВСЮ строку, кроме 2-х последних символов.
  $("#slider-01").slider("value",padValue); // устанавливаю ползунок в полученное значение.
  $( "#val-01").html('<s>padding:</s><u>'+padValue +"</u>px");  // цифры другого цвета.
  
    // - для BORDER
  var boderVal = $("#el_"+num).css('border-width');  // получаю значение BORDER в пикселах. ПИКСЕЛЫ НАДО УБРАТЬ.
  var boderValue = boderVal.slice(0,boderVal.length-2); // Убираю пикселы - получаю ВСЮ строку, кроме 2-х последних символов.
  $("#slider-02").slider("value",boderValue); // устанавливаю ползунок в полученное значение.
  $( "#val-02").html('<s>border-width:</s><u>'+boderValue +"</u>px");  // цифры другого цвета.
  
    // - для MARGIN (составное свойство, поэтому ПОЛУЧАЮ margin-left, а присваиваю margin)
  var marginVal = $("#el_"+num).css('margin-left');  // получаю значение MARGIN-LEFT в пикселах. ПИКСЕЛЫ НАДО УБРАТЬ.
  var marginValue = marginVal.slice(0,marginVal.length-2); // Убираю пикселы - получаю ВСЮ строку, кроме 2-х последних символов.
  $("#slider-03").slider("value",marginValue); // устанавливаю ползунок в полученное значение.
  $( "#val-03").html('<s>margin:</s><u>'+marginValue+"</u>px");  // цифры другого цвета.  
  

    // - для WIDTH
  var widthVal = $("#el_"+num).css('width');  // получаю значение WIDTH в пикселах. ПИКСЕЛЫ НАДО УБРАТЬ.
  var widthValue = widthVal.slice(0,widthVal.length-2); // Убираю пикселы - получаю ВСЮ строку, кроме 2-х последних символов.
  $("#slider-05").slider("value",widthValue); // устанавливаю ползунок в полученное значение.
  $( "#val-05").html('<s>width:</s><u>'+widthValue+'</u>px');  // цифры другого цвета.
 
  setWidthHeight(); 
  
  /* - для BACKGROUND - COLOR !!! надо разобраться с форматом представления цвета. Хром выдает цветв rgba(0,0,0,0).
  Поэтому могут быть проблемы с РАЗНЫМИ БРАУЗЕРАМИ.  Можно сохранять значение одного из цветов в атрибутах'*/
  var colorVal = $("#el_"+num).attr('data-color');  // получаю значение из созданного атрибута
 // Убираю пикселы - получаю ВСЮ строку, кроме 2-х последних символов.
  $("#slider-04").slider("value",colorVal); // устанавливаю ползунок в полученное значение.
  $( "#val-04").html('<s>background-color:</s><u>rgb(220,'+colorVal +", 220)</u>");  // устанавливаю цвет в инпуте слайдера
/**/  
   

}); // КОНЕЦ  $('.elem').click(function()

// !!! ВНИМАНИЕ: вызов клика на элементе ТОЛЬКО ПОСЛЕ предыдущей функции $('.elem').click(function() {
$('#el_02').click();

/* ====  ФУНКЦИЯ СЧИТЫВАЮЩАЯ свойства КЛИКНУТОГО элемента и УСТАНАВЛИВАЮЩАЯ ползунок слайдера и ЗАПИСЫВАЮЩАЯ свойства в инпут*/
function setWidthHeight(){
  var elClick = $('#'+elem_id);  //  записываю в перем. ссылку на кликнутый элемент.
  // свойства CSS КЛИНКУТОГО элемента получаются ВМЕСТЕ с ед.изм. ПОЭТОМУ приходится обрезать с конца без 2-х символов для px

  $("#slider-05").slider("value",elClick.css('width').slice(0,elClick.css('width').length-2)); // устанавливаю ползунок в полученное значение.
  $( "#val-05").html('<s>width:</s><u>'+elClick.css('width').slice(0,elClick.css('width').length-2) +"</u>px");  // цифры другого цвета.
  $( "#val-05-1").html('<s>width:</s><u>'+elClick.css('width').slice(0,elClick.css('width').length-2) +"</u>px"); 
  
  $("#slider-06").slider("value",elClick.css('height').slice(0,elClick.css('height').length-2)); // устанавливаю ползунок в полученное значение.
  $( "#val-06").html('<s>height:</s><u>'+elClick.css('height').slice(0,elClick.css('height').length-2) +"</u>px");  // цифры другого цвета.
  $( "#val-06-1").html('<s>height:</s><u>'+elClick.css('height').slice(0,elClick.css('height').length-2) +"</u>px");  // цифры другого цвета. 
};

/* =========  МЕХАНИЗМ УПРАВЛЯЕМОЙ МНОГОСТУПЕНЧАТОЙ  ЗАПИСИ и УДАЛЕНИЯ ТЕКСТА в любом элементе ========  */ 

/* ------- ПЛАНШЕТ + PC ЗАПОЛНЕНИЕ ТЕКСТОМ --------  */
var textIn = document.getElementById('textInput');
var textDel = document.getElementById('textDelete');

/* --- ВВОД ТЕКСТА ДЛЯ ПЛАНШЕТА --- */
textIn.addEventListener('touchstart', function(event) {
  textIn.preventDefault();
  textWDmanage('write',textInput, '#'+elem_id, 30, 1); // запись текста
}, false);
textIn.addEventListener('touchmove', function(event) {stopInOut = true;}, false);
textIn.addEventListener('touchend', function(event) {stopInOut = true;}, false);

/* --- ВВОД ТЕКСТА ДЛЯ PC ---- */
textIn.addEventListener('mousedown', function(event) {
  stopInOut = false;  // - СТОП. При МНОГОСТУПЕНТЧАТОМ вводе текста надо переустанавливать состояние СТОПА
  textWDmanage('write',textInput, '#'+elem_id, 30, 1); // запись текста
}, false);
textIn.addEventListener('mouseleave', function(event) {stopInOut = true;}, false);
textIn.addEventListener('mouseup', function(event) {stopInOut = true;}, false);

/* --- УДАЛЕНИЕ ТЕКСТА ДЛЯ ПЛАНШЕТА --- */
textDel.addEventListener('touchstart', function(event) {
  textDel.preventDefault();
  textWDmanage('delete',textInput, '#'+elem_id, 30, 1); // запись текста
}, false);
textDel.addEventListener('touchmove', function(event) {stopInOut = true;}, false);
textDel.addEventListener('touchend', function(event) {stopInOut = true;}, false);

/* --- УДАЛЕНИЕ ТЕКСТА ДЛЯ PC ---- */
textDel.addEventListener('mousedown', function(event) {
  stopInOut = false;  // - СТОП. При МНОГОСТУПЕНТЧАТОМ вводе текста надо переустанавливать состояние СТОПА
  textWDmanage('delete',textInput, '#'+elem_id, 30, 1); // запись текста
}, false);
textDel.addEventListener('mouseleave', function(event) {stopInOut = true;}, false);
textDel.addEventListener('mouseup', function(event) {stopInOut = true;}, false);

/* --- ЗАПОЛНЕНИЕ ТЕКСТОМ  --- 
$('#textInput').mousedown(function(e){ //e - eventObject - объект события
  stopInOut = false;  // - СТОП. При МНОГОСТУПЕНТЧАТОМ вводе текста надо переустанавливать состояние СТОПА
  textWDmanage('write',textInput, '#'+elem_id, 30, 1); // запись текста
  $(this).mouseleave(function(){stopInOut = true;}); // в случае ухода с элемента ОСТАНАВЛИВАЕМ процесс
  }).mouseup(function(e){ 
      stopInOut = true; // содержание в переменной проверяется в textWDmanage() и при отпуске мыши останавливатеся выполнение
    });
*/
/* --- УДАЛЕНИЕ ТЕКСТА  --- 
$('#textDelete').mousedown(function(e){
  stopInOut = false;  // - СТОП. При МНОГОСТУПЕНТЧАТОМ вводе текста надо КАЖДЫЙ РАЗ переустанавливать состояние СТОПА
  textWDmanage('delete',textInput, '#'+elem_id, 30, 1); // запись текста. '#'+elem_id - id для  jQuery
  $(this).mouseleave(function(){stopInOut = true;}); // в случае ухода с элемента ОСТАНАВЛИВАЕМ процесс
  }).mouseup(function(e){ 
      stopInOut = true; // содержание в переменной проверяется в textWDmanage() и при отпуске мыши останавливатеся выполнение
    });
*/ 
// === Функция УПРАВЛЯЕМОЙ записи-удаления HTML-текста вместе с отслеживанием конца выполнения. ===
function textWDmanage(wd,val, where, del, numL){ 
  var defWD = $.Deferred(); //  объект в котором будет храниться состояние выполнения функции - он возвращается
  var textFrom = $(where).html();  // ПОЛУЧАЕМ уже введенный ранее текст.
  if(wd=='write'){// ВСТАВКА текста посимвольная
    if(textFrom.length == 0)var i=0;  // Устанавливаем счетчик количества итераций в 0
    else{var i = 0+textFrom.length; } // Устанавливаем счетчик количества итераций в 0+длина уже введенного
    var timer = setInterval(
      function(){            
        setWidthHeight();//Меняем информацию о WIDTH, HEIGHT и положение ползунков слайдеров     
        var row=val.substr(0,i); 
        $(where).html(row); i += numL;
        if(i>=val.length+numL || stopInOut ) {clearInterval(timer);  defWD.resolve();} // останавливаем ЛИБО в конце ЛИБО при отпущенной кнопке
      },del );
  }
  else if(wd=='delete'){  // УДАЛЕНИЕ текста посимвольное 
    var i=textFrom.length;  
    var timer = setInterval(
      function(){                
        setWidthHeight();// Меняем информацию о WIDTH, HEIGHT и положение ползунков слайдеров   
        var row=textFrom.substr(0,i);
        $(where).html(row); i -= numL;
        if(i<0 || stopInOut) 
          {clearInterval(timer);  defWD.resolve();}
      },del );    
  }
  else(alert('Неправильно указан первый параметр. Он д.б либо write либо delete.'))
  return defWD;
}
// ==== Конец Функция УПРАВЛЯЕМОЙ записи-удаления ===============================================


// ===== СКРИПТ ПРОКРУТКИ КОНТРОЛЬНОЙ ПАНЕЛИ -  НАДО указать 2-а идентификатора (Управляющей панели и окна демонстрации)
// --- ПОЛУЧАЮ ПЕРВОНАЧАЛЬНЫЕ ДАННЫЕ О ПОЛОЖЕНИИ ЭЛЕМЕНТОВ --------- 
  var $window = $(window);  // получаем ссылку на объект window
  var el = $('#controlPanel'); // получаю ссылку на элемент для скролла
  var endEl = $('#demonstration'); // элемент ДО КОНЦА которого скролл
  
  //  ИСПОЛЬЗУЮ position().top так как нет позиционированного родителя, иначе offset().top
  var elTopP = el.position().top; // до верха ближайшего родственника 
  
  // получаю высоту КОНЕЧНОГО ЭЛЕМЕНТА
  var h =  endEl.css('height'); // с пикселами
  var h = +h.slice(0,h.length-2) // без пикселов, !!!! + преобразует в число. Без него при сложении получается строка
 
// ---  ПОЗИЦИОНИРУЮ панель управления при ЗАГРУЗКЕ
  el.css({'position': 'fixed'});  //работает//el.css({'position': 'fixed', 'top': elTopP}); работает
  $('#forFixed').css('height', $(el).css('height')); // прокладка позволяет не сдвигатьcя вверх дальнейшим элементам
  
function heightForFixed(){$('#forFixed').css('height', $('#controlPanel').css('height'))}; // прокладка позволяет не сдвигатьcя вверх дальнейшим элементам};

// --- ФУНКЦИЯ ПРИ ПРОКРУТКЕ СТРАНИЦЫ 
  $window.scroll(function(e){
    scrollTop = $window.scrollTop(),  // количество прокрученных пикселей 
    topPosition = Math.max(0, elTopP - scrollTop), //ПЕРЕСЧИТАННОЕ ПОЛОЖЕНИЕ, пока прокрутка не больше первоначального положения, то разница иначе 0    
    topPosition = Math.min(topPosition, (h+elTopP+10-scrollTop)); // Почему-то именно в этом порядке переменные НАВЕРНО - преобразует в число
    el.css('top', topPosition); // УПРАВЛЯЕМ позицией фиксированного элемента в зависимости от скроллинга
//    $('#topPos').text('Позиция фикс. элемента = '+topPosition);
  }); // КОНЕЦ функции СКРОЛЛА

}); // КОНЕЦ READY 